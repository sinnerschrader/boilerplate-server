import path from 'path';

import koa from 'koa';
import bluebird from 'bluebird';
import winston from 'winston';
import _ from 'lodash';

import fs from './util/fs';
import getConfig from './resolvers/get-config';
import getInfo from './resolvers/get-info';

import loadHandlers from './ignitors/load-handlers';
import mountMiddlewares from './ignitors/mount-middlewares';
import mountRoutes from './ignitors/mount-routes';


async function start(options = {}, ...rest) {
	let app = koa();
	app.experimental = true;

	// Obtain basic configuration
	let defaultsPath = path.resolve(__dirname, '..', 'conf');
	let cwd = process.cwd();
	let configPath = path.resolve(cwd, 'conf');

	let defaults = await getConfig(defaultsPath, app.env);
	let userConfig = await getConfig(configPath, app.env);

	let defaultsInfo = await getInfo();
	let userInfo = await getInfo(cwd);
	let info = _.merge({}, defaultsInfo, userInfo);

	let config = _.merge({}, defaults, { pkg: info }, userConfig, options);
	winston.info(`Starting ${config.pkg.name}...`);

	// Load defaults handlers
	let defaultHandlers = await loadHandlers(defaults.paths, __dirname);
	let userHandlers = await loadHandlers(config.paths, cwd + '/lib');
	let handlers = Object.assign({}, defaultHandlers, userHandlers);

	mountMiddlewares(handlers.middlewares, app, config);
	mountRoutes(handlers.routes, app, config);

	app = bluebird.promisifyAll(app);
	app = await app.listen(config.port, config.host);

	return Object.assign({}, app, { config });
}

export default start;
