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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L2Jvb3QvbG9nZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDOztJQUV6QixRQUFRO0FBQ0QsVUFEUCxRQUFRLENBQ0MsTUFBTSxFQUFHO3dCQURsQixRQUFROztBQUVaLE1BQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNmLFVBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFFLENBQUMsQ0FBQztFQUN0Qzs7Y0FKSSxRQUFROztTQU1SLGNBQUMsS0FBSyxFQUFXO3VCQUNHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDOztPQUFwQyxLQUFLLGlCQUFMLEtBQUs7T0FBRSxNQUFNLGlCQUFOLE1BQU07O3FDQURKLElBQUk7QUFBSixRQUFJOzs7QUFFbkIsT0FBSSxPQUFPLElBQUksTUFBTSxTQUFLLElBQUksQ0FBQyxDQUFDO0FBQ2hDLFFBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyw0QkFBSyxPQUFPLEdBQUUsQ0FBQztHQUNoQzs7O1NBRUssZUFBQyxNQUFNLEVBQUU7d0JBQ0UsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7O09BQTVCLEtBQUssa0JBQUwsS0FBSzs7Ozs7OztBQUVYLHlCQUFpQixLQUFLLDhIQUFFO1NBQWYsSUFBSTs7QUFDWixZQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xCOzs7Ozs7Ozs7Ozs7Ozs7R0FDRDs7O1NBRUssaUJBQVU7c0NBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUNiLE9BQUksQ0FBQyxJQUFJLE1BQUEsQ0FBVCxJQUFJLEdBQU0sT0FBTyxTQUFLLElBQUksRUFBQyxDQUFDO0dBQzVCOzs7U0FFSSxnQkFBVTtzQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ1osT0FBSSxDQUFDLElBQUksTUFBQSxDQUFULElBQUksR0FBTSxNQUFNLFNBQUssSUFBSSxFQUFDLENBQUM7R0FDM0I7OztTQUVJLGdCQUFVO3NDQUFOLElBQUk7QUFBSixRQUFJOzs7QUFDWixPQUFJLENBQUMsSUFBSSxNQUFBLENBQVQsSUFBSSxHQUFNLE1BQU0sU0FBSyxJQUFJLEVBQUMsQ0FBQztHQUMzQjs7O1NBRUssaUJBQVU7c0NBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUNiLE9BQUksQ0FBQyxJQUFJLE1BQUEsQ0FBVCxJQUFJLEdBQU0sT0FBTyxTQUFLLElBQUksRUFBQyxDQUFDO0dBQzVCOzs7U0FFSyxpQkFBVTtzQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ2IsT0FBSSxDQUFDLElBQUksTUFBQSxDQUFULElBQUksR0FBTSxPQUFPLFNBQUssSUFBSSxFQUFDLENBQUM7R0FDNUI7OztRQXRDSSxRQUFROzs7QUF5Q2QsU0FBUyxlQUFlLEdBQVU7b0NBQU4sSUFBSTtBQUFKLE1BQUk7OztBQUMvQix5QkFBVyxRQUFRLGdCQUFJLElBQUksTUFBRTtDQUM3Qjs7cUJBRWMsZUFBZTtRQUNULFFBQVEsR0FBcEIsUUFBUSIsImZpbGUiOiJsb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbmNsYXNzIExvZ1F1ZXVlIHtcblx0Y29uc3RydWN0b3IgKCBwcmVmaXggKSB7XG5cdFx0bGV0IHF1ZXVlID0gW107XG5cdFx0cHJpdmF0ZXMuc2V0KHRoaXMsIHsgcXVldWUsIHByZWZpeCB9KTtcblx0fVxuXG5cdGZpbGwgKGxldmVsLCAuLi5hcmdzKSB7XG5cdFx0bGV0IHsgcXVldWUsIHByZWZpeCB9ID0gcHJpdmF0ZXMuZ2V0KHRoaXMpO1xuXHRcdGxldCBtZXNzYWdlID0gW3ByZWZpeCwgLi4uYXJnc107XG5cdFx0cXVldWUucHVzaChbbGV2ZWwsIC4uLm1lc3NhZ2VdKTtcblx0fVxuXG5cdGRyYWluIChsb2dnZXIpIHtcblx0XHRsZXQgeyBxdWV1ZSB9ID0gcHJpdmF0ZXMuZ2V0KHRoaXMpO1xuXG5cdFx0Zm9yIChsZXQgaXRlbSBvZiBxdWV1ZSkge1xuXHRcdFx0Y29uc29sZS5sb2coaXRlbSk7XG5cdFx0fVxuXHR9XG5cblx0ZXJyb3IgKC4uLmFyZ3MpIHtcblx0XHR0aGlzLmZpbGwoJ2Vycm9yJywgLi4uYXJncyk7XG5cdH1cblxuXHR3YXJuICguLi5hcmdzKSB7XG5cdFx0dGhpcy5maWxsKCd3YXJuJywgLi4uYXJncyk7XG5cdH1cblxuXHRpbmZvICguLi5hcmdzKSB7XG5cdFx0dGhpcy5maWxsKCdpbmZvJywgLi4uYXJncyk7XG5cdH1cblxuXHRkZWJ1ZyAoLi4uYXJncykge1xuXHRcdHRoaXMuZmlsbCgnZGVidWcnLCAuLi5hcmdzKTtcblx0fVxuXG5cdHNpbGx5ICguLi5hcmdzKSB7XG5cdFx0dGhpcy5maWxsKCdzaWxseScsIC4uLmFyZ3MpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGxvZ1F1ZXVlRmFjdG9yeSguLi5hcmdzKSB7XG5cdHJldHVybiBuZXcgTG9nUXVldWUoLi4uYXJncyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ1F1ZXVlRmFjdG9yeTtcbmV4cG9ydCB7IExvZ1F1ZXVlIGFzIExvZ1F1ZXVlIH07XG4iXX0=