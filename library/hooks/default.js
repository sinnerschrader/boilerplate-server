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

		this.name = name;
		this.configurationKey = extender.configurationKey || name;

		this.wait = typeof extender.wait !== 'undefined' ? extender.wait : this.wait;
		this.disabled = typeof extender.disabled !== 'undefined' ? extender.disabled : this.disabled;

		this.modes = extender.modes || this.modes;
		this.after = extender.after || this.after;
		this.defaults = extender.defaults || this.defaults;

		this.configure = extender.configure || this.configure;
		this.hookWillConfigure = extender.hookWillConfigure || this.hookWillConfigure;
		this.hookDidConfigure = extender.hookDidConfigure || this.hookDidConfigure;

		this.start = extender.start || this.start;
		this.hookWillStart = extender.hookWillStart || this.hookWillStart;
		this.hookDidStart = extender.hookDidStart || this.hookDidStart;

		this.hookWillRegister = extender.hookWillRegister || this.hookWillRegister;
		this.hookDidRegister = extender.hookDidRegister || this.hookDidRegister;

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