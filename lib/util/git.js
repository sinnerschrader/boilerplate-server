import git from 'git-rev';

export default {
	short: function(){
		return new Promise(function(resolve){
			git.short(resolve);
		});
	},
	long: function() {
		return new Promise(function(resolve){
			git.long(resolve);
		});
	},
	branch: function(){
		return new Promise(function(resolve){
			git.branch(resolve);
		});
	},
	tag: function(){
		return new Promise(function(resolve){
			git.tag(resolve);
		});
	}
};
