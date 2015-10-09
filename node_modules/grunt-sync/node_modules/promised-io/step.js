'use strict';

(function(define){
define(function(require,exports){

// Vladimir Dronnikov

// inspired by creationix's Step

var when = require('./promise').when;

// execute sequentially functions taken from steps[]
// each successive is fed with the result of prior
// each function can return an immediate value, a promise, or just throw
// in the latter case the next function will receive Error object
// return "undefined" to full stop.
//
// "context" is available to each steps as "this"
//
exports.Step = function(context, steps) {
	var next;
	next = function() {
		var fn, result;
		if (!steps.length) {
			return arguments[0];
		}
		fn = steps.shift();
		try {
			result = fn.apply(context, arguments);
			if (result !== void 0) {
				result = when(result, next, next);
			}
		} catch (err) {
			next(err);
		}
		return result;
	};
	return next();
};

});
})(typeof define!="undefined"?define:function(factory){factory(require,exports)});
