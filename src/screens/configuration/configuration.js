// Configuration screen : lists different configuration activities and allows to select which to use

var ConfigurationScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('configuration_screen');

        // Setup button clicks       
        this.html.find(".btn-raw-configuration").off().click(function(){ fabrica.screens.raw_configuration.enter(); });
    },

});

fabrica.add_screen('configuration', new ConfigurationScreen()); 

