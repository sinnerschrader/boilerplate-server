'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var privates = new WeakMap();

var LogQueue = (function () {
	function LogQueue(prefix) {
		_classCallCheck(this, LogQueue);

		var queue = [];
		privates.set(this, { queue: queue, prefix: prefix });
	}

	_createClass(LogQueue, [{
		key: 'fill',
		value: function fill(level) {
			var _privates$get = privates.get(this);

			var queue = _privates$get.queue;
			var prefix = _privates$get.prefix;

			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			var message = [prefix].concat(args);
			queue.push([level].concat(_toConsumableArray(message)));
		}
	}, {
		key: 'drain',
		value: function drain(logger) {
			var _privates$get2 = privates.get(this);

			var queue = _privates$get2.queue;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {

				for (var _iterator = queue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					console.log(item);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'error',
		value: function error() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			this.fill.apply(this, ['error'].concat(args));
		}
	}, {
		key: 'warn',
		value: function warn() {
			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			this.fill.apply(this, ['warn'].concat(args));
		}
	}, {
		key: 'info',
		value: function info() {
			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			this.fill.apply(this, ['info'].concat(args));
		}
	}, {
		key: 'debug',
		value: function debug() {
			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			this.fill.apply(this, ['debug'].concat(args));
		}
	}, {
		key: 'silly',
		value: function silly() {
			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			this.fill.apply(this, ['silly'].concat(args));
		}
	}]);

	return LogQueue;
})();

function logQueueFactory() {
	for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
		args[_key7] = arguments[_key7];
	}

	return new (_bind.apply(LogQueue, [null].concat(args)))();
}

exports['default'] = logQueueFactory;
exports.LogQueue = LogQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L2Jvb3QvcXVldWVkLWxvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7SUFFekIsUUFBUTtBQUNELFVBRFAsUUFBUSxDQUNDLE1BQU0sRUFBRzt3QkFEbEIsUUFBUTs7QUFFWixNQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixVQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxDQUFDLENBQUM7RUFDdEM7O2NBSkksUUFBUTs7U0FNUixjQUFDLEtBQUssRUFBVzt1QkFDRyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzs7T0FBcEMsS0FBSyxpQkFBTCxLQUFLO09BQUUsTUFBTSxpQkFBTixNQUFNOztxQ0FESixJQUFJO0FBQUosUUFBSTs7O0FBRW5CLE9BQUksT0FBTyxJQUFJLE1BQU0sU0FBSyxJQUFJLENBQUMsQ0FBQztBQUNoQyxRQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssNEJBQUssT0FBTyxHQUFFLENBQUM7R0FDaEM7OztTQUVLLGVBQUMsTUFBTSxFQUFFO3dCQUNFLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDOztPQUE1QixLQUFLLGtCQUFMLEtBQUs7Ozs7Ozs7QUFFWCx5QkFBaUIsS0FBSyw4SEFBRTtTQUFmLElBQUk7O0FBQ1osWUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQjs7Ozs7Ozs7Ozs7Ozs7O0dBQ0Q7OztTQUVLLGlCQUFVO3NDQUFOLElBQUk7QUFBSixRQUFJOzs7QUFDYixPQUFJLENBQUMsSUFBSSxNQUFBLENBQVQsSUFBSSxHQUFNLE9BQU8sU0FBSyxJQUFJLEVBQUMsQ0FBQztHQUM1Qjs7O1NBRUksZ0JBQVU7c0NBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUNaLE9BQUksQ0FBQyxJQUFJLE1BQUEsQ0FBVCxJQUFJLEdBQU0sTUFBTSxTQUFLLElBQUksRUFBQyxDQUFDO0dBQzNCOzs7U0FFSSxnQkFBVTtzQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ1osT0FBSSxDQUFDLElBQUksTUFBQSxDQUFULElBQUksR0FBTSxNQUFNLFNBQUssSUFBSSxFQUFDLENBQUM7R0FDM0I7OztTQUVLLGlCQUFVO3NDQUFOLElBQUk7QUFBSixRQUFJOzs7QUFDYixPQUFJLENBQUMsSUFBSSxNQUFBLENBQVQsSUFBSSxHQUFNLE9BQU8sU0FBSyxJQUFJLEVBQUMsQ0FBQztHQUM1Qjs7O1NBRUssaUJBQVU7c0NBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUNiLE9BQUksQ0FBQyxJQUFJLE1BQUEsQ0FBVCxJQUFJLEdBQU0sT0FBTyxTQUFLLElBQUksRUFBQyxDQUFDO0dBQzVCOzs7UUF0Q0ksUUFBUTs7O0FBeUNkLFNBQVMsZUFBZSxHQUFVO29DQUFOLElBQUk7QUFBSixNQUFJOzs7QUFDL0IseUJBQVcsUUFBUSxnQkFBSSxJQUFJLE1BQUU7Q0FDN0I7O3FCQUVjLGVBQWU7UUFDVCxRQUFRLEdBQXBCLFFBQVEiLCJmaWxlIjoicXVldWVkLWxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKTtcblxuY2xhc3MgTG9nUXVldWUge1xuXHRjb25zdHJ1Y3RvciAoIHByZWZpeCApIHtcblx0XHRsZXQgcXVldWUgPSBbXTtcblx0XHRwcml2YXRlcy5zZXQodGhpcywgeyBxdWV1ZSwgcHJlZml4IH0pO1xuXHR9XG5cblx0ZmlsbCAobGV2ZWwsIC4uLmFyZ3MpIHtcblx0XHRsZXQgeyBxdWV1ZSwgcHJlZml4IH0gPSBwcml2YXRlcy5nZXQodGhpcyk7XG5cdFx0bGV0IG1lc3NhZ2UgPSBbcHJlZml4LCAuLi5hcmdzXTtcblx0XHRxdWV1ZS5wdXNoKFtsZXZlbCwgLi4ubWVzc2FnZV0pO1xuXHR9XG5cblx0ZHJhaW4gKGxvZ2dlcikge1xuXHRcdGxldCB7IHF1ZXVlIH0gPSBwcml2YXRlcy5nZXQodGhpcyk7XG5cblx0XHRmb3IgKGxldCBpdGVtIG9mIHF1ZXVlKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhpdGVtKTtcblx0XHR9XG5cdH1cblxuXHRlcnJvciAoLi4uYXJncykge1xuXHRcdHRoaXMuZmlsbCgnZXJyb3InLCAuLi5hcmdzKTtcblx0fVxuXG5cdHdhcm4gKC4uLmFyZ3MpIHtcblx0XHR0aGlzLmZpbGwoJ3dhcm4nLCAuLi5hcmdzKTtcblx0fVxuXG5cdGluZm8gKC4uLmFyZ3MpIHtcblx0XHR0aGlzLmZpbGwoJ2luZm8nLCAuLi5hcmdzKTtcblx0fVxuXG5cdGRlYnVnICguLi5hcmdzKSB7XG5cdFx0dGhpcy5maWxsKCdkZWJ1ZycsIC4uLmFyZ3MpO1xuXHR9XG5cblx0c2lsbHkgKC4uLmFyZ3MpIHtcblx0XHR0aGlzLmZpbGwoJ3NpbGx5JywgLi4uYXJncyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbG9nUXVldWVGYWN0b3J5KC4uLmFyZ3MpIHtcblx0cmV0dXJuIG5ldyBMb2dRdWV1ZSguLi5hcmdzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9nUXVldWVGYWN0b3J5O1xuZXhwb3J0IHsgTG9nUXVldWUgYXMgTG9nUXVldWUgfTtcbiJdfQ==