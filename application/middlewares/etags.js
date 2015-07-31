'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = startEtagsMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _koaConditionalGet = require('koa-conditional-get');

var _koaConditionalGet2 = _interopRequireDefault(_koaConditionalGet);

var _koaEtag = require('koa-etag');

var _koaEtag2 = _interopRequireDefault(_koaEtag);

function startEtagsMiddleware(application) {
	application.engine.use((0, _koaConditionalGet2['default'])());

	application.engine.use(regeneratorRuntime.mark(function test(next) {
		return regeneratorRuntime.wrap(function test$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.next = 2;
					return next;

				case 2:
				case 'end':
					return context$2$0.stop();
			}
		}, test, this);
	}));

	return (0, _koaEtag2['default'])();
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9taWRkbGV3YXJlcy9ldGFncy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztxQkFHd0Isb0JBQW9COzs7O2lDQUhwQixxQkFBcUI7Ozs7dUJBQzVCLFVBQVU7Ozs7QUFFWixTQUFTLG9CQUFvQixDQUFHLFdBQVcsRUFBRztBQUM1RCxZQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQ0FBYSxDQUFDLENBQUM7O0FBRXRDLFlBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyx5QkFBQyxTQUFXLElBQUksQ0FBQyxJQUFJOzs7OztZQUNwQyxJQUFJOzs7Ozs7S0FEdUIsSUFBSTtFQUVyQyxFQUFDLENBQUM7O0FBRUgsUUFBTywyQkFBTSxDQUFDO0NBQ2QiLCJmaWxlIjoiZXRhZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uZGl0aW9uYWwgZnJvbSAna29hLWNvbmRpdGlvbmFsLWdldCc7XG5pbXBvcnQgZXRhZyBmcm9tICdrb2EtZXRhZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXJ0RXRhZ3NNaWRkbGV3YXJlICggYXBwbGljYXRpb24gKSB7XG5cdGFwcGxpY2F0aW9uLmVuZ2luZS51c2UoY29uZGl0aW9uYWwoKSk7XG5cblx0YXBwbGljYXRpb24uZW5naW5lLnVzZShmdW5jdGlvbiAqIHRlc3QobmV4dCkge1xuXHRcdHlpZWxkIG5leHQ7XG5cdH0pO1xuXG5cdHJldHVybiBldGFnKCk7XG59XG4iXX0=