import path from 'path';
import getDirectory from '../resolvers/get-directory';

export default async function loadHandlers(paths, base, keys = ['middlewares', 'transforms', 'routes']) {
	var result = {};

	for (var i = 0; i < keys.length; i += 1) {
		result[keys[i]] = await getDirectory(path.resolve(base, paths[keys[i]]));
	}

	return result;
}
