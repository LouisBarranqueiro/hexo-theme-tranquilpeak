var oauth = require("./oauth");

for(var p in oauth){
	exports[p] = oauth[p];
}

exports.xauth = function(client, username, password, mode){
	return client.obtainTokenCredentials("", "", "", {
		x_auth_username: username,
		x_auth_password: password,
		x_auth_mode: mode
	});
};