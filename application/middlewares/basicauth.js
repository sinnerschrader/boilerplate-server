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
						context$2$0.next = 6;
						break;
					}

					context$2$0.next = 4;
					return next;

				case 4:
					context$2$0.next = 28;
					break;

				case 6:
					authorization = (0, _koaBasicAuth2['default'])(config.credentials);
					excluded = false;

					if (config.exclude) {
						matcher = new RegExp(config.exclude, 'g');

						excluded = matcher.test(this.path);
					}

					if (excluded) {
						context$2$0.next = 26;
						break;
					}

					authorize = authorization.bind(this);
					context$2$0.prev = 11;
					context$2$0.next = 14;
					return authorize(next);

				case 14:
					context$2$0.next = 24;
					break;

				case 16:
					context$2$0.prev = 16;
					context$2$0.t0 = context$2$0['catch'](11);

					if (!(context$2$0.t0.status === 401)) {
						context$2$0.next = 23;
						break;
					}

					this.status = 401;
					this.set('WWW-Authenticate', 'Basic');
					this.body = 'Unauthorized';
					return context$2$0.abrupt('return');

				case 23:

					this['throw'](context$2$0.t0.status);

				case 24:
					context$2$0.next = 28;
					break;

				case 26:
					context$2$0.next = 28;
					return next;

				case 28:
				case 'end':
					return context$2$0.stop();
			}
		}, basicAuthMiddleware, this, [[11, 16]]);
	});
}

exports['default'] = basicAuthMiddlewareFactory;
module.exports = exports['default'];
//this.throw(401);