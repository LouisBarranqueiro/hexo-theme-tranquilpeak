var vows = require("vows"),
		assert = require("assert"),
		querystring = require("../util/querystring");

vows.describe("util/querystring").addBatch({
	"When munging array parameters": {
		topic: ["bar", "baz"],
		"Each array value should have its own parameter name": function(arr){
			var requestParams = [];
			querystring.addToArray(requestParams, "foo", arr);
			assert.deepEqual(requestParams, ["foo[]", "bar", "foo[]", "baz"]);
		}
	},
	"When munging object parameters": {
		topic: { "key": "value" },
		"Each property value should have its own parameter name": function(obj){
			var requestParams = [];
			querystring.addToArray(requestParams, "obj", obj);
			assert.deepEqual(requestParams, ["obj[key]", "value"]);
		}
	},
	"When parsing a munged query string": {
		topic: "foo[]=bar&foo[]=baz&obj[key]=value",
		"Arrays and objects should retain their own parameter names": function(qs){
			var requestParams = [];
			querystring.parseToArray(requestParams, qs);
			assert.deepEqual(requestParams, ["foo[]", "bar", "foo[]", "baz", "obj[key]", "value"]);
		}
	}
})["export"](module);