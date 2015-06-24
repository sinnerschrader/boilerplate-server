import {resolve} from 'path';
import send from 'koa-send';

export default function staticRouteFactory (application, configuration) {
	return function * staticRoute () {
		let root = resolve( application.runtime.base, application.configuration.paths.static );
		let roots = Array.isArray(configuration.options.root) ? configuration.options.root : [configuration.options.root];

		roots = roots.map((item) => resolve(application.runtime.cwd, item));
		roots.push(root);

		this.assert(this.params.path, 404);

		for (let root of roots) {
			yield send(this, this.params.path, {root});

			if (this.status === 200) {
				application.log.info(`[application:request] Matched ${this.params.path} on ${root}`);
				break;
			} else {
				application.log.info(`[application:request] No match for ${this.params.path} on ${root}`);
			}
		}
	};
}
