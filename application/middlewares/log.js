export default function startLogMiddleware ( application ) {

	return function * logMiddleware ( next ) {
		let start = new Date();

		yield next;
		application.log.debug( '[application:request]', `${start} ${this.method} ${this.url} - ${this.response.status} ${this.response.message}` );
	};

}
