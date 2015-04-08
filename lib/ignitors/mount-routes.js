import koaRouter from 'koa-router';
import winston from 'winston';

export default function mountRoutes(routes, app, config){
	let router = koaRouter();

	Object.keys(routes).forEach(function(name){
		let routeConfig = config.server.routes[name] || {};

		if (routeConfig.enabled === false) {
			winston.debug(`Route "${name}" is disabled by config ...`);
			return;
		};

		winston.info(`Mounting route "${name}"...`);
		routes[name](app, router, name, config);
	});

	app.use(router.routes());
}
