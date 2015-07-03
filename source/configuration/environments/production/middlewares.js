const middlewares = {
	'enabled': {
		'environment': false,
		'response-time': false,
		'revision': false,
		'basicauth': {
			'credentials': {
				'name': process.env.NODE_BASIC_AUTH_LOGIN || 'boilerplate-server',
				'pass': process.env.NODE_BASIC_AUTH_PASS || 'boilerplate-server'
			},
			'exclude': '/health'
		}
	}
};

export default middlewares;
