'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
function JSONErrorFactory(application) {
	return regeneratorRuntime.mark(function jsonErrorMiddlewares(next) {
		var message, text;
		return regeneratorRuntime.wrap(function jsonErrorMiddlewares$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.prev = 0;
					context$2$0.next = 3;
					return next;

				case 3:
					context$2$0.next = 22;
					break;

				case 5:
					context$2$0.prev = 5;
					context$2$0.t18 = context$2$0['catch'](0);

					context$2$0.t18.expose = true;
					this.response.status = context$2$0.t18.status || 404;

					if (context$2$0.t18.status === 401) {
						this.set('WWW-Authenticate', 'Basic');
					}

					message = ['Error', context$2$0.t18.pattern ? 'in "' + context$2$0.t18.pattern + '"' : '', context$2$0.t18.transform ? 'during transform "' + context$2$0.t18.transform + '" of' : '', context$2$0.t18.file ? '"' + context$2$0.t18.file + '":' : 'unknown file:', context$2$0.t18.message ? context$2$0.t18.message : ''].filter(function (item) {
						return item;
					}).join(' ');

					application.log.error(message);
					application.log.debug(context$2$0.t18.stack ? context$2$0.t18.stack : new Error(context$2$0.t18).stack);

					context$2$0.t19 = this.accepts('json', 'html', 'text');
					context$2$0.next = context$2$0.t19 === 'json' ? 16 : 19;
					break;

				case 16:
					this.type = 'json';
					this.body = {
						'message': message,
						'pattern': context$2$0.t18.pattern,
						'transform': context$2$0.t18.transform,
						'file': context$2$0.t18.file,
						'stack': context$2$0.t18.stack
					};
					return context$2$0.abrupt('break', 22);

				case 19:
					text = ['Message: ' + message, 'Pattern: ' + context$2$0.t18.pattern, 'Transform: ' + context$2$0.t18.transform, 'File: ' + context$2$0.t18.file, context$2$0.t18.stack].join('\n');

					this.body = text;
					return context$2$0.abrupt('break', 22);

				case 22:
				case 'end':
					return context$2$0.stop();
			}
		}, jsonErrorMiddlewares, this, [[0, 5]]);
	});
}

exports['default'] = JSONErrorFactory;
module.exports = exports['default'];