// Connection screen : shows connection status, tries to automatically connect, offers the option to manually enter parameters

var ConnectionScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('connection_screen');

        // if the user has come here before and we know their machine's ip, put the ip in the ip field 
        if( fabrica.local_config.get("ip") && fabrica.local_config.get("ip") !== "undefined" ){
            $(".input-ip").val(fabrica.local_config.get("ip"));
        }

        // Add handlers
        this.html.find(".btn-connect").off().click(function(){ screens.connection.attempt_connection(); });
        this.html.find(".btn-start-search").off().click(function(){ fabrica.navigation.go("/core/network_scan"); });
    },

    attempt_connection: function(){
        fabrica.machine.attempt_connection({
            ip: this.html.find(".input-ip").val(),
            failure: this.connection_failure
        });
    },

    connection_failure: function(){
        // Display an error message that connecting to this specific IP failed
        var html = fabrica.screens.connection.html;
        html.find(".error-ip").removeClass("hidden");
        html.find(".error-ip kbd").html(html.find(".input-ip").val());
    },

    on_succesful_connection: function(){
        fabrica.navigation.go("/core/initialization");
    },


});

screens.connection = new ConnectionScreen();

