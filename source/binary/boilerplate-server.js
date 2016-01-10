#!/usr/bin/env node
import boilerplate from '../';
import execute from '../library/utilities/execute';

async function main(options = {}) {
	const application = await boilerplate(options);
	return await application.start();
}

execute(main, {mode: 'server'});
