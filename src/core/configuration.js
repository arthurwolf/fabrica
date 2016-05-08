// Parses and stores configuration for a given machine

var Configuration = Class({

    // Constructor method
    create: function(){
    },

    // Parse configuration file
    parse: function(file){
        // Remember the config's content
        this.file = file;

        // Parse and save entries
        this.entries = {};
        this.root = {};

        file.split("\n").forEach(function(line){
            // For each entry
            if( line.match(/^(\s*)\#/g) || line == '' || line.match(/^[\s\n]*$/) ){ return; }

            // Separate name from value
            var match = line.match(/^([\w_\-\.]*)\s+(.*?)(?!\S)/);

            var name = match[1];
            var value = match[2];
           
            // Save raw entry
            this.entries[name] = value; 

            // Save extracted entries        
            var key_path = name.split('.'); 
            if( key_path.length == 1 ){
                this.root[key_path[0]] = value;
            }else if(key_path.length == 2 ){
                if( this[key_path[0]] == undefined ){ this[key_path[0]] = {}; } 
                this[key_path[0]][key_path[1]] = value;
            }else if(key_path.length == 3 ){
                if( this[key_path[0]] == undefined ){ this[key_path[0]] = {}; } 
                if( this[key_path[0]][key_path[1]] == undefined ){ this[key_path[0]][key_path[1]] = {}; }
                this[key_path[0]][key_path[1]][key_path[2]] = value;
            } 

        }, this);

    },

    // Extract a configuration file section
    get_section: function( selector ){
        var lines_found = [];
        var in_section = false;
        this.file.split("\n").forEach(function(line){
            if( in_section ){
                if( line.substr(0, 2) == "##" ){ in_section = false; return; }
                lines_found.push( line ); 
            }else{
                if( line.substr(0,selector.length) == selector ){ 
                    in_section = true; 
                    lines_found.push( line ); 
                }
            }
        });
        return(lines_found);
    }

});

fabrica.machine.config = new Configuration();


