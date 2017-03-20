// Configuration screen : lists different configuration activities and allows to select which to use

var ConfigurationScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('configuration_screen');

        // Setup button clicks       
        this.html.find(".btn-raw-configuration").off().click(function(){ fabrica.navigation.go("/configuration/raw_configuration"); });
    },

});

screens.configuration = new ConfigurationScreen(); 

