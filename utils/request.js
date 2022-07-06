const BASE_URL = 'http://www.uinav.com' //接口地址
export default (url, method = 'get', data) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: 'Loading',
		})
		uni.request({
			url: BASE_URL + url,
			method: method || 'GET',
			data: data || {},
			header: {
				Authorization: uni.getStorageSync('token')
			},
			success: (res) => {
				// if (res == '') {
				// 	return uni.showToast({
				// 		icon: 'error',
				// 		title: '获取数据失败'
				// 	})
				// }
				if (res) uni.hideLoading()
				resolve(res)
			},
			fail: (err) => {
				// return uni.showToast({
				// 	icon: 'error',
				// 	title: '请求失败'
				// })
				reject(err)
			},
			complete: (res) => {
				// if (res) {
				// 	uni.hideLoading()
				// 	uni.hideToast()
				// }
			}
		})
	})
}
