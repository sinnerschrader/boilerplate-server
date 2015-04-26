const lifecycle = {
	'configure': [ 'hookWillConfigure', 'hookDidConfigure' ],
	'start': [ 'hookWillStart', 'hookDidStart' ]
};

class Hook {
	wait = true;
	disabled = false;

	after = [ 'application:after' ];
	defaults = {};
	configuration = {};

	stages = {
		'register': false,
		'configure': false,
		'start': false
	};

	constructor ( name, extender ) {
		this.name = name;
		this.configurationKey = extender.configurationKey || name;

		this.wait = typeof extender.wait !== 'undefined' ? extender.wait : this.wait;
		this.disabled = typeof extender.disabled !== 'undefined' ? extender.disabled : this.disabled;

		this.after = extender.after || this.after;
		this.defaults = extender.defaults || this.defaults;

		this.configure = extender.configure || this.configure;
		this.hookWillConfigure = extender.hookWillConfigure || this.hookWillConfigure;
		this.hookDidConfigure = extender.hookDidConfigure || this.hookDidConfigure;

		this.start = extender.start || this.start;
		this.hookWillStart = extender.hookWillStart || this.hookWillStart;
		this.hookDidStart = extender.hookDidStart || this.hookDidStart;

		this.hookWillRegister = extender.hookWillRegister || this.hookWillRegister;
		this.hookDidRegister = extender.hookDidRegister || this.hookDidRegister;
	}

	register ( application ) {
		if ( this.stages.register ) {
			application.log.warn( '[application:hooks]', `Hook '${this.name}' already registered.` );
			return this;
		}

		this.hookWillRegister( application );
		this.stages.register = true;

		application.log.silly( '[application:hooks]', `Registering hook '${this.name}'` );

		this.after.forEach( ( eventName ) => {
			application.on( eventName, async function() {

				if ( application.configuration && application.configuration.hooks.enabled[ this.name ] === false ) {
					application.log.debug( '[application:hooks]', `Hook '${this.name}' is disabled` );
					this.disabled = true;

					application.emit( `hooks:${this.name}:configure:before` );
					application.emit( `hooks:configure:before`, this.name );
					application.emit( `hooks:${this.name}:start:after` );
					application.emit( `hooks:start:after`, this.name );
					return this;
				}

				await this.stage( 'configure', application );
				await this.stage( 'start', application );
			}.bind( this ) );
		} );

		this.hookDidRegister( application );
		return this;
	}

	hookWillRegister ( application ) {
		return this;
	}

	hookDidRegister ( application ) {
		return this;
	}

	async stage ( stageName, application ) {
		if ( this.stages[ stageName ] ) {
			return this;
		}

		application.log.silly( '[application:hooks]', `Running stage '${stageName}' on hook '${this.name}'` );
		application.emit( `hooks:${this.name}:${stageName}:before` );
		application.emit( `hooks:${stageName}:before`, this.name );

		try {
			await this[ lifecycle[ stageName ][0] ] ( application );
			await this[ stageName ]( application );
			this.stages[ stageName ] = true;
		} catch ( e ) {
			application.log.error( '[application:hooks]', `An error ocurred on stage ${stageName} of hook '${this.name}'` );
			application.log.error( e );

			throw new Error( e );
		}

		application.log.debug( '[application:hooks]', `Ran stage '${stageName}' on hook '${this.name}'` );
		await this[ lifecycle[ stageName ][1] ] ( application );

		application.emit( `hooks:${this.name}:${stageName}:after` );
		application.emit( `hooks:${stageName}:after`, this.name );

		return this;
	}

	async configure ( application ) {
		this.configuration = Object.assign( this.configuration, this.defaults, application.configuration[ this.configurationKey ] );
		return this;
	}

	async hookWillConfigure ( application ) {
		return this;
	}

	async hookDidConfigure ( application ) {
		return this;
	}

	async start ( application ) {
		return this;
	}

	async hookWillStart ( application ) {
		return this;
	}

	async hookDidStart ( application ) {
		return this;
	}
}

function hookFactory ( ...args ) {
	return new Hook( ...args );
}

export default hookFactory;
export { Hook as Hook };
