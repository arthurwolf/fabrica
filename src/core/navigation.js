// Navigation object, used to go to activities, screens and pages, and to keep track of the navigation path

var Navigation = Class({

    // Construction method
    create: function(){
        this.current_activity = 'core';
        this.current_screen = '';
        this.current_page = ''; 
        this.iframe_loaded = false;
        this.history = [];

        // Detect changes in the URL
        var _that = this;
        $(window).bind('hashchange', function(){
            var hash = window.location.hash;
            _that.go_hash(hash);
        });
    }, 

 
    // Go to a specific path
    go: function( path, parameters ){
        // Save this new location to the history 
        this.history.push([path, parameters]);   

        // Break down path
        var path = path.split("/");
        var activity = path[1] || '';
        var screen   = path[2] || ''; 
        var page     = path[3] || '';
        var location_changed = false;
        console.log([activity,screen,page]);

        // TODO : Handle activity, screen and page exits

        // Go to the right activity
        // TODO : Handle non-existing activities
        if( this.current_activity != activity ){
            this.current_activity = activity;
            screens.activity.enter(activity);
            location_changed = true;
            this.iframe_loaded = false;
        }else{
        }

        // Go to the right screen
        // TODO : Handle non-existing screens
        if( this.current_screen != screen || this.current_page != page ){
            // Go to a new screen

            if( this.current_activity == 'core' ){
                this.current_screen = screen;
                if( page == '' ){
                    // No page specified, enter the screen
                    screens[screen].enter(parameters);
                }else{
                    // Page specified, enter that page
                    screens[screen][page].call(screens[screen],parameters);
                }
                location_changed = true;
            }else{
                this.current_screen = screen;
                if( this.iframe_loaded == false ){
                    var _that = this;
                    $("#activity_iframe").on("load", function(){
                        _that.iframe_loaded = true;
                        if( page == '' ){
                            // No page specified, enter the screen
                            window.frames[0].screens[screen].enter(parameters);
                        }else{
                            // Page specified, enter that page
                            window.frames[0].screens[screen][page].call(window.frames[0].screens[screen],parameters);
                        }
                        location_changed = true;
                    });
                }else{
                    if( page == '' ){
                        // No page specified, enter the screen
                        window.frames[0].screens[screen].enter(parameters);
                    }else{
                        // Page specified, enter that page
                        window.frames[0].screens[screen][page].call(window.frames[0].screens[screen],parameters);
                    }
                    location_changed = true;
                }
            }

        }else{
        }

        // TODO : Handle pages
        
        // TODO : Handle parameters
        if( location_changed == true ){
            window.location.hash = "#" + path.join('/');
        }

    },

    // Go back one step
    go_back: function(){
        // Pop this page
        this.history.pop();
        // Pop previous page
        var previous = this.history.pop();
        
        // Go there again
        this.go(previous[0],previous[1]);
    },

    // Go to a specific hash
    go_hash: function(hash){
        var cut = hash.split('#')[1].split('?'); 
        var path = cut[0];
        var parameters = cut[1];
        // TODO : Handle parameters

        // Do not go to a path we are already at
        if( path == this.history[this.history.length-1][0] ){ return; }   

        this.go(path);
    }



}); 

// TODO : If in activity use the parent's machine instead
fabrica.navigation = new Navigation()


