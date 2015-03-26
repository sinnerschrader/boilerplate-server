import path from 'path';
import less from 'less';
import bluebird from 'bluebird';
import _ from 'lodash';

import fs from '../util/fs';
import git from '../util/git';

less = bluebird.promisifyAll(less);

async function parseLESS(filePath, config) {
	var buffer = await fs.readFile(filePath);
	var contents = buffer.toString('utf-8');

	// Process file override
	var basename = path.basename(filePath, '.less');

	config.overrides = config.overrides || {};
	config.paths = config.paths || [];
	config.plugins = config.plugins || [];
	config.globalVars = config.globalVars || {};

	config.paths.push(path.dirname(filePath));
	config = _.merge({}, config, config.overrides[basename] || {});

	var revision = await git.short();
	var tag = await git.tag();

	config.globalVars = _.merge({}, config.globalVars, { revision: revision, tag: tag });

	config.plugins = config.plugins.map(function(name){
		let Plugin = require(`less-plugin-${name}`);
		return new Plugin(config[name]);
	});

	var comment = '';
	if (config.globalVars) {
		var globals = Object.keys(config.globalVars).map(function(globalVar){
			return ` * @${globalVar}: ${config.globalVars[globalVar]};`;
		}).join('\n');
		comment = `/**\n${globals}\n */\n`;
	}

	var results = {
		css: ''
	};

	try{
		results = await less.render(contents, config);
	} catch(e) {
		console.error(e);
		return;
	}

	return comment + results.css;
}

export default parseLESS;
