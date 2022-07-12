<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="Object.keys(address).length === 0">
			<button type="primary" @click="chooseAddress()" size="mini" class="btnChooseAddress">请选择收货地址+</button>
		</view>

		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" @click="chooseAddress()" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：
						<text>{{ address.userName }}</text>
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：
						<text>{{ address.telNumber }}</text>
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{ detailAddress() }}</view>
			</view>
		</view>

		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
const store = useStore();
const address = computed(() => {
	return store.state.user.address;
});
const detailAddress = store.getters['user/detailAddress'];

// 获取收货地址
const chooseAddress = async () => {
	try {
		const res = await uni.chooseAddress();
		store.commit('user/updateAddress', res);
	} catch (e) {
		uni.$showMsg('获取信息失败');
	}
};
// 返回详细的地址
</script>

<style lang="scss">
// 底部边框线的样式
.address-border {
	display: block;
	width: 100%;
	height: 10rpx;
}

// 选择收货地址的盒子
.address-choose-box {
	height: 180rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

// 渲染收货信息的盒子
.address-info-box {
	font-size: 24rpx;
	height: 180rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 10rpx;

	// 第一行
	.row1 {
		display: flex;
		justify-content: space-between;

		.row1-right {
			display: flex;
			align-items: center;

			.phone {
				margin-right: 10rpx;
			}
		}
	}

	// 第二行
	.row2 {
		display: flex;
		align-items: center;
		margin-top: 20rpx;

		.row2-left {
			white-space: nowrap;
		}
	}
}
</style>
