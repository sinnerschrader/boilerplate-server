'use strict';

var auth = require('koa-basic-auth');

function basicAuthMiddlewareFactory(application, config) {
	var authorization = auth(config.credentials);

	return regeneratorRuntime.mark(function basicAuthMiddleware(next) {
		var excluded, matcher, authorize;
		return regeneratorRuntime.wrap(function basicAuthMiddleware$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					excluded = false;

					if (config.exclude) {
						matcher = new RegExp(config.exclude, 'g');

						excluded = matcher.test(this.path);
					}

					if (excluded) {
						context$2$0.next = 15;
						break;
					}

					authorize = authorization.bind(this);
					context$2$0.prev = 4;
					context$2$0.next = 7;
					return authorize(next);

				case 7:
					context$2$0.next = 13;
					break;

				case 9:
					context$2$0.prev = 9;
					context$2$0.t0 = context$2$0['catch'](4);

					if (context$2$0.t0.status === 401) {
						this.status = 401;
						this.set('WWW-Authenticate', 'Basic');
						this.body = 'Unauthorized';
					}
					return context$2$0.abrupt('return', next);

				case 13:
					context$2$0.next = 17;
					break;

				case 15:
					context$2$0.next = 17;
					return next;

				case 17:
				case 'end':
					return context$2$0.stop();
			}
		}, basicAuthMiddleware, this, [[4, 9]]);
	});
}

module.exports = basicAuthMiddlewareFactory;