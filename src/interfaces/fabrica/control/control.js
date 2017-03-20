// Control screen : lists different control activities and allows to select which to use

var ControlScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('control_screen');

        // Setup button clicks       
        this.html.find(".btn-move").off().click(function(){ fabrica.navigation.go("/control/move"); });
        this.html.find(".btn-home").off().click(function(){ fabrica.navigation.go("/control/home"); });
        this.html.find(".btn-spindle").off().click(function(){ fabrica.navigation.go("/control/spindle"); });
        this.html.find(".btn-temperature").off().click(function(){ fabrica.navigation.go("/control/temperature"); });
        this.html.find(".btn-extruder").off().click(function(){ fabrica.navigation.go("/control/extruder"); });
        this.html.find(".btn-terminal").off().click(function(){ fabrica.navigation.go("/control/terminal"); });
    },

});

screens.control = new ControlScreen(); 



