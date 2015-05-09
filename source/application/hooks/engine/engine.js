import koa from 'koa';
import ports from '../../../library/utilities/ports';

function engineBlueprint () {
	let nameSpace = new WeakMap();

	return class Engine {
		constructor ( application ) {
			let http;
			let fuel = koa();
			fuel.experimental = true;

			this.env = fuel.env;
			nameSpace.set( this, { application, fuel, http } );
		}

		async start ( host, port ) {
			let { fuel, application } = nameSpace.get( this );
			let server = application.configuration.server;

			if ( await ports.test( port, host ) !== true ) {
				if ( server.autoPort !== true ) {
					throw new Error( `Port ${port} is taken and server.autPort is disabled, could not start server.` );
				}

				application.log.warn( `[application] Port ${port} is taken, trying to obtain next open port... ` );
				server.port = await ports.find( server.port + 1, server.port + 51, server.host );
			}

			application.log.info( '[application]', `Starting server at http://${server.host}:${server.port} in environment '${application.configuration.environment}' ...` );

			let http = await fuel.listen( server.port, server.host );
			namespace.set( this, { http } );
			return application;
		}

		async stop () {
			let { http, application } = nameSpace.get(this);

			return await server.close( function( err ) {
				return new Promise( function fulfill( resolve, reject ) {
					if ( err ) {
						return reject( err );
					}
					return resolve( application );
				});
			});
		}

		mount () {
			application.log.warn('Mounting not supported yet.');
		}

		unmount () {
			application.log.warn('Unmounting not supported yet.');
		}

		use (...args) {
			let { fuel } = nameSpace.get(this);

			return fuel.use(...args);
		}
	};
}

function engineFactory ( ...args ) {
	return new ( engineBlueprint() )( ...args );
}

export default engineFactory;
