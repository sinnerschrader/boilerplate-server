#!/usr/bin/env node
/*eslint-disable no-process-env, no-process-exit */

import 'babel-core/polyfill';
import minimist from 'minimist';

import boilerplate from '../';

async function start (options) {
	const mode = 'console';
	const settings = {...options, mode};
	const application = await boilerplate(settings);

	const command = settings._[1]
	await application.run(command, settings);
}

const args = minimist(process.argv.slice(1));

start(args)
	.catch(err => {throw err});
