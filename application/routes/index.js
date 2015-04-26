export default function indexRouteFactory( application ) {
	return async function indexRoute ( path ) {
		this.body = 'You are up and running! Place a custom index route in ./application/routes.';
	};
}
