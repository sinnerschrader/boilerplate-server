import { resolve, dirname } from 'path';
import { merge } from 'lodash';
import findRoot from 'find-root';

import load from '../../../library/utilities/configuration';
import { exists } from '../../../library/utilities/fs';

export default {
	'after': [ 'application:before' ],

	'defaults': {
		'path': './configuration',
		'filter': /(.*).(js|json)$/
	},

	'configure': async function configureEngineHook ( application ) {
		application.configuration = {};

		this.configuration = Object.assign( this.configuration, this.defaults, {
			'path': resolve( application.runtime.base, this.defaults.path )
		} );

		return this;
	},

	'start': async function startEngineHook ( application ) {
		// Load boilerplate-server core configuration
		let core = load( resolve(findRoot(__dirname), this.configuration.path), this.configuration.filter, application.runtime.env );

		// Load package.jsons
		let corePkgPath = resolve( application.runtime.base, 'package.json' );
		let pkgPath = resolve( application.runtime.cwd, 'package.json' );

		let corePkg = require( corePkgPath );

		let pkg = {};

		try {
			pkg = require( pkgPath );
		} catch ( err ) {
			this.log.warn( `Could not read ${pkgPath}.` );
		}

		pkg = merge( {}, corePkg, pkg );

		// Allow user to override core behaviour via cli and *rc files
		core = merge( {}, core, { 'pkg': pkg }, application.runtime.api );

		let modulePaths = [dirname(module.filename)];
		let moduleRoot = module;
		
		// Find all node modules on the way from here to the top
		while(moduleRoot.parent) {
			moduleRoot = moduleRoot.parent;
			modulePaths.push(dirname(moduleRoot.filename));
		}

		modulePaths = [...new Set(modulePaths)];
		modulePaths = modulePaths.filter((modulePath) => !modulePath.includes(findRoot(__dirname)));

		let existingModulePaths = [];

		for (let modulePath of modulePaths) {
			let moduleRoot = modulePath;

			while(!await exists(resolve(moduleRoot, 'package.json'))) {
				moduleRoot = dirname(moduleRoot);
			}

			existingModulePaths.push(moduleRoot);
		}

		// Set application runtime cwds
		application.runtime.cwds = [
			...new Set([
				application.runtime.cwd, // boilerplate instance project cwd
				...existingModulePaths, // way between
				process.cwd() // cwd
			])
		];

		// Check which user config paths exist
		let existingConfigPaths = [];
		for ( let configPath of core.paths.configuration ) {
			for ( let cwd of application.runtime.cwds ) {
				for (let suffix of ['', pkg.name]) {
					let userPath = resolve( cwd, configPath, suffix);

					if ( await exists( userPath ) ) {
						existingConfigPaths.push(userPath);
					}
				}
			}
		}

		// Load most specific paths only
		// Check if paths have siblings that contain them completely, thus are sub directories / more specific configuration folders
		existingConfigPaths = existingConfigPaths.filter(function(configPath) {
			return existingConfigPaths.filter(function(subConfigPath){
				return subConfigPath.includes(configPath) && subConfigPath !== configPath;
			}).length === 0;
		});

		// Load dem configs from filtered paths
		let user = {};
		for ( let userPath of existingConfigPaths ) {
			this.log.info( `Loading configuration from '${userPath}'` );

			try {
				let userPathConfig = load( userPath, this.configuration.filter, application.runtime.env );
				user = merge( user, userPathConfig );
			} catch ( err ) {
				this.log.error( `Error while reading configuration from ${userPath}.` );
				this.log.error( err );
				err.message = 'Failed loading configuration from ${userPath}';
				throw err;
			}
		}

		merge( application.configuration, core, user, application.runtime.api, function(a, b){
			if (Array.isArray(a)) {
				return a.concat(b).filter((item) => typeof item !== 'undefined');
			}

			if (!Array.isArray(a) && Array.isArray(b)) {
				return [a].concat(b).filter((item) => typeof item !== 'undefined');
			}
		});

		application.runtime.prefix = application.runtime.prefix || '/';
		application.runtime.mode = application.runtime.mode || 'server';

		return this;
	}
};
