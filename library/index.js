'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _boot = require('./boot');

var _boot2 = _interopRequireDefault(_boot);

function boilerplate() {
	var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	var augmented;
	return regeneratorRuntime.async(function boilerplate$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				augmented = Object.assign({}, {
					'cwd': process.cwd(),
					'base': options.base || (0, _path.resolve)(__dirname, '../'),
					'env': process.env.NODE_ENV || 'development',
					'name': options.name || 'boilerplate-server'
				}, options, { 'api': options });
				context$1$0.next = 3;
				return regeneratorRuntime.awrap((0, _boot2['default'])(augmented));

			case 3:
				return context$1$0.abrupt('return', context$1$0.sent);

			case 4:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
}

exports['default'] = boilerplate;
module.exports = exports['default'];

/*eslint-disable no-process-env */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9saWJyYXJ5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUF3QixNQUFNOztvQkFFYixRQUFROzs7O0FBRXpCLFNBQWUsV0FBVztLQUFHLE9BQU8seURBQUcsRUFBRTtLQUdwQyxTQUFTOzs7O0FBQVQsYUFBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUUsRUFBRSxFQUFFO0FBQ2pDLFVBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ3BCLFdBQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLG1CQUFTLFNBQVMsRUFBRSxLQUFLLENBQUU7QUFDbkQsVUFBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWE7QUFDNUMsV0FBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksb0JBQW9CO0tBQzVDLEVBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFFOztvQ0FFcEIsdUJBQU0sU0FBUyxDQUFFOzs7Ozs7Ozs7O0NBQzlCOztxQkFFYyxXQUFXIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgYm9vdCBmcm9tICcuL2Jvb3QnO1xuXG5hc3luYyBmdW5jdGlvbiBib2lsZXJwbGF0ZSAoIG9wdGlvbnMgPSB7fSApIHtcblx0Lyplc2xpbnQtZGlzYWJsZSBuby1wcm9jZXNzLWVudiAqL1xuXG5cdGxldCBhdWdtZW50ZWQgPSBPYmplY3QuYXNzaWduKCB7fSwge1xuXHRcdFx0J2N3ZCc6IHByb2Nlc3MuY3dkKCksXG5cdFx0XHQnYmFzZSc6IG9wdGlvbnMuYmFzZSB8fCByZXNvbHZlKCBfX2Rpcm5hbWUsICcuLi8nICksXG5cdFx0XHQnZW52JzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BtZW50Jyxcblx0XHRcdCduYW1lJzogb3B0aW9ucy5uYW1lIHx8ICdib2lsZXJwbGF0ZS1zZXJ2ZXInXG5cdFx0fSwgb3B0aW9ucywgeyAnYXBpJzogb3B0aW9ucyB9ICk7XG5cblx0cmV0dXJuIGF3YWl0IGJvb3QoIGF1Z21lbnRlZCApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBib2lsZXJwbGF0ZTtcbiJdfQ==