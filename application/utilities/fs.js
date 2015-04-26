import { exists, readFile, writeFile, stat } from 'fs';
import thunkify from 'thunkify';
import { promisify } from 'bluebird';

export default {
	'exists': thunkify( exists ),
	'readFile': promisify( readFile ),
	'writeFile': promisify( writeFile ),
	'stat': promisify( stat )
};
