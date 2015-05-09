function unmountServerFactory ( application ) {

	return async function unmountServer ( ...args ) {
		application.engine.unmount( ...args );
		return application;
	};
}

export default unmountServerFactory;
