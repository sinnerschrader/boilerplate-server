import winston from 'winston';

export default function mountMiddlewares(middlewares, app, config){
	Object.keys(middlewares).forEach(function(name){
		winston.info(`Mounting middleware "${name}"...`);
		app.use(middlewares[name](config));
	});
}
