let nameSpace = new WeakMap();

class TaskConsole {
	constructor ( application, options ) {
		nameSpace.set( this, { application, options, 'tasks': options.tasks } );
	}

	async run ( taskName, options ) {
		const { application, tasks } = nameSpace.get(this);

		if ( typeof taskName !== 'string' ) {
			throw new Error( 'Missing taskName parameter.' );
		}

		if ( !tasks[taskName] ) {
			throw new Error( `Task "${taskName}" is not available. Available tasks: ${Object.keys(tasks)}` );
		}

		if ( tasks[taskName] && typeof tasks[taskName].index !== 'function' ) {
			throw new Error( `Task "${taskName}" is available but invalid.` );
		}

		application.log.info(`[console:run] Starting taskName "${taskName}"...`);

		const task = tasks[taskName].index;
		const taskConfiguration = {...application.configuration.tasks[taskName], ...options};

		if (!taskConfiguration) {
			application.log.warn(`[console:run] Starting taskName "${taskName}" without configuration...`);
		}

		try {
			await task(application, taskConfiguration);
			application.log.info(`[console:run] taskName "${taskName}" executed successfully`);
		} catch (err) {
			throw err;
		}
	}
}

function consoleFactory ( ...args ) {
	return new TaskConsole( ...args );
}

export default consoleFactory;
