var util = require('util');

var Color = require('./Color');


function StyleSheet(options) {
	options = options || {};
	options.EOL = options.EOL || '\n';
	this.options = options;
	this.indentChar = options.indentChar || '	';
	this.selectors = [];
	this.isFirstSelector = true;
	this.css = '';
}

StyleSheet.prototype = {

	prefixes: [
		'background',
		'border',
		'counter',
		'font',
		'grid',
		'margin',
		'max',
		'min',
		'outline',
		'overflow',
		'padding',
		'text',
		'word'
	],

	interpret: function(hash, callback) {
		Object.keys(hash).forEach(this.onEachHashKey.bind(this, hash));
		if (typeof callback === 'function') {
			if (!this.isFirstSelector) {
				this.css += '}' + this.options.EOL;
			}
			callback(this.css);
		}
	},

	onEachHashKey: function(hash, key) {
		var value = hash[key];
		switch(typeof value) {
			case 'string':
				this.formatAttribute(key, value, this.formatString.bind(this));
				return;
			case 'number':
				this.formatAttribute(key, value, this.formatNumber.bind(this));
				return;
			default:
				if (util.isArray(value)) {
					this.formatAttribute(key, value, this.formatArray.bind(this));
					return;
				}
				if (value instanceof Color) {
					this.formatAttribute(key, value.toString(), this.formatString.bind(this));
					return;
				}
				if (~this.prefixes.indexOf(key)) {
					this.prefix = key.toLowerCase();
					this.interpret(value);
					return;
				}
				if (this.prefix) {
					delete this.prefix;
				}
				this.formatSelector(key, value);
		}
	},

	formatAttribute: function(key, value, parser) {
		this.css += this.indentChar;
		key = key.dasherize();
		if (this.prefix) {
			key = this.prefix + '-' + key;
		}
		this.css += key.dasherize() + ': ';
		this.css += parser(value) + ';';
		this.css += this.options.EOL;
	},

	formatSelector: function(key, value) {
		if (this.isFirstSelector) {
			this.isFirstSelector = false;
		} else {
			this.css += '}' + this.options.EOL.repeat(2);
		}
		this.selectors.push(key.split(/[ ,]+/));
		this.css += this.cartesianProductOfSelectors();
		this.css += ' {' + this.options.EOL;
		this.interpret(value);
		this.selectors.pop();
	},

	cartesianProductOfSelectors: function() {
		var result = this.selectors.reduce(function(a, b) {
			return a.map(function(x) {
				return b.map(function(y) {
					return [x, y].join(' ').replace(/ &/g, '');
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
		}.bind(this));
		return a.join(' ');
	}

};

module.exports = StyleSheet;
