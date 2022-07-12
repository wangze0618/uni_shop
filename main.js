// #ifndef VUE3
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = true
console.log(Vue);
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3

import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import store from './store/store'

export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	return {
		app,
		store
	}
}

// #endif

// 封装消息提示
uni.$showMsg = function(title = '数据请求失败', duration = 1500, icon = 'none') {
	uni.showToast({
		title,
		duration,
		icon
	})
}
