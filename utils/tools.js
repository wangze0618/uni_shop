export function debounce(fn, delay = 1000) {
	let timer = null;
	return function() {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		timer = setTimeout(() => {
			fn()
			console.log(111);
		}, delay)
	}
}
