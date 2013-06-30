module.exports = {
	lighten: function() {

	},

	darken: function(color, amount) {
		return lighten(color, amount * -1);
	}
}
