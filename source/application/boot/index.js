import { EventEmitter } from 'events';

import ports from '../utilities/ports';
import bootLogger from './logger';
import hooks from '../hooks';

async function boot ( options ) {

	let application = Object.assign( new EventEmitter(), {
		'runtime': options,
		'log': bootLogger( options )
	} );

	await hooks( application );

	if ( await ports.test( application.configuration.server.port, application.configuration.server.host ) === 'open' ) {
		if ( application.configuration.server.autoPort !== true ) {
			throw new Error( `Port ${application.configuration.server.port} is taken and server.autPort is disabled, could not start server.` );
		}

		application.log.warn( `[application] Port ${application.configuration.server.port} is taken, trying to obtain next open port... ` );
		application.configuration.server.port = await ports.find( application.configuration.server.port + 1,
			application.configuration.server.port + 51, application.configuration.server.host );
	}

	application.log.info( '[application]', `Starting server at http://${application.configuration.server.host}:${application.configuration.server.port} in environment '${application.configuration.environment}' ...` );

	await application.engine.listen( application.configuration.server.port, application.configuration.server.host );
	return application;
}

export default boot;
