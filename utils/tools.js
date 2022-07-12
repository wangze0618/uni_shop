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

// 将商品价格 小数点两位
export const PriceFixed = (num) => {
	return Number(num).toFixed(2)
}

// 显示角标
// export const badege = (store, index) => {
// 	const text = store.getters['cart/cartCount']
// 	return uni.setTabBarBadge({
// 		index,
// 		text: String(text())
// 	})
// }
export const badege = (text, index) => {
	return uni.setTabBarBadge({
		index,
		text: String(text)
	})
}
