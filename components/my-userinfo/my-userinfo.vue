<template>
	<view class="my-userinfo-container">
		<!-- 头像昵称区域 -->
		<view class="top-box">
			<image :src="userInfo.avatarUrl" class="avatar" mode=""></image>
			<view class="nickname">{{ userInfo.nickName }}</view>
		</view>
		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="panel">
				<view class="panel-item">
					<text>8</text>
					<text>收藏的店铺</text>
				</view>
				<view class="panel-item">
					<text>8</text>
					<text>收藏的商品</text>
				</view>
				<view class="panel-item">
					<text>8</text>
					<text>关注的商品</text>
				</view>
				<view class="panel-item">
					<text>8</text>
					<text>足迹</text>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="panel">
				<view class="title">我的订单</view>
				<view class="panel2">
					<view class="panel-item">
						<image src="../../static/my-icons/icon1.png"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="../../static/my-icons/icon2.png"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="../../static/my-icons/icon3.png"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="../../static/my-icons/icon4.png"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="panel">
				<view class="panel-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
				<view class="panel-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
				<view class="panel-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
const store = useStore();

const userInfo = store.state.user.userinfo;

// 退出登录
const logout = async () => {
	try {
		const { cancel, confirm } = await uni.showModal({
			title: '提示',
			content: '确认退出登录？'
		});
		if (confirm) {
			store.commit('user/updateAddress', {});
			store.commit('user/updateUserInfo', {});
			store.commit('user/updateToken', '');
			return uni.$showMsg('退出成功');
		}
	} catch (e) {
		return uni.$showMsg(String(e));
	}
};
</script>

<style lang="scss" scoped>
.panel-list {
	position: relative;
	z-index: 999;
	padding: 0 20rpx;
	.panel:nth-child(2) {
		display: flex;
		flex-direction: column;
		.panel2 {
			display: flex;
			justify-content: space-between;
			.panel-item {
				text {
					font-size: 29rpx;
				}
			}
		}
	}
	.panel:nth-child(3) {
		display: flex;
		flex-direction: column;
		.panel-item {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			border-bottom: 2rpx solid #f4f4f4;
			padding-left: 20rpx;
			padding-right: 10rpx;
			font-size: 30rpx;
			&:last-child {
				border-bottom: none;
			}
		}
	}
	.panel {
		display: flex;
		justify-content: space-evenly;
		background-color: #fff;
		border-radius: 16rpx;
		margin-bottom: 16rpx;
		image {
			width: 73rpx;
			height: 73rpx;
		}
		.title {
			line-height: 80rpx;
			padding-left: 20rpx;
			border-bottom: 1rpx solid #f4f4f4;
		}
		.panel-item {
			padding: 24rpx 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 1;
			text:nth-child(2) {
				font-size: 30rpx;
			}
		}
	}
}
.my-userinfo-container {
	height: 100vh;
	background-color: #f4f4f4;
	.top-box {
		background-color: #c00000;
		height: 260rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15rpx 0;
		justify-content: center;
		position: relative;
		&::after {
			content: '';
			display: block;
			height: 90rpx;
			width: 101%;
			background-color: #c00000;
			position: absolute;
			bottom: -90rpx;
			border-radius: 0 0 120% 120%;
		}
		.avatar {
			border: 4rpx solid rgb(255, 255, 255);
			height: 160rpx;
			width: 160rpx;
			border-radius: 90rpx;
		}
		.nickname {
			margin-top: 10rpx;
			font-size: 32rpx;
			color: #fff;
		}
	}
}
</style>
