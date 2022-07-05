// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

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
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
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
