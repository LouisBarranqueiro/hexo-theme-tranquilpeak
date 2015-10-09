({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory.apply(this, deps.map(function(id){return require(id)}))}}).
define(["./promise"], function(promise){
try{
	var when = promise.when;
}catch(e){
	console.log("couldn't load promise library", e.stack);
	when = function(value, callback){
		return callback(value);
	}
}
function LazyArray(hasSomeAndLength){
	return new SomeWrapper(hasSomeAndLength);
};
var exports = LazyArray;
exports.LazyArray = LazyArray;  
exports.first = function(array){
	return exports.get(array, 0);
};
exports.last = function(array){
	return exports.get(array, array.length-1);
};
exports.get = function(array, index){
	var result, i = 0;
	return when(array.some(function(item){
		if(i == index){
			result = item;
			return true;
		}
		i++;
	}),
	function(){
		return result;
	});
};

var testProto = {};
var testProto2 = {a:"b"};
testProto.__proto__ = testProto2; 
var mutableProto = testProto.a == "b";
function SomeWrapper(hasSomeAndLength){
	if(mutableProto){
		hasSomeAndLength.source = hasSomeAndLength;
		hasSomeAndLength.__proto__ = SomeWrapper.prototype;
		return hasSomeAndLength;
	}
	this.source = hasSomeAndLength;
	if(hasSomeAndLength.length){
		this.length = hasSomeAndLength.length;
	}
	this.totalCount = hasSomeAndLength.totalCount;
}
exports.LazyArray.prototype = SomeWrapper.prototype = [];
SomeWrapper.prototype.some = function(callback){
	this.source.some(callback);
}
SomeWrapper.prototype.filter = function(fn, thisObj){
	var results = [];
	return when(this.source.some(function(item){
		if(fn.call(thisObj, item)){
			results.push(item);
		}
	}), function(){
		return results;
	});
};

SomeWrapper.prototype.every = function(fn, thisObj){
	return when(this.source.some(function(item){
		if(!fn.call(thisObj, item)){
			return true;
		}
	}), function(result){return !result;});
};
SomeWrapper.prototype.forEach= function(fn, thisObj){
	return this.source.some(function(item){
		fn.call(thisObj, item);
	});
};
SomeWrapper.prototype.concat = function(someOther){
	var source = this.source;
	return new SomeWrapper({
		length : source.length + someOther.length,
		some : function(fn,thisObj){
			return when(source.some(fn,thisObj), function(result){
				return result || someOther.some(fn,thisObj);
			});
		}
	});
};
SomeWrapper.prototype.map = function(mapFn, mapThisObj){
	var source = this.source;
	return new SomeWrapper({
		length : source.length,
		some : function(fn,thisObj){
			return source.some(function(item){
				return fn.call(thisObj, mapFn.call(mapThisObj, item));
			});
		}
	});
};
SomeWrapper.prototype.toRealArray= function(mapFn, mapThisObj){
	var array = [];
	return when(this.source.some(function(item){
		array.push(item);
	}), function(){
		return array;
	});
};
SomeWrapper.prototype.join = function(){
	var args = arguments;
	return when(this.toRealArray(), function(realArray){
		return Array.prototype.join.apply(realArray, args);
	});
};
SomeWrapper.prototype.sort = function(){
	var args = arguments;
	return when(this.toRealArray(), function(realArray){
		return Array.prototype.sort.apply(realArray, args);
	});
};
SomeWrapper.prototype.reverse = function(){
	var args = arguments;
	return when(this.toRealArray(), function(realArray){
		return Array.prototype.reverse.apply(realArray, args);
	});
};
SomeWrapper.prototype.get = SomeWrapper.prototype.item = function(index){
	var result, i = 0;
	return when(this.source.some(function(item){
		if(i == index){
			result = item;
			return true;
		}
		i++;
	}), function(){
		return result;
	});
};


SomeWrapper.prototype.toSource = function(){
	var serializedParts = [];
	return when(this.source.some(function(item){
		serializedParts.push(item && item.toSource());
	}), function(){
		return '[' + serializedParts.join(",") + ']';
	});
};
SomeWrapper.prototype.toJSON = function(){
	var loadedParts = [];
	return when(this.source.some(function(item){
		loadedParts.push(item);
	}), function(){
		return loadedParts;
	});
};
return exports;
});
