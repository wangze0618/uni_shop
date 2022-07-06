<template>
	<view class="search-box">
		<uni-search-bar :focus="true" class="search-bar" maxlength="12" placeholder="搜索" radius="100" @input="input($event)" clearButton="auto" v-model="searchText" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchText: '',
			timer: null
		};
	},
	methods: {
		input(e) {
			// 防抖处理
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				// 防止空值 赋值给 searchText
				if (e == !'') this.searchText = e;
				console.log(this.searchText);
			}, 1000);
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
</style>
