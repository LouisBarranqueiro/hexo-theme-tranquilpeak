/**
* HTTP Client using the JSGI standard objects
*/
({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory.apply(this, deps.slice(0,2).map(require).concat(require))}}).
define(["./promise", "./process", "require"],
function(promise, process, require){
var defer = promise.defer,
	when = promise.when,
	print = process.print,
	request;
	
if(typeof XMLHttpRequest === "undefined"){
	request = require("./engines/node/http-client").request;
}
else{
request = function(request){
	var
	  scheme = request.scheme || "http",
	  serverName = request.serverName || request.hostname || "localhost",
	  serverPort = request.serverPort || request.port     || 80,
	  xhr = new XMLHttpRequest();
	xhr.open(request.method || "GET", 
		request.url || // allow request.url to shortcut creating a URL from all the various parts 
		(scheme + "://" + serverName + ":" + serverPort + request.pathInfo + (request.queryString ? '?' + request.queryString : '')), true);
	for(var i in request.headers){
		xhr.setRequestHeader(i, request.headers[i]);
	}
	var deferred = defer(),
		response,
		lastUpdate;
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 || xhr.readyState == 3){
			if(!response){
				response = {
					body: [xhr.responseText],
					status: xhr.status,
					headers: {}
				};
				lastUpdate = xhr.responseText.length;
				var headers = xhr.getAllResponseHeaders();
				headers = headers.split(/\n/);
				for(var i = 0; i < headers.length; i++){
					var nameValue = headers[i].split(": ", 2);
					if(nameValue){
						var name = nameValue[0];
						response.headers[name.toLowerCase()] = xhr.getResponseHeader(name);
					}
				}
			}
			else{
				response.body = [xhr.responseText];
				lastUpdate = xhr.responseText.length;
			}
			if(xhr.readyState == 4){
				deferred.resolve(response);
			}
			else{
				deferred.progress(response);
			}
		}
	}
	xhr.send(request.body && request.body.toString());
	return deferred.promise;
}
}
// for back-compat
request.request = request;
// FIXME this way too naive
var isRedirect = request.isRedirect = function(response){
	return [301,302,303,307].indexOf(response.status) >= 0;
}

request.Redirect = function(nextApp, maxRedirects){
	maxRedirects = maxRedirects || 10;
	return function(request){
		var remaining = maxRedirects,
			deferred = defer();
		function next(){
			when(nextApp(request), function(response) {
				if(remaining--){
					// TODO cache safe redirects when cache is added
					if(isRedirect(response)){
						request.url = response.headers.location;
						next();
					}else{
						deferred.resolve(response);
					}
				}else{
					if(isRedirect(response)) print("Maximum redirects reached")
					deferred.resolve(response);
				}
			}, deferred.reject);
		}
		next();
		return deferred.promise;
	}
}

request.CookieJar = function(nextApp) {
  var domainToCookies = {};
  
  return function(req) {
    var
      querystring = require("./querystring"),
      parseUri    = require("./util/uri").parseUri;
    
    if (req.url) {
      var url = parseUri(req.url);
      req.hostname  = url.host;
      req.port      = url.port;
      req.pathInfo  = url.path;
      req.authority = url.authority;
    }
    
    if (req.hostname && domainToCookies[req.hostname]) {
      var cookieString = "";
      req.headers["Cookie"] = domainToCookies[req.hostname].map(function(cookie) {
        return querystring.toQueryString(cookie);
      }).join(',');
    }
    
    return when(nextApp(req), function(response) {
      var cookies;
      if (response.headers["set-cookie"]) {
        var path, domain = req.hostname + (req.port ? ":"+req.port : "");
        
        if (Array.isArray(response.headers["set-cookie"])) {
            cookies = [];

            response.headers["set-cookie"].forEach(function(cookie) {
                cookie = querystring.parseQuery(cookie, /[;,]/g);
                if (cookie.Version !== undefined) { delete cookie.Version; }
                if (cookie.Path !== undefined) { path = cookie.Path; delete cookie.Path; }
                if (cookie.HttpOnly !== undefined) { delete cookie.HttpOnly; }
                if (cookie.Domain !== undefined) { domain = cookie.Domain; delete cookie.Domain; }

                cookies.push(cookie);
            });
        } else {
            cookies = querystring.parseQuery(response.headers["set-cookie"], /[;,]/g);
            if (cookies.Version !== undefined) { delete cookies.Version; }
            if (cookies.Path !== undefined) { path = cookies.Path; delete cookies.Path; }
            if (cookies.HttpOnly !== undefined) { delete cookies.HttpOnly; }
            if (cookies.Domain !== undefined) { domain = cookies.Domain; delete cookies.Domain; }

            cookies = [ cookies ];
        }

        for (var k in cookies) {
          if (Array.isArray(cookies[k])) {
            cookies[k] = cookies[k][0];
          }
        }
        
        if (cookies) {
          domainToCookies[req.hostname] = cookies;
        }
      }
      
      return response;
    });
  };
};

// TODO request.Cache

// TODO request.CookieJar

request.Client = function(options) {
	if (!(this instanceof request.Client)) return new request.Client(options);
	options = options || {};
	for (var key in options) {
		this[key] = options[key];
	}
	this.request = request;
	// turn on redirects by default
	var redirects = "redirects" in this ? this.redirects : 20;
	if (redirects) {
		this.request = request.CookieJar(request.Redirect(this.request, typeof redirects === "number" && redirects));
	}
	
	var finalRequest = this.request;
	this.request = function(options) {
		if (typeof options === "string") options = {url: options};
		return finalRequest(options);
	}
}
return request;
});