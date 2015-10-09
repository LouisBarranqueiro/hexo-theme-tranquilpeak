/**
* Node fs module that returns promises
*/

if (typeof java === "object"){
	var fs = require("./engines/rhino/fs");
	
	// for rhino
	for(var i in fs){
		exports[i] = fs[i];
	}
}
else{
var fs = require("fs"),
	LazyArray = require("./lazy-array").LazyArray,
	Buffer = require("buffer").Buffer,
	defer = require("./promise").defer,
	when = require("./promise").when,
	convertNodeAsyncFunction = require("./promise").convertNodeAsyncFunction;
	
// convert all the non-sync functions
for (var i in fs) {
	if (i.match(/Sync$/) || i.match(/watch/)) {
		exports[i] = fs[i];
	}
	else{
		exports[i] = convertNodeAsyncFunction(fs[i]);
	}
}
function File(fd){
	var file = new LazyArray({
		some: function(callback){
			var deferred = defer();
			function readAndSend(){
				var buffer = new Buffer(4096);
				if(fd.then){
					fd.then(function(resolvedFd){
						fd = resolvedFd;
						fs.read(fd, buffer, 0, 4096, null, readResponse);
					});
				}else{
					fs.read(fd, buffer, 0, 4096, null, readResponse);
				} 
				function readResponse(err, bytesRead){
					if(err){
						deferred.reject(err);
						return;
					}
					if (bytesRead === 0){
						fs.close(fd);
						deferred.resolve();
					}
					else {
						var result;
						if(bytesRead < 4096){
							result = callback(buffer.slice(0, bytesRead));
						}else{
							result = callback(buffer);
						}
						if(result){
							// if a promise is returned, we wait for it be fulfilled, allows for back-pressure indication
							if(result.then){
								result.then(function(result){
									if(result){
										deferred.resolve();
									}
									else{
										readAndSend(fd);
									}
								}, deferred.reject);
							}
							else{
								deferred.resolve();
							}
						}else{
							readAndSend(fd);
						}
					}
				}
			}
			readAndSend();
			return deferred.promise;							
		},
		length: 0
	});
	file.fd = fd;
	file.then = function(callback, errback){
		fd.then(function(){
			callback(file);
		}, errback);
	};
	file.write = function(contents, options, encoding){
		return exports.write(file, contents, options, encoding);
	}
	file.close = function(){
		return exports.close(file);
	}
	file.writeSync = function(contents, options, encoding){
		return exports.writeSync(file.fd, contents, options, encoding);
	}
	file.closeSync = function(){
		return exports.closeSync(file.fd);
	}
	return file;
}
File.prototype = LazyArray.prototype;
 
var nodeRead = exports.read; 
exports.read = function(path, options){
	if(path instanceof File){
		var args = arguments; 
		return when(path.fd, function(fd){
			args[0] = fd;
			return nodeRead.apply(this, args);
		});
	}else{
		return exports.readFileSync(path, options).toString((options && options.charset) || "utf8");
	}
};

var nodeWrite = exports.write; 
exports.write = function(path, contents, options, encoding){
	if(path instanceof File){
		var id = Math.random();
		var args = arguments; 
		return when(path.fd, function(fd){
			args[0] = fd;
			if(typeof contents == "string"){
				return nodeWrite(fd, contents, options, encoding);
			}
			return nodeWrite(fd, contents, 0, contents.length, null);
		});
	}else{
		return exports.writeFileSync(path, contents, options);
	}
};
var nodeClose = exports.close; 
exports.close = function(file){
	if(file instanceof File){
		var args = arguments; 
		return when(file.fd, function(fd){
			args[0] = fd;
			return nodeClose.apply(this, args);
		});
	}
	throw new Error("Must be given a file descriptor");
};

var nodeOpenSync = exports.openSync;
exports.openSync = function(){
	if(typeof mode == "string"){
		arguments[1] = mode.replace(/b/,'');
	}
	return File(nodeOpenSync.apply(this, arguments));
};

nodeOpen = exports.open;
exports.open = function(path, mode){
	if(typeof mode == "string"){
		arguments[1] = mode.replace(/b/,'');
	}
	return File(nodeOpen.apply(this, arguments));
};

exports.makeDirectory = exports.mkdirSync;

exports.makeTree = function(path){
	if(path.charAt(path.length-1) == '/') {
		path = path.substring(0, path.length - 1);
	}
	try{
		fs.statSync(path);
	}catch(e){
		var index = path.lastIndexOf('/');
		if(index > -1){
			exports.makeTree(path.substring(0, index));
		}
		fs.mkdirSync(path, 0777);
	}
};
exports.absolute = exports.realpathSync;
exports.list = exports.readdirSync;
exports.move = exports.rename;

}
