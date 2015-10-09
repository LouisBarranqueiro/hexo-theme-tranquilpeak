var parseUrl = require("url").parse;
var querystring = require("./util/querystring");
var whenPromise = require("./promise").whenPromise;
var makeRequest = require("./http-client").request;
var crypto = require("crypto");

function encodeRfc3986(str){
	return !str ? "" : encodeURIComponent(str)
			.replace(/\!/g, "%21")
			.replace(/\'/g, "%27")
			.replace(/\(/g, "%28")
			.replace(/\)/g, "%29")
			.replace(/\*/g, "%2A");
}

function parseResponse(response){
	return response.body.join("").then(function(body){
		if(response.status == 200){
			return querystring.parse(body);
		}else{
			var err = new Error(response.status + ": " + body);
			err.status = response.status;
			err.headers = response.headers;
			err.body = body;
			throw err;
		}
	});
}

exports.Client = Client;
function Client(identifier, secret, tempRequestUrl, tokenRequestUrl, callback, version, signatureMethod, nonceGenerator, headers){
	this.identifier = identifier;
	this.tempRequestUrl = tempRequestUrl;
	this.tokenRequestUrl = tokenRequestUrl;
	this.callback = callback;
	this.version = version || false;
	// _createSignature actually uses the variable, not the instance property
	this.signatureMethod = signatureMethod = signatureMethod || "HMAC-SHA1";
	this.generateNonce = nonceGenerator || Client.makeNonceGenerator(32);
	this.headers = headers || Client.Headers;
	
	if(this.signatureMethod != "PLAINTEXT" && this.signatureMethod != "HMAC-SHA1"){
		throw new Error("Unsupported signature method: " + this.signatureMethod);
	}
	
	// We don't store the secrets on the instance itself, that way it can
	// be passed to other actors without leaking
	secret = encodeRfc3986(secret);
	this._createSignature = function(tokenSecret, baseString){
		if(baseString === undefined){
			baseString = tokenSecret;
			tokenSecret = "";
		}
		
		var key = secret + "&" + tokenSecret;
		if(signatureMethod == "PLAINTEXT"){
			return key;
		}else{
			return crypto.createHmac("SHA1", key).update(baseString).digest("base64");
		}
	};
}

Client.Headers = {
	Accept: "*/*",
	Connection: "close",
	"User-Agent": "promised-io/oauth"
};
// The default headers shouldn't change after clients have been created,
// but you're free to replace the object or pass headers to the Client
// constructor.
Object.freeze(Client.Headers);

Client.NonceChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
Client.makeNonceGenerator = function(nonceSize){
	var nonce = Array(nonceSize + 1).join("-").split("");
	var chars = Client.NonceChars.split("");
	
	return function nonceGenerator(){
		return nonce.map(getRandomChar).join("");
	};
	
	function getRandomChar(){
		return chars[Math.floor(Math.random() * chars.length)];
	}
};

Client.getTimestamp = function(){
	return Math.floor(Date.now() / 1000).toString();
};

// Binds the client against a set of token credentials.
// The resulting object can be used to make signed requests.
// The secret won't be exposed on the object itself.
Client.prototype.bind = function(tokenIdentifier, tokenSecret){
	var bound = {
		identifier: this.identifier,
		tokenIdentifier: tokenIdentifier,
		signatureMethod: this.signatureMethod,
		version: this.version,
		headers: this.headers,
		generateNonce: this.generateNonce
	};
	bound._createSignature = this._createSignature.bind(this, encodeRfc3986(tokenSecret));
	bound._createSignatureBase = this._createSignatureBase;
	bound._normalizeUrl = this._normalizeUrl;
	bound._collectOAuthParams = this._collectOAuthParams;
	bound._normalizeParams = this._normalizeParams;
	bound._signRequest = this._signRequest;
	bound.request = this.request;
	return bound;
};

// Wrapper for `http-client.request` which signs the request
// with the client credentials, and optionally token credentials if bound.
Client.prototype.request = function(originalRequest){
	var request = {};
	for(var key in originalRequest){
		if(originalRequest.hasOwnProperty(key)){
			request[key] = originalRequest[key];
		}
	}
	
	// Normalize the request. `engines/node/http-client.request` is
	// quite flexible, but this should do it.
	if(request.url){
		var parsed = parseUrl(request.url);
		parsed.pathInfo = parsed.pathname;
		parsed.queryString = parsed.query;
		for(var i in parsed){
			request[i] = parsed[i];
		}
	}
	request.pathname = request.pathname || request.pathInfo || "/";
	request.queryString = request.queryString || request.query || "";
	request.method = (request.method || "GET").toUpperCase();
	request.protocol = request.protocol.toLowerCase();
	request.hostname = (request.host || request.hostname).toLowerCase();
	request.headers = {};
	for(var h in this.headers){
		request.headers[h] = this.headers[h];
	}
	for(var h in originalRequest.headers){
		request.headers[h] = originalRequest.headers[h];
	}
	// We'll be setting the Authorization header; due to how `engines/node/http-client.request`
	// is implemented we need to set the Host header as well.
	request.headers.host = request.headers.host || request.hostname + (request.port ? ":" + request.port : "");
	
	// Parse all request parameters into a flattened array of parameter pairs.
	// Note that this array contains munged parameter names.
	var requestParams = [], uncombinedRequestParams = [];
	// Start with parameters that were defined in the query string
	if(request.queryString){
		querystring.parseToArray(requestParams, request.queryString);
	}
	// Allow parameters to be defined in object notation, this is *not* part of `http-client.request`!
	// It saves an extra stringify+parse though.
	if(request.requestParams){
		for(var i in request.requestParams){
			if(request.requestParams.hasOwnProperty(i)){
				querystring.addToArray(uncombinedRequestParams, i, request.requestParams[i]);
			}
		}
	}
	// Send the parameters from `request.requestParams` in the query string
	// for GET and DELETE requests. We immediately concat to the `requestParams` array,
	// which is then built into the query string.
	if(request.method == "GET" || request.method == "DELETE"){
		requestParams = requestParams.concat(uncombinedRequestParams);
	}
	// Rebuild the query string
	request.queryString = requestParams.reduce(function(qs, v, i){
		return qs + (i % 2 ? "=" + querystring.escape(v) : (qs.length ? "&" : "") + querystring.escape(v));
	}, "");
	
	// Depending on the request content type, look for request parameters in the body
	var waitForBody = false;
	if(request.headers && request.headers["Content-Type"] == "application/x-www-form-urlencoded"){
		waitForBody = whenPromise(request.body.join(""), function(body){
			querystring.parseToArray(requestParams, body);
			return body;
		});
	}
	
	// If we're a POST or PUT and are not sending any content, or are sending urlencoded content,
	// add the `request.request` to the request body. If we are sending non-urlencoded content through
	// a POST or PUT, the `request.requestParams` are ignored.
	if(request.requestParams && (request.method == "POST" || request.method == "PUT") && (!request.headers || !request.headers["Content-Type"] || request.headers["Content-Type"] == "application/x-www-form-urlencoded")){
		waitForBody = whenPromise(waitForBody, function(body){
			requestParams = requestParams.concat(uncombinedRequestParams);
			body = (body ? body + "&" : "") + querystring.stringify(request.requestParams);
			request.body = [body];
			request.headers["Content-Type"] = "application/x-www-form-urlencoded";
		});
	}
	
	// Sign the request and then actually make it.
	return whenPromise(waitForBody, function(){
		this._signRequest(request, requestParams);
		return makeRequest(request);
	}.bind(this));
};

Client.prototype._normalizeUrl = function(request){
	var normalized = request.protocol + "//" + request.hostname;
	if(request.protocol == "http:" && request.port && (request.port + "") != "80"){
		normalized += ":" + request.port;
	}
	if(request.protocol == "https:" && request.port && (request.port + "") != "443"){
		normalized += ":" + request.port;
	}
	return normalized + request.pathname;
};

Client.prototype._collectOAuthParams = function(request, requestParams){
	var oauthParams = {};
	if(request.oauthParams){
		for(var p in request.oauthParams){
			// Don't allow `request.oauthParams` to override standard values.
			// `oauth_token` and `oauth_version` are conditionally added,
			// the other parameters are always set. Hence we just test for
			// the first two.
			if(p != "oauth_token" && p != "oauth_version"){
				oauthParams[p] = request.oauthParams[p];
			}
		}
	}
	oauthParams.oauth_consumer_key = this.identifier;
	oauthParams.oauth_signature_method = this.signatureMethod;
	oauthParams.oauth_timestamp = Client.getTimestamp();
	oauthParams.oauth_nonce = this.generateNonce();
	if(this.tokenIdentifier){
		oauthParams.oauth_token = this.tokenIdentifier;
	}
	if(this.version){
		oauthParams.oauth_version = this.version;
	}
	for(var i in oauthParams){
		requestParams.push(i, oauthParams[i]);
	}
	return oauthParams;
};

Client.prototype._normalizeParams = function(requestParams){
	// Encode requestParams
	requestParams = requestParams.map(encodeRfc3986);
	// Unflatten the requestParams for sorting
	requestParams = requestParams.reduce(function(result, _, i, arr){
		if(i % 2 == 0){
			result.push(arr.slice(i, i + 2));
		}
		return result;
	}, []);
	// Sort the unflattened requestParams
	requestParams.sort(function(a, b){
		if(a[0] == b[0]){
			return a[1] < b[1] ? -1 : 1;
		}else{
			return a[0] < b[0] ? -1 : 1;
		}
	});
	return requestParams.map(function(pair){ return pair.join("="); }).join("&");
};

Client.prototype._createSignatureBase = function(requestMethod, baseUri, params){
	return [requestMethod, baseUri, params].map(encodeRfc3986).join("&");
};

Client.prototype._signRequest = function(request, requestParams){
	// Calculate base URI string
	var baseUri = this._normalizeUrl(request);
	
	// Register OAuth parameters and add to the request parameters
	// Additional parameters can be specified via the `request.oauthParams` object
	var oauthParams = this._collectOAuthParams(request, requestParams);
	
	// Generate parameter string
	var params = this._normalizeParams(requestParams);
	
	// Sign the base string
	var baseString = this._createSignatureBase(request.method, baseUri, params);
	oauthParams.oauth_signature = this._createSignature(baseString);
	
	// Add Authorization header
	request.headers.authorization = "OAuth " + Object.keys(oauthParams).map(function(name){
		return encodeRfc3986(name) + "=\"" + encodeRfc3986(oauthParams[name]) + "\"";
	}).join(",");
	
	// Now the request object can be used to make a signed request
	return request;
};

Client.prototype.obtainTempCredentials = function(oauthParams, extraParams){
	oauthParams = oauthParams || {};
	if(this.callback && !oauthParams.oauth_callback){
		oauthParams.oauth_callback = this.callback;
	}
	
	return this.request({
		method: "POST",
		url: this.tempRequestUrl,
		oauthParams: oauthParams,
		requestParams: extraParams || {}
	}).then(parseResponse);
};

Client.prototype.obtainTokenCredentials = function(tokenIdentifier, tokenSecret, verifierToken, extraParams){
	return this.bind(tokenIdentifier, tokenSecret).request({
		method: "POST",
		url: this.tokenRequestUrl,
		oauthParams: { oauth_verifier: verifierToken },
		requestParams: extraParams
	}).then(parseResponse);
};
