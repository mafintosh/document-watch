var noop = function() {};
var onupdate = function(doc, key, onset) {
	var value = doc[key];
	var enumerable = (key in doc);
	
	Object.defineProperty(doc, key, {
		enumerable:enumerable,
		configurable:true,
		get: function() {
			return value;
		},
		set: function(setting) {
			if (!enumerable) {
				Object.defineProperty(doc, key, {enumerable:true});
			}
			onset(key, value = setting);
		}
	});	
};

module.exports = function(doc, keys, callback) {
	if (!callback) {
		callback = keys;
		keys = Object.keys(doc);
	}

	var changed = null;
	var onchange = function() {
		var result = changed;

		changed = null;
		callback(result, doc);
	};
	var onset = function(key, value) {
		if (!changed) {
			changed = {};
			process.nextTick(onchange);
		}
		changed[key] = value;
	};

	keys.forEach(function(key) {
		onupdate(doc, key, onset);
	});

	return function() {
		callback = noop;
	};
};