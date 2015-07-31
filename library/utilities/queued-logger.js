'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

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

					var _item = _toArray(item);

					var method = _item[0];

					var message = _item.slice(1);

					logger[method].apply(logger, _toConsumableArray(message));
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
		key: 'deploy',
		value: function deploy(logger) {
			this.fill = function (level) {
				for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					args[_key2 - 1] = arguments[_key2];
				}

				logger[level].apply(logger, args);
			};
		}
	}, {
		key: 'error',
		value: function error() {
			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			this.fill.apply(this, ['error'].concat(args));
		}
	}, {
		key: 'warn',
		value: function warn() {
			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			this.fill.apply(this, ['warn'].concat(args));
		}
	}, {
		key: 'info',
		value: function info() {
			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			this.fill.apply(this, ['info'].concat(args));
		}
	}, {
		key: 'debug',
		value: function debug() {
			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			this.fill.apply(this, ['debug'].concat(args));
		}
	}, {
		key: 'silly',
		value: function silly() {
			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			this.fill.apply(this, ['silly'].concat(args));
		}
	}]);

	return LogQueue;
})();

function logQueueFactory() {
	for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
		args[_key8] = arguments[_key8];
	}

	return new (_bind.apply(LogQueue, [null].concat(args)))();
}

exports['default'] = logQueueFactory;
exports.LogQueue = LogQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L3V0aWxpdGllcy9xdWV1ZWQtbG9nZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sUUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7O0lBRXpCLFFBQVE7QUFDRCxVQURQLFFBQVEsQ0FDQyxNQUFNLEVBQUc7d0JBRGxCLFFBQVE7O0FBRVosTUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsVUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsQ0FBQyxDQUFDO0VBQ3RDOztjQUpJLFFBQVE7O1NBTVIsY0FBQyxLQUFLLEVBQVc7dUJBQ0csUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7O09BQXBDLEtBQUssaUJBQUwsS0FBSztPQUFFLE1BQU0saUJBQU4sTUFBTTs7cUNBREosSUFBSTtBQUFKLFFBQUk7OztBQUVuQixPQUFJLE9BQU8sSUFBSSxNQUFNLFNBQUssSUFBSSxDQUFDLENBQUM7QUFDaEMsUUFBSyxDQUFDLElBQUksRUFBRSxLQUFLLDRCQUFLLE9BQU8sR0FBRSxDQUFDO0dBQ2hDOzs7U0FFSyxlQUFDLE1BQU0sRUFBRTt3QkFDRSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzs7T0FBNUIsS0FBSyxrQkFBTCxLQUFLOzs7Ozs7O0FBRVgseUJBQWlCLEtBQUssOEhBQUU7U0FBZixJQUFJOzswQkFDZSxJQUFJOztTQUExQixNQUFNOztTQUFLLE9BQU87O0FBQ3ZCLFdBQU0sQ0FBQyxNQUFNLE9BQUMsQ0FBZCxNQUFNLHFCQUFZLE9BQU8sRUFBQyxDQUFDO0tBQzNCOzs7Ozs7Ozs7Ozs7Ozs7R0FDRDs7O1NBRU0sZ0JBQUMsTUFBTSxFQUFFO0FBQ2YsT0FBSSxDQUFDLElBQUksR0FBRyxVQUFTLEtBQUssRUFBVzt1Q0FBTixJQUFJO0FBQUosU0FBSTs7O0FBQ2xDLFVBQU0sQ0FBQyxLQUFLLE9BQUMsQ0FBYixNQUFNLEVBQVcsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztHQUNGOzs7U0FFSyxpQkFBVTtzQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ2IsT0FBSSxDQUFDLElBQUksTUFBQSxDQUFULElBQUksR0FBTSxPQUFPLFNBQUssSUFBSSxFQUFDLENBQUM7R0FDNUI7OztTQUVJLGdCQUFVO3NDQUFOLElBQUk7QUFBSixRQUFJOzs7QUFDWixPQUFJLENBQUMsSUFBSSxNQUFBLENBQVQsSUFBSSxHQUFNLE1BQU0sU0FBSyxJQUFJLEVBQUMsQ0FBQztHQUMzQjs7O1NBRUksZ0JBQVU7c0NBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUNaLE9BQUksQ0FBQyxJQUFJLE1BQUEsQ0FBVCxJQUFJLEdBQU0sTUFBTSxTQUFLLElBQUksRUFBQyxDQUFDO0dBQzNCOzs7U0FFSyxpQkFBVTtzQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ2IsT0FBSSxDQUFDLElBQUksTUFBQSxDQUFULElBQUksR0FBTSxPQUFPLFNBQUssSUFBSSxFQUFDLENBQUM7R0FDNUI7OztTQUVLLGlCQUFVO3NDQUFOLElBQUk7QUFBSixRQUFJOzs7QUFDYixPQUFJLENBQUMsSUFBSSxNQUFBLENBQVQsSUFBSSxHQUFNLE9BQU8sU0FBSyxJQUFJLEVBQUMsQ0FBQztHQUM1Qjs7O1FBN0NJLFFBQVE7OztBQWdEZCxTQUFTLGVBQWUsR0FBVTtvQ0FBTixJQUFJO0FBQUosTUFBSTs7O0FBQy9CLHlCQUFXLFFBQVEsZ0JBQUksSUFBSSxNQUFFO0NBQzdCOztxQkFFYyxlQUFlO1FBQ1QsUUFBUSxHQUFwQixRQUFRIiwiZmlsZSI6InF1ZXVlZC1sb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbmNsYXNzIExvZ1F1ZXVlIHtcblx0Y29uc3RydWN0b3IgKCBwcmVmaXggKSB7XG5cdFx0bGV0IHF1ZXVlID0gW107XG5cdFx0cHJpdmF0ZXMuc2V0KHRoaXMsIHsgcXVldWUsIHByZWZpeCB9KTtcblx0fVxuXG5cdGZpbGwgKGxldmVsLCAuLi5hcmdzKSB7XG5cdFx0bGV0IHsgcXVldWUsIHByZWZpeCB9ID0gcHJpdmF0ZXMuZ2V0KHRoaXMpO1xuXHRcdGxldCBtZXNzYWdlID0gW3ByZWZpeCwgLi4uYXJnc107XG5cdFx0cXVldWUucHVzaChbbGV2ZWwsIC4uLm1lc3NhZ2VdKTtcblx0fVxuXG5cdGRyYWluIChsb2dnZXIpIHtcblx0XHRsZXQgeyBxdWV1ZSB9ID0gcHJpdmF0ZXMuZ2V0KHRoaXMpO1xuXG5cdFx0Zm9yIChsZXQgaXRlbSBvZiBxdWV1ZSkge1xuXHRcdFx0bGV0IFttZXRob2QsIC4uLm1lc3NhZ2VdID0gaXRlbTtcblx0XHRcdGxvZ2dlclttZXRob2RdKC4uLm1lc3NhZ2UpO1xuXHRcdH1cblx0fVxuXG5cdGRlcGxveSAobG9nZ2VyKSB7XG5cdFx0dGhpcy5maWxsID0gZnVuY3Rpb24obGV2ZWwsIC4uLmFyZ3MpIHtcblx0XHRcdGxvZ2dlcltsZXZlbF0oLi4uYXJncyk7XG5cdFx0fTtcblx0fVxuXG5cdGVycm9yICguLi5hcmdzKSB7XG5cdFx0dGhpcy5maWxsKCdlcnJvcicsIC4uLmFyZ3MpO1xuXHR9XG5cblx0d2FybiAoLi4uYXJncykge1xuXHRcdHRoaXMuZmlsbCgnd2FybicsIC4uLmFyZ3MpO1xuXHR9XG5cblx0aW5mbyAoLi4uYXJncykge1xuXHRcdHRoaXMuZmlsbCgnaW5mbycsIC4uLmFyZ3MpO1xuXHR9XG5cblx0ZGVidWcgKC4uLmFyZ3MpIHtcblx0XHR0aGlzLmZpbGwoJ2RlYnVnJywgLi4uYXJncyk7XG5cdH1cblxuXHRzaWxseSAoLi4uYXJncykge1xuXHRcdHRoaXMuZmlsbCgnc2lsbHknLCAuLi5hcmdzKTtcblx0fVxufVxuXG5mdW5jdGlvbiBsb2dRdWV1ZUZhY3RvcnkoLi4uYXJncykge1xuXHRyZXR1cm4gbmV3IExvZ1F1ZXVlKC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsb2dRdWV1ZUZhY3Rvcnk7XG5leHBvcnQgeyBMb2dRdWV1ZSBhcyBMb2dRdWV1ZSB9O1xuIl19