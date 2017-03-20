// Core fabrica object, similar to Smoothie's "kernel", holds all the screens

var Fabrica = Class({

    // Constructor method
    create: function(){
        this.screens = {};
    },

    // Call an event upon all modules that want to hear it
    call_event: function( event_name, parameters ){
        $.each(screens, function(name, screen){
            $.each(screen, function(property_name, property){
                if( property_name == event_name ){
                    property.call(screen, parameters);
                }
            });
        });
    },

    // A screen was entered, remember it is the current screen, and add it to the stack
    entered_screen: function( screen ){
        // Remember the current screen
        this.current_screen = screen;
    },
   
});

// Instantiate a single, global instance
var fabrica = new Fabrica();



