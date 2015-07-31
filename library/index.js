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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9saWJyYXJ5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUF3QixNQUFNOztvQkFFYixRQUFROzs7O0FBRXpCLFNBQWUsV0FBVztLQUFHLE9BQU8seURBQUcsRUFBRTtLQUdwQyxTQUFTOzs7O0FBQVQsYUFBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUUsRUFBRSxFQUFFO0FBQ2pDLFVBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ3BCLFdBQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLFVBVGxCLE9BQU8sRUFTb0IsU0FBUyxFQUFFLEtBQUssQ0FBRTtBQUNuRCxVQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYTtBQUM1QyxXQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxvQkFBb0I7S0FDNUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUU7O29DQUVwQix1QkFBTSxTQUFTLENBQUU7Ozs7Ozs7Ozs7Q0FDOUI7O3FCQUVjLFdBQVciLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCBib290IGZyb20gJy4vYm9vdCc7XG5cbmFzeW5jIGZ1bmN0aW9uIGJvaWxlcnBsYXRlICggb3B0aW9ucyA9IHt9ICkge1xuXHQvKmVzbGludC1kaXNhYmxlIG5vLXByb2Nlc3MtZW52ICovXG5cblx0bGV0IGF1Z21lbnRlZCA9IE9iamVjdC5hc3NpZ24oIHt9LCB7XG5cdFx0XHQnY3dkJzogcHJvY2Vzcy5jd2QoKSxcblx0XHRcdCdiYXNlJzogb3B0aW9ucy5iYXNlIHx8IHJlc29sdmUoIF9fZGlybmFtZSwgJy4uLycgKSxcblx0XHRcdCdlbnYnOiBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnLFxuXHRcdFx0J25hbWUnOiBvcHRpb25zLm5hbWUgfHwgJ2JvaWxlcnBsYXRlLXNlcnZlcidcblx0XHR9LCBvcHRpb25zLCB7ICdhcGknOiBvcHRpb25zIH0gKTtcblxuXHRyZXR1cm4gYXdhaXQgYm9vdCggYXVnbWVudGVkICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJvaWxlcnBsYXRlO1xuIl19