/*
 * Provides time-based promise-returning delay and schedule functions for Rhino
 */
var defer = require("../../promise").defer,
	LazyArray = require("../../lazy-array").LazyArray;
// returns a promise that is fulfilled after the given number of milliseconds
exports.delay = function(ms){
	var deferred = defer();
	_scheduleTimeout(deferred.resolve, ms, false);
	return deferred.promise;
};
// returns a lazy array that iterates one every given number of milliseconds
exports.schedule = function(ms){
	var callbacks = [];
	_scheduleTimeout(function(){
		callbacks.forEach(function(callback){
			if(callback()){
				callbacks.splice(callbacks.indexOf(callback), 1);
			}
		});
	}, ms, true);
	return LazyArray({
		some: function(callback){
			callbacks.push(callback);
		}
	});
};

var nextId = 1,
    timeouts = {},
    timer, 
    queue;

var _scheduleTimeout = function(callback, delay, repeat)
{
    if (typeof callback == "function")
        var func = callback;
    else if (typeof callback == "string")
        var func = new Function(callback);
    else
        return;

    var timeout = {
    };
    var id = nextId++;
    timeouts[id] = timeout;

    timer = timer || new java.util.Timer("JavaScript timer thread", true);
    queue = queue || require("event-loop");
    var lastFinished = true;
    var task = timeout.task = new java.util.TimerTask({
        run: function(){
        	if(lastFinished){
	        	lastFinished = false;
	            queue.enqueue(function(){
	                if(!timeout.cancelled){ // check to make sure it wasn't enqueued and then later cancelled
		            	try{
		                    func();
		            	}finally{
		                	lastFinished = true;
		            	}
	                }
	            });
        	}
        }
    });
    delay = Math.floor(delay);
    
    if(repeat){
        timer.schedule(task, delay, delay);
    }
    else{
        timer.schedule(task, delay);
    }
    
    return id;
}


