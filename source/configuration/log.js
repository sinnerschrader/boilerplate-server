export default {
	'level': process.env.BOILERPLATESERVER_LOG_LEVEL || process.env.BOILERPLATE_LOG_LEVEL || process.env.NODE_LOG_LEVEL || process.env.LOG_LEVEL || 'silly',
	'transports': [ 'console' ],
	'options': {
		'console': {
			'colorize': true,
			'timestamp': true,
			'showLevel': true
		}
	}
};
