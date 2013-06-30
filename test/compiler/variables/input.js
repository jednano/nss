var $ = require('../../');


var blue = 0x3bbfce;
var margin = 16;

module.exports = {
	'.content-navigation': {
		borderColor: blue,
		color: $.darken(blue, .09)
	},

	'.border': {
		padding: margin/2,
		margin: margin/2,
		borderColor: blue
	}
};
