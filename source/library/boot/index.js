import { EventEmitter } from 'events';

import bootLogger from './logger';
import hooks from '../../application/hooks';

async function boot ( options ) {

	let application = Object.assign( new EventEmitter(), {
		'runtime': options,
		'log': bootLogger( options )
	} );

	return await hooks( application );
}

export default boot;
