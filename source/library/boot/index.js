import { EventEmitter } from 'events';
import appRootPath from 'app-root-path';

import queuedLogger from '../utilities/queued-logger';
import hooks from '../hooks';

class BoilerPlateServer extends EventEmitter {
	constructor ( options ) {
		super();

		this.name = options.name;
		this.subs = options.subs || [];

		this.runtime = Object.assign({
			'mode': 'server',
			'prefix': '/',
			'env': process.env.BOILERPLATESERVER_ENV || process.env.BOILERPLATE_ENV || process.env.NODE_ENV || process.env.ENV || 'development',
			'cwds': [],
			'cwd': appRootPath.path
		}, options );

		this.log = queuedLogger(this.name);
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

	async run ( options ) {
		if ( !this.console ) {
			this.log.warn( '[application:stop] application.console is not avaiable. Aborting.' );
			return this;
		}

		let args = Object.assign( {}, options );
		delete args._;

		return await this.console.run( options._[ 1 ], args );
	}
}

async function boot ( options ) {
	let application = new BoilerPlateServer( options );
	let result = await hooks( application );
	return result;
}

export default boot;
