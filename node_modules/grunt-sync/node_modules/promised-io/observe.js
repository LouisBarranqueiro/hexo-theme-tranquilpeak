/**
 * AOP style event handling, for listening for method calls. Very similar to dojo.connect 

/* Add a listener for the execution of the given function slot on the given object.
 *
 * When object[eventName]() is executed the handler is called.
 * The optional before parameter can be used to indicate if the listener
 * should be fired before or after the  default action (default is after)
 */
exports.observe = function(object, eventName, listener, before) {
    if(!listener){
        throw new Error("No listener provided");
    }
	if(typeof object.observe === "function"){
		// CommonJS observable object
		return object.observe(eventName, listener);
	}
	var listenerProxy = function(that, args){//make sure we have unique function so we can remove it
        try{
			listener.apply(that, args);
    	}catch(e){
    		require("./process").print(e);
    	}
	};
	if(typeof object.addListener === "function"){
		// NodeJS EventEmitter
		object.addListener(eventName, listener);
		return {
			observe: function(listener){
				return exports.observe(object, eventName, listener);
			},
			emit: function(event){
				object.emit(eventName, event);
			},
			dismiss: function(){
				object.removeListener(eventName, listener);
			}
		};
	}
    var afters, befores,
        main = object[eventName];
    if(typeof main != "function"){
        main = function(){};
    }
	if(main._afters){
        afters = main._afters;
        befores = main._befores;
    }
    else{
        befores = [];
        afters = [];
        var newFunc = object[eventName] = function(){
            for(var i = 0; i < befores.length; i++){
            	befores[i](this, arguments);
            }
            try{
                return main.apply(this, arguments);
            }
            finally{
                for(var i = 0; i < afters.length; i++){
            		afters[i](this, arguments);
                }
            }
        };
        newFunc._befores = befores;
        newFunc._afters = afters;
    }
    if(before){
    	befores.push(listenerProxy);
    }
    else{
    	afters.push(listenerProxy);
    }
    return createSignal();
    function createSignal(){
    	var observers;
    	return {
	    	observe: function(listener){
	    		afters.push(listener);
	    	},
	    	emit: function(){
	    		main.apply(object, arguments);
	    	},
	    	dismiss: function(){
	    		if(before){
	    			befores.splice(befores.indexOf(listenerProxy), 1);
	    		}
	    		else{
	    			afters.splice(afters.indexOf(listenerProxy), 1);
	    		}
	    	}
    	}; 
    };
};