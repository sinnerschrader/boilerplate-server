import fs from 'fs';
import bluebird from 'bluebird';

export default {
	exists: function(path) {
		return new Promise(function(resolve){
			fs.exists(path, resolve);
		});
	},

	readFile: bluebird.promisify(fs.readFile),
	writeFile: bluebird.promisify(fs.writeFile)
};
