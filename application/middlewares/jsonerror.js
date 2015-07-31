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
					context$2$0.t0 = context$2$0['catch'](0);

					context$2$0.t0.expose = true;
					this.response.status = context$2$0.t0.status || 404;

					if (context$2$0.t0.status === 401) {
						this.set('WWW-Authenticate', 'Basic');
					}

					message = ['Error', context$2$0.t0.pattern ? 'in "' + context$2$0.t0.pattern + '"' : '', context$2$0.t0.transform ? 'during transform "' + context$2$0.t0.transform + '" of' : '', context$2$0.t0.file ? '"' + context$2$0.t0.file + '":' : 'unknown file:', context$2$0.t0.message ? context$2$0.t0.message : ''].filter(function (item) {
						return item;
					}).join(' ');

					application.log.error(message);
					application.log.debug(context$2$0.t0.stack ? context$2$0.t0.stack : new Error(context$2$0.t0).stack);

					context$2$0.t1 = this.accepts('json', 'html', 'text');
					context$2$0.next = context$2$0.t1 === 'json' ? 16 : 19;
					break;

				case 16:
					this.type = 'json';
					this.body = {
						'message': message,
						'pattern': context$2$0.t0.pattern,
						'transform': context$2$0.t0.transform,
						'file': context$2$0.t0.file,
						'stack': context$2$0.t0.stack
					};
					return context$2$0.abrupt('break', 22);

				case 19:
					text = ['Message: ' + message, 'Pattern: ' + context$2$0.t0.pattern, 'Transform: ' + context$2$0.t0.transform, 'File: ' + context$2$0.t0.file, context$2$0.t0.stack].join('\n');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9taWRkbGV3YXJlcy9qc29uZXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxTQUFTLGdCQUFnQixDQUFHLFdBQVcsRUFBRztBQUN6QyxnQ0FBTyxTQUFXLG9CQUFvQixDQUFHLElBQUk7TUFXdkMsT0FBTyxFQXVCTCxJQUFJOzs7Ozs7WUFoQ0osSUFBSTs7Ozs7Ozs7OztBQUVWLG9CQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDcEIsU0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsZUFBTSxNQUFNLElBQUksR0FBRyxDQUFDOztBQUUzQyxTQUFLLGVBQU0sTUFBTSxLQUFLLEdBQUcsRUFBRztBQUMzQixVQUFJLENBQUMsR0FBRyxDQUFFLGtCQUFrQixFQUFFLE9BQU8sQ0FBRSxDQUFDO01BQ3hDOztBQUVHLFlBQU8sR0FBRyxDQUNiLE9BQU8sRUFDUCxlQUFNLE9BQU8sWUFBVSxlQUFNLE9BQU8sU0FBTSxFQUFFLEVBQzVDLGVBQU0sU0FBUywwQkFBd0IsZUFBTSxTQUFTLFlBQVMsRUFBRSxFQUNqRSxlQUFNLElBQUksU0FBTyxlQUFNLElBQUksVUFBTyxlQUFlLEVBQ2pELGVBQU0sT0FBTyxHQUFHLGVBQU0sT0FBTyxHQUFHLEVBQUUsQ0FDbEMsQ0FBQyxNQUFNLENBQUMsVUFBUyxJQUFJLEVBQUU7QUFBRSxhQUFPLElBQUksQ0FBQztNQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOztBQUVuRCxnQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsZ0JBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQU0sS0FBSyxHQUFHLGVBQU0sS0FBSyxHQUFHLElBQUksS0FBSyxnQkFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOztzQkFFbEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQzsyQ0FDdEMsTUFBTTs7OztBQUNWLFNBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ25CLFNBQUksQ0FBQyxJQUFJLEdBQUc7QUFDWCxlQUFTLEVBQUUsT0FBTztBQUNsQixlQUFTLEVBQUUsZUFBTSxPQUFPO0FBQ3hCLGlCQUFXLEVBQUUsZUFBTSxTQUFTO0FBQzVCLFlBQU0sRUFBRSxlQUFNLElBQUk7QUFDbEIsYUFBTyxFQUFFLGVBQU0sS0FBSztNQUNwQixDQUFDOzs7O0FBR0UsU0FBSSxHQUFHLENBQ1YsV0FBVyxHQUFHLE9BQU8sRUFDckIsV0FBVyxHQUFHLGVBQU0sT0FBTyxFQUMzQixhQUFhLEdBQUcsZUFBTSxTQUFTLEVBQy9CLFFBQVEsR0FBRyxlQUFNLElBQUksRUFDckIsZUFBTSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztBQUV4QixTQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7Ozs7OztLQXpDSCxvQkFBb0I7RUE2Q3JDLEVBQUM7Q0FDRjs7cUJBRWMsZ0JBQWdCIiwiZmlsZSI6Impzb25lcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEpTT05FcnJvckZhY3RvcnkgKCBhcHBsaWNhdGlvbiApIHtcblx0cmV0dXJuIGZ1bmN0aW9uICoganNvbkVycm9yTWlkZGxld2FyZXMgKCBuZXh0ICkge1xuXHRcdHRyeSB7XG5cdFx0XHR5aWVsZCBuZXh0O1xuXHRcdH0gY2F0Y2ggKCBlcnJvciApIHtcblx0XHRcdGVycm9yLmV4cG9zZSA9IHRydWU7XG5cdFx0XHR0aGlzLnJlc3BvbnNlLnN0YXR1cyA9IGVycm9yLnN0YXR1cyB8fCA0MDQ7XG5cblx0XHRcdGlmICggZXJyb3Iuc3RhdHVzID09PSA0MDEgKSB7XG5cdFx0XHRcdHRoaXMuc2V0KCAnV1dXLUF1dGhlbnRpY2F0ZScsICdCYXNpYycgKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIG1lc3NhZ2UgPSBbXG5cdFx0XHRcdCdFcnJvcicsXG5cdFx0XHRcdGVycm9yLnBhdHRlcm4gPyBgaW4gXCIke2Vycm9yLnBhdHRlcm59XCJgIDogJycsXG5cdFx0XHRcdGVycm9yLnRyYW5zZm9ybSA/IGBkdXJpbmcgdHJhbnNmb3JtIFwiJHtlcnJvci50cmFuc2Zvcm19XCIgb2ZgIDogJycsXG5cdFx0XHRcdGVycm9yLmZpbGUgPyBgXCIke2Vycm9yLmZpbGV9XCI6YCA6ICd1bmtub3duIGZpbGU6Jyxcblx0XHRcdFx0ZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiAnJ1xuXHRcdFx0XS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkgeyByZXR1cm4gaXRlbTsgfSkuam9pbignICcpO1xuXG5cdFx0XHRhcHBsaWNhdGlvbi5sb2cuZXJyb3IobWVzc2FnZSk7XG5cdFx0XHRhcHBsaWNhdGlvbi5sb2cuZGVidWcoZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IG5ldyBFcnJvcihlcnJvcikuc3RhY2spO1xuXG5cdFx0XHRzd2l0Y2ggKHRoaXMuYWNjZXB0cygnanNvbicsICdodG1sJywgJ3RleHQnKSkge1xuXHRcdFx0XHRjYXNlICdqc29uJzpcblx0XHRcdFx0XHR0aGlzLnR5cGUgPSAnanNvbic7XG5cdFx0XHRcdFx0dGhpcy5ib2R5ID0ge1xuXHRcdFx0XHRcdFx0J21lc3NhZ2UnOiBtZXNzYWdlLFxuXHRcdFx0XHRcdFx0J3BhdHRlcm4nOiBlcnJvci5wYXR0ZXJuLFxuXHRcdFx0XHRcdFx0J3RyYW5zZm9ybSc6IGVycm9yLnRyYW5zZm9ybSxcblx0XHRcdFx0XHRcdCdmaWxlJzogZXJyb3IuZmlsZSxcblx0XHRcdFx0XHRcdCdzdGFjayc6IGVycm9yLnN0YWNrXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR2YXIgdGV4dCA9IFtcblx0XHRcdFx0XHRcdCdNZXNzYWdlOiAnICsgbWVzc2FnZSxcblx0XHRcdFx0XHRcdCdQYXR0ZXJuOiAnICsgZXJyb3IucGF0dGVybixcblx0XHRcdFx0XHRcdCdUcmFuc2Zvcm06ICcgKyBlcnJvci50cmFuc2Zvcm0sXG5cdFx0XHRcdFx0XHQnRmlsZTogJyArIGVycm9yLmZpbGUsXG5cdFx0XHRcdFx0XHRlcnJvci5zdGFja10uam9pbignXFxuJyk7XG5cblx0XHRcdFx0XHR0aGlzLmJvZHkgPSB0ZXh0O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSlNPTkVycm9yRmFjdG9yeTtcbiJdfQ==