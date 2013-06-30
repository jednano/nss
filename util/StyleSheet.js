var os = require('os');
var util = require('util');

var Color = require('./Color');


function StyleSheet(options) {
	options = options || {};
	this.indentChar = options.indentChar || '	';
	this.selectors = [];
	this.isFirstSelector = true;
	this.css = '';
}

StyleSheet.prototype = {

	interpret: function(hash, callback) {
		Object.keys(hash).forEach(this.onEachHashKey.bind(this, hash));
		if (typeof callback === 'function') {
			if (!this.isFirstSelector) {
				this.css += '}' + os.EOL;
			}
			callback(this.css);
		}
	},

	onEachHashKey: function(hash, key) {
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
		this.css += this.indentChar;
		this.css += key.dasherize() + ': ';
		this.css += parser(value) + ';';
		this.css += os.EOL;
	},

	formatSelector: function(key, value) {
		if (this.isFirstSelector) {
			this.isFirstSelector = false;
		} else {
			this.css += '}' + os.EOL.repeat(2);
		}
		this.selectors.push(key.split(/[ ,]+/));
		this.css += this.cartesianProductOfSelectors();
		this.css += ' {' + os.EOL;
		this.interpret(value);
		this.selectors.pop();
	},

	cartesianProductOfSelectors: function() {
		var result = this.selectors.reduce(function(a, b) {
			return a.map(function(x) {
				return b.map(function(y) {
					return [x, y].join(' ');
				});
			});
		})[0];
		return typeof result === 'string' ? result : result.join(', ');
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
