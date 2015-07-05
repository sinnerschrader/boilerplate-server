import auth from 'koa-basic-auth';

function basicAuthMiddlewareFactory (application, config) {
	var authorization = auth(config.credentials);

	return function * basicAuthMiddleware (next) {
		var excluded = false;

		if (config.exclude) {
			var matcher = new RegExp(config.exclude, 'g');
			excluded = matcher.test(this.path);
		}

		if (!excluded) {
			var authorize = authorization.bind(this);
			try {
				yield authorize(next);
			} catch (error) {
				console.log(error);
				if (error.status === 401) {
					this.status = 401;
					this.set('WWW-Authenticate', 'Basic');
					this.body = 'Unauthorized';
					//this.throw(401);
					return;
				}

				this.throw(error.status);
			}
		} else {
			yield next;
		}
	};
}

export default basicAuthMiddlewareFactory;
