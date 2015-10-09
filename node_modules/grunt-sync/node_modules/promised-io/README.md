Promised-IO is a cross-platform package for asynchronous promise-based IO. Promises
provide a simple robust mechanism asynchronicity with separation of concerns by encapsulating
eventual completion of an operation with side effect free callback registration
separate from call invocation. Promised-IO provides cross-platform 
file, HTTP, and system interaction with promises for asynchronous operations.

Promised-IO also utilizes "lazy arrays" for progressively completed 
actions or for streaming of data. Lazy arrays provide all the standard iterative Array methods for
receiving callbacks as actions are completed. Lazy arrays are utilized
for progressive loading of files and HTTP responses.

# promise

The promise module provides the primary tools for creating new promises and interacting
with promises. The promise API used by promised-io is the [Promises/A](http://wiki.commonjs.org/wiki/Promises/A)
proposal used by Dojo, jQuery, and other toolkits. Within promised-io, a promise is 
defined as any object that implements the Promises/A API, that is they provide a
then() method that can take a callback. The then() methods definition is:

    promise.then(fulfilledHandler, errorHandler);

Promises can originate from a variety of sources, and promised-io provides a constructor, Deferred,
to create promises.

## when

	when = require("promised-io/promise");
	when(promiseOrValue, fulfilledHandler, errorHandler);
	
You can pass a promise to the when() function and the fulfillment and error handlers will be registered for it's
completion *or* you can pass a regular value, and the fulfillment handler will be 
immediately be called. The when function is a staple of working with promises because
it allows you to write code that normalizes interaction with synchronous values and asynchronous promises.
If you pass in a promise, a new promise for the result of execution of the callback handler
will be returned. If you pass a normal value, the return value will be the value returned
from the fulfilledHandler.

## Deferred

	deferred = require("promised-io/promise").Deferred(canceler);

The Deferred constructor is the primary mechanism for creating new promises. The Deferred
object is a form of a promise that with an interface for fulfilling or rejecting the promise.
A Deferred object is a means for a producer to resolve a promise and it also provides
a promise for consumers that are listening for the resolution of the promise. The basic
usage pattern looks like:

	var Deferred = require("promised-io/promise").Deferred;
    function delay(ms, value){
    	// create a new Deferred
    	var deferred = new Deferred();
    	setTimeout(function(){
    		// fulfill the deferred/promise, all listeners to the promise will be notified, and 
    		// provided the value as the value of the promise 
    		deferred.resolve(value);
    	}, ms);
    	// return the promise that is associated with the Deferred object
    	return deferred.promise;
    }

The Deferred can optional take a canceler function. This function will cause resulting
promises to have a cancel() method, and if the cancel() method is called, the 
Deferred will be canceled and the canceler function will be called.

The Deferred object has the following methods and properties:

### resolve

    deferred.resolve(value);

This will fulfill the Deferred's promise with the provided value. The fulfillment listeners to the promise
will be notified.

### reject

    deferred.reject(error);

This will reject the Deferred's promise with the provided error. The error listeners to the promise
will be notified.

### promise

This is the promise object associated with the Deferred instance. The promise object 
will not have any of the Deferred's fulfill or reject methods, and only provides an interface
for listening. This can be safely provided to consumers without any chance of being modified.

### cancel

    deferred.cancel();

This will cancel the Deferred.
 
## currentContext

One of the challenges with working asynchronous code is that there can be times when
you wish for some contextual state information to be preserved across multiple
asynchronous actions, without having to actually pass the state to each function in
the asynchronous chain. A common examples of such contextual state would be tracking
the current transaction, or the currently logged in user. Such state information could be 
stored in a singleton (a module property or a global variable), but with asynchronous
actions being interleaved, this is unsuitable for tracking state across asynchronous continuations
of an action. 

The promised-io package's promise module provides a facility for tracking state across
asynchronous operations. The promise module tracks the "currentContext" global variable,
and whatever value that was in the variable at the time a promise was created
will be restored when that promise is fulfilled (or rejected). 

## all

	group = require("promised-io/promise").all(arrayOfPromises);

The all() function can be passed an array of promises, or multiple promises as individual
arguments, and all() will return a new promise that represents the completed values when all the promises
have been fulfilled. This allows you to easily run multiple asynchronous actions, and wait
for the completion ("join") of all the actions. For example:
 
	group = all(promise1, promise2, promise3);
	group.then(function(array){
		var value1 = array[0]; // result of promise1
		var value2 = array[1]; // result of promise2
		var value3 = array[2]; // result of promise3
	});

## first

	first = require("promised-io/promise").first(arrayOfPromises);

The first() function can be passed an array of promises, or multiple promises as individual
arguments, and first() will return a new promise that represents the completed value when the first promise
is fulfilled. This allows you to run multiple asynchronous actions get the first result. For example:
 
	response = first(requestToMainSite, requestToMirrorSite1, requestToMirrorSite2);
	response.then(function(response){
		// response from the first site to respond
	});

## seq

	result = require("promised-io/promise").seq(arrayOfActionFunctions, startingValue);

The seq() function can be passed an array of functions, and seq() will execute each function
in sequence, waiting for the promise returned from each one to complete before executing
the next function. Each function will be called with the result of the last function (or the
startingValue for the first function).

## whenPromise

	resultPromise = require("promised-io/promise").whenPromise(valueOrPromise, fulfillmentHandler, errorHandler); 

The whenPromise() function behaves exactly like when() except that whenPromise
will always return a promise, even if a non-promise value is passed in.

## allKeys

	group = require("promised-io/promise").allKeys(hashOfPromises);

Takes a hash of promises and returns a promise that is fulfilled once all the promises in the hash keys are fulfilled.

# fs
	
This module provides promise-based access to the filesystem. The API of the fs module
basically follows the [Node File System module API](http://nodejs.org/docs/latest/api/fs.html).
Each of the asynchronous functions in the Node's FS API is reflected with a corresponding 
function in the fs module that returns a promise (instead of requiring a callback argument in the initial call).
For example, where Node has fs.rename(path1, path2, [callback]), with promised-io
you would call it:

	var fs = require("promised-io/fs").fs;
	fs.rename(path1, path2).then(function(){
		// finished renaming
	}); 

One function that does differ from NodeJS's fs module is the open() function.

## open

	var file = require("promised-io/fs").open(path, mode);

The open() function differs from simply being a promise-based version of the Node's
open() function in that it immediately returns (even though the opening of the
file is asynchronous) a file object that be used to read from and write to the file.

To write to the file object, we can write:

	promiseForCompletion = file.write(contents, options, encoding);

To close the file object, we can write:

	promiseForCompletion = file.close();

We can also use file.writeSync and file.closeSync for the synchronous versions of these
functions.

The file object is also a lazy array, which means you can read from the file using 
standard array methods. To asynchronously read the contents of a file, you can do:
 
	file.forEach(function(chunk){
		// called for each chunk of the file until the end of the file is reached.
	});

# lazy-array

The lazy-array module provides the functionality for creating and using lazy arrays,
which are objects that implement the interface of the standard iterative array methods for accessing
streams of data. Array methods can be called and they will be
asynchronously executed as data is available. Lazy arrays are powerful way to model
asynchronous streams since they can used like other JavaScript arrays.

Typically you don't need to directly use this module, rather other IO modules like the 
file system (fs) and HTTP (http-client) modules provide lazy arrays that you can interact
with. For example, we could search through a file for the string "lazy" and stop reading
once we find it using the standard some() method:

	if(file.some(function(chunk){
		return chunk.toString().indexOf("lazy") > -1;
	}));

Lazy arrays include the follow standard array methods, providing access to the data
as the stream data becomes available:

* filter
* every
* some
* forEach
* concat
* map

And also these standard methods, although these must fully fetch the stream:

* join
* sort
* reverse

Also the following additional methods are available on lazy arrays:

* toRealArray() - This will fetch all the data and return it as a real JavaScript array.
* get(index) - This retrieves an element by index.

## LazyArray

	lazyArray = require("promised-io/lazy-array").LazyArray({
		some: someImplementation,
		length: arrayLength
	});

This function is a constructor for creating your own lazy arrays. With this function,
you don't need to implement the entire set of array methods, you can just implement
the some() method and provide an array length, if it is known.

## first

	first = require("promised-io/lazy-array").first(lazyArray);
	
This function returns the first element in a lazy array.

## last

	last = require("promised-io/lazy-array").last(lazyArray);
	
This function returns the last element in a lazy array.

## get

	item = require("promised-io/lazy-array").get(index);
	
This function returns the an element by index from a lazy array.

# http-client

This module provides convenient promise-based access to making HTTP requests.

Promised-IO is part of the Persevere project, and therefore is licensed under the
AFL or BSD license. The Persevere project is administered under the Dojo foundation,
and all contributions require a Dojo CLA.