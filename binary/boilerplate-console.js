#!/usr/bin/env node

/*eslint-disable no-process-env, no-process-exit */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel-core/polyfill');

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function start() {
	var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	var application, settings, log;
	return regeneratorRuntime.async(function start$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				application = undefined;
				settings = Object.assign(options, { 'mode': 'console' });
				context$1$0.prev = 2;
				context$1$0.next = 5;
				return regeneratorRuntime.awrap((0, _2['default'])(settings));

			case 5:
				application = context$1$0.sent;
				context$1$0.next = 13;
				break;

			case 8:
				context$1$0.prev = 8;
				context$1$0.t0 = context$1$0['catch'](2);
				log = application ? application.log || console : console;

				log.error(context$1$0.t0);
				throw new Error(context$1$0.t0);

			case 13:
				context$1$0.prev = 13;
				context$1$0.next = 16;
				return regeneratorRuntime.awrap(application.run(settings));

			case 16:
				context$1$0.next = 22;
				break;

			case 18:
				context$1$0.prev = 18;
				context$1$0.t1 = context$1$0['catch'](13);

				application.log.error(context$1$0.t1);
				throw new Error(context$1$0.t1);

			case 22:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this, [[2, 8], [13, 18]]);
}

start((0, _minimist2['default'])(process.argv.slice(1)));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9iaW5hcnkvYm9pbGVycGxhdGUtY29uc29sZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1FBR08scUJBQXFCOzt3QkFDUCxVQUFVOzs7O2dCQUVQLEtBQUs7Ozs7QUFFN0IsU0FBZSxLQUFLO0tBQUcsT0FBTyx5REFBRyxFQUFFO0tBQzlCLFdBQVcsRUFDWCxRQUFRLEVBS1AsR0FBRzs7OztBQU5KLGVBQVc7QUFDWCxZQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBRSxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUU7OztvQ0FHekMsbUJBQWEsUUFBUSxDQUFFOzs7QUFBM0MsZUFBVzs7Ozs7OztBQUVQLE9BQUcsR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsSUFBSSxPQUFPLEdBQUcsT0FBTzs7QUFDNUQsT0FBRyxDQUFDLEtBQUssZ0JBQVMsQ0FBQztVQUNiLElBQUksS0FBSyxnQkFBUzs7Ozs7b0NBSWxCLFdBQVcsQ0FBQyxHQUFHLENBQUUsUUFBUSxDQUFFOzs7Ozs7Ozs7O0FBRWpDLGVBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBUyxDQUFDO1VBQ3pCLElBQUksS0FBSyxnQkFBUzs7Ozs7OztDQUV6Qjs7QUFFRCxLQUFLLENBQUUsMkJBQVUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBRSxDQUFDIiwiZmlsZSI6ImJvaWxlcnBsYXRlLWNvbnNvbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qZXNsaW50LWRpc2FibGUgbm8tcHJvY2Vzcy1lbnYsIG5vLXByb2Nlc3MtZXhpdCAqL1xuXG5pbXBvcnQgJ2JhYmVsLWNvcmUvcG9seWZpbGwnO1xuaW1wb3J0IG1pbmltaXN0IGZyb20gJ21pbmltaXN0JztcblxuaW1wb3J0IGJvaWxlcnBsYXRlIGZyb20gJy4uLyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0ICggb3B0aW9ucyA9IHt9ICkge1xuXHRsZXQgYXBwbGljYXRpb247XG5cdGxldCBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oIG9wdGlvbnMsIHsgJ21vZGUnOiAnY29uc29sZScgfSApO1xuXG5cdHRyeSB7XG5cdFx0YXBwbGljYXRpb24gPSBhd2FpdCBib2lsZXJwbGF0ZSggc2V0dGluZ3MgKTtcblx0fSBjYXRjaCAoIGVycm9yICkge1xuXHRcdGxldCBsb2cgPSBhcHBsaWNhdGlvbiA/IGFwcGxpY2F0aW9uLmxvZyB8fCBjb25zb2xlIDogY29uc29sZTtcblx0XHRsb2cuZXJyb3IoIGVycm9yICk7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBlcnJvciApO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRhd2FpdCBhcHBsaWNhdGlvbi5ydW4oIHNldHRpbmdzICk7XG5cdH0gY2F0Y2ggKCBlcnJvciApIHtcblx0XHRhcHBsaWNhdGlvbi5sb2cuZXJyb3IoIGVycm9yICk7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBlcnJvciApO1xuXHR9XG59XG5cbnN0YXJ0KCBtaW5pbWlzdCggcHJvY2Vzcy5hcmd2LnNsaWNlKCAxICkgKSApO1xuIl19