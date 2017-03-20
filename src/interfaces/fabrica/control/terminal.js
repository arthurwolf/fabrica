// Terminal screen : send arbitrary commands and receive responses

var TerminalScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('terminal_screen');

        this.update_terminal_output( fabrica.machine.communication_log , true );
        $(".terminal-output").scrollTop( $(".terminal-output").prop("scrollHeight") );

        // Handle button clicks       
        this.html.find(".btn-terminal-send").off().click(function(){ if($(".terminal-input").val().length > 0){ fabrica.machine.send_command($(".terminal-input").val()); } });
    },

    // listen for gcode being sent so that we can show it
    on_gcode_send: function(gcode){
        this.update_terminal_output( $(".terminal-output").html() + "<b>" + gcode + "</b>", $(".btn-auto-scroll").attr("aria-pressed") );
    },

    // listen for gcode responses so that we can show them
    on_gcode_response: function(response){
        this.update_terminal_output( $(".terminal-output").html() + "<b>" + response + "</b>", $(".btn-auto-scroll").attr("aria-pressed") );
    },

    update_terminal_output: function( terminal_output, scroll_to_bottom ){
        $(".terminal-output").html( terminal_output );
        if(scroll_to_bottom === "true"){ $(".terminal-output").scrollTop( $(".terminal-output").prop("scrollHeight") ); }
    }

});

screens.terminal = new TerminalScreen(); 



