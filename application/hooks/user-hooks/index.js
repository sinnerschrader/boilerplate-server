import { resolve } from 'path';

import load from '../load';
import { exists } from '../../utilities/fs';

export default {
	'configurationKey': 'hooks',

	'after': [ 'hooks:configure:start:after' ],

	'hookDidConfigure': function userHooksDidConfigure ( application ) {
		this.configuration.path = resolve( application.runtime.cwd, this.configuration.path );
	},

	'start': async function startUserHook ( application ) {
		let coreHookPath = resolve( application.runtime.base, application.configuration.paths.hooks );
		let isProjectMode = this.configuration.path === coreHookPath;

		if ( await exists( this.configuration.path ) === false ) {
			this.log.warn( `No user hooks found at ${coreHookPath}` );
			return this;
		}

		let hooks = load( application, this.configuration.path, true );

		hooks = hooks.map( ( hook ) => {
			let conflictingCoreHook = application.hooks.find( ( coreHook ) => coreHook.name === hook.name );

			if ( typeof conflictingCoreHook !== 'undefined' && conflictingCoreHook > -1 ) {
				if ( isProjectMode === false ) {
					this.log.warn( `User hook '${hook.name}' conflicts with core hook '${conflictingCoreHook.name}'` );
				}
				return false;
			}

			return hook;
		} ).filter( ( item ) => item );

		application.hooks = application.hooks.concat( hooks );

		hooks.forEach( ( hook ) => hook.register( application ) );
		return this;
	}
};
