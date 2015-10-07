'use strict';
var os = require('os');

var nameMap = {
	'10.0': '10',
	'6.3': '8.1',
	'6.2': '8',
	'6.1': '7',
	'6.0': 'Vista',
	'5.1': 'XP',
	'5.0': '2000',
	'4.9': 'ME',
	'4.1': '98',
	'4.0': '95'
};

module.exports = function (release) {
	var version = /\d+\.\d+/.exec(release || os.release());

	if (!version) {
		throw new Error('`release` argument doesn\'t match `n.n`');
	}

	return nameMap[version[0]];
};
