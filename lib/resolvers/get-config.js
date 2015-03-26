import _ from 'lodash';
import getDirectory from './get-directory';

export default async function getConfig(configPath, environment, key = 'server') {
	let config = await getDirectory(configPath);
	if (_.isEmpty(config)) return;
	return _.merge(config, config[key], config[environment] || {});
}
