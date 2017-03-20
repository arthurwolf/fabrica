// Extruder screen : extrude and retract controls

var ExtruderScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('extruder_screen');

        // Handle button clicks       
        this.html.find(".btn-extrude").off().click(function(e){
            e.preventDefault();
            fabrica.machine.jog("E", 1, $(".e-distance").val(), $(".e-feedrate").val());
        });
        this.html.find(".btn-retract").off().click(function(e){
            e.preventDefault();
            fabrica.machine.jog("E", -1, $(".e-distance").val(), $(".e-feedrate").val());
        });
    },

});

screens.extruder = new ExtruderScreen(); 


