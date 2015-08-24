'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _portscanner = require('portscanner');

var Ports = (function () {
	function Ports() {
		_classCallCheck(this, Ports);
	}

	_createClass(Ports, null, [{
		key: 'test',
		value: function test() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return new Promise(function fullfill(resolve, reject) {
				_portscanner.checkPortStatus.apply(undefined, [].concat(args, [function cb(error, result) {
					return resolve(result === 'closed');
				}]));
			});
		}
	}, {
		key: 'find',
		value: function find() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			return new Promise(function fullfill(resolve, reject) {
				_portscanner.findAPortNotInUse.apply(undefined, [].concat(args, [function cb(error, result) {
					return resolve(result);
				}]));
			});
		}
	}]);

	return Ports;
})();

exports['default'] = Ports;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L3V0aWxpdGllcy9wb3J0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzJCQUFpRSxhQUFhOztJQUV4RSxLQUFLO1VBQUwsS0FBSzt3QkFBTCxLQUFLOzs7Y0FBTCxLQUFLOztTQUNFLGdCQUFZO3FDQUFQLElBQUk7QUFBSixRQUFJOzs7QUFDcEIsVUFBTyxJQUFJLE9BQU8sQ0FBRSxTQUFTLFFBQVEsQ0FBRyxPQUFPLEVBQUUsTUFBTSxFQUFHO0FBQ3pELDREQUFjLElBQUksR0FBRSxTQUFTLEVBQUUsQ0FBRyxLQUFLLEVBQUUsTUFBTSxFQUFHO0FBQ2pELFlBQU8sT0FBTyxDQUFFLE1BQU0sS0FBSyxRQUFRLENBQUUsQ0FBQztLQUN0QyxHQUFJLENBQUM7SUFDTixDQUFFLENBQUM7R0FDSjs7O1NBRVcsZ0JBQVk7c0NBQVAsSUFBSTtBQUFKLFFBQUk7OztBQUNwQixVQUFPLElBQUksT0FBTyxDQUFFLFNBQVMsUUFBUSxDQUFHLE9BQU8sRUFBRSxNQUFNLEVBQUc7QUFDekQsOERBQWMsSUFBSSxHQUFFLFNBQVMsRUFBRSxDQUFHLEtBQUssRUFBRSxNQUFNLEVBQUc7QUFDakQsWUFBTyxPQUFPLENBQUUsTUFBTSxDQUFFLENBQUM7S0FDekIsR0FBSSxDQUFDO0lBQ04sQ0FBRSxDQUFDO0dBQ0o7OztRQWZJLEtBQUs7OztxQkFrQkksS0FBSyIsImZpbGUiOiJwb3J0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y2hlY2tQb3J0U3RhdHVzIGFzIHRlc3QsIGZpbmRBUG9ydE5vdEluVXNlIGFzIGZpbmR9IGZyb20gJ3BvcnRzY2FubmVyJztcblxuY2xhc3MgUG9ydHMge1xuXHRzdGF0aWMgdGVzdCAoIC4uLmFyZ3MgKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCBmdW5jdGlvbiBmdWxsZmlsbCAoIHJlc29sdmUsIHJlamVjdCApIHtcblx0XHRcdHRlc3QoIC4uLlsgLi4uYXJncywgZnVuY3Rpb24gY2IgKCBlcnJvciwgcmVzdWx0ICkge1xuXHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSggcmVzdWx0ID09PSAnY2xvc2VkJyApO1xuXHRcdFx0fSBdICk7XG5cdFx0fSApO1xuXHR9XG5cblx0c3RhdGljIGZpbmQgKCAuLi5hcmdzICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSggZnVuY3Rpb24gZnVsbGZpbGwgKCByZXNvbHZlLCByZWplY3QgKSB7XG5cdFx0XHRmaW5kKCAuLi5bIC4uLmFyZ3MsIGZ1bmN0aW9uIGNiICggZXJyb3IsIHJlc3VsdCApIHtcblx0XHRcdFx0cmV0dXJuIHJlc29sdmUoIHJlc3VsdCApO1xuXHRcdFx0fSBdICk7XG5cdFx0fSApO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcnRzO1xuIl19