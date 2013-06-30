var path = require('path');
var util = require('util');

var StyleSheet = require('../util/StyleSheet');
require('../util/string');


function Compiler() {}

Compiler.prototype = {

	compile : function(paths, options, callback) {
		this.paths = paths;
		if (typeof options === 'function') {
			callback = options;
		}
		this.callback = callback;
		this.compiled = 0;

		paths.forEach(this.onEachPath.bind(this));
	},

	onEachPath: function(p) {
		if (!path.basename(p)) {
			// TODO : Implement folder traversal
			return;
		}
		var hash = require(p);
		var ss = new StyleSheet();
		ss.interpret(hash, this.onInterpretHash.bind(this));
	},

	onInterpretHash: function(css) {
		var outputPath = path.replace(/\.js$/, '.css');
		fs.writeFile(outputPath, css, this.onCompile.bind(this));
	},

	onCompile: function() {
		if (++this.compiled !== this.paths.length) {
			return;
		}
		if (typeof this.callback === 'function') {
			this.callback();
		}
	}

};

module.exports = Compiler;
