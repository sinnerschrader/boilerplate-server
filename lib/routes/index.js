import path from 'path';

import winston from 'winston';

import fs from '../util/fs';
import rev from '../util/rev';

import getDirectory from '../resolvers/get-directory';
import jade from '../transforms/jade';

export default function (app, router, name, config) {
	let dataPath = path.resolve(config.build.paths.source, config.build.paths.data);
	let sourcePath = path.resolve(config.routes[name].root);

	return router.get(name, '/:file?', function *(){
		let baseName = 'index';

		if (this.params.file) {
			baseName = path.basename(this.params.file, path.extname(this.params.file));
		}

		let fileName = `${baseName}.${config.routes[name].ext}`;
		let filePath = path.resolve(sourcePath, fileName);
		let data = yield getDirectory(`${dataPath}`);
		Object.assign(data, rev());

		if ( ! yield fs.exists(filePath) ) {
			winston.warn(`Route ${name} could not find file ${filePath}`);
			return;
		}

		this.body = yield jade(filePath, config.build.jade, { data, config });
	});
}
