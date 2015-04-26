import requireAll from 'require-all';
import hookFactory from './default';

export default function loadHooks ( application, path, modules = false ) {
	let hooks = requireAll( path );

	if ( modules && application.configuration ) {

		let moduleHookNames = Object.keys( application.configuration.hooks.enabled )
			.filter( ( key ) => typeof application.configuration.hooks.enabled[ key ] === 'string' );

		moduleHookNames.forEach( function requireHookModules ( moduleHookName ) {
			let moduleName = application.configuration.hooks.enabled[ moduleHookName ];

			try {
				hooks[ moduleHookName ] = require( moduleName );
				application.log.debug( '[application:hooks]', `Required module hook '${moduleHookName}' from module '${moduleName}'` );
			} catch ( err ) {
				application.log.warn( '[application:hooks]', `Could not require module hook '${moduleName}' from module '${moduleName}'` );
			}
		} );
	}

	hooks = Object.keys( hooks ).map( function hookCallback ( hookName ) {
		if ( [ 'index', 'default', 'load' ].indexOf( hookName ) > -1 ) {
			return false;
		}

		let data = hooks[ hookName ];

		if ( typeof data.index !== 'object' ) {
			application.log.warn( '[application:hooks]', `Hook '${hookName}' is no valid hook.` );
			return false;
		}

		return hookFactory( hookName, data.index );
	} )
	.filter( ( item ) => item );

	return hooks;
}
