var Compiler = require('../lib/Compiler');
var expect = require('chai').expect;
var fs = require('fs');
var glob = require('glob');


describe('Compiler', function() {
	var options = { sync: true };

	glob('test/compiler/*', options, function(err, testCases) {
		testCases.forEach(function(testCase) {
			describe(testCase, function() {
				compile(testCase + '/input.js');
			});
		});
	});
});

var compiler = new Compiler();

function compile(inputPath) {
	it('generates expected css', function(done) {
		compiler.compile(inputPath, function(err, output) {
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
