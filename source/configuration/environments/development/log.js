const log = {
	'level': process.env.BOILERPLATESERVER_LOG_LEVEL || process.env.BOILERPLATE_LOG_LEVEL || process.env.NODE_LOG_LEVEL || process.env.LOG_LEVEL || 'debug'
};

export default log;
