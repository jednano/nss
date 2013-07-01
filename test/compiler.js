var Compiler = require('../lib/Compiler');
var expect = require('chai').expect;
var fs = require('fs');
var glob = require('glob');


describe('Compiler', function() {
	var options = { sync: true };

	glob('test/compiler/*', options, function(err, testCases) {
		testCases.forEach(function(testCase) {
			var feature = testCase.match(/[^\/]+$/)[0];
			compile(testCase + '/input.js', feature);
		});
	});
});

var compiler = new Compiler();

function compile(inputPath, feature) {
	it('supports ' + feature, function(done) {
		var options = { isTesting: true };
		compiler.compile(inputPath, options, function(err, output) {
			if (err) {
				throw err;
			}
			var expectedPath = inputPath.replace('input.js', 'expected.css');
			fs.readFile(expectedPath, 'utf8', function(err2, expected) {
				if (err2) {
					throw err2;
				}
				expect(output).to.equal(expected);
				done();
			});
		});
	});
}
