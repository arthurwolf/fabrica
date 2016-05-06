// Raw configuration screen : allows direct editing of configuration options

var RawConfigurationScreen = Screen.extend({

    enter: function(){
        // Display this screen
        this.display('raw_configuration_screen');

        // Set up sections
        this.sections = [
            { name: "Robot",                selector: "## Robot",        description: "Basic motion" },
            { name: "System",               selector: "## System",       description: "System settings" },
            { name: "Extruder",             selector: "## Extruder",     description: "Extruder motors" }, 
            { name: "Laser",                selector: "## Laser",        description: "Laser power control"},
            { name: "Temperature control",  selector: "## Temperature",  description: "Temperature regulation, typically for hotends and heated beds"},
            { name: "Switch",               selector: "## Switch",       description: "Map inputs/outputs and commands"},
            { name: "Temperature switch",   selector: "## Temperaturesw",description: "Toggle outputs at given temperatures"},
            { name: "Endstops",             selector: "## Endstops",     description: "Homing, endstops and limit switches"},
            { name: "Z-probe",              selector: "## Z-probe",      description: "Probing, calibration and levelling"},
            { name: "Panel",                selector: "## Panel",        description: "Panels and displays"},
            { name: "Custom menus",         selector: "## Custom menus", description: "Custom menu entries"},
            { name: "Network",              selector: "## Network",      description: "Ethernet and web interface"}
        ];

        // Display sections in the array
        this.html.find(".section_list .section_line").remove();
        var line_template = this.html.find(".section_line");
        var _that = this;
        $.each( this.sections, function( index, line ){
            var new_line = line_template.clone();
            new_line.removeClass("hidden");
            new_line.find(".section-button").text( line.name ).click(function(){
                fabrica.screens.raw_configuration_section.enter( line );
            });
            new_line.find(".section-description").text( line.description );
            _that.html.find(".section_list").append(new_line);
        });   

    },

});

fabrica.add_screen('raw_configuration', new RawConfigurationScreen()); 

// Raw configuration section screen : select lines to edit in a specific section of the screen

var RawConfigurationSectionScreen = Screen.extend({

    enter: function( section ){
        // Remember section in case we come back
        if( section !== undefined ){
            this.current_section = section;
        }

        // Display this screen
        this.display('raw_configuration_section_screen');

        // Set up screen
        this.html.find(".section_name").text( this.current_section.name );

        // Get configuration file section
        this.lines = fabrica.machine.config.get_section( this.current_section.selector );

        // Display list of options
        this.html.find(".option_list .option_line").remove();
        var line_template = this.html.find(".option_line");
        var _that = this;
        $.each( this.lines, function( index, line ){
            var parsed = _that.parse_line(line);
            var new_line = line_template.clone();
            new_line.removeClass("hidden");
            // TODO : Do the color properly with css files, I wasn't able to
            if( parsed.is_split ){
                new_line.find(".option_name").text( parsed.option ).css('color', '#110077');
                new_line.find(".option_value").text( parsed.value ).css('color', '#770011');
                new_line.find(".option_comment").text( parsed.comment ).css('color', '#888');
                if( parsed.option.substr(0,1) == '#' ){
                    new_line.find(".option_name").css('color', '#888');
                    new_line.find(".option_value").css('color', '#888');
                }
                if( parsed.value != '' ){
                    new_line.find("a").click(function(){
                        fabrica.screens.raw_configuration_option.enter(parsed);
                    });
                }else{
                    new_line.find(".option_button").remove();
                    new_line.find(".option_comment").attr('colspan',2);
                }
            }else{
                new_line.find(".option_name").remove();
                new_line.find(".option_value").remove();
                new_line.find(".option_button").remove();
                new_line.find(".option_comment").text( parsed.comment ).css('color', '#888');
                new_line.find(".option_comment").attr('colspan',4);
            }
            _that.html.find(".option_list").append(new_line);
        });   

    },

    parse_line: function( line ){
        var splitted = line.split(/\s+/);
        var parsed = {option: '', value:'', comment:'', is_split: true};
        if( line.substr(0,2) == '# ' ){ parsed.comment = line; parsed.is_split = false; return parsed; }
        if( line.substr(0,2) == '##' ){ parsed.comment = line; parsed.is_split = false; return parsed; }
        if( line.substr(0,2) == '  ' ){ parsed.comment = line; parsed.is_split = true;  return parsed; }
        if( line.length == 0 ){ parsed.is_split = false; return parsed; }
        if( parsed[0] == '' ){ parsed.comment = line; return parsed; }
        var parsed = {
            option: splitted.shift(), 
            value: splitted.shift(), 
            comment: splitted.join(" "), 
            is_split: true
        };
        return parsed;
    }

});
fabrica.add_screen('raw_configuration_section', new RawConfigurationSectionScreen()); 

// Raw configuration option screen : edit a specific option's value

var RawConfigurationOptionScreen = Screen.extend({

    enter: function( line ){
        // Display this screen
        this.display('raw_configuration_option_screen');

        // Set up screen
        this.html.find(".option_name").text( line.option );
        this.html.find(".option_current_value").text( line.value );
    
        // Get option definitions
        var definitions = $("#option_definitions");       

        // Get option within definitions
        var definition = {};
        definitions.find("div.option").each(function(index){
            if( $(this).attr("name") == line.option ){ definition = $(this); }
        });
        // TODO : What to do if no definition of a config option was found ( error message )

        // Display found information
        this.html.find(".panel-title").text( definition.attr('title') );
        this.html.find(".panel-body" ).empty().append( definition.find("div.description").clone() );

        // Display the right edition box
        var type = definition.attr('type');
        var unit = definition.attr('unit');
        this.html.find(".edit_box").addClass('hidden');
        this.html.find(".edit_" + type).removeClass('hidden'); 
        this.html.find(".option-units").text(unit);

        // TODO : Allow to comment/uncomment line
        // TODO : Raw edit
        // TODO : Assisted edit

    }

});
fabrica.add_screen('raw_configuration_option', new RawConfigurationOptionScreen()); 

