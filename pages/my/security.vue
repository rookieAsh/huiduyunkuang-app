<template>
	<view class="page">
		<view class="placeholder30"></view>
		<!-- <view class="item margin0 flex-between align-center" @click="$tools.jump('../login/setTradePwd')">
			<view class="name">绑定邮箱</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		<view class="item margin0 flex-between align-center" @click="$tools.jump('../login/setTradePwd')">
			<view class="name">绑定手机号</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view> -->
		<view class="item margin0 flex-between align-center" @click="$tools.jump('../login/setTradePwd')">
			<view class="name">设置交易密码</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		<view class="item margin0 flex-between align-center" @click="$tools.jump('../login/changePwd')">
			<view class="name">修改登录密码</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		
		
		
		
	</view>
</template>

<script>
	export default {
        data() {
            return {
				
            }
        },
        onShow() {

        },
        methods: {
			
        }
    }
</script>

<style lang="less" scoped>
	.item {
		width: 690rpx;
		height: 100rpx;
		border-bottom: 1rpx solid rgba(0,0,0,.1);
		.name {
			color:#000;
			font-size: 30rpx;
			font-weight: 600;
		}
	}
	

</style>
