var os = require('os');
var util = require('util');

var Color = require('./Color');


function StyleSheet(options) {
	options = options || {};
	this.level = options.level || 0;
	this.indentChar = options.indentChar || '	';
	this.data = '';
}

StyleSheet.prototype = {

	interpret: function(hash, callback) {
		Object.keys(hash).forEach(this.onEachHashKey.bind(this));
		if (typeof callback === 'function') {
			callback(css);
		}
	},

	onEachHashKey: function(key) {
		var value = hash[key];
		switch(typeof value) {
			case 'string':
				this.formatAttribute(key, value, this.formatString);
				return;
			case 'number':
				this.formatAttribute(key, value, this.formatNumber);
				return;
			default:
				if (util.isArray(value)) {
					this.formatAttribute(key, value, this.formatArray);
					return;
				}
				if (value instanceof Color) {
					this.formatAttribute(key, value.toString(), this.formatString);
					return;
				}
				this.formatSelector(key, value);
		}
	},

	formatAttribute: function(key, value, parser) {
		this.indent();
		this.data += key + ': ';
		this.data += parser(value) + ';';
		this.data += os.EOL;
	},

	formatSelector: function(key, value) {
		this.indent();
		this.data += key + ' {' + os.EOL;
		this.level++;
		this.interpret(value);
		this.level--;
		this.indent();
		this.data += '}' + os.EOL;
	},

	indent: function() {
		this.data += this.indentChar.repeat(this.level);
	},

	formatString: function(s) {
		return s;
	},

	formatNumber: function(n) {
		return n === 0 ? '0' : n + 'px';
	},

	formatArray: function(a) {
		a = a.map(function(n) {
			return this.formatNumber(n);
		});
		return a.join(' ');
	}

};

module.exports = StyleSheet;
