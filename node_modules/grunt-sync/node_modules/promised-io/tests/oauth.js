var vows = require("vows"),
		assert = require("assert"),
		oauth = require("../oauth"),
		querystring = require("../util/querystring");

vows.describe("OAuth").addBatch({
	"When generating the signature base string described in <http://oauth.net/core/1.0/#sig_base_example>": {
		topic: new oauth.Client,
		"We get the expected result string": function(client){
			var result = client._createSignatureBase("GET", "http://photos.example.net/photos",
					"file=vacation.jpg&oauth_consumer_key=dpf43f3p2l4k3l03&oauth_nonce=kllo9940pd9333jh&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1191242096&oauth_token=nnch734d00sl2jdk&oauth_version=1.0&size=original");
			assert.equal(result, "GET&http%3A%2F%2Fphotos.example.net%2Fphotos&file%3Dvacation.jpg%26oauth_consumer_key%3Ddpf43f3p2l4k3l03%26oauth_nonce%3Dkllo9940pd9333jh%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1191242096%26oauth_token%3Dnnch734d00sl2jdk%26oauth_version%3D1.0%26size%3Doriginal");
		}
	},
	"When normalising a URL": {
		topic: new oauth.Client,
		"Default ports should be stripped": function(client){
			assert.equal(client._normalizeUrl({ protocol: "https:", hostname: "somehost.com", port: "443", pathname: "/foo/bar" }), "https://somehost.com/foo/bar");
			assert.equal(client._normalizeUrl({ protocol: "http:", hostname: "somehost.com", port: "80", pathname: "/foo/bar" }), "http://somehost.com/foo/bar");
		},
		"should leave in non-default ports from URLs for use in signature generation": function(client){
			assert.equal(client._normalizeUrl({ protocol: "https:", hostname: "somehost.com", port: "446", pathname: "/foo/bar" }), "https://somehost.com:446/foo/bar");
			assert.equal(client._normalizeUrl({ protocol: "http:", hostname: "somehost.com", port: "81", pathname: "/foo/bar" }), "http://somehost.com:81/foo/bar");
		}
	},
	"When normalizing the request parameters": {
		topic: new oauth.Client,
		"Order them by name": function(client){
			assert.equal(client._normalizeParams(["z", "a", "a", "b", "1", "c"]), "1=c&a=b&z=a");
		},
		"If two parameter names are the same then order by the value": function(client){
			assert.equal(client._normalizeParams(["z", "b", "z", "a", "1", "c"]), "1=c&z=a&z=b");
		},
		"the resulting parameters should be encoded and ordered as per <http://tools.ietf.org/html/rfc5849#section-3.1> (3.4.1.3.2)": function(client){
			var requestParams = [];
			querystring.parseToArray(requestParams, querystring.stringify({
				"b5" : "=%3D",
				"c@": "",
				"a2": "r b",
				"oauth_consumer_key": "9djdj82h48djs9d2",
				"oauth_token":"kkk9d7dh3k39sjv7",
				"oauth_signature_method": "HMAC-SHA1",
				"oauth_timestamp": "137131201",
				"oauth_nonce": "7d8f3e4a",
				"c2" :  ""
			}));
			querystring.addToArray(requestParams, "a3", "a");
			querystring.addToArray(requestParams, "a3", "2 q");
			assert.equal(client._normalizeParams(requestParams), "a2=r%20b&a3=2%20q&a3=a&b5=%3D%253D&c%40=&c2=&oauth_consumer_key=9djdj82h48djs9d2&oauth_nonce=7d8f3e4a&oauth_signature_method=HMAC-SHA1&oauth_timestamp=137131201&oauth_token=kkk9d7dh3k39sjv7");
		}
	},
	"When signing a URL": {
		topic: function(){
			var client = new oauth.Client("consumerkey", "consumersecret", null, null, null, "1.0", null, function(){ return "ybHPeOEkAUJ3k2wJT9Xb43MjtSgTvKqp"; });
			oauth.Client.getTimestamp = function(){ return "1272399856"; };
			return client;
		},
		"Provide a valid signature when no token is present": function(client){
			var requestParams = ["bar", "foo"];
			var oauthParams = client._collectOAuthParams({}, requestParams);
			var params = client._normalizeParams(requestParams);
			var baseString = client._createSignatureBase("GET", "http://somehost.com:3323/foo/poop", params);
			var signature = client._createSignature(baseString);
			assert.equal(signature, "7ytO8vPSLut2GzHjU9pn1SV9xjc=");
		},
		"Provide a valid signature when a token is present": function(client){
			var bound = client.bind("token", "");
			var requestParams = ["bar", "foo"];
			var oauthParams = bound._collectOAuthParams({}, requestParams);
			var params = bound._normalizeParams(requestParams);
			var baseString = bound._createSignatureBase("GET", "http://somehost.com:3323/foo/poop", params);
			var signature = bound._createSignature(baseString);
			assert.equal(oauthParams.oauth_token, "token");
			assert.equal(signature, "9LwCuCWw5sURtpMroIolU3YwsdI=");
		},
		"Provide a valid signature when a token and a token secret are present": function(client){
			var bound = client.bind("token", "tokensecret");
			var requestParams = ["bar", "foo"];
			var oauthParams = bound._collectOAuthParams({}, requestParams);
			var params = bound._normalizeParams(requestParams);
			var baseString = bound._createSignatureBase("GET", "http://somehost.com:3323/foo/poop", params);
			var signature = bound._createSignature(baseString);
			assert.equal(signature, "zeOR0Wsm6EG6XSg0Vw/sbpoSib8=");
		}
	},
	"When building the OAuth Authorization header": {
		topic: function(){
			var client = new oauth.Client("consumerkey", "consumersecret", null, null, null, "1.0", null, function(){ return "ybHPeOEkAUJ3k2wJT9Xb43MjtSgTvKqp"; });
			oauth.Client.getTimestamp = function(){ return "1272399856"; };
			return client;
		},
		"All provided OAuth arguments should be concatenated correctly" : function(client){
			var request = client._signRequest({
				method: "GET",
				protocol: "http:",
				hostname: "somehost.com",
				port: "3323",
				pathname: "/foo/poop",
				headers: {}
			}, ["bar", "foo"]);
			assert.equal(request.headers.authorization, 'OAuth oauth_consumer_key="consumerkey",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1272399856",oauth_nonce="ybHPeOEkAUJ3k2wJT9Xb43MjtSgTvKqp",oauth_version="1.0",oauth_signature="7ytO8vPSLut2GzHjU9pn1SV9xjc%3D"'); 
		}
	}
})["export"](module);
