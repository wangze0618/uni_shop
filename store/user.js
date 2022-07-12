export default {
	namespaced: true,

	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	mutations: {
		// 更新收货地址 
		updateAddress(state, payload) {
			state.address = payload
			this.commit('user/saveToStorage')
		},
		// 持久化收货地址
		saveToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	},

	getters: {
		// 详细的地址
		detailAddress: (state) => () => {
			if (state.address.provinceName) {
				console.log('!');
				return `${state.address.provinceName}${state.address.cityName}${state.address.countyName}${state.address.detailInfo}`
			} else {
				return
			}
		}
	}
}
