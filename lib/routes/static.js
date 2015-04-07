import path from 'path';
import serve from 'koa-static';

export default function (app, router, name, config) {
	config.routes[name].root.forEach(function(staticRoot){
		staticRoot = path.resolve(staticRoot);
		app.use(serve(staticRoot, { defer: true }));
	});
}
