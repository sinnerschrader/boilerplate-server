import path from 'path';
import _ from 'lodash';
import mkdirp from 'mkdirp';
import shell from 'shelljs';

import getDefaults from './util/get-defaults';
import getTransforms from './util/get-transforms';
import fs from './util/fs';

async function build(options = {}) {
	let configPath = path.resolve(__dirname, '..', 'conf');
	let defaults = getDefaults(configPath, process.env.NODE_ENV || 'development');
	let config = Object.assign({}, defaults, options);

	config.tasks = config.tasks || [];
	let tasks = config._.length > 0 ? config._ : ['default'];

	let transforms = getTransforms(path.resolve(__dirname, 'transforms'));

	let tasksToRun = config.build.tasks.filter(function(task){
		return tasks.filter(function(taskName){
			return task.tasks.indexOf(taskName) !== -1;
		}).length > 0;
	});

	let availableTasks = _.uniq(_.flatten(config.build.tasks.map((task) => task.tasks)));

	if (tasksToRun.length === 0) {
		options.winston.warn(`Task(s) "${tasks}" did not match any known tasks.`);
		options.winston.info(`Available tasks: ${availableTasks.join(', ')}.`);
		return;
	}

	mkdirp(config.build.build);

	shell.cp('-r', path.resolve(config.build.source, config.build.static) + '/*', config.build.build);

	tasksToRun.forEach(function(taskToRun){
		var sourcePaths = taskToRun.files.map(function(file){
			return path.resolve(config.build.source, taskToRun.type, file);
		});

		var transform = transforms[taskToRun.transform];

		if (! transform){
			options.winston.warn('Could not find transform `${tasksToRun.transform}`');
			return;
		}

		sourcePaths.forEach(async function (sourcePath){
			try{
				mkdirp(path.resolve(config.build.build, taskToRun.type));
				let destPath = path.resolve(config.build.build, taskToRun.path || taskToRun.type,`${path.basename(sourcePath, path.extname(sourcePath))}.${taskToRun.ext}`);
				options.winston.info(`Transforming ${sourcePath} to ${destPath} via ${taskToRun.transform}`);
				let result = await transform(sourcePath, config.build[taskToRun.transform]);
				await fs.writeFile(destPath, result);
				options.winston.info(`Transformed ${sourcePath} to ${destPath} via ${taskToRun.transform}`);
			} catch(e) {
				config.winston.error(e);
			}
		});
	});
}

export default build;
