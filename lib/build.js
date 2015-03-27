import path from 'path';

import winston from 'winston';
import mkdirp from 'mkdirp';
import shell from 'shelljs';
import _ from 'lodash';

import fs from './util/fs';

import boot from './boot';
import loadHandlers from './ignitors/load-handlers';

async function build(options = {}) {
	let config = await boot(options, process.env.NODE_ENV || 'development');
	winston.info(`Starting build for ${config.pkg.name} in environment "${config.env}"...`);

	let defaultHandlers = await loadHandlers(config.defaults.paths, __dirname);
	let userHandlers = await loadHandlers(config.paths, config.cwd + '/lib');
	let handlers = _.merge({}, defaultHandlers, userHandlers);

	config.tasks = config.tasks || [];
	let tasks = config._.length > 0 ? config._ : ['default'];

	let run = config.build.tasks.filter(function(task){
		return tasks.filter(function(taskName){
			return task.tasks.indexOf(taskName) !== -1;
		}).length > 0;
	});


	if (run.length === 0) {
		let available = _.uniq(_.flatten(config.build.tasks.map((task) => task.tasks)));
		options.winston.warn(`Task(s) "${tasks}" did not match any known tasks.`);
		options.winston.info(`Available tasks: ${available.join(', ')}.`);
		return;
	}

	let buildDirectory = path.resolve(config.cwd, config.build.paths.build);

	if (! await fs.exists(buildDirectory)) {
		winston.info(`Creating build directory at ${buildDirectory}`);
		mkdirp(buildDirectory);
	} else {
		winston.info(`Cleaning build directory at ${buildDirectory}`);
		shell.rm('-r', buildDirectory + '/*');
	}

	let staticDirectory = path.resolve(
		config.cwd, config.build.paths.source, config.build.paths.static);

	if (await fs.exists(staticDirectory)) {
		shell.cp('-r', staticDirectory);
	}

	for (let task of run) {
		var transform = handlers.transforms[task.transform];

		if (! transform ) {
			winston.warn('Could not find transform `${tasksToRun.transform}`');
			continue;
		}

		var sources = task.files.map(function(baseName){
			return path.resolve(config.build.paths.source, task.type, baseName);
		});

		for (let source of sources) {
			if (! await fs.exists(source)) {
				winston.warn(`Could not find source ${source}`);
				continue;
			}

			let dest = path.resolve(config.build.paths.build, task.path || task.type);
			let file = path.resolve(dest, `${path.basename(source, path.extname(dest))}.${task.ext}`)

			try {
				mkdirp(dest);
				options.winston.info(`Transforming ${source} to ${file} via ${task.transform}`);
				let result = await transform(source, config.build[task.transform]);
				await fs.writeFile(file, result);
				winston.info(`Transformed ${source} to ${dest} via ${task.transform}`);
			} catch (err) {
				config.winston.error(e);
			}
		}
	}
}

export default build;
