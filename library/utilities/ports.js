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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L3V0aWxpdGllcy9wb3J0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzJCQUFpRSxhQUFhOztJQUV4RSxLQUFLO1VBQUwsS0FBSzt3QkFBTCxLQUFLOzs7Y0FBTCxLQUFLOztTQUNFLGdCQUFZO3FDQUFQLElBQUk7QUFBSixRQUFJOzs7QUFDcEIsVUFBTyxJQUFJLE9BQU8sQ0FBRSxTQUFTLFFBQVEsQ0FBRyxPQUFPLEVBQUUsTUFBTSxFQUFHO0FBQ3pELGlCQUxLLGVBQWUsNEJBS04sSUFBSSxHQUFFLFNBQVMsRUFBRSxDQUFHLEtBQUssRUFBRSxNQUFNLEVBQUc7QUFDakQsWUFBTyxPQUFPLENBQUUsTUFBTSxLQUFLLFFBQVEsQ0FBRSxDQUFDO0tBQ3RDLEdBQUksQ0FBQztJQUNOLENBQUUsQ0FBQztHQUNKOzs7U0FFVyxnQkFBWTtzQ0FBUCxJQUFJO0FBQUosUUFBSTs7O0FBQ3BCLFVBQU8sSUFBSSxPQUFPLENBQUUsU0FBUyxRQUFRLENBQUcsT0FBTyxFQUFFLE1BQU0sRUFBRztBQUN6RCxpQkFiOEIsaUJBQWlCLDRCQWFqQyxJQUFJLEdBQUUsU0FBUyxFQUFFLENBQUcsS0FBSyxFQUFFLE1BQU0sRUFBRztBQUNqRCxZQUFPLE9BQU8sQ0FBRSxNQUFNLENBQUUsQ0FBQztLQUN6QixHQUFJLENBQUM7SUFDTixDQUFFLENBQUM7R0FDSjs7O1FBZkksS0FBSzs7O3FCQWtCSSxLQUFLIiwiZmlsZSI6InBvcnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjaGVja1BvcnRTdGF0dXMgYXMgdGVzdCwgZmluZEFQb3J0Tm90SW5Vc2UgYXMgZmluZH0gZnJvbSAncG9ydHNjYW5uZXInO1xuXG5jbGFzcyBQb3J0cyB7XG5cdHN0YXRpYyB0ZXN0ICggLi4uYXJncyApIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uIGZ1bGxmaWxsICggcmVzb2x2ZSwgcmVqZWN0ICkge1xuXHRcdFx0dGVzdCggLi4uWyAuLi5hcmdzLCBmdW5jdGlvbiBjYiAoIGVycm9yLCByZXN1bHQgKSB7XG5cdFx0XHRcdHJldHVybiByZXNvbHZlKCByZXN1bHQgPT09ICdjbG9zZWQnICk7XG5cdFx0XHR9IF0gKTtcblx0XHR9ICk7XG5cdH1cblxuXHRzdGF0aWMgZmluZCAoIC4uLmFyZ3MgKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCBmdW5jdGlvbiBmdWxsZmlsbCAoIHJlc29sdmUsIHJlamVjdCApIHtcblx0XHRcdGZpbmQoIC4uLlsgLi4uYXJncywgZnVuY3Rpb24gY2IgKCBlcnJvciwgcmVzdWx0ICkge1xuXHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSggcmVzdWx0ICk7XG5cdFx0XHR9IF0gKTtcblx0XHR9ICk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9ydHM7XG4iXX0=