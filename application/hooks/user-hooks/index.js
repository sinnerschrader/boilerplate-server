import { resolve } from 'path';
import load from '../load';

export default {
	'configurationKey': 'hooks',

	'after': [ 'hooks:configure:start:after' ],

	'hookDidConfigure': function ( application ) {
		this.configuration.path = resolve( application.runtime.cwd, this.configuration.path );
	},

	'start': async function startUserHook ( application ) {
		let coreHookPath = resolve ( application.runtime.base, application.configuration.paths.hooks );
		let isProjectMode = this.configuration.path === coreHookPath;

		let hooks = load( application, this.configuration.path, true );

		hooks = hooks.map( function( hook ) {
			let conflictingCoreHook = application.hooks.find( ( coreHook ) => coreHook.name === hook.name );

			if ( conflictingCoreHook ) {
				if ( isProjectMode === false ) {
					application.log.warn( '[application:hooks:user-hooks]', `User hook '${hook.name}' conflicts with core hook '${conflictingCoreHook.name}'` );
				}
				return false;
			}


		} ).filter( ( item ) => item );

		return this;
	}
};
