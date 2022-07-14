export default {
	namespaced: true,

	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: (uni.getStorageSync('token') || ''),
		userinfo: JSON.parse(uni.getStorageSync('user') || '{}'),
		redirectInfo: {}
	}),
	mutations: {
		// 更新跳转信息
		updateRedirect(state, payload) {
			state.redirectInfo = payload
		},
		// 更新token
		updateToken(state, payload) {
			state.token = payload
			this.commit('user/saveTokenToStorage')
		},
		// 更新收货地址 
		updateAddress(state, payload) {
			state.address = payload
			this.commit('user/saveToStorage')
		},
		// 更新用户基本信息
		updateUserInfo(state, payload) {
			state.userinfo = payload
			this.commit('user/saveUserToStorage')
		},
		// 持久化收货地址
		saveToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 持久化个人基本信息
		saveUserToStorage(state) {
			uni.setStorageSync('user', JSON.stringify(state.userinfo))
		},
		// 持久化token
		saveTokenToStorage(state) {
			uni.setStorageSync('token', JSON.stringify(state.token))
		},
	},

	getters: {
		// 返回跳转信息
		redirectInfo: (state) => () => {
			return state.redirectInfo
		},
		// 返回地址
		address: (state) => () => {
			return state.address
		},
		// 返回token
		token: (state) => () => {
			return state.token
		},
		// 详细的地址
		detailAddress: (state) => () => {
			if (state.address.provinceName) {
				return `${state.address.provinceName}${state.address.cityName}${state.address.countyName}${state.address.detailInfo}`
			}
		}
	}
}
