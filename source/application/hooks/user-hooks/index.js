import { resolve } from 'path';

import load from '../../../library/hooks/load';
import { exists } from '../../../library/utilities/fs';

export default {
	'configurationKey': 'hooks',

	'after': [ 'hooks:configure:start:after' ],

	'start': async function startUserHook ( application ) {
		let coreHookPath = resolve(application.runtime.base, application.configuration.paths.hooks);

		this.configuration.path = Array.isArray(this.configuration.path) ? this.configuration.path : [this.configuration.path];
		// TODO: Fix for mysteriously split last path, investigate
		this.configuration.path = this.configuration.path.filter((item) => item.length > 1);

		let userHookPaths = this.configuration.path
			.reduce((items, item) => items.concat(
				application.runtime.cwds.map((cwd) => resolve(cwd, item))
			), [])
			.filter((item) => item !== coreHookPath);

		userHookPaths = [...new Set(userHookPaths)];
		let userHooks = [];

		// load user hooks
		for (let userHookPath of userHookPaths) {
			if ( await exists( userHookPath ) === false ) {
				continue;
			} else {
				application.log.info(`Loading user hooks from ${userHookPath}...`);
			}

			let loadedHooks = load( application, userHookPath, true );
			userHooks = userHooks.concat(loadedHooks);
			application.log.info(`Loaded ${loadedHooks.length} user hooks: ${loadedHooks.map((loadedHook) => loadedHook.name)}`);
		}

		// Let the last user hook with a given name reign
		userHooks = [...new Set(userHooks.reverse())].reverse();

		userHooks = userHooks
			.map(function(userHook){
				// Detect hooks conflicting with core hooks
				let conflictingCoreHook = application.hooks.filter((coreHook) => coreHook.name === userHook.name)[0];

				if (conflictingCoreHook) {
					application.log.warn(`Hook "${userHook.name}" from ${userHook.requirePath} conflicts with core hook "${conflictingCoreHook.name}", will not load.`);
					return null;
				}
				return userHook;
			}).filter((item) => (item));

		userHooks.forEach( ( hook ) => hook.register( application ) );
		application.hooks = application.hooks.concat(userHooks);
		return this;
	}
};
