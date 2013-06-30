var Compiler = require('./lib/Compiler');


module.exports = {

	compile : function() {
		var compiler = new Compiler();
		compiler.compile.apply(this, arguments);
	}

};
