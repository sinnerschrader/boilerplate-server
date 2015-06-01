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