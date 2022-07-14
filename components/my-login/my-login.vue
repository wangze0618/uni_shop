<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons color="#afafaf" type="contact-filled" size="120"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" @click="getUserInfo" class="login-btn">登录</button>
		<!-- 登录提示 -->
		<text>登录后尽享更多权益</text>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
const store = useStore();

// 获取跳转信息
let redirect = store.getters['user/redirectInfo'];
// 获取用户基本信息 用户授权之后 encryptedData、rawData、iv、signature
const getUserInfo = async () => {
	try {
		const res = await uni.getUserProfile({
			desc: '获取个人基本信息'
		});
		store.commit('user/updateUserInfo', res.userInfo);
		getUserToken(res);
	} catch (err) {
		return uni.$showMsg('登录失败');
	}
};

const getUserToken = async data => {
	try {
		// 获取code
		const { code } = await uni.login();
		let params = {
			encryptedData: data.encryptedData,
			rawData: data.rawData,
			iv: data.iv,
			signature: data.signature,
			code: code
		};
		// 获取token 之前的课程接口失效，fastmock模拟的接口
		const result = await uni.request({
			url: 'https://www.fastmock.site/mock/1479b8ee7fbb761269662b23b8f933fa/ssy/login',
			method: 'POST',
			data: params
		});
		store.commit('user/updateToken', result.data.message.token);
		// 判断是否有跳转地址 有->就进行跳转
		if (redirect().from) {
			uni.switchTab({
				url: redirect().from
			});
			store.commit('user/updateRedirect', {});
		}
	} catch (e) {
		console.log(e);
	}
};
</script>

<style lang="scss" scoped>
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 180rpx 40rpx 190rpx 40rpx;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;
	&::after {
		content: '';
		display: block;
		height: 80rpx;
		width: 100%;
		position: absolute;
		bottom: -84rpx;
		left: 0;
		background-color: white;
		border-radius: 100%;
		transform: translateY(-50%);
	}
	text {
		color: #888;
		font-size: 26rpx;
	}

	.login-btn {
		margin: 30rpx 0 40rpx 0;
		width: 100%;
		height: 100rpx;
		border-radius: 50rpx;
		background-color: #c00000;
	}
}
</style>
