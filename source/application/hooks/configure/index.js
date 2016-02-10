import {
	dirname,
	resolve
} from 'path';
import {
	merge
} from 'lodash';
import findRoot from 'find-root';

import load from '../../../library/utilities/configuration';
import {
	exists
} from '../../../library/utilities/fs';

export default {
	after: ['application:before'],

	defaults: {
		path: './configuration',
		filter: /(.*).(js|json)$/
	},

	async configure(application) {
		application.configuration = {};
		this.configuration = merge(
			{},
			this.defaults,
			{
				path: resolve(application.runtime.base, this.defaults.path)
			}
		);
		return this;
	},

	async start(application) {
		// Load boilerplate-server core configuration
		const core = load(
			resolve(
				findRoot(__dirname),
				this.configuration.path
			),
			this.configuration.filter,
			application.runtime.env
		);

		// Load package.jsons
		const corePkgPath = resolve(application.runtime.base, 'package.json');
		const pkgPath = resolve(application.runtime.cwd, 'package.json');

		const corePkg = require(corePkgPath);
		const pkg = merge({}, require(pkgPath), corePkg, pkg);

		// Allow user to override core behaviour via cli and *rc files
		merge(core, {pkg}, application.runtime.api);

		// Find all node modules on the way from here to the top
		let modulePaths = [dirname(module.filename)];
		let moduleRoot = module;
		while (moduleRoot.parent) {
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
			if (Array.isArray(b) && typeof a === 'string') {
				return b;
			}
		});

		application.runtime.prefix = application.runtime.prefix || '/';
		application.runtime.mode = application.runtime.mode || 'server';

		return this;
	}
};
