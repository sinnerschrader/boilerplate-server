import { resolve } from 'path';

import Router from 'trek-router';
import requireAll from 'require-all';

import { exists } from '../../../library/utilities/fs';

export default {
	'after': [ 'hooks:engine:start:after' ],

	'start': async function startRoutesHook ( application ) {
		application.router = new Router();

		// load physical core routes
		let coreRoutes = requireAll( resolve( application.runtime.base, application.configuration.paths.routes ) );

		// load physical user routes
		let userRoutes = {};
		let userRoutesPath = resolve( application.runtime.cwd, this.configuration.path );

		if ( await exists( userRoutesPath ) ) {
			userRoutes = requireAll( userRoutesPath );
		}

		// load modules routes
		let moduleRoutes = Object.keys( this.configuration.enabled )
			.filter( ( routeName ) => typeof this.configuration.enabled[ routeName ].enabled === 'string' )
			.reduce( ( result, routeName ) => {
				let routeModuleName = this.configuration.enabled[ routeName ].enabled;

				try {
					result[ routeName ] = require( routeModuleName );
					this.log.debug( `Required module route '${routeName}' from module '${routeModuleName}'` );
				} catch ( err ) {
					this.log.warn( `Could not require module route '${routeName}' from module '${routeModuleName}'` );
					this.log.debug( err );
				}

				return result;
			}, {} );

		let routes = Object.assign( {}, coreRoutes, userRoutes, moduleRoutes );

		// Check if required modules are functions, bind to router
		Object.keys( routes ).forEach( ( routeName ) => {
			let routeFactoryFunction = routes[ routeName ];
			let routeConfig = this.configuration.enabled[ routeName ];

			if ( typeof routeFactoryFunction !== 'function' ) {
				this.log.warn( `'${routeName}' is no valid route factory` );
				return;
			}

			if ( routeConfig === false || routeConfig && routeConfig.enabled === false ) {
				this.log.debug( `'${routeName}' is explicitly disabled.` );
				return;
			}

			if ( typeof routeConfig === 'undefined' ) {
				this.log.debug( `'${routeName}' is not configured, will not mount.` );
				return;
			}

			let method = routeConfig.method || 'GET';

			// Register routes with router
			application.router.add( method, routeConfig.path, routeFactoryFunction( application, routeConfig ) );
		} );

		// Register router middleware
		application.engine.use( async function routerMiddleware ( next ) {
			let lookup = application.router.find( this.request.method, this.request.url );

			let fn = lookup[ 0 ];
			let args = lookup[ 1 ];

			if ( typeof fn === 'function' ) {
				fn = fn.bind( this );
				this.params = args;
				return await fn( next );
			}
		} );

		return application;
	}
};
