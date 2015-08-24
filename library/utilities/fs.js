'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _fs = require('fs');

var _bluebird = require('bluebird');

exports['default'] = {
	'exists': function asyncExists(path) {
		return new Promise(function resolveExists(resolve) {
			(0, _fs.exists)(path, resolve);
		});
	},
	'readFile': (0, _bluebird.promisify)(_fs.readFile),
	'writeFile': (0, _bluebird.promisify)(_fs.writeFile),
	'stat': (0, _bluebird.promisify)(_fs.stat)
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L3V0aWxpdGllcy9mcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBQWtELElBQUk7O3dCQUM1QixVQUFVOztxQkFFckI7QUFDZCxTQUFRLEVBQUUsU0FBUyxXQUFXLENBQUcsSUFBSSxFQUFHO0FBQ3ZDLFNBQU8sSUFBSSxPQUFPLENBQUUsU0FBUyxhQUFhLENBQUcsT0FBTyxFQUFHO0FBQ3RELG1CQUFRLElBQUksRUFBRSxPQUFPLENBQUUsQ0FBQztHQUN4QixDQUFFLENBQUM7RUFDSjtBQUNELFdBQVUsRUFBRSxzQ0FBcUI7QUFDakMsWUFBVyxFQUFFLHVDQUFzQjtBQUNuQyxPQUFNLEVBQUUsa0NBQWlCO0NBQ3pCIiwiZmlsZSI6ImZzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhpc3RzLCByZWFkRmlsZSwgd3JpdGVGaWxlLCBzdGF0IH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdCdleGlzdHMnOiBmdW5jdGlvbiBhc3luY0V4aXN0cyAoIHBhdGggKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCBmdW5jdGlvbiByZXNvbHZlRXhpc3RzICggcmVzb2x2ZSApIHtcblx0XHRcdGV4aXN0cyggcGF0aCwgcmVzb2x2ZSApO1xuXHRcdH0gKTtcblx0fSxcblx0J3JlYWRGaWxlJzogcHJvbWlzaWZ5KCByZWFkRmlsZSApLFxuXHQnd3JpdGVGaWxlJzogcHJvbWlzaWZ5KCB3cml0ZUZpbGUgKSxcblx0J3N0YXQnOiBwcm9taXNpZnkoIHN0YXQgKVxufTtcbiJdfQ==