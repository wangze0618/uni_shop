<template>
	<!-- 顶部搜索栏 -->
	<view class="search-box">
		<uni-search-bar
			@clear="clearSearchRes()"
			:focus="true"
			class="search-bar"
			maxlength="12"
			placeholder="搜索"
			radius="100"
			@input="input($event)"
			clearButton="auto"
			v-model="searchText"
		/>
	</view>
	<!-- 搜索列表展示区 -->
	<view class="search-list" v-if="showHistory">
		<view class="search-list-item" @click="goToDetail(item)" v-for="(item, index) in searchList" :key="index">
			<view class="goods-name">{{ index + 1 }}.&nbsp;{{ item.goods_name }}</view>
			<uni-icons type="arrowright" size="16"></uni-icons>
		</view>
	</view>
	<!-- 搜索历史区 -->
	<view class="search-history" v-else>
		<view class="search-history-title">
			<text>搜索历史</text>
			<uni-icons @click="clearHis()" type="trash" size="22"></uni-icons>
		</view>
		<view class="search-history-list">
			<text @click="goToList(item)" class="history-item" v-for="(item, index) in searchHistory" :key="index">{{ item }}</text>
		</view>
	</view>
	<uni-popup ref="popup" type="dialog">
		<uni-popup-dialog
			content="确认删除历史记录？"
			mode="base"
			message="成功消息"
			:duration="1500"
			:before-close="true"
			@close="this.$refs.popup.close()"
			@confirm="confirmDialog"
		></uni-popup-dialog>
	</uni-popup>
</template>

<script>
import { getSearchListData } from '@/api/search.js';
export default {
	data() {
		return {
			searchText: '',
			timer: null,
			searchList: [],
			searchHistory: []
		};
	},

	computed: {
		showHistory() {
			return this.searchText.length !== 0 && this.searchList.length !== 0;
		}
	},
	methods: {
		// 点击历史记录重新搜索
		goToList(item) {
			uni.navigateTo({
				url: `/subpkg/goods_list/goods_list?query=${item}`
			});
		},

		// 确认后清除历史记录
		confirmDialog() {
			(this.searchHistory = []), uni.setStorageSync('history', JSON.stringify([]));
			this.$refs.popup.close();
		},
		// 点击垃圾icon 清空搜索记录
		clearHis() {
			this.$refs.popup.open();
		},
		// 点击icon 清空 搜索结果数组
		clearSearchRes() {
			this.searchList = [];
		},
		// 点击搜索列表项 跳转到 详情页
		goToDetail(data) {
			uni.navigateTo({
				url: `/subpkg/goods_detail/goods_detail?goods_id=${data.goods_id}`
			});
		},

		// 输入事件
		input(e) {
			// 防抖处理
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				// 防止空值 赋值给 searchText
				if (e !== '') {
					this.searchText = e;
					this.getSearchList(this.searchText);
				}
			}, 800);
		},
		// 获取 搜索关键词列表
		async getSearchList(params) {
			try {
				const { data } = await getSearchListData(params);
				this.searchList = data.message;
				this.saveHistory();
			} catch (e) {
				uni.$showMsg();
			}
		},
		// 保存搜索记录
		saveHistory() {
			// 新搜索记录 保存在 开始位置
			this.searchHistory.unshift(this.searchText);
			// 搜索记录去重
			this.searchHistory = [...new Set(this.searchHistory)];
			// 搜索记录持久化
			uni.setStorageSync('history', JSON.stringify(this.searchHistory));
		}
	},
	onLoad() {
		this.searchHistory = JSON.parse(uni.getStorageSync('history') || '[]');
	}
};
</script>

<style lang="scss" scoped>
.search-history {
	.search-history-title {
		padding: 0 22rpx;
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #e5e5e5;
		font-size: 26rpx;
	}
	.search-history-list {
		margin-top: 24rpx;
		padding-left: 8rpx;
		text {
			color: #333;
			margin: 8rpx;
			padding: 14rpx 28rpx;
			height: 60rpx;
			background-color: #eeeeee;
			border-radius: 8rpx;
		}
	}
}
:deep(.uni-searchbar__cancel) {
	color: #fff !important;
}
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
	background-color: #c00000;
}
.search-list {
	padding: 0 10rpx;
	.search-list-item {
		font-size: 24rpx;
		padding: 26rpx 0;
		border-bottom: 2rpx solid #e8e8e8;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.goods-name {
			margin-left: 6rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>
