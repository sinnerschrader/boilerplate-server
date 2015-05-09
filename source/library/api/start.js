function startServerFactory ( application ) {
	return async function startServer ( host = application.configuration.server.host, port = application.configuration.server.port ) {
		application.engine.start( host, port );
	};
}

export default startServerFactory;
