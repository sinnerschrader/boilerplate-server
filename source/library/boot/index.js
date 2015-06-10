import { EventEmitter } from 'events';

import bootLogger from './logger';
import hooks from '../hooks';

class BoilerPlateServer extends EventEmitter {
	constructor ( options ) {
		super();

		this.name = options.name;
		this.subs = options.subs || [];

		this.runtime = Object.assign( {
			'mode': 'server',
			'prefix': '/',
			'env': 'development'
		}, options );

		this.log = bootLogger( options, this );
	}

	async start ( host = this.configuration.server.host, port = this.configuration.server.port ) {
		await this.engine.start( host, port );
		return this;
	}

	async stop () {
		this.log.info( '\n[application:stop] Stopping server gracefully...' );
		await this.engine.stop();
		this.log.info( '\n[application:stop] Stopped server gracefully...' );
		return this;
	}

	mount ( ...args ) {
		this.engine.mount( ...args );
		return this;
	}

	async console ( ...args ) {
		if ( !this.console ) {
			this.log.warn( '[application:stop] application.console is not avaiable. Aborting.' );
			return this;
		}

		await this.console.run( ...args );
		return this;
	}
}

async function boot ( options ) {
	let application = new BoilerPlateServer( options );
	let result = await hooks( application );
	return result;
}

export default boot;
