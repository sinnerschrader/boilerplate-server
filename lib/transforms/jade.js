import jade from 'jade';
import path from 'path';
import requireAll from 'require-all';

import fs from '../util/fs';
import git from '../util/git';

async function parseJade(filePath, config = {}, data = {}) {
	if (! data.data && config.dataPath) {
		let dataPath = path.resolve(config.dataPath);
		data.data = requireAll(`${dataPath}`);
	}

	var revision = await git.short();
	var tag = await git.tag();
	data.data = Object.assign(data.data, { revision: revision, tag: tag });

	var buffer = await fs.readFile(filePath);
	config = Object.assign({}, config, { filename: filePath });
	return jade.compile(buffer.toString('utf-8'), config)(data);
}

export default parseJade;
