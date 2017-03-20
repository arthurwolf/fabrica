# fabrica
Simple to use featurefull web interface for digital fabrication machines.

For a project decription/specification, see https://docs.google.com/document/d/1xuLbjVvCkizSkmPvfprBgnlKV7jBn7wQnLto_G5Q-Dw/edit?usp=sharing

Looking for contributors/help ! Contact us !

# current TODO

* Create screens only as needed, destroy screens when no longer needed
* Access screens by path, not by function call
* Add coms abstraction that allows talking to an octoprint server or that coms thing laserweb uses
* Allow URLs to be interpreted, also go to target URL instead of main screen at boot time.

# setting up

Please after cloning the repository, do 

`git submodule init`  
`git submodule update`  
so the submodules are initialized ( duh ! )


## using gulp

You need to have Node.js (Node) installed onto your computer before you can install Gulp.  
If you do not have Node installed already, you can get it by [downloading the package installer from Node's website.](https://nodejs.org/)   

Install `gulp` using:  
`npm install --global gulp`  
this command will install gulp system wide. You should now be able to hit gulp in your command line.

Then use:  
`npm install`  
this command will read all the dependencies that were defined in the `package.json` file and automatically installs them for you.

To build use `gulp` (default task) or `gulp demo` for version with mocked data
