import git from '../util/git';

export default function(config){
	return function *(next){
		let tag = yield git.tag();
		let revision = yield git.short();
		yield next;
		this.set('X-Tag', tag);
		this.set('X-Revision', revision);
	}
}
