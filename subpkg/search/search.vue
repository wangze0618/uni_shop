<template>
	<!-- 顶部搜索栏 -->
	<view class="search-box">
		<uni-search-bar :focus="true" class="search-bar" maxlength="12" placeholder="搜索" radius="100" @input="input($event)" clearButton="auto" v-model="searchText" />
	</view>
	<!-- 搜索列表展示区 -->
	<view class="search-list">
		<view class="search-list-item" v-for="(item, index) in searchList" :key="index">
			<view class="goods-name">{{ index + 1 }}.&nbsp;{{ item.goods_name }}</view>
			<uni-icons type="arrowright" size="16"></uni-icons>
		</view>
	</view>
</template>

<script>
import { getSearchListData } from '@/api/search.js';
export default {
	data() {
		return {
			searchText: '',
			timer: null,
			searchList: []
		};
	},
	methods: {
		// 输入事件
		input(e) {
			// 防抖处理
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				// 防止空值 赋值给 searchText
				if (e !== '') this.searchText = e;
				this.getSearchList(this.searchText);
			}, 1000);
		},
		// 获取 搜索关键词列表
		async getSearchList(params) {
			try {
				const { data } = await getSearchListData(params);
				this.searchList = data.message;
			} catch (e) {
				uni.$showMsg();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
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
