// Home screen : allows homing the machine's axes independently or all at once

var HomeScreen = Screen.extend({
    enter: function(){
        this.buttons = [
            {"axis": "x", "title": "X"},
            {"axis": "y", "title": "Y"},
            {"axis": "z", "title": "Z"},
            {"axis": "all", "title": "All"}
        ];

        // Display this screen
        this.display('home_screen');

        // Handle button clicks
        var _that = this;
        this.buttons.forEach(function(button) {
            _that.html.find(".btn-home-" + button.axis).off().click(function(e){
                e.preventDefault();
                fabrica.machine.home( button.title );
            });
        });
    }

});


screens.home = new HomeScreen();


