import { resolve } from 'path';

import load from '../../../library/hooks/load';
import { exists } from '../../../library/utilities/fs';

export default {
	'configurationKey': 'hooks',

	'after': [ 'hooks:configure:start:after' ],

	'start': async function startUserHook ( application ) {
		let coreHookPath = resolve( application.runtime.base, application.configuration.paths.hooks );
		let isProjectMode = this.configuration.path === coreHookPath;

		this.configuration.path = Array.isArray(this.configuration.path) ? this.configuration.path : [this.configuration.path];

		// TODO: Fix for mysteriously split last path, investigate
		this.configuration.path = this.configuration.path.filter((item) => item.length > 1);

		let userHookPaths = this.configuration.path
			.reduce((items, item) => items.concat(
				application.runtime.cwds.map((cwd) => resolve(cwd, item))
			), []);

		userHookPaths = [...new Set(userHookPaths)];

		for (let userHookPath of userHookPaths) {
			if ( await exists( userHookPath ) === false ) {
				this.log.warn( `No user hooks found at ${coreHookPath}` );
				return this;
			}

			let hooks = load( application, userHookPath, true );

			hooks = hooks.map( ( hook ) => {
				let conflictingCoreHooks = application.hooks.filter( ( coreHook ) => coreHook.name === hook.name );

				if ( conflictingCoreHooks.length > 0 ) {
					if ( isProjectMode === false ) {
						this.log.warn( `User hook '${hook.name}' conflicts with core hook '${conflictingCoreHooks[ 0 ].name}'` );
					}
					return false;
				}

				return hook;
			} ).filter( ( item ) => item );

			application.hooks = application.hooks.concat( hooks );
			hooks.forEach( ( hook ) => hook.register( application ) );
		}

		// load module hooks
		let moduleHooks = Object.keys( this.configuration.enabled )
			.filter( ( hookName ) => typeof this.configuration.enabled[ hookName ].enabled === 'string' )
			.reduce( ( result, hookName ) => {
				let hookModuleName = this.configuration.enabled[ hookName ].enabled;

				try {
					result.push(require( hookModuleName ));
					this.log.debug( `Required module route '${hookName}' from module '${hookModuleName}'` );
				} catch ( err ) {
					this.log.warn( `Could not require module route '${hookName}' from module '${hookModuleName}'` );
					this.log.debug( err );
				}

				return result;
			}, []);

		application.hooks = application.hooks.concat( moduleHooks );
		moduleHooks.forEach( ( hook ) => hook.register( application ) );

		return this;
	}
};
