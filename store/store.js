import {
	createStore
} from 'vuex'
import cart from './cart.js'
import user from './user.js'


// 创建一个新的 store 实例
const store = createStore({
	state() {
		return {}
	},
	mutations: {},
	getters: {

	},
	modules: {
		cart,
		user
	},
	// plugins: [
	// 	// 默认存储在localstorage
	// 	createPersistedState({
	// 		// 本地存储的名字
	// 		key: "uni-shop",
	// 		// 需要存储的模块
	// 		paths: ["cart"],
	// 	}),
	// ],
})

export default store
