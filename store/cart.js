export default {
	namespaced: true,
	state: () => ({
		// 购物车数组
		// 每个商品的信息对象，都包含6个属性
		// {goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || "[]")
	}),
	mutations: {
		// 将商品信息 添加到 car数组
		addToCart(state, payload) {
			// 1. 根据提交的商品id，先查询购物车数组里是否有这件商品
			const findResult = state.cart.find(goods => goods.goods_id === payload.goods_id)
			// 2. 如果存在就数量增加 1，否则就 新增 该商品
			if (!findResult) {
				state.cart.push(payload)
			} else {
				findResult.goods_count += 1
			}
			this.commit('cart/saveToStorage')
		},

		// 更新购物车商品选中状态
		updateGoodsState(state, payload) {
			const findGoods = state.cart.find(goods => goods.goods_id === payload.goods_id)
			findGoods.goods_state = payload.goods_state
			this.commit('cart/saveToStorage')
		},
		// 更新购物车商品的数量
		updateGoodsCount(state, payload) {
			const findGoods = state.cart.find(goods => goods.goods_id === payload.goods_id)
			findGoods.goods_count = payload.goods_count
			this.commit('cart/saveToStorage')
		},
		// 删除商品
		deleteGoods(state, payload) {
			const findGoodsIndex = state.cart.findIndex(goods => goods.goods_id === payload.goods_id)
			state.cart.splice(findGoodsIndex, 1)
			this.commit('cart/saveToStorage')
		},
		// 操作-> 全选操作
		selectAllGoods(state) {
			state.cart.forEach((item) => {
				item.goods_state = !item.goods_state
				this.commit('cart/saveToStorage')
			})
		},
		// 持久化商品信息
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		}
	},
	getters: {
		// 计算出 购物车的件数
		cartCount: (state) => () => {
			return state.cart.reduce((p, goods) => p + goods.goods_count, 0)
		},
		totalCount: (state) => () => {
			return state.cart.filter(g => g.goods_state === true).reduce((p, g) => p + g.goods_count, 0)
		},
		// 判断是否全选
		selectAll: (state) => () => {
			return state.cart.every(goods => goods.goods_state === true)
		},
		// 返回所选商品的总价
		totalPrice: (state) => () => {
			return state.cart.filter(g => g.goods_state).map(g => g.goods_count * g.goods_price).reduce((p, g) =>
				p + g, 0)
		},
		// 返回所选商品
		selectedGoods: (state) => () => {
			return state.cart.filter(g => g.goods_state)
		},
	},
}
