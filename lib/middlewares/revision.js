import rev from '../util/rev';

export default function(){
	return function *(next){
		let revision = yield rev();
		yield next;
		this.set('X-Tag', revision.tag);
		this.set('X-Revision', revision.short);
	};
}
