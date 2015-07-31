'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = startEnvironmentMiddleware;

function startEnvironmentMiddleware(application) {
	return regeneratorRuntime.mark(function environmentMiddleware(next) {
		return regeneratorRuntime.wrap(function environmentMiddleware$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					this.set('X-Name', application.name);
					this.set('X-Environment', application.configuration.environment);
					context$2$0.next = 4;
					return next;

				case 4:
				case 'end':
					return context$2$0.stop();
			}
		}, environmentMiddleware, this);
	});
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9taWRkbGV3YXJlcy9lbnZpcm9ubWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztxQkFBd0IsMEJBQTBCOztBQUFuQyxTQUFTLDBCQUEwQixDQUFHLFdBQVcsRUFBRztBQUNsRSxnQ0FBTyxTQUFXLHFCQUFxQixDQUFHLElBQUk7Ozs7QUFDN0MsU0FBSSxDQUFDLEdBQUcsQ0FBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBRSxDQUFDO0FBQ3ZDLFNBQUksQ0FBQyxHQUFHLENBQUUsZUFBZSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFFLENBQUM7O1lBQzdELElBQUk7Ozs7OztLQUhPLHFCQUFxQjtFQUl0QyxFQUFDO0NBQ0YiLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydEVudmlyb25tZW50TWlkZGxld2FyZSAoIGFwcGxpY2F0aW9uICkge1xuXHRyZXR1cm4gZnVuY3Rpb24gKiBlbnZpcm9ubWVudE1pZGRsZXdhcmUgKCBuZXh0ICkge1xuXHRcdHRoaXMuc2V0KCAnWC1OYW1lJywgYXBwbGljYXRpb24ubmFtZSApO1xuXHRcdHRoaXMuc2V0KCAnWC1FbnZpcm9ubWVudCcsIGFwcGxpY2F0aW9uLmNvbmZpZ3VyYXRpb24uZW52aXJvbm1lbnQgKTtcblx0XHR5aWVsZCBuZXh0O1xuXHR9O1xufVxuIl19