var Color = require('../../../').Color;


module.exports = {
	'.error': {
		border: [1, new Color(0xff0000)],
		background: new Color(0xffdddd),

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
