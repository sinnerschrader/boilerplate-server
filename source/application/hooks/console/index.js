export default {
	'after': [ 'hooks:user-hooks:start:after' ],

	'start': async function startConsoleHook ( application ) {
		application.console = async function() {
			console.log(arguments);
		};
		return this;
	}
};
