import { merge } from 'lodash';
import requireAll from 'require-all';

function loadConfiguration ( path, filter = /(.*).(js|json)$/, env = 'development' ) {

	let rawConfiguration = requireAll( {
		'dirname': path,
		'filter': filter
	} );

	let envConfiguration = rawConfiguration.environments[ env ] || {};

	return merge( {},
		rawConfiguration, envConfiguration, { 'environment': env } );
}

export default loadConfiguration;
