// Network scan screen : allows the user to start a search for active boards on the local network

var NetworkScanScreen = Screen.extend({
    enter: function(){
        this.machines = [];
        this.scanning = false;
        
        // Display this screen
        this.display('network_scan_screen');

        // Set up button 
        this.html.find(".btn-scan").off().click(function(){ fabrica.screens.network_scan.start_scanning(); });
    },

    start_scanning: function(){
        // Start scanning the network for boards
        var _that = this;
        var expression = this.html.find(".input-expression").val();

        // Start the scan 
        // TODO : Get the button to do something, can't now because it doesn't return the IP address along with the board
        this.scanning = true; 
        this.refresh();
        sh.scanner.scan(expression,{
            onprogress: function(ip, version){
                _that.html.find(".currently-scanning").text(ip);
            },
            onboard: function(board){
                _that.machines.push(board);
                _that.refresh();
            }
        });
    }

});

fabrica.add_screen( 'network_scan', new NetworkScanScreen() );

