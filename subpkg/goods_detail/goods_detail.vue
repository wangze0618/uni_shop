<template>
	<!-- 轮播图区域 -->
	<view class="info-main" v-if="goods_info.goods_id">
		<swiper class="swiper-box" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in goods_info.pics" :key="index"><image @click="preImage(index)" :src="item.pics_mid"></image></swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info">
			<!-- 价格 -->
			<view class="price">￥{{ goods_info.goods_price }}</view>
			<!-- 信息主体 -->
			<view class="goods-info-body">
				<!-- 商品名字 -->
				<view class="goods-name">{{ goods_info.goods_name }}</view>
				<!-- 收藏商品 -->
				<view class="collect-goods">
					<uni-icons type="star" size="24" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yun-fee">快递：免运费</view>
		</view>
		<view class="title">/&nbsp;详情介绍/&nbsp;</view>
		<!-- 详情页 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 底部goods-nav -->
		<uni-goods-nav class="goods-nav" :fill="true" :options="options" :buttonGroup="buttonGroup" @click="leftClick($event)" @buttonClick="rightClick($event)" />
	</view>
</template>

<script>
import { getGoodsDetailData } from '@/api/goods.js';
export default {
	data() {
		return {
			goods_info: {},
			goods_id: '',
			options: [
				{
					icon: 'shop',
					text: '店铺'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: 2
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	methods: {
		// 点击左侧按钮
		leftClick(e) {
			if (e.content.text == '购物车') {
				return uni.switchTab({
					url: '/pages/cart/cart'
				});
			}
		},
		// 点击右侧按钮
		rightClick(e) {
			console.log(e);
		},
		// 点击轮播图图片进行图片预览
		preImage(index) {
			uni.previewImage({
				current: index,
				urls: this.goods_info.pics.map(x => x.pics_big)
			});
		},

		// 获取详情数据
		async getGoodsDetail() {
			console.log(this.goods_id);
			try {
				const { data } = await getGoodsDetailData(this.goods_id);
				// 解决图片底部空白间隙 解决iOS端不显示webp图片的问题
				data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp/g, 'jpg');
				this.goods_info = data.message;
			} catch (e) {
				uni.$showMsg();
			}
		}
	},
	onLoad(options) {
		this.goods_id = options.goods_id;
		this.getGoodsDetail(this.goods_id);
	}
};
</script>

<style lang="scss">
.info-main {
	padding-bottom: 50px;
}
.goods-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}
.title {
	display: flex;
	justify-content: center;
	margin-bottom: 40rpx;
}
.goods-info {
	padding: 20rpx;
	padding-right: 0;
	.price {
		color: #c00000;
		font-size: 36rpx;
		margin: 20rpx 0;
	}
	.goods-info-body {
		margin: 10rpx 0;
		display: flex;
		.goods-name {
			font-size: 26rpx;
			padding-right: 20rpx;
		}
		.collect-goods {
			width: 180rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-left: 2rpx solid #ebebeb;
			font-size: 24rpx;
			color: gray;
		}
	}
	.yun-fee {
		font-size: 26rpx;
		color: gray;
	}
}
.swiper-box {
	height: 700rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
</style>
