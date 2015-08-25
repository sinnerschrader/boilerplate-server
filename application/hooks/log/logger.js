'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _winston = require('winston');

var privates = new WeakMap();

var Logger = (function () {
	function Logger(prefix, options) {
		_classCallCheck(this, Logger);

		var engine = new _winston.Logger(options);
		engine.add(_winston.transports.Console, options);
		privates.set(this, { prefix: prefix, options: options, engine: engine });
	}

	_createClass(Logger, [{
		key: 'log',
		value: function log(method) {
			var _privates$get = privates.get(this);

			var engine = _privates$get.engine;
			var prefix = _privates$get.prefix;

			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			engine[method].apply(engine, [prefix].concat(args));
		}
	}, {
		key: 'error',
		value: function error() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			this.log.apply(this, ['error'].concat(args));
		}
	}, {
		key: 'warn',
		value: function warn() {
			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			this.log.apply(this, ['warn'].concat(args));
		}
	}, {
		key: 'info',
		value: function info() {
			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			this.log.apply(this, ['info'].concat(args));
		}
	}, {
		key: 'debug',
		value: function debug() {
			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			this.log.apply(this, ['debug'].concat(args));
		}
	}, {
		key: 'silly',
		value: function silly() {
			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			this.log.apply(this, ['silly'].concat(args));
		}
	}]);

	return Logger;
})();

function loggerFactory() {
	for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
		args[_key7] = arguments[_key7];
	}

	return new (_bind.apply(Logger, [null].concat(args)))();
}

exports['default'] = loggerFactory;
exports.Logger = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9sb2cvbG9nZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O3VCQUF5RSxTQUFTOztBQUVsRixJQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDOztJQUV6QixNQUFNO0FBQ0MsVUFEUCxNQUFNLENBQ0UsTUFBTSxFQUFFLE9BQU8sRUFBRTt3QkFEekIsTUFBTTs7QUFFVixNQUFJLE1BQU0sR0FBRyxvQkFBa0IsT0FBTyxDQUFDLENBQUM7QUFDeEMsUUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBa0IsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLFVBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsQ0FBQyxDQUFDO0VBQ2hEOztjQUxJLE1BQU07O1NBT1AsYUFBQyxNQUFNLEVBQVc7dUJBQ0ksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7O09BQXJDLE1BQU0saUJBQU4sTUFBTTtPQUFFLE1BQU0saUJBQU4sTUFBTTs7cUNBREwsSUFBSTtBQUFKLFFBQUk7OztBQUVuQixTQUFNLENBQUMsTUFBTSxPQUFDLENBQWQsTUFBTSxHQUFhLE1BQU0sU0FBSyxJQUFJLEVBQUUsQ0FBQztHQUNyQzs7O1NBRUssaUJBQVU7c0NBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUNiLE9BQUksQ0FBQyxHQUFHLE1BQUEsQ0FBUixJQUFJLEdBQUssT0FBTyxTQUFLLElBQUksRUFBQyxDQUFDO0dBQzNCOzs7U0FFSSxnQkFBVTtzQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ1osT0FBSSxDQUFDLEdBQUcsTUFBQSxDQUFSLElBQUksR0FBSyxNQUFNLFNBQUssSUFBSSxFQUFDLENBQUM7R0FDMUI7OztTQUVJLGdCQUFVO3NDQUFOLElBQUk7QUFBSixRQUFJOzs7QUFDWixPQUFJLENBQUMsR0FBRyxNQUFBLENBQVIsSUFBSSxHQUFLLE1BQU0sU0FBSyxJQUFJLEVBQUMsQ0FBQztHQUMxQjs7O1NBRUssaUJBQVU7c0NBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUNiLE9BQUksQ0FBQyxHQUFHLE1BQUEsQ0FBUixJQUFJLEdBQUssT0FBTyxTQUFLLElBQUksRUFBQyxDQUFDO0dBQzNCOzs7U0FFSyxpQkFBVTtzQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ2IsT0FBSSxDQUFDLEdBQUcsTUFBQSxDQUFSLElBQUksR0FBSyxPQUFPLFNBQUssSUFBSSxFQUFDLENBQUM7R0FDM0I7OztRQTlCSSxNQUFNOzs7QUFpQ1osU0FBUyxhQUFhLEdBQVU7b0NBQU4sSUFBSTtBQUFKLE1BQUk7OztBQUM3Qix5QkFBVyxNQUFNLGdCQUFJLElBQUksTUFBRTtDQUMzQjs7cUJBRWMsYUFBYTtRQUNULE1BQU0sR0FBaEIsTUFBTSIsImZpbGUiOiJsb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgYXMgV2luc3RvbkxvZ2dlciwgdHJhbnNwb3J0cyBhcyB3aW5zdG9uVHJhbnNwb3J0cyB9IGZyb20gJ3dpbnN0b24nO1xuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbmNsYXNzIExvZ2dlciB7XG5cdGNvbnN0cnVjdG9yIChwcmVmaXgsIG9wdGlvbnMpIHtcblx0XHRsZXQgZW5naW5lID0gbmV3IFdpbnN0b25Mb2dnZXIob3B0aW9ucyk7XG5cdFx0ZW5naW5lLmFkZCh3aW5zdG9uVHJhbnNwb3J0cy5Db25zb2xlLCBvcHRpb25zKTtcblx0XHRwcml2YXRlcy5zZXQodGhpcywgeyBwcmVmaXgsIG9wdGlvbnMsIGVuZ2luZSB9KTtcblx0fVxuXG5cdGxvZyAobWV0aG9kLCAuLi5hcmdzKSB7XG5cdFx0bGV0IHsgZW5naW5lLCBwcmVmaXggfSA9IHByaXZhdGVzLmdldCh0aGlzKTtcblx0XHRlbmdpbmVbbWV0aG9kXSguLi5bcHJlZml4LCAuLi5hcmdzXSk7XG5cdH1cblxuXHRlcnJvciAoLi4uYXJncykge1xuXHRcdHRoaXMubG9nKCdlcnJvcicsIC4uLmFyZ3MpO1xuXHR9XG5cblx0d2FybiAoLi4uYXJncykge1xuXHRcdHRoaXMubG9nKCd3YXJuJywgLi4uYXJncyk7XG5cdH1cblxuXHRpbmZvICguLi5hcmdzKSB7XG5cdFx0dGhpcy5sb2coJ2luZm8nLCAuLi5hcmdzKTtcblx0fVxuXG5cdGRlYnVnICguLi5hcmdzKSB7XG5cdFx0dGhpcy5sb2coJ2RlYnVnJywgLi4uYXJncyk7XG5cdH1cblxuXHRzaWxseSAoLi4uYXJncykge1xuXHRcdHRoaXMubG9nKCdzaWxseScsIC4uLmFyZ3MpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGxvZ2dlckZhY3RvcnkoLi4uYXJncykge1xuXHRyZXR1cm4gbmV3IExvZ2dlciguLi5hcmdzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyRmFjdG9yeTtcbmV4cG9ydCB7IExvZ2dlciBhcyBMb2dnZXIgfTtcbiJdfQ==