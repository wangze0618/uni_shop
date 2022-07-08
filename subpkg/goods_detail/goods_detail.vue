<template>
	<view></view>
</template>

<script>
import { getGoodsDetailData } from '@/api/goods.js';
export default {
	data() {
		return {
			goods_info: {},
			goods_id: ''
		};
	},
	methods: {
		async getGoodsDetail() {
			console.log(this.goods_id);
			try {
				const { data } = await getGoodsDetailData(this.goods_id);
				console.log(data);
			} catch (e) {
				uni.$showMsg();
			}
		}
	},
	onLoad(options) {
		this.goods_id = options.goods_id;
		this.getGoodsDetail(this.goods_id);
		console.log(this.goods_id);
	}
};
</script>

<style lang="scss"></style>
