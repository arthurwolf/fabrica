// Spindle screen : spindle on/off control

var SpindleScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('spindle_screen');

        // Handle button clicks       
        this.html.find(".btn-spindle-on").off().click(function(e){
            e.preventDefault();
            fabrica.machine.send_command("M3");
        });
        this.html.find(".btn-spindle-off").off().click(function(e){
            e.preventDefault();
            fabrica.machine.send_command("M5");
        });
    },

});

screens.spindle = new SpindleScreen(); 



