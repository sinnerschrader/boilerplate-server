import { resolve } from 'path';

import requireAll from 'require-all';

import { exists } from '../../../library/utilities/fs';

export default {
	'after': [ 'hooks:engine:start:after' ],

	'start': async function startMiddlewareHook ( application ) {
		// Load physical core middlewares
		let coreMiddlewares = requireAll( resolve( application.runtime.base, application.configuration.paths.middlewares ) );

		// Load physical user middlewares
		let userMiddlewaresPath = resolve( application.runtime.cwd, this.configuration.path );
		let userMiddlewares = {};

		if ( await exists( userMiddlewaresPath ) ) {
			userMiddlewares = requireAll( userMiddlewaresPath );
		}

		// Load module middlewares
		let moduleMiddlewares = Object.keys( this.configuration.enabled )
			.filter( ( middlewareName ) => typeof this.configuration.enabled[ middlewareName ] === 'string' )
			.reduce( ( result, middlewareName ) => {
				let middlewareModuleName = this.configuration.enabled[ middlewareName ];

				try {
					result[ middlewareName ] = require( middlewareModuleName );
					this.log.debug( `Required module middleware '${middlewareName}' from module '${middlewareModuleName}'` );
				} catch ( err ) {
					this.log.warn( `Could not require module middleware '${middlewareName}' from module '${middlewareModuleName}'` );
					this.log.debug( err );
				}

				return result;
			}, {} );

		let middlewares = Object.assign( {}, coreMiddlewares, userMiddlewares, moduleMiddlewares );

		// Check if required modules are functions, bind to engine
		Object.keys( middlewares ).forEach( ( middlewareName ) => {
			let middlewareFactoryFunction = middlewares[ middlewareName ];
			let middlewareConfig = this.configuration.enabled[ middlewareName ];

			if ( typeof middlewareFactoryFunction !== 'function' ) {
				this.log.warn( `'${middlewareName}' is no valid middleware factory` );
				return;
			}

			if ( middlewareConfig === false ) {
				this.log.debug( `'${middlewareName}' is explicitly disabled.` );
				return;
			}

			if ( typeof middlewareConfig === 'undefined' ) {
				this.log.debug( `'${middlewareName}' is not configured, will not mount.` );
				return;
			}

			try {
				application.engine.use( middlewareFactoryFunction( application, middlewareConfig ) );
			} catch ( err ) {
				this.log.error( `Binding '${middlewareName}' to engine failed` );
				this.log.debug( err );
			}
		} );

		return application;
	}
};
