'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _koaBasicAuth = require('koa-basic-auth');

var _koaBasicAuth2 = _interopRequireDefault(_koaBasicAuth);

function basicAuthMiddlewareFactory(application, config) {
	var authorization = (0, _koaBasicAuth2['default'])(config.credentials);

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
						context$2$0.next = 20;
						break;
					}

					authorize = authorization.bind(this);
					context$2$0.prev = 4;
					context$2$0.next = 7;
					return authorize(next);

				case 7:
					context$2$0.next = 18;
					break;

				case 9:
					context$2$0.prev = 9;
					context$2$0.t0 = context$2$0['catch'](4);

					console.log(context$2$0.t0);

					if (!(context$2$0.t0.status === 401)) {
						context$2$0.next = 17;
						break;
					}

					this.status = 401;
					this.set('WWW-Authenticate', 'Basic');
					this.body = 'Unauthorized';
					return context$2$0.abrupt('return');

				case 17:

					this['throw'](context$2$0.t0.status);

				case 18:
					context$2$0.next = 22;
					break;

				case 20:
					context$2$0.next = 22;
					return next;

				case 22:
				case 'end':
					return context$2$0.stop();
			}
		}, basicAuthMiddleware, this, [[4, 9]]);
	});
}

exports['default'] = basicAuthMiddlewareFactory;
module.exports = exports['default'];
//this.throw(401);