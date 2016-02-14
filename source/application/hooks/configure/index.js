import {
	dirname,
	resolve
} from 'path';
import {
	merge
} from 'lodash';
import findRoot from 'find-root';
import exists from 'path-exists';

import load from '../../../library/utilities/configuration';

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
		const userPkg = require(pkgPath);
		const pkg = merge({}, corePkg, pkg, userPkg);

		// Allow user to override core behaviour via cli and *rc files
		merge(core, {pkg}, application.runtime.api);

		// Set application runtime cwds
		application.runtime.cwds = [
			...new Set([
				application.runtime.cwd,
				process.cwd()
			])
		];

		// Check which user config paths exist
		let existingConfigPaths = [];
		for (const configPath of core.paths.configuration) {
			for (const cwd of application.runtime.cwds) {
				for (const suffix of ['', userPkg.name]) {
					const userPath = resolve(cwd, configPath, suffix);
					console.log(userPath);
					if (await exists(userPath)) {
						existingConfigPaths.push(userPath);
					}
				}
			}
		}

		// Load most specific paths only
		// Check if paths have siblings that contain them completely, thus are sub directories / more specific configuration folders
		existingConfigPaths = existingConfigPaths.filter(configPath => {
			const match = existingConfigPaths.filter(subConfigPath =>
				subConfigPath.includes(configPath) && subConfigPath !== configPath
			);
			return match.length === 0;
		});

		// Load dem configs from filtered paths
		let user = {};
		for (const userPath of existingConfigPaths) {
			this.log.info(`Loading configuration from '${userPath}'`);

			try {
				const userPathConfig = load(userPath, this.configuration.filter, application.runtime.env);
				user = merge(user, userPathConfig);
			} catch (err) {
				this.log.error(`Error while reading configuration from ${userPath}.`);
				this.log.error(err);
				err.message = 'Failed loading configuration from ${userPath}';
				throw err;
			}
		}

		merge(application.configuration, core, user, application.runtime.api, (a, b) => {
			if (Array.isArray(b) && typeof a === 'string') {
				return b;
			}
		});

		application.runtime.prefix = application.runtime.prefix || '/';
		application.runtime.mode = application.runtime.mode || 'server';
		return this;
	}
};
