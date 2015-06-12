const routes = {
	'path': './application/routes',
	'enabled': {
		'index': {
			'enabled': true,
			'method': 'GET',
			'path': '/'
		},
		'static': {
			'enabled': true,
			'method': 'GET',
			'path': /\/static\/(.*)/,
			'options': {
				'root': './static',
				'maxage': 3600000,
				'hidden': false,
				'defer': false
			}
		},
		'health': {
			'enabled': true,
			'method': 'GET',
			'path': '/health/'
		}
	}
};

export default routes;
