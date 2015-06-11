import engine from './engine';

export default {
	'after': [ 'hooks:user-hooks:start:after' ],
	'modes': [ 'server' ],

	'start': async function startEngineHook ( application ) {
		application.engine = engine( application );
		return this;
	}
};
