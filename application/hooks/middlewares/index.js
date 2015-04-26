import { resolve } from 'path';

import koa from 'koa';
import requireAll from 'require-all';

export default {
	'after': [ 'hooks:engine:start:after' ],

	start: async function startMiddlewareHook ( application ) {
		// Load physical core middlewares
		let coreMiddlewares = requireAll( resolve( application.runtime.base, application.configuration.paths.middlewares ) );

		// Load physical user middlewares
		let userMiddlewares = requireAll( resolve( application.runtime.cwd, this.configuration.path ) );

		// Load module middlewares
		let moduleMiddlewares = Object.keys( this.configuration.enabled )
			.filter( ( middlewareName ) => typeof this.configuration.enabled[ middlewareName ] === 'string' )
			.reduce( ( result, middlewareName ) => {
				let middlewareModuleName = this.configuration.enabled[ middlewareName ];

				try {
					result[ middlewareName ] = require( middlewareModuleName );
					application.log.debug( '[application:hooks:middlewares]', `Required module middleware '${middlewareName}' from module '${middlewareModuleName}'` );
				} catch ( err ) {
					application.log.warn( '[application:hooks:middlewares]', `Could not require module middleware '${middlewareName}' from module '${middlewareModuleName}'` );
					application.log.debug( err );
				}

				return result;
			}, {} );

		let middlewares = Object.assign( {}, coreMiddlewares, userMiddlewares, moduleMiddlewares );

		// Check if required modules are functions, bind to engine
		Object.keys( middlewares ).forEach( ( middlewareName ) => {
			let middlewareFactoryFunction = middlewares[ middlewareName ];
			let middlewareConfig = this.configuration.enabled[ middlewareName ];

			if ( typeof middlewareFactoryFunction !== 'function' ) {
				application.log.warn( '[application:hooks:middlewares]', `'${middlewareName}' is no valid middleware factory` );
				return;
			}

			if ( middlewareConfig === false ) {
				application.log.debug( '[application:hooks:middlewares]', `'${middlewareName}' is explicitly disabled.` );
				return;
			}

			if ( typeof middlewareConfig === 'undefined' ) {
				application.log.debug( '[application:hooks:middlewares]', `'${middlewareName}' is not configured, will not mount.` );
				return;
			}

			try {
				application.engine.use( middlewareFactoryFunction( application, middlewareConfig ) );
			} catch ( err ) {
				application.log.error( '[application:hooks:middlewares]', `Binding '${middlewareName}' to engine failed` );
				application.log.debug( err );
			}
		} );

		return application;
	}
};
