import { resolve } from 'path';
import { merge } from 'lodash';

import load from '../../utilities/configuration';

export default {
	'after': [ 'application:before' ],

	'defaults': {
		'path': './configuration',
		'filter': /(.*).(js|json)$/
	},

	'configure': async function ( application ) {
		application.configuration = {};

		this.configuration = Object.assign( this.configuration, this.defaults, {
			'path': resolve( application.runtime.base, this.defaults.path )
		} );

		return this;
	},

	'start': async function ( application ) {
		// Load core configuration
		let core = load( this.configuration.path, this.configuration.filter, application.runtime.env );

		// Load package.jsons
		let corePkgPath = resolve( application.runtime.base, 'package.json' );
		let pkgPath = resolve( application.runtime.cwd, 'package.json' );

		let corePkg = require( corePkgPath );

		let pkg = {};

		try {
			pkg = require( pkgPath );
		} catch ( err ) {
			application.log.warn('[hook:configure:start]' `Could not read ${pkgPath}.` );
		}

		pkg = merge( {}, corePkg, pkg );

		// Allow user to override core behaviour via cli and *rc files
		core = merge( {}, core, { 'pkg': pkg }, application.runtime.api );

		// Load user configuration
		let userPath = resolve( application.runtime.cwd, core.paths.configuration );
		let user = {};

		try {
			user = load( userPath, this.configuration.filter, application.runtime.env );
		} catch ( err ) {
			application.log.error( '[hook:configure:start]', `Error while reading user configuration from ${userPath}.` );
			application.log.error( err );

			throw new Error( '[hook:configure:start] Failed loading user configuration' );
		}

		merge( application.configuration, core, user );
		return this;
	}
};
