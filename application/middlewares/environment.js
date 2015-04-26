
export default function startEnvironmentMiddleware ( application ) {
	return async function environmentMiddleware ( next ) {
		this.set( 'X-Environment', application.configuration.environment );
		return next;
	};

}
