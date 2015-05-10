/*
 * Load, schedule and run the default hooks
 */

import { resolve } from 'path';
import load from './load';

function createHooks ( application ) {
	application.hooks = load( application, resolve( application.runtime.base, 'application', 'hooks' ) );

	application.hooks.forEach( function registerCoreHook ( hook ) {
		hook.register( application );
	} );

	application.emit( 'application:before' );

	return new Promise( function resolveHooks ( fulfill ) {
		application.on( 'hooks:start:after', function onAfterHookStart () {
			var remaining = application.hooks.filter( ( hook ) => hook.wait && hook.stages.start === false && hook.disabled === false );

			if ( remaining.length === 0 ) {
				application.emit( 'application:after' );
				application.log.debug( '[application:hooks]', 'All core hooks executed' );

				application.removeListener( 'hooks:start:after', onAfterHookStart );
				fulfill( application );
			}
		} );
	} );
}

export default createHooks;
