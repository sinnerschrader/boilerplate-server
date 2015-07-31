'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var routes = {
	'path': './application/routes',
	'enabled': {
		'index': {
			'enabled': true,
			'method': 'GET',
			'path': '/'
		},
		'static': {
			'enabled': true,
			'method': 'GET',
			'path': '/static/:path*',
			'options': {
				'root': './static'
			}
		},
		'health': {
			'enabled': true,
			'method': 'GET',
			'path': '/health/'
		}
	}
};

exports['default'] = routes;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9jb25maWd1cmF0aW9uL3JvdXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU0sTUFBTSxHQUFHO0FBQ2QsT0FBTSxFQUFFLHNCQUFzQjtBQUM5QixVQUFTLEVBQUU7QUFDVixTQUFPLEVBQUU7QUFDUixZQUFTLEVBQUUsSUFBSTtBQUNmLFdBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBTSxFQUFFLEdBQUc7R0FDWDtBQUNELFVBQVEsRUFBRTtBQUNULFlBQVMsRUFBRSxJQUFJO0FBQ2YsV0FBUSxFQUFFLEtBQUs7QUFDZixTQUFNLEVBQUUsZ0JBQWdCO0FBQ3hCLFlBQVMsRUFBRTtBQUNWLFVBQU0sRUFBRSxVQUFVO0lBQ2xCO0dBQ0Q7QUFDRCxVQUFRLEVBQUU7QUFDVCxZQUFTLEVBQUUsSUFBSTtBQUNmLFdBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBTSxFQUFFLFVBQVU7R0FDbEI7RUFDRDtDQUNELENBQUM7O3FCQUVhLE1BQU0iLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgcm91dGVzID0ge1xuXHQncGF0aCc6ICcuL2FwcGxpY2F0aW9uL3JvdXRlcycsXG5cdCdlbmFibGVkJzoge1xuXHRcdCdpbmRleCc6IHtcblx0XHRcdCdlbmFibGVkJzogdHJ1ZSxcblx0XHRcdCdtZXRob2QnOiAnR0VUJyxcblx0XHRcdCdwYXRoJzogJy8nXG5cdFx0fSxcblx0XHQnc3RhdGljJzoge1xuXHRcdFx0J2VuYWJsZWQnOiB0cnVlLFxuXHRcdFx0J21ldGhvZCc6ICdHRVQnLFxuXHRcdFx0J3BhdGgnOiAnL3N0YXRpYy86cGF0aConLFxuXHRcdFx0J29wdGlvbnMnOiB7XG5cdFx0XHRcdCdyb290JzogJy4vc3RhdGljJ1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J2hlYWx0aCc6IHtcblx0XHRcdCdlbmFibGVkJzogdHJ1ZSxcblx0XHRcdCdtZXRob2QnOiAnR0VUJyxcblx0XHRcdCdwYXRoJzogJy9oZWFsdGgvJ1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzO1xuIl19