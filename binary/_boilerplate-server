#!/usr/bin/env node
/*eslint-disable no-process-env */
import { resolve } from 'path';

import server from '../application';

async function start ( options = {} ) {
	let augmented = Object.assign( {}, {
			'cwd': process.cwd(),
			'base': resolve( __dirname, '../' ),
			'env': process.env.NODE_ENV || 'development'
		}, options, { 'api': options } );

	return await server( augmented );
}

export default start;
