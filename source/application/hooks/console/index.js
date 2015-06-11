import { resolve } from 'path';
import { exists } from '../../../library/utilities/fs';

import requireAll from 'require-all';
import consoleFactory from './console';

export default {
	'after': [ 'hooks:log:start:after' ],

	'start': async function startConsoleHook ( application ) {
		let taskPaths = [ application.runtime.base, application.runtime.cwd ]
			.map( ( loadPath ) => resolve( loadPath, this.configuration.path ) )
			.filter( ( item, index, list ) => {
				return list.lastIndexOf( item ) !== index || list.indexOf( item ) === index;
			});

		let exisingtaskPaths = [];

		for ( let taskPath of taskPaths ) {
			if ( await exists( taskPath ) ) {
				exisingtaskPaths.push( taskPath );
			}
		}

		let tasks = exisingtaskPaths.map( ( tasksPath ) => requireAll( tasksPath ) )
			.reduce( ( results, task ) => Object.assign( results, task ), {} );

		application.console = consoleFactory( application, Object.assign( {}, this.configuration, { tasks } ) );
		return this;
	}
};
