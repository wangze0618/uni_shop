<template>
	<!-- 搜索框组件 -->
	<my-search @click="goToSearch" class="search"></my-search>
	<!-- 轮播图模块 -->
	<swiper indicator-active-color="white" :indicator-dots="true" :circular="true" :autoplay="true" :interval="3000" :duration="700">
		<swiper-item @click="toDetail(item)" v-for="(item, i) in swiperList" :key="i">
			<view class="swiper-item"><image :src="item.image_src"></image></view>
		</swiper-item>
	</swiper>
	<!-- navList -->
	<view class="navlist">
		<view class="navlist-item" @click="navClick(item.name)" v-for="(item, i) in navList" :key="i"><image :src="item.image_src"></image></view>
	</view>
	<!-- 楼层模块 -->
	<view class="floor-list">
		<view class="floor-item" v-for="(item, i) in floorList" :key="i">
			<image :src="item.floor_title.image_src" class="floor-title"></image>
			<view class="floor-img-box">
				<!-- 左侧图片 -->
				<view class="left-box">
					<image
						@click="floorToList(item.product_list[0])"
						:style="{ width: item.product_list[0].image_width + 'rpx' }"
						:src="item.product_list[0].image_src"
						mode="widthFix"
					></image>
				</view>
				<!-- 右侧图片 -->
				<view class="right-box">
					<view class="right-box-item" @click="floorToList(item2)" v-for="item2 in item.product_list" :key="item2.name">
						<image :style="{ width: item2.image_width + 'rpx' }" :src="item2.image_src" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getSwiperArray, getNavListData, getFloorData } from '@/api/home.js';
export default {
	data() {
		return {
			swiperList: [],
			navList: [],
			floorList: []
		};
	},
	methods: {
		// 点击搜索组件 跳转到 搜索分页
		goToSearch() {
			uni.navigateTo({
				url: '/subpkg/search/search'
			});
		},
		// 点击楼层图片跳转到列表页
		floorToList(data) {
			uni.navigateTo({
				url: `/subpkg/goods_list/goods_list?${data.params}`
			});
		},
		// 点击轮播图 跳转到 商品详情页面
		toDetail(item) {
			uni.navigateTo({
				url: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
			});
		},
		// 点击nav跳转到cate页面
		navClick(name) {
			if (name === '分类') {
				return uni.switchTab({
					url: '/pages/cate/cate'
				});
			}
		},
		// 3.获取楼层数据
		async getFloorList() {
			try {
				const { data } = await getFloorData();
				data.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.params = prod.navigator_url.split('?')[1];
					});
				});
				this.floorList = data.message;
			} catch (e) {
				uni.$showMsg();
			}
		},
		// 1.获取轮播图数据
		async getSwiper() {
			try {
				const { data } = await getSwiperArray();
				this.swiperList = data.message;
			} catch (e) {
				return uni.$showMsg();
			}
			uni.$showMsg('请求数据成功');
		},
		// 2.获取分类数据
		async getNavList() {
			try {
				const { data } = await getNavListData();
				this.navList = data.message;
			} catch (e) {
				return uni.$showMsg();
			}
			// uni.$showMsg('请求数据成功');
		}
	},
	onLoad: function() {
		this.getSwiper();
		this.getNavList();
		this.getFloorList();
	}
};
</script>

<style lang="scss" scoped>
.floor-list {
	image {
		&:active {
			filter: brightness(0.9) grayscale(0.2);
		}
	}

	padding-left: 16rpx;
	.floor-img-box {
		display: flex;

		.left-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			margin-right: 6rpx;
		}
		.right-box {
			display: flex;
			flex-wrap: wrap;
			.right-box-item {
				margin: 3rpx 6rpx;
				&:nth-child(1) {
					display: none;
				}
			}
		}
	}
}
swiper {
	height: 330rpx;
	.swiper-item {
		height: 100%;
		image {
			height: 100%;
			width: 100%;
		}
	}
}

.navlist {
	display: flex;
	justify-content: space-around;
	margin: 30rpx 0;
	.navlist-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		image {
			width: 130rpx;
			height: 140rpx;
		}
	}
}
.floor-title {
	height: 60rpx;
	width: 100%;
	display: flex;
}
</style>
