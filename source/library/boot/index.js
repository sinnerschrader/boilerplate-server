import { EventEmitter } from 'events';

import bootLogger from './logger';
import hooks from '../../application/hooks';

class BoilerPlateServer extends EventEmitter {
	constructor ( options ) {
		super();

		this.name = options.name;
		this.runtime = options;
		this.log = bootLogger( options );
	}

	start ( host = this.configuration.server.host, port = this.configuration.server.port ) {
		this.engine.start( host, port );
		return this;
	}

	stop () {
		this.log.info( '\n[application:stop] Stopping server gracefully...' );
		this.engine.stop();
		return this;
	}

	mount ( ...args ) {
		this.engine.mount( ...args );
	}
}

async function boot ( options ) {
	let application = new BoilerPlateServer( options );
	return await hooks( application );
}

export default boot;
