({define:typeof define!="undefined"?define:function(factory){factory(require,exports)}}).
define(function(req,exports){
if(typeof console !== "undefined"){
	exports.print = function(){
		console.log.apply(console, arguments);
	}
}
if(typeof process !== "undefined"){
	exports.args = process.argv;
	exports.env = process.env;	
	exports.print = console.log;
	exports.dir = console.dir;
}
else if(typeof navigator === "undefined"){
	try{
		exports.args = req("" + "system").args;
		exports.env = req("" + "system").env;
	}catch(e){
		// in raw rhino, we don't even have system
	}
	exports.print = print;
}
});