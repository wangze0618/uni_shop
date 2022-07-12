<template>
	<view>{{ a }}</view>
	<view class="">{{ count }}</view>
	<button @click="loga()">log</button>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

export default {
	setup() {
		const goods = reactive({
			name: 'ss',
			count: 9
		});
		let a = ref(1);
		const loga = () => {
			goods.count = 10;
			goods.local = 'en';
			console.log(goods);
		};

		const count = computed(() => {
			return goods.count;
		});
		onLoad(() => {
			console.log(a.value);
		});
		return { a, loga, goods, count };
	}
};
</script>

<style lang="scss"></style>
