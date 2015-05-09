import boot from './boot';

import start from './api/start';
import stop from './api/stop';
import mount from './api/mount';
import unmount from './api/unmount';

async function boilerplate ( options = {} ) {
	let application = await boot( options );
	return Object.assign( application, {
		'start': start( application ),
		'stop': stop( application ),
		'mount': mount( application ),
		'unmount': unmount( application )
	});
}

export default boilerplate;
