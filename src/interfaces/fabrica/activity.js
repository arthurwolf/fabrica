// Activity screen, where sub-activities are displayed

var ActivityScreen = Screen.extend({

    enter: function(target_activity){
        // Display this screen
        this.display('activity_screen');

        console.log("#1 : entering activity " + target_activity + " from " + activity );
        $("#activity_iframe").attr("src", "activities/" + target_activity + ".html");
    }

});

screens.activity = new ActivityScreen();


