var querystring = require("querystring");
for(var i in querystring){
	exports[i] = querystring[i];
}
var type = Function.prototype.call.bind(Object.prototype.toString);

// Parse the name/value pairs of the query string into a flattened array
// Automatically munge the parameters
exports.parseToArray = function(arr, qs){
	var parsed = exports.parse(qs);
	for(var i in parsed){
		exports.addToArray(arr, i, parsed[i]);
	}
};

// Add munged values with name/value pairs to the flattened array
exports.addToArray = function(arr, name, value){
	if(value === undefined || value === null){
		value = "";
	}
	
	switch(type(value)){
		case "[object String]":
		case "[object Number]":
		case "[object Boolean]":
			arr.push(name, value + "");
			break;
		case "[object Array]":
			value.forEach(function(value){
				exports.addToArray(arr, name + "[]", value);
			});
			break;
		case "[object Object]":
			for(var k in value){
				exports.addToArray(arr, name + "[" + k + "]", value[k]);
			}
	};
};
