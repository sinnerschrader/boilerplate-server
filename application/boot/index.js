import { EventEmitter } from 'events';

import bootLogger from './logger';
import hooks from '../hooks';

async function boot ( options ) {

	let application = Object.assign( new EventEmitter(), {
		'runtime': options,
		'log': bootLogger( options )
	} );

	await hooks( application );

	application.log.info( '[application]', `Starting server at http://${application.configuration.server.host}:${application.configuration.server.port} in environment '${application.configuration.environment}' ...` );

	await application.engine.listen( application.configuration.server.port, application.configuration.server.host );
	return application;
}

export default boot;
