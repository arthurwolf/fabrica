// Make screen : lists different control activities and allows to select which to use

var MakeScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('make_screen');

        // Setup button clicks       
        this.html.find(".btn-play").off().click(function(){ fabrica.navigation.go("/make/play"); });
        this.html.find(".btn-upload").off().click(function(){ fabrica.navigation.go("/make/upload"); });
    },

});

screens.make = new MakeScreen(); 
