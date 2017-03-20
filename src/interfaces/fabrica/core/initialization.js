// Initialization screen : displays progress of preparation of the interface, after initial contact with the machine

InitializationScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('initialization_screen'); 
        this.html.find(".list-download").removeClass('hidden');
        this.html.find(".progress-bar").width("33%");
    },


    on_config_parse_begin: function(){
        this.html.find(".list-parse").removeClass('hidden');
        this.html.find(".progress-bar").width("66%");
    }, 

    on_config_parse_end: function(){
        this.html.find(".list-done").removeClass('hidden');
        this.html.find(".progress-bar").width("100%");
        fabrica.navigation.go("/core/welcome"); 
    }

});

screens.initialization = new InitializationScreen();


