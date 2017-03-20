// Welcome the user to the interface, display useful information

var WelcomeScreen = Screen.extend({

    enter: function(){
        // Display this screen
        this.display('welcome_screen');

        if( fabrica.local_config.get("skip_welcome") === "true" ){
            fabrica.screens.main.enter();
        }

        // Add handler
        this.html.find(".btn_next").off().click(function(){
            fabrica.local_config.set("skip_welcome", $(".skip-welcome").is(':checked'));
            fabrica.navigation.go("/core/main");
        });
    }, 

}); 

screens.welcome = new WelcomeScreen();

