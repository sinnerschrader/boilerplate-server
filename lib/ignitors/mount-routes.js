import koaRouter from 'koa-router';
import winston from 'winston';

export default function mountRoutes(routes, app, config){
	let router = koaRouter();

	Object.keys(routes).forEach(function(name){
		winston.info(`Mounting route "${name}"...`);
		routes[name](app, router, name, config);
	});

	app.use(router.routes());
}
