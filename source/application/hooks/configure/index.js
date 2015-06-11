import { resolve } from 'path';
import { merge } from 'lodash';

import load from '../../../library/utilities/configuration';
import { exists } from '../../../library/utilities/fs';

export default {
	'after': [ 'application:before' ],

	'defaults': {
		'path': './configuration',
		'filter': /(.*).(js|json)$/
	},

	'configure': async function configureEngineHook ( application ) {
		application.configuration = {};

		this.configuration = Object.assign( this.configuration, this.defaults, {
			'path': resolve( application.runtime.base, this.defaults.path )
		} );

		return this;
	},

	'start': async function startEngineHook ( application ) {
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
			this.log.warn( `Could not read ${pkgPath}.` );
		}

		pkg = merge( {}, corePkg, pkg );

		// Allow user to override core behaviour via cli and *rc files
		core = merge( {}, core, { 'pkg': pkg }, application.runtime.api );

		// Load user configuration
		let userPath = resolve( application.runtime.cwd, core.paths.configuration );
		let user = {};

		if ( await exists( userPath ) ) {
			try {
				user = load( userPath, this.configuration.filter, application.runtime.env );
			} catch ( err ) {
				this.log.error( `Error while reading user configuration from ${userPath}.` );
				this.log.error( err );

				throw new Error( 'Failed loading user configuration' );
			}
		} else {
			this.log.warn( `No user configuration present at '${userPath}'` );
		}

		merge( application.configuration, core, user, application.runtime.api );
		application.runtime.prefix = application.runtime.prefix || '/';
		application.runtime.mode = application.runtime.mode || 'server';
		return this;
	}
};
