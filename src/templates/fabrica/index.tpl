<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>fabrica.</title>

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">

    <!-- Bootstrap -->
    <link href="static/css/bootstrap.min.css" rel="stylesheet" inline>
    <!-- Bootstrap callouts -->
    <link href="static/css/bootstrap-callouts.css" rel="stylesheet" inline>
    <!-- Fabrica custom CSS -->
    <link href="static/css/fabrica.css" rel="stylesheet" inline>
    <!-- Bootstrap touchspin -->
    <link href="static/css/jquery.bootstrap-touchspin.css" rel="stylesheet" inline>
    <!-- Bootstrap switch -->
    <link href="static/css/bootstrap-switch.min.css" rel="stylesheet" inline>
    <!-- Bootstrap slider -->
    <link href="static/css/bootstrap-slider.min.css" rel="stylesheet" inline>

    <script>
        // Global track of which activity we are in
        var activity = "core";
        var screens = {};
    </script>

  </head>
  <body>

    <div id="screen"> </div>
    
    <!-- html files for screens -->
    @@include('src/interfaces/fabrica/core/connection.html')
    @@include('src/interfaces/fabrica/core/network_scan.html')
    @@include('src/interfaces/fabrica/core/initialization.html')
    @@include('src/interfaces/fabrica/core/welcome.html')
    @@include('src/interfaces/fabrica/main.html')
    @@include('src/interfaces/fabrica/activity.html')

    <!-- html files for help screens -->
    <!-- @@include('src/help/screens/connection.html') -->

    <!-- html files for miscalenous definitions -->
    @@include('src/interfaces/fabrica/configuration/definitions.html')
    <!-- html files for pin definitions -->
    @@include('src/interfaces/fabrica/configuration/pin_definitions.html')

    <!-- jquery (necessary for bootstrap's javascript plugins) -->
    <script src="static/js/jquery-2.2.1.min.js" inline></script>
    <!-- include all compiled plugins (below), or include individual files as needed -->
    <script src="static/js/bootstrap.min.js" inline></script>
     <!-- Bootstrap touchspin-->
    <script src="static/js/jquery.bootstrap-touchspin.js" inline></script>
     <!-- Bootstrap switch-->
    <script src="static/js/bootstrap-switch.min.js" inline></script>
    <!-- Bootstrap slider switch-->
    <script src="static/js/bootstrap-slider.min.js" inline></script>
    <!-- Bootbox-->
    <script src="static/js/bootbox.min.js" inline></script>
    <!-- Js.class allows more object-oriented javascript -->
    <script src="src/core/js.class/dist/browser/js.class.min.js" inline></script>
    <!-- HandleBar JS Template system -->
    <script src="static/js/handlebar.js" inline></script>

    <!-- Smoothie Happy ( Smoothie API ) submodule -->
    <script src="static/js/sh/src/smoothie-happy.js" inline></script>

    <!-- Core Fabrica object -->
    <script src="src/core/fabrica.js" inline></script>
    <!-- Base class for all screens -->
    <script src="src/core/screen.class.js" inline></script>
    <!-- Describes a machine, stores information about it, communicates with it -->
    <script src="src/core/machine.js" inline></script>
    <!-- Parses and stores configuration for a machine -->
    <script src="src/core/configuration.js" inline></script>
    <!-- Stores and retrieves local configuration -->
    <script src="src/core/local_config.js" inline></script>
    <!-- Updates machine position, temperature, etc -->
    <script src="src/core/updater.js" inline></script>
    <!-- Go to activities, screens and pages -->
    <script src="src/core/navigation.js" inline></script>

    <!-- Connection screen -->
    <script src="src/interfaces/fabrica/core/connection.js" inline></script>
    <!-- Network scan screen -->
    <script src="src/interfaces/fabrica/core/network_scan.js" inline></script>
    <!-- Initialization screen -->
    <script src="src/interfaces/fabrica/core/initialization.js" inline></script>
    <!-- Welcome screen -->
    <script src="src/interfaces/fabrica/core/welcome.js" inline></script>
    <!-- Main screen -->
    <script src="src/interfaces/fabrica/main.js" inline></script>
    <!-- Activity  screen -->
    <script src="src/interfaces/fabrica/activity.js" inline></script>
    
    <!--removeIf(production)-->
    <!-- Mock module -->
    <script src="static/js/jquery.mockjax.min.js" inline></script>
    <script src="src/core/mock.js" inline></script>
    <!--endRemoveIf(production)-->

    <script>
        // Manually enter the first screen
        fabrica.navigation.go("/core/connection");
    </script>

  </body>
</html>

