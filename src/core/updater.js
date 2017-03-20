// Core updater object, used to update machine information frequently such as temperature, position, and progress of file playing

var Updater = Class({

    // TODO: do not send a check for data if the module that would contain that data is not enabled (e.g. M105 and temperature_control)

    // Constructor method
    create: function(){

        var _that = this;
        this.update_timer = setInterval(function(){
            // Do not poll the machine when uploading or when getting config
            // If there is no ip, we don't know where to find the machine so don't poll the machine
            if(!fabrica.machine.uploading && fabrica.machine.ip && Object.keys(fabrica.machine.config).length && document.hasFocus()){
                fabrica.machine.request_update("M105\nM119\nM114.1\nprogress\n", _that.update_received);
            }
        }, 5000);
    },

    // Parse the result of our query. It should contain temperature, endstop, postion, and play data in that order.
    update_received: function( response ){
        var result = {};

        var lines = response.split("\n");

        // Extract temperatures
        // Cut into different readings
        var decomposed = lines[0].replace(/\s\r$/gi, '').split(/([A-Z])/);
        decomposed.shift();

        // For each reading, add values to the result
        result.temperature = {};
        result.temperature.string = lines[0];
        while( decomposed.length ){
            var letter = decomposed.shift();
            var reading = decomposed.shift().replace(/^(:)*/g,'').replace(/(\s)*$/g,'');
            var values = reading.split(/\s/g);
            result.temperature[letter] = {
                temperature: values[0],
                target: values[1].replace(/(\/)/g,''),
                pwm: values[2].replace(/\@/g,'')
            }; 
            
        }

        // Extract endstop readings
        result.endstops = {};
        var endstop_readings = lines[1].replace(/(\s*\r)$/g,'').split(' ');
        for( var index in endstop_readings){
            var endstop = endstop_readings[index]; 
            var couple = endstop.split(":");
            result.endstops[couple[0]] = couple[1]; 
        }

        // Extract positions
        result.positions = {};
        var decomp = lines[3].split(/([A-Z])/);
        decomp.shift();
        while( decomp.length ){
            var letter = decomp.shift();
            var value = decomp.shift().replace(/^(:)/g,'').replace(/([\s\r]*)$/,'');
            result.positions[letter] = value;
        }

        // Extract progress
        result.progress = {};
        result.progress.string = lines[4].replace(/([\s\r]*)$/,'');
        if( result.progress.string.match(/currently/g) ){
            // Not playing "Not currently playing"
            result.progress.playing = false;
            result.progress.paused = false;
        }else if(result.progress.string.match(/complete/g) && result.progress.string.match(/est/g)) {
            // Playing, not paused
            // Example : "file: /sd/vive-basestation-mount.gcode, 5 % complete, elapsed time: 32 s, est time: 565 s" or "Not currently playing"
            result.progress.playing = true;
            result.progress.paused = false;

            result.progress.filename = result.progress.string.match("/sd/(.*?), ")[1];
            result.progress.percent_complete = result.progress.string.match(", (.*?) %")[1];
            result.progress.elapsed_time = response.match("elapsed time: (.*?) s")[1];
            
            if(result.progress.string.match("est time: (.*) s")){ result.progress.estimated_time = result.progress.string.match("est time: (.*) s")[1]; }       
        }else {
            // Paused
            // Example: SD print is paused at 0/115274

            result.progress.playing = true;
            result.progress.paused = true;
        }
        fabrica.machine.playing = result.progress.playing;
        fabrica.machine.paused = result.progress.paused;

        fabrica.call_event("on_value_update", result);
    }

}); 

fabrica.machine.updater = new Updater();
