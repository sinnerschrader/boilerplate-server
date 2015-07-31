'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = responseTimeMiddlewareFactory;

function responseTimeMiddlewareFactory() {
	return regeneratorRuntime.mark(function responseTimeMiddleware(next) {
		var start, responseTime;
		return regeneratorRuntime.wrap(function responseTimeMiddleware$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					start = new Date();
					context$2$0.next = 3;
					return next;

				case 3:
					responseTime = new Date() - start;

					this.set('X-Response-Time', responseTime + 'ms');

				case 5:
				case 'end':
					return context$2$0.stop();
			}
		}, responseTimeMiddleware, this);
	});
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9taWRkbGV3YXJlcy9yZXNwb25zZS10aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUF3Qiw2QkFBNkI7O0FBQXRDLFNBQVMsNkJBQTZCLEdBQUk7QUFDeEQsZ0NBQU8sU0FBVyxzQkFBc0IsQ0FBRyxJQUFJO01BQzFDLEtBQUssRUFHTCxZQUFZOzs7O0FBSFosVUFBSyxHQUFHLElBQUksSUFBSSxFQUFFOztZQUNoQixJQUFJOzs7QUFFTixpQkFBWSxHQUFHLElBQUksSUFBSSxFQUFFLEdBQUcsS0FBSzs7QUFDckMsU0FBSSxDQUFDLEdBQUcsQ0FBRSxpQkFBaUIsRUFBSyxZQUFZLFFBQU0sQ0FBQzs7Ozs7O0tBTGxDLHNCQUFzQjtFQU12QyxFQUFDO0NBQ0YiLCJmaWxlIjoicmVzcG9uc2UtdGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc3BvbnNlVGltZU1pZGRsZXdhcmVGYWN0b3J5ICgpIHtcblx0cmV0dXJuIGZ1bmN0aW9uICogcmVzcG9uc2VUaW1lTWlkZGxld2FyZSAoIG5leHQgKSB7XG5cdFx0bGV0IHN0YXJ0ID0gbmV3IERhdGUoKTtcblx0XHR5aWVsZCBuZXh0O1xuXG5cdFx0bGV0IHJlc3BvbnNlVGltZSA9IG5ldyBEYXRlKCkgLSBzdGFydDtcblx0XHR0aGlzLnNldCggJ1gtUmVzcG9uc2UtVGltZScsIGAke3Jlc3BvbnNlVGltZX1tc2AgKTtcblx0fTtcbn1cbiJdfQ==