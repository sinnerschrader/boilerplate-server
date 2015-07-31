'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var lifecycle = {
	'configure': ['hookWillConfigure', 'hookDidConfigure'],
	'start': ['hookWillStart', 'hookDidStart']
};

var Hook = (function () {
	function Hook(application, name, extender) {
		var _this = this;

		_classCallCheck(this, Hook);

		this.wait = true;
		this.disabled = false;
		this.modes = [];
		this.after = ['application:after'];
		this.defaults = {};
		this.configuration = {};
		this.stageName = 'init';
		this.stages = {
			'register': false,
			'configure': false,
			'start': false
		};

		Object.assign(this, extender);

		this.configurationKey = extender.configurationKey || name;
		this.wait = typeof extender.wait !== 'undefined' ? extender.wait : this.wait;
		this.disabled = typeof extender.disabled !== 'undefined' ? extender.disabled : this.disabled;

		this.log = {
			'error': function error() {
				var _application$log;

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				(_application$log = application.log).error.apply(_application$log, ['[hook:' + _this.name + ':' + _this.stageName + ']'].concat(args));
			},
			'warn': function warn() {
				var _application$log2;

				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
				}

				(_application$log2 = application.log).warn.apply(_application$log2, ['[hook:' + _this.name + ':' + _this.stageName + ']'].concat(args));
			},
			'info': function info() {
				var _application$log3;

				for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					args[_key3] = arguments[_key3];
				}

				(_application$log3 = application.log).info.apply(_application$log3, ['[hook:' + _this.name + ':' + _this.stageName + ']'].concat(args));
			},
			'debug': function debug() {
				var _application$log4;

				for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
					args[_key4] = arguments[_key4];
				}

				(_application$log4 = application.log).debug.apply(_application$log4, ['[hook:' + _this.name + ':' + _this.stageName + ']'].concat(args));
			},
			'silly': function silly() {
				var _application$log5;

				for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
					args[_key5] = arguments[_key5];
				}

				(_application$log5 = application.log).silly.apply(_application$log5, ['[hook:' + _this.name + ':' + _this.stageName + ']'].concat(args));
			}
		};
	}

	_createClass(Hook, [{
		key: 'register',
		value: function register(application) {
			var _this2 = this;

			if (this.stages.register) {
				this.log.warn('Hook \'' + this.name + '\' already registered.');
				return this;
			}

			this.hookWillRegister(application);
			this.stages.register = true;
			this.stageName = 'register';

			this.log.silly('Registering hook \'' + this.name + '\'');

			if (this.modes.length > 0 && this.modes.indexOf(application.runtime.mode) === -1) {
				var modeWord = this.modes.length === 1 ? 'mode' : 'modes';
				this.log.debug('Hook ' + this.name + ' is disabled in mode ' + application.runtime.mode + '. Enabled in ' + modeWord + ' ' + this.modes.join(', ') + '.');
				this.disable(application);
				return this;
			}

			function onSubscription() {
				return regeneratorRuntime.async(function onSubscription$(context$3$0) {
					while (1) switch (context$3$0.prev = context$3$0.next) {
						case 0:
							if (!(application.configuration && application.configuration.hooks.enabled[this.name] === false)) {
								context$3$0.next = 4;
								break;
							}

							this.log.debug('Hook \'' + this.name + '\' is disabled explicitly.');
							this.disable(application);
							return context$3$0.abrupt('return', this);

						case 4:
							context$3$0.next = 6;
							return regeneratorRuntime.awrap(this.stage('configure', application));

						case 6:
							context$3$0.next = 8;
							return regeneratorRuntime.awrap(this.stage('start', application));

						case 8:
						case 'end':
							return context$3$0.stop();
					}
				}, null, this);
			}

			this.after.forEach(function (eventName) {
				application.on(eventName, onSubscription.bind(_this2));
			});

			this.hookDidRegister(application);
			return this;
		}
	}, {
		key: 'disable',
		value: function disable(application) {
			if (!this.disabled) {
				this.disabled = true;

				application.emit('hooks:' + this.name + ':configure:before');
				application.emit('hooks:configure:before', this.name);
				application.emit('hooks:' + this.name + ':start:after');
				application.emit('hooks:start:after', this.name);
			}

			return this;
		}
	}, {
		key: 'hookWillRegister',
		value: function hookWillRegister(application) {
			return this;
		}
	}, {
		key: 'hookDidRegister',
		value: function hookDidRegister(application) {
			return this;
		}
	}, {
		key: 'stage',
		value: function stage(stageName, application) {
			return regeneratorRuntime.async(function stage$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						if (!this.stages[stageName]) {
							context$2$0.next = 2;
							break;
						}

						return context$2$0.abrupt('return', this);

					case 2:

						this.stageName = stageName;
						this.log.debug('Running stage \'' + stageName + '\' on hook \'' + this.name + '\'');
						application.emit('hooks:' + this.name + ':' + stageName + ':before');
						application.emit('hooks:' + stageName + ':before', this.name);

						context$2$0.prev = 6;
						context$2$0.next = 9;
						return regeneratorRuntime.awrap(this[lifecycle[stageName][0]](application));

					case 9:
						context$2$0.next = 11;
						return regeneratorRuntime.awrap(this[stageName](application));

					case 11:
						this.stages[stageName] = true;

						this.log.debug('Ran stage \'' + stageName + '\' on hook \'' + this.name + '\'');
						context$2$0.next = 15;
						return regeneratorRuntime.awrap(this[lifecycle[stageName][1]](application));

					case 15:

						application.emit('hooks:' + this.name + ':' + stageName + ':after');
						application.emit('hooks:' + stageName + ':after', this.name);

						return context$2$0.abrupt('return', this);

					case 20:
						context$2$0.prev = 20;
						context$2$0.t0 = context$2$0['catch'](6);

						this.log.error('An error ocurred on stage ' + stageName + ' of hook \'' + this.name + '\'');
						this.log.error(context$2$0.t0);

						throw new Error(context$2$0.t0);

					case 25:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this, [[6, 20]]);
		}
	}, {
		key: 'configure',
		value: function configure(application) {
			return regeneratorRuntime.async(function configure$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						this.configuration = Object.assign(this.configuration, this.defaults, application.configuration[this.configurationKey]);
						return context$2$0.abrupt('return', this);

					case 2:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}, {
		key: 'hookWillConfigure',
		value: function hookWillConfigure(application) {
			return regeneratorRuntime.async(function hookWillConfigure$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						return context$2$0.abrupt('return', this);

					case 1:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}, {
		key: 'hookDidConfigure',
		value: function hookDidConfigure(application) {
			return regeneratorRuntime.async(function hookDidConfigure$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						return context$2$0.abrupt('return', this);

					case 1:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}, {
		key: 'start',
		value: function start(application) {
			return regeneratorRuntime.async(function start$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						return context$2$0.abrupt('return', this);

					case 1:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}, {
		key: 'hookWillStart',
		value: function hookWillStart(application) {
			return regeneratorRuntime.async(function hookWillStart$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						return context$2$0.abrupt('return', this);

					case 1:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}, {
		key: 'hookDidStart',
		value: function hookDidStart(application) {
			return regeneratorRuntime.async(function hookDidStart$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						return context$2$0.abrupt('return', this);

					case 1:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}]);

	return Hook;
})();

function hookFactory() {
	for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
		args[_key6] = arguments[_key6];
	}

	return new (_bind.apply(Hook, [null].concat(args)))();
}

exports['default'] = hookFactory;
exports.Hook = Hook;

// application.configuration is not ready before hooks:configure ran
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L2hvb2tzL2RlZmF1bHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFNBQVMsR0FBRztBQUNqQixZQUFXLEVBQUUsQ0FBRSxtQkFBbUIsRUFBRSxrQkFBa0IsQ0FBRTtBQUN4RCxRQUFPLEVBQUUsQ0FBRSxlQUFlLEVBQUUsY0FBYyxDQUFFO0NBQzVDLENBQUM7O0lBRUksSUFBSTtBQWlCRyxVQWpCUCxJQUFJLENBaUJLLFdBQVcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFHOzs7d0JBakJ2QyxJQUFJOztPQUNULElBQUksR0FBRyxJQUFJO09BQ1gsUUFBUSxHQUFHLEtBQUs7T0FDaEIsS0FBSyxHQUFHLEVBQUU7T0FFVixLQUFLLEdBQUcsQ0FBRSxtQkFBbUIsQ0FBRTtPQUMvQixRQUFRLEdBQUcsRUFBRTtPQUNiLGFBQWEsR0FBRyxFQUFFO09BRWxCLFNBQVMsR0FBRyxNQUFNO09BRWxCLE1BQU0sR0FBRztBQUNSLGFBQVUsRUFBRSxLQUFLO0FBQ2pCLGNBQVcsRUFBRSxLQUFLO0FBQ2xCLFVBQU8sRUFBRSxLQUFLO0dBQ2Q7O0FBR0EsUUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7O0FBRTlCLE1BQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDO0FBQzFELE1BQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxRQUFRLENBQUMsSUFBSSxLQUFLLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDN0UsTUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLFFBQVEsQ0FBQyxRQUFRLEtBQUssV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7QUFFN0YsTUFBSSxDQUFDLEdBQUcsR0FBRztBQUNWLFVBQU8sRUFBRSxpQkFBZTs7O3ND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Ozs7U0FFdUIsMkJBQUUsV0FBVzs7OzswQ0FDN0IsSUFBSTs7Ozs7OztHQUNYOzs7U0FFc0IsMEJBQUUsV0FBVzs7OzswQ0FDNUIsSUFBSTs7Ozs7OztHQUNYOzs7U0FFVyxlQUFFLFdBQVc7Ozs7MENBQ2pCLElBQUk7Ozs7Ozs7R0FDWDs7O1NBRW1CLHVCQUFFLFdBQVc7Ozs7MENBQ3pCLElBQUk7Ozs7Ozs7R0FDWDs7O1NBRWtCLHNCQUFFLFdBQVc7Ozs7MENBQ3hCLElBQUk7Ozs7Ozs7R0FDWDs7O1FBbEpJLElBQUk7OztBQXFKVixTQUFTLFdBQVcsR0FBYTtvQ0FBUCxJQUFJO0FBQUosTUFBSTs7O0FBQzdCLHlCQUFXLElBQUksZ0JBQUssSUFBSSxNQUFHO0NBQzNCOztxQkFFYyxXQUFXO1FBQ1QsSUFBSSxHQUFaLElBQUkiLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxpZmVjeWNsZSA9IHtcblx0J2NvbmZpZ3VyZSc6IFsgJ2hvb2tXaWxsQ29uZmlndXJlJywgJ2hvb2tEaWRDb25maWd1cmUnIF0sXG5cdCdzdGFydCc6IFsgJ2hvb2tXaWxsU3RhcnQnLCAnaG9va0RpZFN0YXJ0JyBdXG59O1xuXG5jbGFzcyBIb29rIHtcblx0d2FpdCA9IHRydWU7XG5cdGRpc2FibGVkID0gZmFsc2U7XG5cdG1vZGVzID0gW107XG5cblx0YWZ0ZXIgPSBbICdhcHBsaWNhdGlvbjphZnRlcicgXTtcblx0ZGVmYXVsdHMgPSB7fTtcblx0Y29uZmlndXJhdGlvbiA9IHt9O1xuXG5cdHN0YWdlTmFtZSA9ICdpbml0JztcblxuXHRzdGFnZXMgPSB7XG5cdFx0J3JlZ2lzdGVyJzogZmFsc2UsXG5cdFx0J2NvbmZpZ3VyZSc6IGZhbHNlLFxuXHRcdCdzdGFydCc6IGZhbHNlXG5cdH07XG5cblx0Y29uc3RydWN0b3IgKCBhcHBsaWNhdGlvbiwgbmFtZSwgZXh0ZW5kZXIgKSB7XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBleHRlbmRlcik7XG5cblx0XHR0aGlzLmNvbmZpZ3VyYXRpb25LZXkgPSBleHRlbmRlci5jb25maWd1cmF0aW9uS2V5IHx8IG5hbWU7XG5cdFx0dGhpcy53YWl0ID0gdHlwZW9mIGV4dGVuZGVyLndhaXQgIT09ICd1bmRlZmluZWQnID8gZXh0ZW5kZXIud2FpdCA6IHRoaXMud2FpdDtcblx0XHR0aGlzLmRpc2FibGVkID0gdHlwZW9mIGV4dGVuZGVyLmRpc2FibGVkICE9PSAndW5kZWZpbmVkJyA/IGV4dGVuZGVyLmRpc2FibGVkIDogdGhpcy5kaXNhYmxlZDtcblxuXHRcdHRoaXMubG9nID0ge1xuXHRcdFx0J2Vycm9yJzogKCAuLi5hcmdzICkgPT4geyBhcHBsaWNhdGlvbi5sb2cuZXJyb3IoIGBbaG9vazoke3RoaXMubmFtZX06JHt0aGlzLnN0YWdlTmFtZX1dYCwgLi4uYXJncyApOyB9LFxuXHRcdFx0J3dhcm4nOiAoIC4uLmFyZ3MgKSA9PiB7IGFwcGxpY2F0aW9uLmxvZy53YXJuKCBgW2hvb2s6JHt0aGlzLm5hbWV9OiR7dGhpcy5zdGFnZU5hbWV9XWAsIC4uLmFyZ3MgKTsgfSxcblx0XHRcdCdpbmZvJzogKCAuLi5hcmdzICkgPT4geyBhcHBsaWNhdGlvbi5sb2cuaW5mbyggYFtob29rOiR7dGhpcy5uYW1lfToke3RoaXMuc3RhZ2VOYW1lfV1gLCAuLi5hcmdzICk7IH0sXG5cdFx0XHQnZGVidWcnOiAoIC4uLmFyZ3MgKSA9PiB7IGFwcGxpY2F0aW9uLmxvZy5kZWJ1ZyggYFtob29rOiR7dGhpcy5uYW1lfToke3RoaXMuc3RhZ2VOYW1lfV1gLCAuLi5hcmdzICk7IH0sXG5cdFx0XHQnc2lsbHknOiAoIC4uLmFyZ3MgKSA9PiB7IGFwcGxpY2F0aW9uLmxvZy5zaWxseSggYFtob29rOiR7dGhpcy5uYW1lfToke3RoaXMuc3RhZ2VOYW1lfV1gLCAuLi5hcmdzICk7IH1cblx0XHR9O1xuXHR9XG5cblx0cmVnaXN0ZXIgKCBhcHBsaWNhdGlvbiApIHtcblx0XHRpZiAoIHRoaXMuc3RhZ2VzLnJlZ2lzdGVyICkge1xuXHRcdFx0dGhpcy5sb2cud2FybiggYEhvb2sgJyR7dGhpcy5uYW1lfScgYWxyZWFkeSByZWdpc3RlcmVkLmAgKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuaG9va1dpbGxSZWdpc3RlciggYXBwbGljYXRpb24gKTtcblx0XHR0aGlzLnN0YWdlcy5yZWdpc3RlciA9IHRydWU7XG5cdFx0dGhpcy5zdGFnZU5hbWUgPSAncmVnaXN0ZXInO1xuXG5cdFx0dGhpcy5sb2cuc2lsbHkoIGBSZWdpc3RlcmluZyBob29rICcke3RoaXMubmFtZX0nYCApO1xuXG5cdFx0aWYgKCB0aGlzLm1vZGVzLmxlbmd0aCA+IDAgJiYgdGhpcy5tb2Rlcy5pbmRleE9mKCBhcHBsaWNhdGlvbi5ydW50aW1lLm1vZGUgKSA9PT0gLTEgKSB7XG5cdFx0XHRsZXQgbW9kZVdvcmQgPSB0aGlzLm1vZGVzLmxlbmd0aCA9PT0gMSA/ICdtb2RlJyA6ICdtb2Rlcyc7XG5cdFx0XHR0aGlzLmxvZy5kZWJ1ZyggYEhvb2sgJHt0aGlzLm5hbWV9IGlzIGRpc2FibGVkIGluIG1vZGUgJHthcHBsaWNhdGlvbi5ydW50aW1lLm1vZGV9LiBFbmFibGVkIGluICR7bW9kZVdvcmR9ICR7dGhpcy5tb2Rlcy5qb2luKCAnLCAnICl9LmAgKTtcblx0XHRcdHRoaXMuZGlzYWJsZSggYXBwbGljYXRpb24gKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdGFzeW5jIGZ1bmN0aW9uIG9uU3Vic2NyaXB0aW9uICgpIHtcblx0XHRcdC8vIGFwcGxpY2F0aW9uLmNvbmZpZ3VyYXRpb24gaXMgbm90IHJlYWR5IGJlZm9yZSBob29rczpjb25maWd1cmUgcmFuXG5cdFx0XHRpZiAoIGFwcGxpY2F0aW9uLmNvbmZpZ3VyYXRpb24gJiYgYXBwbGljYXRpb24uY29uZmlndXJhdGlvbi5ob29rcy5lbmFibGVkWyB0aGlzLm5hbWUgXSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdHRoaXMubG9nLmRlYnVnKCBgSG9vayAnJHt0aGlzLm5hbWV9JyBpcyBkaXNhYmxlZCBleHBsaWNpdGx5LmAgKTtcblx0XHRcdFx0dGhpcy5kaXNhYmxlKCBhcHBsaWNhdGlvbiApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblxuXHRcdFx0YXdhaXQgdGhpcy5zdGFnZSggJ2NvbmZpZ3VyZScsIGFwcGxpY2F0aW9uICk7XG5cdFx0XHRhd2FpdCB0aGlzLnN0YWdlKCAnc3RhcnQnLCBhcHBsaWNhdGlvbiApO1xuXHRcdH1cblxuXHRcdHRoaXMuYWZ0ZXIuZm9yRWFjaCggKCBldmVudE5hbWUgKSA9PiB7XG5cdFx0XHRhcHBsaWNhdGlvbi5vbiggZXZlbnROYW1lLCBvblN1YnNjcmlwdGlvbi5iaW5kKCB0aGlzICkgKTtcblx0XHR9ICk7XG5cblx0XHR0aGlzLmhvb2tEaWRSZWdpc3RlciggYXBwbGljYXRpb24gKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGRpc2FibGUgKCBhcHBsaWNhdGlvbiApIHtcblx0XHRpZiAoICF0aGlzLmRpc2FibGVkICkge1xuXHRcdFx0dGhpcy5kaXNhYmxlZCA9IHRydWU7XG5cblx0XHRcdGFwcGxpY2F0aW9uLmVtaXQoIGBob29rczoke3RoaXMubmFtZX06Y29uZmlndXJlOmJlZm9yZWAgKTtcblx0XHRcdGFwcGxpY2F0aW9uLmVtaXQoIGBob29rczpjb25maWd1cmU6YmVmb3JlYCwgdGhpcy5uYW1lICk7XG5cdFx0XHRhcHBsaWNhdGlvbi5lbWl0KCBgaG9va3M6JHt0aGlzLm5hbWV9OnN0YXJ0OmFmdGVyYCApO1xuXHRcdFx0YXBwbGljYXRpb24uZW1pdCggYGhvb2tzOnN0YXJ0OmFmdGVyYCwgdGhpcy5uYW1lICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRob29rV2lsbFJlZ2lzdGVyICggYXBwbGljYXRpb24gKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRob29rRGlkUmVnaXN0ZXIgKCBhcHBsaWNhdGlvbiApIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFzeW5jIHN0YWdlICggc3RhZ2VOYW1lLCBhcHBsaWNhdGlvbiApIHtcblx0XHRpZiAoIHRoaXMuc3RhZ2VzWyBzdGFnZU5hbWUgXSApIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RhZ2VOYW1lID0gc3RhZ2VOYW1lO1xuXHRcdHRoaXMubG9nLmRlYnVnKCBgUnVubmluZyBzdGFnZSAnJHtzdGFnZU5hbWV9JyBvbiBob29rICcke3RoaXMubmFtZX0nYCApO1xuXHRcdGFwcGxpY2F0aW9uLmVtaXQoIGBob29rczoke3RoaXMubmFtZX06JHtzdGFnZU5hbWV9OmJlZm9yZWAgKTtcblx0XHRhcHBsaWNhdGlvbi5lbWl0KCBgaG9va3M6JHtzdGFnZU5hbWV9OmJlZm9yZWAsIHRoaXMubmFtZSApO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGF3YWl0IHRoaXNbIGxpZmVjeWNsZVsgc3RhZ2VOYW1lIF1bIDAgXSBdKCBhcHBsaWNhdGlvbiApO1xuXHRcdFx0YXdhaXQgdGhpc1sgc3RhZ2VOYW1lIF0oIGFwcGxpY2F0aW9uICk7XG5cdFx0XHR0aGlzLnN0YWdlc1sgc3RhZ2VOYW1lIF0gPSB0cnVlO1xuXG5cdFx0XHR0aGlzLmxvZy5kZWJ1ZyggYFJhbiBzdGFnZSAnJHtzdGFnZU5hbWV9JyBvbiBob29rICcke3RoaXMubmFtZX0nYCApO1xuXHRcdFx0YXdhaXQgdGhpc1sgbGlmZWN5Y2xlWyBzdGFnZU5hbWUgXVsgMSBdIF0oIGFwcGxpY2F0aW9uICk7XG5cblx0XHRcdGFwcGxpY2F0aW9uLmVtaXQoIGBob29rczoke3RoaXMubmFtZX06JHtzdGFnZU5hbWV9OmFmdGVyYCApO1xuXHRcdFx0YXBwbGljYXRpb24uZW1pdCggYGhvb2tzOiR7c3RhZ2VOYW1lfTphZnRlcmAsIHRoaXMubmFtZSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdHRoaXMubG9nLmVycm9yKCBgQW4gZXJyb3Igb2N1cnJlZCBvbiBzdGFnZSAke3N0YWdlTmFtZX0gb2YgaG9vayAnJHt0aGlzLm5hbWV9J2AgKTtcblx0XHRcdHRoaXMubG9nLmVycm9yKCBlICk7XG5cblx0XHRcdHRocm93IG5ldyBFcnJvciggZSApO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGNvbmZpZ3VyZSAoIGFwcGxpY2F0aW9uICkge1xuXHRcdHRoaXMuY29uZmlndXJhdGlvbiA9IE9iamVjdC5hc3NpZ24oIHRoaXMuY29uZmlndXJhdGlvbiwgdGhpcy5kZWZhdWx0cywgYXBwbGljYXRpb24uY29uZmlndXJhdGlvblsgdGhpcy5jb25maWd1cmF0aW9uS2V5IF0gKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFzeW5jIGhvb2tXaWxsQ29uZmlndXJlICggYXBwbGljYXRpb24gKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhc3luYyBob29rRGlkQ29uZmlndXJlICggYXBwbGljYXRpb24gKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhc3luYyBzdGFydCAoIGFwcGxpY2F0aW9uICkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YXN5bmMgaG9va1dpbGxTdGFydCAoIGFwcGxpY2F0aW9uICkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YXN5bmMgaG9va0RpZFN0YXJ0ICggYXBwbGljYXRpb24gKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuZnVuY3Rpb24gaG9va0ZhY3RvcnkgKCAuLi5hcmdzICkge1xuXHRyZXR1cm4gbmV3IEhvb2soIC4uLmFyZ3MgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaG9va0ZhY3Rvcnk7XG5leHBvcnQgeyBIb29rIGFzIEhvb2sgfTtcbiJdfQ==