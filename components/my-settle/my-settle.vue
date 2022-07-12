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
		<view class="btn-settle">结算:({{ total() }})</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { PriceFixed } from '@/utils/tools.js';

const store = useStore();
// 返回选中商品的总个数
const total = store.getters['cart/totalCount'];

// 是否全选
const isSelectAll = store.getters['cart/selectAll'];

// 全选所有商品
const SelectAllGoods = () => store.commit('cart/selectAllGoods');

// 获取所选商品的总价
const totalPrice = store.getters['cart/totalPrice'];
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
