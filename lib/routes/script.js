import path from 'path';

import fs from '../util/fs';
import browserify from '../transforms/browserify';


export default function (app, router, name, config) {
	router
		.get(name, '/script/:file.js', function *(){
			let fileName = `${this.params.file}.${config.routes[name].ext}`;
			let filePath = path.resolve(config.routes[name].root, fileName);

			if ( ! yield fs.exists(filePath) ) {
				config.winston.warn(`Route ${name} could not find file ${filePath}`);
				return;
			}

			this.type = 'application/javascript';
			this.body = yield browserify(filePath, config.build.browserify);
		});
}
