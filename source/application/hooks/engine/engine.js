import koa from 'koa';
import router from 'koa-router';

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

			if ( application.router ) {
				fuel.use(application.router.routes());
				fuel.use(application.router.allowedMethods());
			}

			if ( await ports.test( port, host ) !== true ) {
				if ( server.autoPort !== true ) {
					throw new Error( `Port ${port} is taken and server.autPort is disabled, could not start server.` );
				}

				application.log.warn( `[application] Port ${port} is taken, trying to obtain next open port... ` );
				server.port = await ports.find( server.port + 1, server.port + 51, server.host );

				application.subs.forEach(function(sub){
					sub.mountable.configuration.server = server;
					sub.mountable.configuration.client = Object.assign(sub.mountable.configuration.client || {}, {
						host: server.host,
						port: server.port
					});
				});
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
			let fragments = path.split('/');
			let hostFragments = application.runtime.prefix.split('/');
			let depth = fragments.length;

			application.log.info( `[applications:subapplication] Mounting ${mountable.name} on ${path}` );

			if (path !== '/') {
				mountable.router.prefix(path);
			} else {
				mountable.router.stack.routes.forEach(function(route){
					let match = application.router.route(route.name);
					if (match) {
						let index = application.router.stack.routes.indexOf(match);
						application.router.stack.routes.splice(index, 1);
						application.log.info(`[applications:subapplication] Route "${route.name}" of "${mountable.name}" overwrites ${application.name}'s route with same name.`)
					}
				});

				application.router.stack.routes = application.router.stack.routes.concat(mountable.router.stack.routes);
			}

			fuel.use(mountable.router.routes());
			fuel.use(mountable.router.allowedMethods());

			application.router.subs = application.router.subs || [];
			application.router.subs.push(mountable.router);

			mountable.runtime.prefix = '/' + fragments
				.concat(hostFragments)
				.filter((item) => item)
				.join('/');

			application.subs.push({ path, mountable });

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
