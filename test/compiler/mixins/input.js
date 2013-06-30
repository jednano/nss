var extend = require('node.extend');


var tableBase = {
	th: {
		textAlign: 'center',
		fontWeight: 'bold'
	},
	'td, th': {
		padding: 2
	}
};

function left(dist) {
	return {
		'float': 'left',
		marginLeft: dist
	};
}

module.exports = {
	'#data': extend(left(10), tableBase)
};
