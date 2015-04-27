export default {
	'level': 'info',
	'transports': [ 'console', 'file' ],
	'options': {
		'console': {
			'colorize': false,
			'timestamp': false,
			'showLevel': false
		},
		'file': {
			'colorize': false,
			'timestamp': true,
			'showLevel': true
		}
	}
};
