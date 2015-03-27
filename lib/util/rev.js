import git from '../util/git';

export default async function rev(keys = ['short', 'tag']) {
	var result = {};

	for (let key of keys) {
		result[key] = await git[key]();
	}

	return result;
}
