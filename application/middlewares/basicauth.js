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
					//this.throw(401);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9taWRkbGV3YXJlcy9iYXNpY2F1dGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7NEJBQWlCLGdCQUFnQjs7OztBQUVqQyxTQUFTLDBCQUEwQixDQUFFLFdBQVcsRUFBRTs7QUFFakQsZ0NBQU8sU0FBVyxtQkFBbUIsQ0FBRSxJQUFJO01BQ3RDLE1BQU0sRUFLTCxhQUFhLEVBQ2IsUUFBUSxFQUdQLE9BQU8sRUFLUCxTQUFTOzs7O0FBZFgsV0FBTSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTOztXQUVoRSxNQUFNLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQTs7Ozs7O1lBQ3JCLElBQUk7Ozs7Ozs7QUFFTixrQkFBYSxHQUFHLCtCQUFLLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDeEMsYUFBUSxHQUFHLEtBQUs7O0FBRXBCLFNBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUNmLGFBQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQzs7QUFDN0MsY0FBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO01BQ25DOztTQUVJLFFBQVE7Ozs7O0FBQ1IsY0FBUyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7WUFFakMsU0FBUyxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztXQUVqQixlQUFNLE1BQU0sS0FBSyxHQUFHLENBQUE7Ozs7O0FBQ3ZCLFNBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLFNBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdEMsU0FBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7Ozs7OztBQUs1QixTQUFJLFNBQU0sQ0FBQyxlQUFNLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7OztZQUdwQixJQUFJOzs7Ozs7S0E5QkssbUJBQW1CO0VBaUNwQyxFQUFDO0NBQ0Y7O3FCQUVjLDBCQUEwQiIsImZpbGUiOiJiYXNpY2F1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXV0aCBmcm9tICdrb2EtYmFzaWMtYXV0aCc7XG5cbmZ1bmN0aW9uIGJhc2ljQXV0aE1pZGRsZXdhcmVGYWN0b3J5IChhcHBsaWNhdGlvbikge1xuXG5cdHJldHVybiBmdW5jdGlvbiAqIGJhc2ljQXV0aE1pZGRsZXdhcmUgKG5leHQpIHtcblx0XHRsZXQgY29uZmlnID0gYXBwbGljYXRpb24uY29uZmlndXJhdGlvbi5taWRkbGV3YXJlcy5lbmFibGVkLmJhc2ljYXV0aDtcblxuXHRcdGlmIChjb25maWcuZW5hYmxlZCA9PT0gZmFsc2UpIHtcblx0XHRcdHlpZWxkIG5leHQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBhdXRob3JpemF0aW9uID0gYXV0aChjb25maWcuY3JlZGVudGlhbHMpO1xuXHRcdFx0bGV0IGV4Y2x1ZGVkID0gZmFsc2U7XG5cblx0XHRcdGlmIChjb25maWcuZXhjbHVkZSkge1xuXHRcdFx0XHRsZXQgbWF0Y2hlciA9IG5ldyBSZWdFeHAoY29uZmlnLmV4Y2x1ZGUsICdnJyk7XG5cdFx0XHRcdGV4Y2x1ZGVkID0gbWF0Y2hlci50ZXN0KHRoaXMucGF0aCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZXhjbHVkZWQpIHtcblx0XHRcdFx0bGV0IGF1dGhvcml6ZSA9IGF1dGhvcml6YXRpb24uYmluZCh0aGlzKTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR5aWVsZCBhdXRob3JpemUobmV4dCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0aWYgKGVycm9yLnN0YXR1cyA9PT0gNDAxKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnN0YXR1cyA9IDQwMTtcblx0XHRcdFx0XHRcdHRoaXMuc2V0KCdXV1ctQXV0aGVudGljYXRlJywgJ0Jhc2ljJyk7XG5cdFx0XHRcdFx0XHR0aGlzLmJvZHkgPSAnVW5hdXRob3JpemVkJztcblx0XHRcdFx0XHRcdC8vdGhpcy50aHJvdyg0MDEpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMudGhyb3coZXJyb3Iuc3RhdHVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0eWllbGQgbmV4dDtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2ljQXV0aE1pZGRsZXdhcmVGYWN0b3J5O1xuIl19