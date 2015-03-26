import path from 'path';
import requireAll from 'require-all';

import fs from '../util/fs';
import jade from '../transforms/jade';

export default function (app, router, name, config) {
	return router.get(name, '/:file?', function *(){
		let fileName = `${this.params.file || 'index'}.${config.routes[name].ext}`;
		let filePath = path.resolve(config.routes[name].root, fileName);
		let dataPath = path.resolve(config.build.source, config.build.data);
		let data = requireAll(`${dataPath}`);

		if ( ! yield fs.exists(filePath) ) {
			config.winston.warn(`Route ${name} could not find file ${filePath}`);
			return;
		}

		this.body = yield jade(filePath, config.build.jade, { data, config });
	});
}
