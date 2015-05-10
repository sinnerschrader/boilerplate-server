'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
/*eslint-disable no-console */

var _winston = require('winston');

var _path = require('path');

var transportMethods = {
	'file': _winston.transports.File,
	'console': _winston.transports.Console
};

exports['default'] = {
	'after': ['hooks:user-hooks:start:after'],

	'configure': function configureLogHook(application) {
		return regeneratorRuntime.async(function configureLogHook$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					this.configuration = Object.assign(this.configuration, this.defaults, application.configuration[this.name]);
					this.configuration.level = application.runtime.api.loglevel || this.configuration.level;
					this.configuration.path = _path.resolve(application.runtime.cwd, application.configuration.paths.log);

					return context$1$0.abrupt('return', this);

				case 4:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	},

	'start': function startLogHook(application) {
		var transporters, log;
		return regeneratorRuntime.async(function startLogHook$(context$1$0) {
			var _this = this;

			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					transporters = this.configuration.transports.map(function (transportName) {
						var Transport = transportMethods[transportName];

						if (typeof Transport !== 'function') {
							_this.log.warn('Trying to add log transport \'' + transportName + '\' but it is unavailable.');
							return false;
						}

						var transportConfig = Object.assign({}, _this.configuration.options[transportName], { 'name': transportName, 'level': _this.configuration.level });

						if (transportName === 'file') {
							transportConfig.filename = _path.resolve(_this.configuration.path, [transportName, 'log'].join('.'));
						}

						return new Transport(transportConfig);
					}).filter(function (item) {
						return item;
					});
					log = new _winston.Logger({
						'transports': transporters
					});

					application.log.error = function () {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
							args[_key] = arguments[_key];
						}

						return log.error.apply(log, ['[' + application.name + ']'].concat(args));
					};

					application.log.warn = function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						return log.warn.apply(log, ['[' + application.name + ']'].concat(args));
					};

					application.log.info = function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						return log.info.apply(log, ['[' + application.name + ']'].concat(args));
					};

					application.log.debug = function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						return log.debug.apply(log, ['[' + application.name + ']'].concat(args));
					};

					application.log.silly = function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						return log.silly.apply(log, ['[' + application.name + ']'].concat(args));
					};

					return context$1$0.abrupt('return', this);

				case 8:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	}
};
module.exports = exports['default'];