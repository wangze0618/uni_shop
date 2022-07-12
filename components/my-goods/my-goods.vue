<template>
	<view class="goods-item">
		<!-- 左侧 -->
		<view class="left-box">
			<radio color="#C00000" @click="radioState()" :checked="goods.goods_state" v-if="showRadio" />
			<image :src="goods.goods_small_logo || defaultPic" class="goods-image" mode=""></image>
		</view>
		<!-- 右侧 -->
		<view class="right-box">
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{ priceFixed(goods.goods_price) }}</view>
				<!-- 商品数量 -->
				<uni-number-box v-if="showNum" :value="goods.goods_count" @change="changeNum($event)" class="numberbox" :min="1"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
	goods: {
		type: Object,
		default: () => {}
	},
	showRadio: {
		type: Boolean,
		default: false
	},
	showNum: {
		type: Boolean,
		default: false
	}
});
const defaultPic = ref('../../static/celebrity-default-medium.png');
const priceFixed = num => {
	return Number(num).toFixed(2);
};
// 定义 自定义方法 传出当前goods的id和选中state
const emit = defineEmits(['radio-change', 'num-change']);
const radioState = () => {
	emit('radio-change', {
		goods_id: props.goods.goods_id,
		goods_state: !props.goods.goods_state
	});
};
const changeNum = data => {
	emit('num-change', {
		goods_id: props.goods.goods_id,
		goods_count: data
	});
};
</script>

<style lang="scss" scoped>
.goods-item {
	display: flex;
	padding: 20rpx 10rpx;
	border-bottom: 2rpx solid #f0f0f0;
	.left-box {
		display: flex;
		align-items: center;
		margin-right: 10rpx;
		.goods-image {
			width: 200rpx;
			height: 200rpx;
		}
	}
	.right-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name {
			font-size: 26rpx;
		}
		.goods-info-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.numberbox {
				margin-right: 10rpx;
			}
			.goods-price {
				color: #c00000;
				font-size: 32rpx;
			}
		}
	}
}
</style>
