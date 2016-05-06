// Control screen : lists different control activities and allows to select which to use

var ControlScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('control_screen');

        // Setup button clicks       
        this.html.find(".btn-move").off().click(function(){ fabrica.screens.move.enter(); });
    },

});

fabrica.add_screen('control', new ControlScreen()); 
