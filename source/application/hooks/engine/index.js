import engine from './engine';

export default {
	'after': [ 'hooks:user-hooks:start:after' ],

	'start': async function startEngineHook ( application ) {
		application.engine = engine( application );
		return this;
	}
};
