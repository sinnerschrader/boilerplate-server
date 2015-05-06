import koa from 'koa';

import boot from './boot';

async function server ( options = {} ) {
	return await boot( options );
}

export default server;
