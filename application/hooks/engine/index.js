'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

exports['default'] = {
	'after': ['hooks:user-hooks:start:after'],

	start: function startEngineHook(application) {
		return regeneratorRuntime.async(function startEngineHook$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					application.engine = _engine2['default'](application);

					return context$1$0.abrupt('return', this);

				case 2:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	}
};
module.exports = exports['default'];
/*application.engine = engine( application );
	engine.koa.experimental = true;
	let server = application.configuration.server;
	engine.use = function engineUse ( ...args ) {
	return application.engine.koa.use( ...args );
};
	engine.listen = async function engineListen ( ...args ) {
	return application.engine.koa.listen( ...args );
};
	engine.start = async function engineStart ( port, host ) {
	if ( await ports.test( port, host ) === 'open' ) {
		if ( server.autoPort !== true ) {
			throw new Error( `Port ${port} is taken and server.autPort is disabled, could not start server.` );
		}
			application.log.warn( `[application] Port ${port} is taken, trying to obtain next open port... ` );
		server.port = await ports.find( server.port + 1, server.port + 51, server.host );
	}
		application.log.info( '[application]', `Starting server at http://${server.host}:${server.port} in environment '${application.configuration.environment}' ...` );
		await application.engine.listen( server.port, server.host );
	return application;
};
	application.engine.stop = function engineStop () {
	};*/