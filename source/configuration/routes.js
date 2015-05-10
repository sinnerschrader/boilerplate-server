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
		}
	}
};

export default routes;
