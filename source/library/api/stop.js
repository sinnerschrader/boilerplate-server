function stopServerFactory ( application ) {

	return async function stopServer ( ) {
		application.log.info( '\n[application:stop] Stopping server gracefully...' );
		application.engine.stop();
		return application;
	};
}

export default stopServerFactory;
