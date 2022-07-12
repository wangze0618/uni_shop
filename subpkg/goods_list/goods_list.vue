<template>
	<view class="goods-list">
		<view @click="goToDetail(goods)" v-for="(goods, index) in goodsList" :key="index"><my-goods :goods="goods"></my-goods></view>
	</view>
</template>

<script>
import { getGoodsListData } from '@/api/goods.js';
export default {
	data() {
		return {
			queryObj: {
				query: '',
				cid: '',
				pagenum: 1,
				pagesize: 20
			},
			total: 0,
			goodsList: [],
			loading: false
		};
	},
	onLoad(options) {
		this.queryObj.query = options.query || '';
		this.queryObj.cid = options.cid || '';
		this.getGoodsList();
	},
	methods: {
		// 跳转到 商品详情页
		goToDetail(goods) {
			uni.navigateTo({
				url: `/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
			});
		},
		// 获取商品列表
		async getGoodsList() {
			try {
				this.loading = true;
				const { data } = await getGoodsListData(this.queryObj);
				this.total = data.message.total;
				this.goodsList = [...data.message.goods, ...this.goodsList];
			} catch (e) {
				uni.$showMsg();
			}
			this.loading = false;
		}
	},

	// 上拉触底 获取更多
	onReachBottom() {
		// 当前最大条数
		let maxNum = this.queryObj.pagenum * this.queryObj.pagesize;

		// 判断是否还有更多数据
		if (maxNum >= this.total) {
			return uni.$showMsg('没有更多数据了');
		}
		// 当不在加载时 且 当前最大条数<总条数时 再加载数据
		if (!this.loading && maxNum < this.total) {
			// 页码自增1
			this.queryObj.pagenum += 1;
			// 发起请求
			this.getGoodsList();
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		// 重置数据
		this.queryObj.pagenum = 1;
		this.total = 0;
		this.goodsList = [];
		this.getGoodsList();
	}
};
</script>

<style lang="scss">
.goods-list {
	background-color: #fff;
}
</style>
