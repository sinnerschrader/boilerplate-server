export default {
	'level': process.env.BOILERPLATESERVER_LOG_LEVEL || process.env.BOILERPLATE_LOG_LEVEL || process.env.NODE_LOG_LEVEL || process.env.LOG_LEVEL || 'silly',
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
