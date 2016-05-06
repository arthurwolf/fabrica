// Core fabrica object, similar to Smoothie's "kernel", holds all the screens

var Fabrica = Class({

    // Constructor method
    create: function(){
        this.screens = {};
        this.screen_stack = [];
    },

    // Add a new screen to the list
    add_screen: function( name, screen ){
        this.screens[name] = screen;
        screen.fabrica = this;
    },

    // Call an even upon all modules that want to hear it
    call_event: function( event_name ){
        $.each(this.screens, function(name, screen){
            $.each(screen, function(property_name, property){
                if( property_name == event_name ){
                    property.call(screen);
                }
            });
        });
    },

    // A screen was entered, remember it is the current screen, and add it to the stack
    entered_screen: function( screen ){
        // Remember the current screen
        this.current_screen = screen;

        // Push the current screen to the stack
        this.screen_stack.push( screen );
    } 

});

// Instantiate a single, global instance
var fabrica = new Fabrica();



