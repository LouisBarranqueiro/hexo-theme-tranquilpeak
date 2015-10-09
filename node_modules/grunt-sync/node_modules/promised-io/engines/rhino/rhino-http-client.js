/**
* HTTP Client using the JSGI standard objects
*/

var LazyArray = require("../../lazy-array").LazyArray;

// configurable proxy server setting, defaults to http_proxy env var
exports.proxyServer = require("../../process").env.http_proxy;

exports.request = function(request){
	var url = new java.net.URL(request.url),
		connection = url.openConnection(),
		method = request.method || "GET",
		is = null,
		promised = true;
	
	if (request.jsgi && "async" in request.jsgi) promised = request.jsgi.async;
	
	for (var header in this.headers) {
		var value = this.headers[header];
		connection.addRequestProperty(String(header), String(value));
	}
	connection.setFollowRedirects(false)
	connection.setDoInput(true);
	connection.setRequestMethod(method);
	if (request.body && typeof request.body.forEach === "function") {
		connection.setDoOutput(true);
		var writer = new java.io.OutputStreamWriter(connection.getOutputStream());
		request.body.forEach(function(chunk) {
			writer.write(chunk);
			writer.flush();
		});
	}
	if (typeof writer !== "undefined") writer.close();
	
	try {
		connection.connect();
		is = connection.getInputStream();
	}
	catch (e) {
		is = connection.getErrorStream();
	}
	
	var status = Number(connection.getResponseCode()),
		headers = {};
	for (var i = 0;; i++) {
		var key = connection.getHeaderFieldKey(i),
			value = connection.getHeaderField(i);
		if (!key && !value)
			break;
		// returns the HTTP status code with no key, ignore it.
		if (key) {
			key = String(key).toLowerCase();
			value = String(value);
			if (headers[key]) {
				if (!Array.isArray(headers[key])) headers[key] = [headers[key]];
				headers[key].push(value);
			}
			else {
				headers[key] = value;
			}
		}
	}
	
	var reader = new java.io.BufferedReader(new java.io.InputStreamReader(is)),
		builder = new java.lang.StringBuilder(),
		line;
	// FIXME create deferred and LazyArray
	while((line = reader.readLine()) != null){
		builder.append(line + '\n');
	}
	if (typeof writer !== "undefined") writer.close();
	reader.close();

	return {
		status: status,
		headers: headers,
		body: LazyArray({
			some: function(write) {
				write(builder.toString());
			}
		})
	}
};