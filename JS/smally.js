;OBJECTS.Smally = function(){

	var smally = this;

	smally.firstStartupDone = false;

	smally.basePath = './';
	smally.loadedScripts = {};
	smally.startupScripts = [];

	smally.head = document.getElementsByTagName('head')[0];

	/**
	 * Initialize the Smally base objects
	 */
	this.init = function(){
		// find the smally base path for dependencies
		var jsFileLocation = $('script[src*="Smally.js"]').attr('src');
		smally.basePath = jsFileLocation.replace('Smally.js', '');
		$(document).ready(function(){
			smally.startup();
		});
	};

	/**
	 * Load dependencies if not yet loaded
	 * @param  Array dependencies An Array of depedencies you want to load
	 * @return OBJECTS.Smally
	 */
	this.loadDependencies = function(dependencies){
		for (var i = 0; i < dependencies.length; i++) {
			var scriptName = dependencies[i];
			if(smally.loadedScripts[scriptName]===undefined){
				smally.addScript(scriptName);
			}
		}
		return smally;
	};

	/**
	 * Set a dependency has loaded
	 * @param string dependency The dependecy you want to mark as loaded
	 */
	this.setLoaded = function(dependency){
		smally.loadedScripts[dependency] = true;
	};

	/**
	 * Add a smally script to the current page
	 * @param string scriptName The name of the script you want to load
	 */
	this.addScript = function(scriptName){
		var tag = document.createElement('script');
		tag.src = smally.basePath+scriptName+'.js';
		tag.type = 'text/javascript';
		smally.head.appendChild(tag);
		smally.setLoaded(scriptName);
	};

	this.addStartup = function(startupFunction){
		smally.startupScripts.push(startupFunction);
		// If we have already done the startup , execute the function directly if added to startupFunction
		if(smally.firstStartupDone===true){
			startupFunction();
		}
	};

	this.startup = function(){
		if(smally.firstStartupDone===false){
			smally.firstStartupDone=true;
		}
		for (var i = 0; i < smally.startupScripts.length; i++) {
			var functionName = smally.startupScripts[i];
			if($.isFunction(functionName)){
				functionName();
			}
		}
	};

	this.init();
};

var Smally = new OBJECTS.Smally();