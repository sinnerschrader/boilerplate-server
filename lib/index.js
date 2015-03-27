import koa from 'koa';
import bluebird from 'bluebird';
import winston from 'winston';
import _ from 'lodash';

import boot from './boot';
import loadHandlers from './ignitors/load-handlers';
import mountMiddlewares from './ignitors/mount-middlewares';
import mountRoutes from './ignitors/mount-routes';

async function start(options = {}) {
	let app = koa();
	app.experimental = true;

	let config = await boot(options, app.env);
	winston.info(`Starting ${config.pkg.name} in environment "${config.env}"...`);

	// Load defaults handlers
	let defaultHandlers = await loadHandlers(config.defaults.paths, __dirname);
	let userHandlers = await loadHandlers(config.paths, config.cwd + '/lib');
	let handlers = _.merge({}, defaultHandlers, userHandlers);

	mountMiddlewares(handlers.middlewares, app, config);
	mountRoutes(handlers.routes, app, config);

	app = bluebird.promisifyAll(app);
	app = await app.listen(config.port, config.host);

	return _.merge({}, app, { config });
}

export default start;
