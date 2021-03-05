// Core machine object, used to store machine information, and communicate with the machine

var Machine = Class({

    // Constructor method
    create: function(){
        this.communication_log = "";
        this.uploading = false;

        this.gcode_queue = [];
        this.sending = false;
    },

    // Attempt connecting to a machine, and report results
    attempt_connection: function( params ){
        var _that = this;
        $.post("http://" + params.ip + "/command", "version\n").done( function(data){ _that.successful_connection(data, params.ip); } ).fail( params.failure );
    },

    // A succesful connection was established with a Smoothie-based board
    successful_connection: function(data, ip){
        // Remember the information learned from finding the board
        this.ip = ip;
        this.address = "http://" + ip ;
        this.version_string = data;

        // Remember the machine's ip after the user leaves or reloads
        fabrica.local_config.set("ip", this.ip);

        // Tell the system that a new connection was established
        fabrica.call_event('on_succesful_connection');

        // Next step is obtaining the configuration file from the SD card
        // TODO : Handle errors
        $.ajax(this.address + "/sd/config").done(function(file){
            // Tell the system the configuration file was obtained and parsing will now begin 
            fabrica.call_event('on_config_parse_begin');

            // Parse configuration
            fabrica.machine.config.parse(file);

            // Parsing done
            fabrica.call_event('on_config_parse_end');
        });
    },

    upload_file: function( file, filename ){
        this.uploading = true;
        var _that = this;

        // Read the file
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onloadend  = function(evt){
            // create XHR instance
            xhr = new XMLHttpRequest();
            xhr.open("POST", "http://" + _that.ip + "/upload", true);
            xhr.setRequestHeader("X-Filename", filename);

            // make sure we have the sendAsBinary method on all browsers
            XMLHttpRequest.prototype.sendAsBinary = function(text){
                var data = new ArrayBuffer(text.length);
                var ui8a = new Uint8Array(data, 0);
                for (var i = 0; i < text.length; i++) ui8a[i] = (text.charCodeAt(i) & 0xff);

                if(typeof window.Blob == "function"){
                    var blob = new Blob([data]);
                }else{
                    var bb = new (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)();
                    bb.append(data);
                    var blob = bb.getBlob();
                }

                this.send(blob);
            }

            // Track upload progress
            var eventSource = xhr.upload || xhr;
            eventSource.addEventListener("progress", function(e) {
                var percent_complete = Math.round((  (e.position || e.loaded) /  (e.totalSize || e.total) )*100);
                fabrica.call_event("on_file_upload_update", percent_complete);
            });

            // Handle file upload success or failure
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        // Upload succeeded
                        fabrica.call_event("on_file_upload_done");
                    }else{
                        // Upload failed
                        fabrica.call_event("on_file_upload_failure"); 
                    }
                }
                _that.uploading = false;
            };

            // start sending
            xhr.sendAsBinary(evt.target.result);
        };
    },
    
    request_update: function( update_string, callback ){
        // Don't allow multiple update commands in the queue
        if(!JSON.stringify(this.gcode_queue).includes(JSON.stringify(update_string))){
            this.send_command(update_string, callback);
        }
    },

    // Add command to the queue
    send_command: function( command, callback ){
        this.gcode_queue.push({"command": command, "callback": callback});

        if(!this.sending){
            this.advance_queue();
        }
    },

    // Send the next command in the queue to the board
    advance_queue: function(){
        var queue_item  = this.gcode_queue.shift();
        if(queue_item){
            var command = queue_item.command;
            var callback = queue_item.callback;

            console.log("sending command: " + command);

            fabrica.call_event('on_gcode_send', command + "\n");
            this.communication_log += command+"\n";
            this.sending = true;
            var _that = this;

            $.post("http://" + this.ip + "/command", command+"\n")
                .done( function(data){
                    _that.communication_log += data;
                    _that.sending = false;
                    
                    if(callback){ callback(data); }

                    fabrica.call_event('on_gcode_response', data);
                    _that.advance_queue();
                }).fail(function(){
                    console.log("gcode failed to send. trying again...");
                    
                    _that.gcode_queue.unshift({"command": command, "callback": callback});
                    _that.advance_queue();
                });
        }
    },

    // Home an axis or all axes
    home: function( axis ){
        this.send_command(axis.match(/all/gi) ? "G28" : "G28 " + axis);
    },

    // Jog an axis
    jog: function( axis, direction, distance, feedrate ){
        this.send_command("G91\nG0 " + axis + distance*direction + " F" + feedrate + "\nG90");
    },

    // Get a list of files
    get_file_list: function( path, callback ){
        fabrica.machine.send_command("ls -s " + path, function(data){
            var file_list = data.split("\n").map(function(file){return file.split("\r")[0]});
            file_list.pop(); 
            callback.call(null, file_list);
        });
    }

}); 

// TODO : If in activity use the parent's machine instead
fabrica.machine = new Machine()

