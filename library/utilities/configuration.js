'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

function loadConfiguration(path) {
	var filter = arguments.length <= 1 || arguments[1] === undefined ? /(.*).(js|json)$/ : arguments[1];
	var env = arguments.length <= 2 || arguments[2] === undefined ? 'development' : arguments[2];

	var rawConfiguration = (0, _requireAll2['default'])({
		'dirname': path,
		'filter': filter
	});

	rawConfiguration.environments = rawConfiguration.environments || {};

	var envConfiguration = rawConfiguration.environments[env] || {};

	return (0, _lodash.merge)({}, rawConfiguration, envConfiguration, { 'environment': env });
}

exports['default'] = loadConfiguration;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L3V0aWxpdGllcy9jb25maWd1cmF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O3NCQUFzQixRQUFROzswQkFDUCxhQUFhOzs7O0FBRXBDLFNBQVMsaUJBQWlCLENBQUcsSUFBSSxFQUFvRDtLQUFsRCxNQUFNLHlEQUFHLGlCQUFpQjtLQUFFLEdBQUcseURBQUcsYUFBYTs7QUFFakYsS0FBSSxnQkFBZ0IsR0FBRyw2QkFBWTtBQUNsQyxXQUFTLEVBQUUsSUFBSTtBQUNmLFVBQVEsRUFBRSxNQUFNO0VBQ2hCLENBQUUsQ0FBQzs7QUFFSixpQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQzs7QUFFcEUsS0FBSSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUUsR0FBRyxDQUFFLElBQUksRUFBRSxDQUFDOztBQUVsRSxRQUFPLFlBZEMsS0FBSyxFQWNDLEVBQUUsRUFDZixnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBRSxDQUFDO0NBQzlEOztxQkFFYyxpQkFBaUIiLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1lcmdlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCByZXF1aXJlQWxsIGZyb20gJ3JlcXVpcmUtYWxsJztcblxuZnVuY3Rpb24gbG9hZENvbmZpZ3VyYXRpb24gKCBwYXRoLCBmaWx0ZXIgPSAvKC4qKS4oanN8anNvbikkLywgZW52ID0gJ2RldmVsb3BtZW50JyApIHtcblxuXHRsZXQgcmF3Q29uZmlndXJhdGlvbiA9IHJlcXVpcmVBbGwoIHtcblx0XHQnZGlybmFtZSc6IHBhdGgsXG5cdFx0J2ZpbHRlcic6IGZpbHRlclxuXHR9ICk7XG5cblx0cmF3Q29uZmlndXJhdGlvbi5lbnZpcm9ubWVudHMgPSByYXdDb25maWd1cmF0aW9uLmVudmlyb25tZW50cyB8fCB7fTtcblxuXHRsZXQgZW52Q29uZmlndXJhdGlvbiA9IHJhd0NvbmZpZ3VyYXRpb24uZW52aXJvbm1lbnRzWyBlbnYgXSB8fCB7fTtcblxuXHRyZXR1cm4gbWVyZ2UoIHt9LFxuXHRcdHJhd0NvbmZpZ3VyYXRpb24sIGVudkNvbmZpZ3VyYXRpb24sIHsgJ2Vudmlyb25tZW50JzogZW52IH0gKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9hZENvbmZpZ3VyYXRpb247XG4iXX0=