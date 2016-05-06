<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>fabrica</title>

    <!-- Bootstrap -->
    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap callouts -->
    <link href="static/css/bootstrap-callouts.css" rel="stylesheet">
    <!-- Fabrica custom CSS -->
    <link href="static/css/fabrica.css" rel="stylesheet">

  </head>
  <body>
    
    <!-- HTML files for screens -->
    <link href="src/screens/connection.html" rel="html">
    <link href="src/screens/network_scan.html" rel="html">
    <link href="src/screens/initialization.html" rel="html">
    <link href="src/screens/welcome.html" rel="html">
    <link href="src/screens/main.html" rel="html">
    <link href="src/screens/control/control.html" rel="html">
    <link href="src/screens/control/move.html" rel="html">
    <link href="src/screens/configuration/configuration.html" rel="html">
    <link href="src/screens/configuration/raw_configuration.html" rel="html">

    <!-- HTML files for help screens -->
    <link href="src/help/screens/connection.html" rel="html">

    <!-- HTML files for miscalenous definitions -->
    <link href="src/screens/configuration/definitions.html" rel="html">

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="static/js/jquery-2.2.1.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="static/js/bootstrap.min.js"></script>
    <!-- Js.class allows more object-oriented javascript -->
    <script src="src/core/js.class/dist/browser/js.class.min.js"></script>

    <!-- Smoothie Happy ( Smoothie API ) submodule -->
    <script src="static/js/sh/src/smoothie-happy.js"></script>

    <!-- Core Fabrica object -->
    <script src="src/core/fabrica.js"></script>
    <!-- Base class for all screens -->
    <script src="src/core/screen.class.js"></script>
    <!-- Describes a machine, stores information about it, communicates with it -->
    <script src="src/core/machine.js"></script>
    <!-- Parses and stores configuration for a machine -->
    <script src="src/core/configuration.js"></script>

    <!-- Connection screen -->
    <script src="src/screens/connection.js"></script>
    <!-- Network scan screen -->
    <script src="src/screens/network_scan.js"></scrip
    <!-- Initialization screen -->
    <script src="src/screens/initialization.js"></script>
    <!-- Welcome screen -->
    <script src="src/screens/welcome.js"></script>
    <!-- Main screen -->
    <script src="src/screens/main.js"></script>
    <!-- Control screen -->
    <script src="src/screens/control/control.js"></script>
    <!-- Move screen -->
    <script src="src/screens/control/move.js"></script>
    <!-- Configuration screen -->
    <script src="src/screens/configuration/configuration.js"></script>
    <!-- Raw Configuration screen -->
    <script src="src/screens/configuration/raw_configuration.js"></script>


    <script>
        // Manually enter the first screen
        fabrica.screens.connection.enter();
    </script>

  </body>
</html>

