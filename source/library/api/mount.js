function mountServerFactory ( application ) {

	return async function mountServer ( ...args ) {
		application.engine.mount( ...args );
		return application;
	};
}

export default mountServerFactory;
