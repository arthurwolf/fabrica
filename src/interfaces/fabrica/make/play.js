// Play screen : lists gcode files on sd that are able to be played. display progress and info of file playing

var PlayScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('play_screen');

        // Get the file list
        fabrica.machine.send_command("M20");

        // Handle button clicks
        var _that = this;
        this.html.find(".btn-abort").off().click(function(e){
            e.preventDefault();
            fabrica.machine.send_command("abort");
        });
        this.html.find(".btn-suspend-resume").off().click(function(e){
            e.preventDefault();
            fabrica.machine.send_command( _that.html.find(".btn-suspend-resume").text().toLowerCase() );
        });

        // Hide the file menu and the playing view until we know if we are playing a file or not
        this.html.find(".playing-file").hide();
        this.html.find(".file-manager").hide();
    },

    // listen for gcode files
    on_gcode_response: function( response ){
        if(response.includes("Begin file list")){ // Update the file list
            // Empty the file list
            this.html.find(".file-list").empty();

            var _that = this;
            // Populate the file list
            response.split("\n").forEach(function( file ){
                _that.html.find(".file-status").text("No gcode files found on your internal sd card");

                if(file.includes(".gco")){
                    // We found a playable file, so hide the no gcode files message
                    _that.html.find(".file-status").hide();
                    
                    var filename = file.replace(".", "-").replace(/(\r\n|\n|\r)/gm,"");
                    file = file.replace(/(\r\n|\n|\r)/gm,"");
                    _that.html.find(".file-list").append( '<a class="btn btn-default col-xs-12 btn-lg btn-'+filename+'" href="#">'+file+'</a>' );
                    _that.html.find(".btn-"+filename).off().click(function(e){
                        e.preventDefault();
                        _that.html.find(".file-options-modal .modal-body").html("What do you want to do with <b>"+file+"</b>?");
                        _that.html.find(".file-options-modal").modal("show");

                        _that.html.find(".btn-delete-file").off().click(function(e){
                            e.preventDefault();
                            if(confirm("Are you sure you want to delete " + file + "?")){
                                // Delete the file and refresh the file list
                                fabrica.machine.send_command("M30 " + file);
                                fabrica.machine.send_command("M20");

                                // Close the modal
                                _that.html.find(".file-options-modal").modal("hide");
                            }
                        });

                        _that.html.find(".btn-play-file").off().click(function(e){
                            e.preventDefault();
                            // Play the file
                            fabrica.machine.send_command("M32 " + file);

                            // Close the modal
                            _that.html.find(".file-options-modal").modal("hide");
                        });
                    });    
                }
            });

        }
    },

    on_value_update: function( value ){
        if(this.html){
            if(value.progress.paused){
                // Paused

                // Let the user know that the machine is suspended and give them a button to resume 
                this.html.find(".btn-suspend-resume").text("Resume");
            }else if(value.progress.playing){
                // Example: file: /sd/test.gcode, 6 % complete, elapsed time: 3 s 

                // The machine is playing a file, so we should display information about that job and hide the file manager
                this.html.find(".screen-status").hide();
                this.html.find(".file-manager").hide();
                this.html.find(".playing-file").show();

                this.html.find(".btn-suspend-resume").text("Suspend");

                this.html.find(".file-title").text( value.progress.filename );
                this.html.find(".file-progress").text( value.progress.percent_complete + "%" );
                this.html.find(".file-progress-bar").css("width", value.progress.percent_complete);
                this.html.find(".file-time-elapsed").text("Elapsed: " + new Date(value.progress.elapsed_time * 1000).toISOString().substr(11, 8) );
            }else {
                // Not paused and not playing

                // If the file manager isn't visible and we are on this screen, ask for the files 
                if(!this.html.find(".file-manager").is(":visible") && fabrica.current_screen.name === "play_screen"){
                    fabrica.machine.send_command("M20");
                }
                this.html.find(".screen-status").hide();
                this.html.find(".playing-file").hide();
                this.html.find(".file-manager").show();
            }
        }
    }
});

screens.play = new PlayScreen(); 



