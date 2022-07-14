<template>
	<view>
		<my-login v-if="tokenLength.length == 2 || tokenLength.length == 0"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { useStore } from 'vuex';

const store = useStore();

// 获取token
const token = store.getters['user/token'];
// console.log(token().length);
let tokenLength = ref(0);
watch(
	() => token(),
	val => {
		tokenLength.value = val;
		console.log(val.length);
	},
	{ immediate: true }
);
// onShow(() => {
// 	let redirect = store.getters['user/redirectInfo'];
// 	console.log(redirect().from);
// 	console.log(redirect().length);
// 	if (redirect().from && token().length == 2) {
// 		uni.switchTab({
// 			url: `${redirect().from}`
// 		});
// 	}
// });
</script>

<style lang="scss" scoped></style>
