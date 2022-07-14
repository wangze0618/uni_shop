<template>
	<!-- 最外层的容器 -->
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="SelectAllGoods()">
			<radio color="#C00000" :checked="isSelectAll()" />
			<text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计:
			<text class="amount">￥{{ PriceFixed(totalPrice()) }}</text>
		</view>
		<!-- 结算按钮 -->
		<view @click="settle" class="btn-settle">结算:({{ total() }})</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { PriceFixed } from '@/utils/tools.js';
import { createrOrderAPI } from '@/api/order.js';

const store = useStore();
// 返回选中商品的总个数
const total = store.getters['cart/totalCount'];

// 是否全选
const isSelectAll = store.getters['cart/selectAll'];

// 全选所有商品
const SelectAllGoods = () => store.commit('cart/selectAllGoods');

// 获取所选商品
const selectedGoods = store.getters['cart/selectedGoods'];

// 获取所选商品的总价
const totalPrice = store.getters['cart/totalPrice'];

// 获取收货地址
const address = store.getters['user/detailAddress'];

// 获取token
const token = store.getters['user/token'];
// 点击结算事件
const settle = async () => {
	// 1. 判断是否勾选了要结算的商品
	if (!total()) {
		return uni.$showMsg('请选择商品');
		// 2. 判断用户是否选择了收货地址
	}
	if (!address()) {
		return uni.$showMsg('请选择收货地址');
		// 3. 判断用户是否登录了
	}
	if (token().length == 2 || token().length == 0) {
		return countdown(3);
	}
	// 创建订单
	try {
		const { data } = await createrOrderAPI({
			order_price: totalPrice(),
			consignee_addr: address(),
			goods: [selectedGoods()]
		});
		uni.$showMsg(data.meta.msg);
	} catch (e) {}
};

const showTips = s => {
	uni.showToast({
		icon: 'none',
		title: `请登录后再结算！${s}秒后自动跳转到登录页`,
		mask: true,
		duration: 4000
	});
};
const countdown = time => {
	let timer;
	timer = setInterval(() => {
		showTips(time);
		time = time - 1;
		if (time < 0) {
			try {
				store.commit('user/updateRedirect', {
					openType: 'switchTab',
					from: '/pages/cart/cart'
				});
				uni.switchTab({
					url: '/pages/my/my'
				});
				clearInterval(timer);
			} catch (e) {
				//TODO handle the exception
			}
		}
	}, 1000);
};
</script>

<style lang="scss">
.my-settle-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* 底部固定定位 */
	position: fixed;
	bottom: 0;
	left: 0;
	/* 设置宽高和背景色 */
	width: 100%;
	height: 100rpx;
	padding-left: 10rpx;
	border-top: 2rpx solid #efefef;
	.btn-settle {
		min-width: 180rpx;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		color: #fff;
		background-color: #c00000;
		padding: 0 26rpx;
	}
	.amount-box {
		.amount {
			color: #c00000;
			font-weight: bold;
		}
	}
}
</style>
