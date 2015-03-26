import path from 'path';

export default async function getInfo(dirname = null) {
	if (dirname === null) {
		return require('../../package');
	}

	try {
		return require(path.resolve(dirname, 'package.json'));
	} catch(e) {
		return {};
	}
}
