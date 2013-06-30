var util = require('util');

var colors = require('./colors');


function Color(value) {
	this.value = value;
	this.process();
}

Color.prototype = {

	process: function() {
		var value = this.value;
		switch (typeof value) {

			case 'string':
				if (this.tryColorName(value) || this.tryHexCode(value)) {
					break;
				}
				throw Error('Invalid color name or hex code.');

			case 'number':
				if (value > colors.white) {
					throw Error('Color value exceeds white.');
				}
				break;

			default:
				if (value instanceof Color) {
					this.value = value.value;
					break;
				}
				if (util.isArray(value) && this.tryArrayAsHexCode(value)) {
					break;
				}
				throw Error('Invalid color value.');
		}
	},

	tryColorName: function(name) {
		var value = colors[name];

		if (isNaN(value)) {
			return false;
		}
		this.name = name;
		this.value = value;
		return true;
	},

	tryHexCode: function(code) {
		code = code.value.replace(/^#/, '');
		if (code.length < 6) {
			code = code.replace(/[0-9a-f]/gi, function(n) {
				return n + n;
			});
		}
		if (/[0-9a-f]{6}/.test(code)) {
			this.value = parseInt(code);
			return true;
		}
		return false;
	},

	tryArrayAsHexCode: function(a) {
		var code = a.map(function(n) {
			return n.toString(16);
		}).join('');
		return this.tryHexCode(code);
	},

	toString: function() {
		var code = this.value.toString(16);
		code = '0'.repeat(6 - code.length) + code;
		var segments = code.match(/[0-9a-f]{2}/gi);
		var canShorten = segments.every(function(s) {
			return s.substr(0, 1) === s.substr(1);
		});
		if (canShorten) {
			code = segments.map(function(s) {
				return s.substr(1);
			});
		}
		return '#' + code;
	}

};

module.exports = Color;
