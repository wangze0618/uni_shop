<template>
	<!-- 轮播图区域 -->
	<view class="info-main" v-if="goods_info.value">
		<swiper class="swiper-box" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="600">
			<swiper-item v-for="(item, index) in goods_info.value.pics" :key="index"><image @click="preImage(index)" :src="item.pics_mid"></image></swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info">
			<!-- 价格 -->

			<view class="price">￥{{ PriceFixed(goods_info.value.goods_price) }}</view>
			<!-- 信息主体 -->
			<view class="goods-info-body">
				<!-- 商品名字 -->
				<view class="goods-name">{{ goods_info.value.goods_name }}</view>
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
		<rich-text :nodes="goods_info.value.goods_introduce"></rich-text>
		<!-- 底部goods-nav -->
		<uni-goods-nav class="goods-nav" :fill="true" :options="options" :buttonGroup="buttonGroup" @click="leftClick($event)" @buttonClick="rightClick($event)" />
	</view>
</template>

<script>
import { getGoodsDetailData } from '@/api/goods.js';
import { ref, computed, reactive, watch } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
import store from '@/store/store.js';
import { PriceFixed, badege } from '@/utils/tools.js';

export default {
	setup() {
		const store = useStore();
		const goods_id = ref('');
		let goods_info = reactive({});
		// let cartCount = () => {
		// 	return store.state.cart.cart[0].goods_count;
		// };

		const options = ref([
			{
				icon: 'shop',
				text: '店铺'
			},
			{
				icon: 'cart',
				text: '购物车',
				info: 0
			}
		]);
		const buttonGroup = ref([
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
		]);

		// 点击左侧按钮
		const leftClick = async e => {
			if (e.content.text == '购物车') {
				return uni.switchTab({
					url: '/pages/cart/cart'
				});
			}
		};
		// 点击右侧按钮
		const rightClick = e => {
			if (e.content.text == '加入购物车') {
				let goods = {
					goods_id: goods_info.value.goods_id,
					goods_name: goods_info.value.goods_name,
					goods_price: goods_info.value.goods_price,
					goods_count: 1,
					goods_small_logo: goods_info.value.goods_small_logo,
					goods_state: true
				};
				store.commit('cart/addToCart', goods);
			}
		};
		// 点击轮播图图片进行图片预览
		const preImage = index => {
			uni.previewImage({
				current: index,
				urls: goods_info.value.pics.map(x => x.pics_big)
			});
		};
		// 获取详情数据
		const getGoodsDetail = async () => {
			try {
				const { data } = await getGoodsDetailData(goods_id.value);
				// 解决图片底部空白间隙 解决iOS端不显示webp图片的问题
				data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp/g, 'jpg');
				goods_info.value = data.message;
			} catch (e) {
				uni.$showMsg();
			}
		};
		// 监听cart的getters 赋值给 小红点
		watch(
			() => store.getters['cart/cartCount'](),
			val => {
				setTimeout(() => {
					options.value[1].info = val;
				}, 300);
			},
			{ immediate: true }
		);
		onLoad(options => {
			goods_id.value = options.goods_id;
			getGoodsDetail(goods_id.value);
		});
		return { goods_info, goods_id, options, buttonGroup, leftClick, rightClick, preImage, store, PriceFixed };
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
