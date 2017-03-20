// Configuration screen : lists different configuration activities and allows to select which to use

var ConfigurationScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('configuration_screen');

        // Add handlers
        this.html.find(".btn-full-configuration").off().click(function(e){
            e.preventDefault();
        });
        this.html.find(".btn-machine-configuration").off().click(function(e){
            e.preventDefault();
        });
        this.html.find(".btn-raw-configuration").off().click(function(e){
            e.preventDefault();
            fabrica.screens.raw_configuration.enter();
        });
    },

});

fabrica.add_screen('configuration', new ConfigurationScreen()); 

