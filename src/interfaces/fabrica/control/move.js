// Move screen : allows moving the machine to a given position

var MoveScreen = Screen.extend({
    enter: function(){

        this.buttons = [
            {"axis": "X"},
            {"axis": "Y"},
            {"axis": "Z"}
        ];

        // Display this screen
        this.display('move_screen');

        // Handle button clicks
        var _that = this;
        this.buttons.forEach(function(button) {
            ['neg', 'pos'].forEach(function (direction) {
                _that.html.find(".btn-jog-" + button.axis + "-" + direction).off().click(function(e){
                    e.preventDefault();
                    fabrica.machine.jog(button.axis, (direction === "neg" ? -1 : 1), _that.html.find(".jog-distance").val(), (button.axis === "Z" ? _that.html.find(".jog-z-feedrate").val() : _that.html.find(".jog-xy-feedrate").val()));
                });
            });
        });

        this.html.find(".btn-motors-off").off().click(function(e){
            e.preventDefault();
            fabrica.machine.send_command("M18");
        });
    },

    // Listen for updated positions
    on_value_update: function(value){
        console.log(value);
        // Update positions if there is html to modify
        if(this.html){
            this.html.find(".X-position").val(value.positions.X);
            this.html.find(".Y-position").val(value.positions.Y);
            this.html.find(".Z-position").val(value.positions.Z);
        }
    }
});

screens.move = new MoveScreen(); 



