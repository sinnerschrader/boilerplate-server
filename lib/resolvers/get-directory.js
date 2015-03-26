import requireAll from 'require-all';

import fs from '../util/fs';

export default async function getDirectory(dirname) {
	if (! await fs.exists(dirname)) return {};
	return requireAll({
		dirname: dirname,
		filter: /(.*)\.(js|json)$/
	});
}
