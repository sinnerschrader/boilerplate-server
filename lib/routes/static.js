import path from 'path';
import serve from 'koa-static';

export default function (app, router, name, config) {
	let staticRoot = path.resolve(config.routes[name].root);
	app.use(serve(staticRoot, { defer: true }));
}
