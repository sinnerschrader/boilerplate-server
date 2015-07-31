'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = startLogMiddleware;

function startLogMiddleware(application) {
	return regeneratorRuntime.mark(function logMiddleware(next) {
		var start, delta;
		return regeneratorRuntime.wrap(function logMiddleware$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					start = new Date();
					context$2$0.next = 3;
					return next;

				case 3:
					delta = new Date() - start;

					application.log.debug('[application:request]', start + ' - ' + this.method + ' ' + this.url + ' - ' + this.response.status + ' ' + this.response.message + ' - ' + delta + 'ms');

				case 5:
				case 'end':
					return context$2$0.stop();
			}
		}, logMiddleware, this);
	});
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9taWRkbGV3YXJlcy9sb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7cUJBQXdCLGtCQUFrQjs7QUFBM0IsU0FBUyxrQkFBa0IsQ0FBRyxXQUFXLEVBQUc7QUFDMUQsZ0NBQU8sU0FBVyxhQUFhLENBQUcsSUFBSTtNQUNqQyxLQUFLLEVBRUwsS0FBSzs7OztBQUZMLFVBQUssR0FBRyxJQUFJLElBQUksRUFBRTs7WUFDaEIsSUFBSTs7O0FBQ04sVUFBSyxHQUFHLElBQUksSUFBSSxFQUFFLEdBQUcsS0FBSzs7QUFDOUIsZ0JBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFFLHVCQUF1QixFQUFLLEtBQUssV0FBTSxJQUFJLENBQUMsTUFBTSxTQUFJLElBQUksQ0FBQyxHQUFHLFdBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLFNBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLFdBQU0sS0FBSyxRQUFNLENBQUM7Ozs7OztLQUp6SSxhQUFhO0VBSzlCLEVBQUM7Q0FDRiIsImZpbGUiOiJsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydExvZ01pZGRsZXdhcmUgKCBhcHBsaWNhdGlvbiApIHtcblx0cmV0dXJuIGZ1bmN0aW9uICogbG9nTWlkZGxld2FyZSAoIG5leHQgKSB7XG5cdFx0bGV0IHN0YXJ0ID0gbmV3IERhdGUoKTtcblx0XHR5aWVsZCBuZXh0O1xuXHRcdGxldCBkZWx0YSA9IG5ldyBEYXRlKCkgLSBzdGFydDtcblx0XHRhcHBsaWNhdGlvbi5sb2cuZGVidWcoICdbYXBwbGljYXRpb246cmVxdWVzdF0nLCBgJHtzdGFydH0gLSAke3RoaXMubWV0aG9kfSAke3RoaXMudXJsfSAtICR7dGhpcy5yZXNwb25zZS5zdGF0dXN9ICR7dGhpcy5yZXNwb25zZS5tZXNzYWdlfSAtICR7ZGVsdGF9bXNgICk7XG5cdH07XG59XG4iXX0=