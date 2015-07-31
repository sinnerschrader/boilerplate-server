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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L3V0aWxpdGllcy9mcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBQWtELElBQUk7O3dCQUM1QixVQUFVOztxQkFFckI7QUFDZCxTQUFRLEVBQUUsU0FBUyxXQUFXLENBQUcsSUFBSSxFQUFHO0FBQ3ZDLFNBQU8sSUFBSSxPQUFPLENBQUUsU0FBUyxhQUFhLENBQUcsT0FBTyxFQUFHO0FBQ3RELFdBTk0sTUFBTSxFQU1KLElBQUksRUFBRSxPQUFPLENBQUUsQ0FBQztHQUN4QixDQUFFLENBQUM7RUFDSjtBQUNELFdBQVUsRUFBRSxjQVJKLFNBQVMsTUFERCxRQUFRLENBU1M7QUFDakMsWUFBVyxFQUFFLGNBVEwsU0FBUyxNQURTLFNBQVMsQ0FVQTtBQUNuQyxPQUFNLEVBQUUsY0FWQSxTQUFTLE1BRG9CLElBQUksQ0FXaEI7Q0FDekIiLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGlzdHMsIHJlYWRGaWxlLCB3cml0ZUZpbGUsIHN0YXQgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0J2V4aXN0cyc6IGZ1bmN0aW9uIGFzeW5jRXhpc3RzICggcGF0aCApIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uIHJlc29sdmVFeGlzdHMgKCByZXNvbHZlICkge1xuXHRcdFx0ZXhpc3RzKCBwYXRoLCByZXNvbHZlICk7XG5cdFx0fSApO1xuXHR9LFxuXHQncmVhZEZpbGUnOiBwcm9taXNpZnkoIHJlYWRGaWxlICksXG5cdCd3cml0ZUZpbGUnOiBwcm9taXNpZnkoIHdyaXRlRmlsZSApLFxuXHQnc3RhdCc6IHByb21pc2lmeSggc3RhdCApXG59O1xuIl19