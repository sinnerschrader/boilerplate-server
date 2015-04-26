import koa from 'koa';

export default {
	'after': [ 'hooks:user-hooks:start:after' ],

	start: async function startEngineHook ( application ) {
		application.engine = koa();
		application.engine.experimental = true;

		return this;
	}
};
