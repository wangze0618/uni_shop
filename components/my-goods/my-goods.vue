<template>
	<view class="goods-item">
		<!-- 左侧 -->
		<view class="left-box"><image :src="goods.goods_small_logo || defaultPic" class="goods-image" mode=""></image></view>
		<!-- 右侧 -->
		<view class="right-box">
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{ priceFixed(goods.goods_price) }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-goods',
	props: {
		goods: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			defaultPic: '../../static/celebrity-default-medium.png'
		};
	},
	methods: {
		priceFixed(num) {
			return Number(num).toFixed(2);
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-item {
	display: flex;
	padding: 20rpx 10rpx;
	border-bottom: 2rpx solid #f0f0f0;
	.left-box {
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
			.goods-price {
				color: #c00000;
				font-size: 32rpx;
			}
		}
	}
}
</style>
