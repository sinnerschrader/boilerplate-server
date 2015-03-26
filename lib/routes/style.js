import fs from '../util/fs';
import path from 'path';

import less from '../transforms/less';

export default function (app, router, name, config) {
	router
		.get(name, '/style/:file.css', function *(){
			let fileName = `${this.params.file}.${config.routes[name].ext}`;
			let filePath = path.resolve(config.routes[name].root, fileName);

			if ( ! yield fs.exists(filePath) ) {
				config.winston.warn(`Route ${name} could not find file ${filePath}`);
				return;
			}

			this.type = 'text/css';
			this.body = yield less(filePath, config.build.less);
		});
}
