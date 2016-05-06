// Screen base class, which all screen objects inherit

var Screen = Class({

    display: function(name){
        // Save screen html and name
        this.html = $("#" + name);
        this.name = name;

        // Warn the core this screen was entered
        fabrica.entered_screen(this);

        // Display this screen 
        $("screen").addClass('hidden');
        this.html.removeClass('hidden');

        // Setup help for this screen
        this.setup_help();

        // Setup back button for this screen
        this.setup_back();
    },

    setup_help: function(){
        // Only register if the help modal exists
        this.help_modal = $("#" + this.name + "_help");
        if( this.help_modal.length == 0 ){
            this.html.find(".btn-help").hide();
            return; 
        }

        // Only register for a button if there is a button
        var _that = this;
        this.html.find(".btn-help").off().click(function(button){
            _that.enter_help();
        });
    },

    setup_back: function(){
        // Add back button handler
        var _that = this;
        this.html.find(".btn-back").off().click(function(){ 
            _that.go_back(); 
        });
    },

    go_back: function(){
        // Remove current screen from the stack
        fabrica.screen_stack.pop();

        // Remove the previous screen, and enter it
        fabrica.screen_stack.pop().enter();
    },

    enter_help: function(){
        // Show the modal for the help screen
        this.help_modal.modal();
    }


}); 




