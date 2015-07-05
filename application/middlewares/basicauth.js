'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _koaBasicAuth = require('koa-basic-auth');

var _koaBasicAuth2 = _interopRequireDefault(_koaBasicAuth);

function basicAuthMiddlewareFactory(application) {

	return regeneratorRuntime.mark(function basicAuthMiddleware(next) {
		var config, authorization, excluded, matcher, authorize;
		return regeneratorRuntime.wrap(function basicAuthMiddleware$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					config = application.configuration.middlewares.enabled.basicauth;

					if (!(config.enabled === false)) {
						context$2$0.next = 4;
						break;
					}

					context$2$0.next = 4;
					return next;

				case 4:
					authorization = (0, _koaBasicAuth2['default'])(config.credentials);
					excluded = false;

					if (config.exclude) {
						matcher = new RegExp(config.exclude, 'g');

						excluded = matcher.test(this.path);
					}

					if (excluded) {
						context$2$0.next = 24;
						break;
					}

					authorize = authorization.bind(this);
					context$2$0.prev = 9;
					context$2$0.next = 12;
					return authorize(next);

				case 12:
					context$2$0.next = 22;
					break;

				case 14:
					context$2$0.prev = 14;
					context$2$0.t0 = context$2$0['catch'](9);

					if (!(context$2$0.t0.status === 401)) {
						context$2$0.next = 21;
						break;
					}

					this.status = 401;
					this.set('WWW-Authenticate', 'Basic');
					this.body = 'Unauthorized';
					return context$2$0.abrupt('return');

				case 21:

					this['throw'](context$2$0.t0.status);

				case 22:
					context$2$0.next = 26;
					break;

				case 24:
					context$2$0.next = 26;
					return next;

				case 26:
				case 'end':
					return context$2$0.stop();
			}
		}, basicAuthMiddleware, this, [[9, 14]]);
	});
}

exports['default'] = basicAuthMiddlewareFactory;
module.exports = exports['default'];
//this.throw(401);