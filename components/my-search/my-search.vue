<template>
	<view @click="searchBoxHandler" class="my-search" :style="{ 'background-color': bgcolor }">
		<view class="search-box" :style="{ 'border-radius': radius + 'rpx' }">
			<uni-icons class="search-icon" size="17" type="search"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-search',
	data() {
		return {};
	},
	methods: {
		searchBoxHandler() {
			this.$emit('click');
		}
	},
	props: {
		// 背景颜色
		bgcolor: {
			type: String,
			default: '#C00000'
		},
		// 圆角尺寸
		radius: {
			type: Number,
			// 单位rpx
			default: 34
		}
	}
};
</script>

<style lang="scss">
.my-search {
	position: sticky;
	top: 0;
	// left: 0;
	// right: 0;
	z-index: 999;
	background-color: #c00000;
	height: 100rpx;
	padding: 0 20rpx;
	display: flex;
	align-items: center;
	.search-box {
		height: 72rpx;
		background-color: #fff;
		width: 100%;
		border-radius: 34rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.search-icon {
			// font-size: 36px;
			color: #666;
		}
		text {
			margin-left: 4rpx;
			color: #666;
		}
	}
}
</style>
