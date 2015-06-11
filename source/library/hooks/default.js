const lifecycle = {
	'configure': [ 'hookWillConfigure', 'hookDidConfigure' ],
	'start': [ 'hookWillStart', 'hookDidStart' ]
};

class Hook {
	wait = true;
	disabled = false;
	modes = [];

	after = [ 'application:after' ];
	defaults = {};
	configuration = {};

	stageName = 'init';

	stages = {
		'register': false,
		'configure': false,
		'start': false
	};

	constructor ( application, name, extender ) {
		this.name = name;
		this.configurationKey = extender.configurationKey || name;

		this.wait = typeof extender.wait !== 'undefined' ? extender.wait : this.wait;
		this.disabled = typeof extender.disabled !== 'undefined' ? extender.disabled : this.disabled;

		this.modes = extender.modes || this.modes;
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

		this.log = {
			'error': ( ...args ) => { application.log.error( `[hook:${this.name}:${this.stageName}]`, ...args ); },
			'warn': ( ...args ) => { application.log.warn( `[hook:${this.name}:${this.stageName}]`, ...args ); },
			'info': ( ...args ) => { application.log.info( `[hook:${this.name}:${this.stageName}]`, ...args ); },
			'debug': ( ...args ) => { application.log.debug( `[hook:${this.name}:${this.stageName}]`, ...args ); },
			'silly': ( ...args ) => { application.log.silly( `[hook:${this.name}:${this.stageName}]`, ...args ); }
		};
	}

	register ( application ) {
		if ( this.stages.register ) {
			this.log.warn( `Hook '${this.name}' already registered.` );
			return this;
		}

		this.hookWillRegister( application );
		this.stages.register = true;
		this.stageName = 'register';

		this.log.silly( `Registering hook '${this.name}'` );

		if ( this.modes.length > 0 && this.modes.indexOf( application.runtime.mode ) === -1 ) {
			let modeWord = this.modes.length === 1 ? 'mode' : 'modes';
			this.log.debug( `Hook ${this.name} is disabled in mode ${application.runtime.mode}. Enabled in ${modeWord} ${this.modes.join( ', ' )}.` );
			this.disable( application );
			return this;
		}

		async function onSubscription () {
			// application.configuration is not ready before hooks:configure ran
			if ( application.configuration && application.configuration.hooks.enabled[ this.name ] === false ) {
				this.log.debug( `Hook '${this.name}' is disabled explicitly.` );
				this.disable( application );
				return this;
			}

			await this.stage( 'configure', application );
			await this.stage( 'start', application );
		}

		this.after.forEach( ( eventName ) => {
			application.on( eventName, onSubscription.bind( this ) );
		} );

		this.hookDidRegister( application );
		return this;
	}

	disable ( application ) {
		if ( !this.disabled ) {
			this.disabled = true;

			application.emit( `hooks:${this.name}:configure:before` );
			application.emit( `hooks:configure:before`, this.name );
			application.emit( `hooks:${this.name}:start:after` );
			application.emit( `hooks:start:after`, this.name );
		}

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

		this.stageName = stageName;
		this.log.debug( `Running stage '${stageName}' on hook '${this.name}'` );
		application.emit( `hooks:${this.name}:${stageName}:before` );
		application.emit( `hooks:${stageName}:before`, this.name );

		try {
			await this[ lifecycle[ stageName ][ 0 ] ]( application );
			await this[ stageName ]( application );
			this.stages[ stageName ] = true;

			this.log.debug( `Ran stage '${stageName}' on hook '${this.name}'` );
			await this[ lifecycle[ stageName ][ 1 ] ]( application );

			application.emit( `hooks:${this.name}:${stageName}:after` );
			application.emit( `hooks:${stageName}:after`, this.name );

			return this;
		} catch ( e ) {
			this.log.error( `An error ocurred on stage ${stageName} of hook '${this.name}'` );
			this.log.error( e );

			throw new Error( e );
		}
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
