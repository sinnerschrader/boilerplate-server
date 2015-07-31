'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = healthRouteFactory;

function healthRouteFactory(application) {
	return function healthRoute() {
		return regeneratorRuntime.async(function healthRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					this.body = {
						'name': application.name,
						'healthy': true
					};

				case 1:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this);
	};
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9yb3V0ZXMvaGVhbHRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUF3QixrQkFBa0I7O0FBQTNCLFNBQVMsa0JBQWtCLENBQUcsV0FBVyxFQUFHO0FBQzFELFFBQU8sU0FBZSxXQUFXOzs7O0FBQ2hDLFNBQUksQ0FBQyxJQUFJLEdBQUc7QUFDWCxZQUFNLEVBQUUsV0FBVyxDQUFDLElBQUk7QUFDeEIsZUFBUyxFQUFFLElBQUk7TUFDZixDQUFDOzs7Ozs7O0VBQ0YsQ0FBQztDQUNGIiwiZmlsZSI6ImhlYWx0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhlYWx0aFJvdXRlRmFjdG9yeSAoIGFwcGxpY2F0aW9uICkge1xuXHRyZXR1cm4gYXN5bmMgZnVuY3Rpb24gaGVhbHRoUm91dGUgKCkge1xuXHRcdHRoaXMuYm9keSA9IHtcblx0XHRcdCduYW1lJzogYXBwbGljYXRpb24ubmFtZSxcblx0XHRcdCdoZWFsdGh5JzogdHJ1ZVxuXHRcdH07XG5cdH07XG59XG4iXX0=