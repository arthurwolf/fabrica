// Upload screen : upload files to sd

var UploadScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('upload_screen');

        // Initially disable the upload button
        this.html.find(".btn-upload-file").prop("disabled", true);

        // Show the appropriate info depending on if we're uploading or not
        if(fabrica.machine.uploading){
            this.html.find(".upload-options").hide();
            this.html.find(".btn-upload-another-file").hide();
            this.html.find(".upload-progress").show();
        }else {
            this.html.find(".upload-progress").hide();
            this.html.find(".upload-options").show();
        }


        var _that = this;
        document.getElementById("file-uploader").onchange = function() {
            var file_input = document.getElementById("file-uploader");

            // Allow the user to change the filename
            _that.html.find(".file-name-input").val( file_input.files.length ? file_input.files[0].name : "" );

            // Enable the upload button
            _that.html.find(".btn-upload-file").prop("disabled", false);
        }

        // Setup button clicks

        this.html.find(".btn-upload-file").off().click(function(){

            // Make sure the user entered a valid filename
            if(_that.html.find(".file-name-input").val().match(/ /g)){ bootbox.alert("Remove the spaces from the file name."); return; }

            // Hide file upload options 
            _that.html.find(".upload-options").hide();

            // Show the upload progress
            _that.html.find(".upload-progress").show();

            // Hide the upload another file button
            _that.html.find(".btn-upload-another-file").hide();

            _that.html.find(".upload-status").text("Reading file...");

            var file = document.getElementById("file-uploader").files[0];
            if (file) {
                var reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function(evt) {
                    _that.html.find(".upload-status").text("Uploading file...");
                    _that.filename = _that.html.find(".file-name-input").val();
                    fabrica.machine.upload_file(file, _that.filename);
                };
                reader.onerror = function(evt) {
                    _that.html.find(".upload-status").text("Error reading file");
                };
            }
        });

        this.html.find(".btn-upload-another-file").off().click(function(){
            // Reset the screen

            // Clear the filename input
            _that.html.find(".file-name-input").val("");
            _that.html.find(".upload-status").html("");

            // Disable upload button
            _that.html.find(".btn-upload-file").prop("disabled", true);

            // Remove any callouts
            _that.html.find(".bs-callout").remove();

            // Hide upload progress, show upload options
            _that.html.find(".upload-progress").hide();
            _that.html.find(".upload-options").show();
        });
    },

    on_file_upload_update: function(progress){
        if(this.html){
            this.html.find(".upload-status").html('<h3 style="text-align: center; margin-top: 0px;">Uploading ' + this.filename + '</h3><div class="progress" style="margin-bottom: 0px;"><div class="progress-bar" role="progressbar" aria-valuenow="' + progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + progress + '%;">' + progress + '%</div></div>');
        }
    },

    // Tell the user their file failed to upload
    on_file_upload_failure: function(){
        if(this.html){
            this.html.find(".callout").append('<div class="bs-callout bs-callout-danger {{this.designator}}-warning"><h4>Upload Error</h4>Your file failed to upload. Try again.</div>');
            
            // Show the upload another file button
            this.html.find(".btn-upload-another-file").show();
        }
    },
    
    // Tell the user their file uploaded successfully
    on_file_upload_done: function(){
        if(this.html){
            this.html.find(".callout").append('<div class="bs-callout bs-callout-success {{this.designator}}-warning"><h4>File Uploaded Successfully</h4>Your file should now be accessible from the play screen.</div>');
            
            // Show the upload another file button
            this.html.find(".btn-upload-another-file").show();
        }
    }

});

screens.upload = new UploadScreen(); 



