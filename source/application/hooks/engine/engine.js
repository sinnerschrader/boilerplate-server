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
			nameSpace.set( this, { application, fuel, http, 'mounts': {} } );
		}

		async start ( host, port ) {
			let { fuel, application, http } = nameSpace.get( this );
			let server = application.configuration.server;

			if ( await ports.test( port, host ) !== true ) {
				if ( server.autoPort !== true ) {
					throw new Error( `Port ${port} is taken and server.autPort is disabled, could not start server.` );
				}

				application.log.warn( `[application] Port ${port} is taken, trying to obtain next open port... ` );
				server.port = await ports.find( server.port + 1, server.port + 51, server.host );
			}

			application.log.info( '[application]', `Starting server at http://${server.host}:${server.port} in environment '${application.configuration.environment}' ...` );

			http = await fuel.listen( server.port, server.host );
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

		mount ( mountable, path = '/' ) {
			let { fuel, application } = nameSpace.get(this);
			let depth = path.split('/').length;

			if ( (mountable instanceof application.constructor) !== true ) {
				throw new TypeError('mountable is no BoilerPlateServer');
			}

			application.router.add('GET', path + '/*', async function( next ) {
				let fragments = this.path.split('/').filter((item, index) => index >= depth );
				let path = fragments.length > 0 ? fragments.join('/') : '/';
				let lookup = mountable.router.find('GET', path);

				let fn = lookup[ 0 ];
				let args = lookup[ 1 ];

				if ( typeof fn === 'function' ) {
					fn = fn.bind( this );
					this.path = path;
					this.params = args;
					return await fn( next );
				}
			});

			application.log.info( `[application:subapplication] Mounting ${mountable.name} on ${path}` );
			return application;
		}

		use (...args) {
			let { fuel, application } = nameSpace.get(this);
			fuel.use(...args);
			return application;
		}
	};
}

function engineFactory ( ...args ) {
	return new ( engineBlueprint() )( ...args );
}

export default engineFactory;
