import {checkPortStatus as test, findAPortNotInUse as find} from 'portscanner';
import {promisify} from 'bluebird';

const ports = {
	'find': promisify( find ),
	'test': promisify( test )
};

export default ports;
