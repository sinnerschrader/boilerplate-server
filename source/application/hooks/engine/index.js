import engine from './engine';

export default {
	'after': [ 'hooks:user-hooks:start:after' ],

	start: async function startEngineHook ( application ) {
		application.engine = engine( application );

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

		return this;
	}
};
