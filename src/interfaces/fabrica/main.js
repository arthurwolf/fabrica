// Main screen, selects actions to do for users

var MainScreen = Screen.extend({

    enter: function(){
        // Display screen
        this.display('main_screen'); 
        
        // Set handlers
        this.html.find(".btn-control"      ).off().click(function(){ fabrica.navigation.go("/control/control"); });
        this.html.find(".btn-make"         ).off().click(function(){ fabrica.navigation.go("/make/make"); });
        this.html.find(".btn-configuration").off().click(function(){ fabrica.navigation.go("/configuration/configuration"); });

    }

});

screens.main = new MainScreen();


