import { resolve } from 'path'

import requireAll from 'require-all';
import hookFactory from './default';

export default function loadHooks ( application, path, modules = false ) {
	let hooks = requireAll( path );

	hooks = Object.keys(hooks)
		.map((name) => Object.assign(hooks[name].index ? hooks[name].index : hooks[name], { name }))
		.map((hook) => Object.assign(hook, { 'requirePath': resolve(path, hook.name) }));

	if ( modules && application.configuration ) {
		let moduleHookNames = Object.keys( application.configuration.hooks.enabled )
			.filter( ( key ) => typeof application.configuration.hooks.enabled[ key ] === 'string' );

		let moduleHooks = moduleHookNames
			.map( function requireHookModules ( moduleHookName ) {
				let moduleName = application.configuration.hooks.enabled[ moduleHookName ];

				try {
					let moduleHook = require( moduleName );
					moduleHook.name = moduleHookName;
					moduleHook.requirePath = require.resolve(moduleName);
					application.log.debug( '[application:hooks]', `Required module hook '${moduleHookName}' from module '${moduleName}'` );
				} catch (err) {
					application.log.warn( '[application:hooks]', `Could not require module hook '${moduleHookName}' from module '${moduleName}'` );
				}
			});

		hooks = hooks.concat(moduleHooks);
	}

	hooks = hooks
		.filter((hook) => hook)
		.map(function hookCallback (hook) {
			return hookFactory(application, hook.name, hook);
		});

	return hooks;
}
