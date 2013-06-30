if (!String.prototype.repeat) {
	String.prototype.repeat = function(count) {
		return count > 0 ? new Array(count + 1).join(this) : '';
	};
}

if (!String.prototype.dasherize) {
	String.prototype.dasherize = function() {
		return this
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.replace(/[ _-]+/g, '-')
			.toLowerCase();
	};
}
