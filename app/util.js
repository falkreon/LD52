function loadImage(src) {
	var result = new Image();
	result.src = src;
	return result;
}

function loadImage(src, callback) {
	const result = new Image();
	result.onload = function() {
		result.onload = null;
		result.complete = null;
		result.onerror = null;
		typeof callback==='function' && callback({img:result});
	}
	
	result.onerror = function() {
		result.onload = null;
		result.complete = null;
		result.onerror = null;
		typeof callback==='function' && callback({err:true});
	}
	
	result.complete = function() {
		result.onload = null;
		result.complete = null;
		result.onerror = null;
		typeof callback==='function' && callback({img:result});
	}
	
	result.src = src;
	return result;
}
