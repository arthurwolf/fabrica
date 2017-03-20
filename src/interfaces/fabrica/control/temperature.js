// Temperature screen : set and read temperature

var TemperatureScreen = Screen.extend({
    enter: function(){
        this.tabs = [];

        // Supply template information using the machine's config
        if(fabrica.machine.config.temperature_control){
            var _that = this;
            $.each(fabrica.machine.config.temperature_control, function( name ){
                var temperature_control = fabrica.machine.config.temperature_control[name];

                if(temperature_control.enable){
                    var tab_content = {};

                    tab_content.name = name;
                    tab_content.designator = temperature_control.designator;
                    tab_content.max_temp = temperature_control.max_temp || 300;
                    tab_content.m_code = temperature_control.set_m_code;
                    _that.tabs.push(tab_content);
                }
            });
        }

        // Display this screen
        this.display('temperature_screen');

        var _that = this;
        $.each(this.tabs, function(tab_content){
            var name = _that.tabs[tab_content].name;

            // Setup slider
            _that.html.find("."+_that.tabs[tab_content].name+"-slider").slider({
                tooltip: "always",
                formatter: function(value){
                    return value;
                }
            });

            // Initially hide the warning
            _that.html.find("."+_that.tabs[tab_content].designator+"-warning").hide();

            // Handle button clicks
            _that.html.find(".btn-"+name+"-set-temperature").off().click(function(e){
                e.preventDefault();
                fabrica.machine.send_command("M" + _that.tabs[tab_content].m_code + " S" + _that.html.find("#" + name + " .tooltip-inner").text());
            });
            _that.html.find(".btn-"+name+"-heater-off").off().click(function(e){
                e.preventDefault();
                fabrica.machine.send_command("M" + _that.tabs[tab_content].m_code + " S0");
            });
        });

        // Apply styling to sliders
        _that.html.find(".slider").css({
            "width": "100%",
            "margin-top": "25px",
            "margin-bottom": "20px"
        });

        // Show the first tab
        this.html.find("." + this.tabs[0].name + "-tab").tab("show");
    },

    on_value_update: function( value ){
        var _that = this;
        $.each(value.temperature, function( designator ){
            // Make sure we are looking at valid designators and not the temperature string
            if(value.temperature[designator].temperature && _that.html){
                _that.html.find("."+designator+"-readout").html(value.temperature[designator].temperature+'°C / ' +value.temperature[designator].target+ (value.temperature[designator].target > 0 ? '°C <span class="label label-danger">Heating</span>': '°C') );
                
                // Hide the readout and show a warning if the temperature is not valid
                _that.html.find("."+designator+"-warning").toggle(value.temperature[designator].temperature.includes("inf"));
                _that.html.find("."+designator+"-controls").toggle(!value.temperature[designator].temperature.includes("inf"));
            }
        });
    }

});

screens.temperature = new TemperatureScreen(); 



