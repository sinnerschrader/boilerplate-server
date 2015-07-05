import koa from 'koa';
import router from 'koa-router';
import merge from 'lodash.merge';

import ports from '../../../library/utilities/ports';

function engineBlueprint () {
	let nameSpace = new WeakMap();

	return class Engine {
		constructor ( application ) {
			let fuel = koa();
			fuel.experimental = true;

			this.env = fuel.env;
			nameSpace.set( this, { application, fuel, 'mounts': {} } );
		}

		async start ( host, port ) {
			let { fuel, application } = nameSpace.get( this );
			let server = application.configuration.server;

			if ( application.router ) {
				application.log.info( '[application]', `Kicking off router ...` );
				fuel.use(application.router.routes());
				fuel.use(application.router.allowedMethods());
				application.log.info( '[application]', `Kicked off router ...` );
			}

			if ( application.runtime.env === 'development' ) {
				if (await ports.test( port, host ) !== true) {
					if ( server.autoPort !== true ) {
						throw new Error( `Port ${port} is taken and server.autPort is disabled, could not start server.` );
					}

					application.log.warn( `[application] Port ${port} is taken, trying to obtain next open port... ` );
					server.port = await ports.find( server.port + 1, server.port + 51, server.host );

					application.subs.forEach(function(sub){
						application.log.info( `[application:subapplication] Changing configuration of subapplications ${sub.name}` );

						sub.mountable.configuration.server = server;
						sub.mountable.configuration.client = Object.assign(sub.mountable.configuration.client || {}, {
							host: server.host,
							port: server.port
						});

						application.log.silly( `[application:subapplication] ${sub.mountable.name}.configuration.server: ${JSON.stringify(sub.mountable.configuration.server)}` );
						application.log.silly( `[application:subapplication] ${sub.mountable.name}.configuration.client: ${JSON.stringify(sub.mountable.configuration.client)}` );
					});
				}

			}

			application.log.info( '[application]', `Starting engine at http://${server.host}:${server.port} in environment '${application.configuration.environment}' ...` );
			let http = await fuel.listen( server.port );
			application.log.info( '[application]', `Started engine at http://${server.host}:${server.port} in environment '${application.configuration.environment}' ...` );

			nameSpace.set( this, { http } );
			return application;
		}


		async stop () {
			let { http, application } = nameSpace.get(this);

			return await http.close( function( err ) {
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

			application.log.info( `[application:subapplication] Mounting ${mountable.name} on ${path}` );

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

			application.router.stack.middleware.forEach(function(middleware){
				let match = mountable.router.stack.middleware
					.filter((mountMiddleware) => mountMiddleware.name === middleware.name)[0];

				if (match) {
					return;
				}

				mountable.router.stack.middleware.push(middleware);
			});

			mountable.configuration.middlewares = mountable.configuration.middlewares || {};

			// Override middleware config on mountable by host middleware config
			for (let middlewareName of Object.keys(application.configuration.middlewares.enabled || {})) {
				let config = application.configuration.middlewares.enabled[middlewareName];
				let mountableConfig = mountable.configuration.middlewares.enabled[middlewareName];

				mountableConfig = typeof mountableConfig === 'undefined' ? config : mountableConfig;

				if (typeof config === 'object') {
					merge(mountableConfig, config);
				} else {
					mountableConfig = config;
				}
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

			mountable.configuration.server = Object.assign({}, mountable.configuration.server, application.configuration.server);
			mountable.configuration.client = Object.assign({}, mountable.configuration.client, application.configuration.server);

			application.log.info( `[application:subapplication] Changing configuration of subapplications ${mountable.name}` );
			application.log.info( `[application:subapplication] ${mountable.name}.configuration.server: ${JSON.stringify(mountable.configuration.server)}` );
			application.log.info( `[application:subapplication] ${mountable.name}.configuration.client: ${JSON.stringify(mountable.configuration.client)}` );

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
