/*eslint-disable no-console */

/**
 * Log Hook
 * Abstract: Provides logging facilities on application.log
 * Configuration: configuration/log.js
 **/
import startLogger from './logger';

export default {
	'after': [ 'hooks:user-hooks:start:after' ],

	'configure': async function configureLogHook ( application ) {
		this.configuration = Object.assign( this.configuration, this.defaults, application.configuration[ this.name ] );
		this.configuration.level = application.runtime.api.loglevel || this.configuration.level;
		return this;
	},

	'start': async function startLogHook ( application ) {
		let logger = startLogger(`[${application.name}]`, this.configuration);

		application.log.silly('Draining boot logger queue...');
		application.log.drain(logger);

		logger.silly('Deploying application logger...');
		application.log.deploy(logger);

		return this;
	}
};
