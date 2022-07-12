<template>
	<view v-if="cartData.length !== 0" class="cart-container">
		<!-- 收货地址组件 -->
		<my-address></my-address>
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons class="shop-icon" type="shop" size="24"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 商品列表区域 -->
		<uni-swipe-action>
			<block v-for="(goods, index) in cartData" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swipFn(goods)">
					<my-goods :noSwiper="true" :goods="goods" @num-change="numChange($event)" @radio-change="radioChange($event)" :showNum="true" :showRadio="true"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>

		<!-- 结算区域 -->
		<my-settle></my-settle>
	</view>
	<!-- 空白购物车 -->
	<view v-else class="no-cart">
		<image src="../../static/cart_empty@2x.png"></image>
		<text>这里什么也没有~</text>
	</view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
import { badege } from '@/utils/tools.js';
import { computed, ref, watch } from 'vue';

const store = useStore();
const options = ref([
	{
		text: '删除',
		style: {
			backgroundColor: '#C00000'
		}
	}
]);
// 获取购物车数据
const cartData = computed(() => {
	return store.state.cart.cart;
});
console.log(cartData.value.length);
// 滑动事件
const swipFn = data => {
	store.commit('cart/deleteGoods', data);
};
// 改变选中状态
const radioChange = data => {
	store.commit('cart/updateGoodsState', data);
};
// 改变数量
const numChange = data => {
	store.commit('cart/updateGoodsCount', data);
};
// 显示角标
watch(
	() => store.getters['cart/cartCount'](),
	newVal => {
		badege(newVal, 2);
	},
	{
		immediate: true
	}
);
</script>

<style lang="scss">
.no-cart {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 300rpx;
	image {
		height: 180rpx;
		width: 180rpx;
		margin-bottom: 30rpx;
	}
	text {
		font-size: 26rpx;
		color: #999;
	}
}
.cart-container {
	padding-bottom: 50px;
}

.cart-title {
	display: flex;
	align-items: center;
	height: 80rpx;
	padding-left: 10rpx;
	border-bottom: 2rpx solid #ececec;
	.shop-icon {
	}
	.cart-title-text {
		margin-left: 10rpx;
	}
}
</style>
