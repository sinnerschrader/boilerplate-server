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
		var transporters;
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

					application.log = new _winston.Logger({
						'transports': transporters
					});

					return context$1$0.abrupt('return', this);

				case 3:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	}
};
module.exports = exports['default'];