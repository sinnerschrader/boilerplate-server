import browserify from 'browserify';

function runBrowserify(filePath, options) {
	var b = browserify(options);
	b.add(filePath);

	options.transforms = options.transforms || [];

	options.transforms.forEach(function(transformName){
		let transformOptions = options[transformName] || {};
		let transformFn = require(transformName);
		b.transform(transformFn, transformOptions);
	});

	return new Promise(function(resolve, reject){
		b.bundle(function(err, results){
			if (err) return reject(err);
			resolve(results);
		});
	});
}

export default runBrowserify;
