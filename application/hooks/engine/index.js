'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

exports['default'] = {
	'after': ['hooks:log:start:after'],
	'modes': ['server'],

	'start': function startEngineHook(application) {
		return regeneratorRuntime.async(function startEngineHook$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					application.engine = (0, _engine2['default'])(application);
					return context$1$0.abrupt('return', this);

				case 2:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9lbmdpbmUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7c0JBQW1CLFVBQVU7Ozs7cUJBRWQ7QUFDZCxRQUFPLEVBQUUsQ0FBRSx1QkFBdUIsQ0FBRTtBQUNwQyxRQUFPLEVBQUUsQ0FBRSxRQUFRLENBQUU7O0FBRXJCLFFBQU8sRUFBRSxTQUFlLGVBQWUsQ0FBRyxXQUFXOzs7O0FBQ3BELGdCQUFXLENBQUMsTUFBTSxHQUFHLHlCQUFRLFdBQVcsQ0FBRSxDQUFDO3lDQUNwQyxJQUFJOzs7Ozs7O0VBQ1g7Q0FDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlbmdpbmUgZnJvbSAnLi9lbmdpbmUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdCdhZnRlcic6IFsgJ2hvb2tzOmxvZzpzdGFydDphZnRlcicgXSxcblx0J21vZGVzJzogWyAnc2VydmVyJyBdLFxuXG5cdCdzdGFydCc6IGFzeW5jIGZ1bmN0aW9uIHN0YXJ0RW5naW5lSG9vayAoIGFwcGxpY2F0aW9uICkge1xuXHRcdGFwcGxpY2F0aW9uLmVuZ2luZSA9IGVuZ2luZSggYXBwbGljYXRpb24gKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcbiJdfQ==