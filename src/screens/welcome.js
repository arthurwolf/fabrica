// Welcome the user to the interface, display useful information

var WelcomeScreen = Screen.extend({

    enter: function(){
        // Display this screen
        this.display('welcome_screen');

        //TODO : Make "do not show this next time" actually do what it says

        // Add handler
        this.html.find(".btn_next").off().click(function(){ fabrica.screens.main.enter(); });
    }, 

    on_initialization_complete: function(){
        this.enter();
    }

}); 

fabrica.add_screen( 'welcome', new WelcomeScreen() );

