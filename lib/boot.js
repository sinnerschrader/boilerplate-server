import path from 'path';

import _ from 'lodash';

import getConfig from './resolvers/get-config';
import getInfo from './resolvers/get-info';

export default async function boot(options, env) {
	let defaultsPath = path.resolve(__dirname, '..', 'conf');
	let cwd = process.cwd();
	let configPath = path.resolve(cwd, 'conf');

	let defaults = await getConfig(defaultsPath, env);
	let userConfig = await getConfig(configPath, env);

	let defaultsInfo = await getInfo();
	let userInfo = await getInfo(cwd);
	let info = _.merge({}, defaultsInfo, userInfo);

	return _.merge(
		{}, defaults,
		{ pkg: info, defaults: defaults, cwd, env,  },
		userConfig, options
	);
}
