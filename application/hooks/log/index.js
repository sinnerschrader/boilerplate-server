/*eslint-disable no-console */
import { Logger, transports } from 'winston';
import { resolve } from 'path';

const transportMethods = {
	'file': transports.File,
	'console': transports.Console
};

export default {
	'after': [ 'hooks:user-hooks:start:after' ],

	'configure': async function configureLogHook ( application ) {
		this.configuration = Object.assign( this.configuration, this.defaults, application.configuration[ this.name ] );
		this.configuration.level = application.runtime.api.loglevel || this.configuration.level;
		this.configuration.path = resolve( application.runtime.cwd, application.configuration.paths.log );

		return this;
	},

	start: async function startLogHook ( application ) {
		let transporters = this.configuration
			.transports.map( ( transportName ) => {
				let Transport = transportMethods[ transportName ];

				if ( typeof Transport !== 'function' ) {
					this.log.warn( `Trying to add log transport '${transportName}' but it is unavailable.` );
					return false;
				}

				let transportConfig = Object.assign( {}, this.configuration.options[ transportName ], { 'name': transportName, 'level': this.configuration.level } );

				if ( transportName === 'file' ) {
					transportConfig.filename = resolve( this.configuration.path, [ transportName, 'log' ].join( '.' ) )
				}

				return new Transport( transportConfig );
			} )
			.filter( ( item ) => item );

		application.log = new Logger( {
			'transports': transporters
		} );

		return this;
	}
};