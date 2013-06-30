module.exports = {
	'.error': {
		border: [1, new Color(0xf00)],
		background: new Color(0xfdd),

		'&.intrusion': {
			fontSize: '1.3em',
			fontWeight: 'bold'
		}
	},

	'.badError': {
		borderWidth: 3,
		'@extend': '.error'
	}
};
