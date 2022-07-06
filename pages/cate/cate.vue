<template>
	<view>
		<!-- 自定义搜索组件 my-search -->
		<my-search @click="goToSearch"></my-search>
		<view class="scroll-view-container">
			<!-- left -->
			<scroll-view class="left-scroll" scroll-y>
				<view class="left-scroll-item" :class="{ active: leftActive == index }" @click="addActive(index)" v-for="(item, index) in cateList" :key="index">{{ item.cat_name }}</view>
			</scroll-view>
			<!-- right -->
			<scroll-view class="right-scroll" :scroll-top="top" scroll-y>
				<view class="cate-level2" v-for="(item2, index2) in cateList2" :key="index2">
					<!-- 二级分类标题 -->
					<view class="cate-level2-title">/&nbsp;{{ item2.cat_name }}&nbsp;/</view>
					<!-- 三级分类 -->
					<view class="cate-level3">
						<view @click="gotoGoodsList(item3)" class="cate-level3-item" v-for="(item3, index3) in item2.children" :key="index3">
							<image :src="item3.cat_icon"></image>
							<text>{{ item3.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { getCateListData } from '@/api/cate.js';
export default {
	data() {
		return {
			cateList: [],
			cateList2: [],
			leftActive: 0,
			top: 0
		};
	},
	methods: {
		// 点击搜索组件 跳转到 搜索分页
		goToSearch() {
			uni.navigateTo({
				url: '/subpkg/search/search'
			});
		},
		// 点击三级分类项 跳转到 商品列表页goods_list
		gotoGoodsList(item3) {
			uni.navigateTo({
				url: `/subpkg/goods_list/goods_list?cid=${item3.cat_id}`
			});
		},
		// 激活类名
		addActive(index) {
			this.leftActive = index;
			this.cateList2 = this.cateList[index].children;
			// 修复:切换一级分类后重置滚动条的位置
			this.top = this.top == 0 ? 0.1 : 0;
			console.log(this.cateList2);
		},

		// 获取左侧一级分类的数据
		async getCateList() {
			try {
				const { data } = await getCateListData();
				this.cateList = data.message;
				// 赋值二级分类
				this.cateList2 = data.message[0].children;
			} catch (e) {
				uni.$showMsg();
			}
		}
	},
	onLoad() {
		this.getCateList();
	}
};
</script>

<style lang="scss">
view {
	box-sizing: border-box;
	scroll-behavior: smooth;
}
.scroll-view-container {
	display: flex;
	.left-scroll {
		height: 100vh;
		width: 240rpx;
		.left-scroll-item {
			font-size: 26rpx;
			background-color: #f7f7f7;
			line-height: 120rpx;
			text-align: center;
			&.active {
				color: red;
				background-color: #fff;
				position: relative;
				&::before {
					position: absolute;
					content: '';
					display: block;
					height: 60rpx;
					width: 6rpx;
					background-color: red;
					top: 30rpx;
				}
			}
		}
	}
	.right-scroll {
		height: 100vh;
		background-color: #fff;
		.cate-level2 {
			.cate-level2-title {
				text-align: center;
				font-size: 26rpx;
				font-weight: bold;
				padding: 30rpx 0;
			}
			.cate-level3 {
				display: flex;
				flex-wrap: wrap;
				.cate-level3-item {
					width: 33.3%;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 20rpx;
					justify-content: center;
					image {
						width: 120rpx;
						height: 120rpx;
					}
					text {
						font-size: 24rpx;
						margin-top: 4rpx;
					}
				}
			}
		}
	}
}
</style>
