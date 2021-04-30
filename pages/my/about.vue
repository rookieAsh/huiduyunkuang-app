<template>
	<view class="page">
		<view class="logo margin0">
			<image src="../../static/images/app/logo_z.png"style="width: 120rpx;height: 120rpx;"></image>
		</view>
		<view class="appName text-center">灰度云矿</view>
		<view class="text">灰度云矿是HD Capital与GC Ventures共同联合发起一站式数字矿业挖矿平台，致力于为用户提供便捷安全的挖矿服务，旗下涵盖云算力，托管服务，矿池等整个数字货币挖矿产业链，未来将不断推陈出新，以满足日新月异的挖矿需求。我们的愿景是降低挖矿门槛，让挖矿更简单。</view>
		<view class="text">灰度云矿集中采购实体矿机，全方位专业运维，提供开放、专业、透明的真实挖矿服务。通过一站式专业管理，链接业内顶级矿机厂商、矿场、矿池及专业维护团队。</view>
		<view class="text">集合平价且稳定的严选矿业资源，并提供安全合规的挖矿投资渠道，帮助各类投资者参与挖矿生产；对接第三方金融服务平台，提供从挖矿到资产再到金融流动性的数字资产全生命周期挖矿服务。真正做到一键托管，严选矿机，合规可信，超低电价，坐享收益的服务宗旨。
</view>

		<view class="item margin50-0 flex-between align-center" @click="$tools.jump('./privacy')">
			<view class="name">隐私条款</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		<view class="item margin0 flex-between align-center" @click="$tools.jump('./agreement')">
			<view class="name">用户服务条款</view>
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
	.page {
		padding-top: 30rpx;
	}
	.logo {
		width: 120rpx;
		height: 120rpx;
	}
	.text {
		font-size: 28rpx;
		color: rgba(0,0,0,0.5);
		padding: 20rpx 30rpx 0;
		text-indent: 2em;
	}
	.appName {
		color: #000;
		font-weight: 600;
		font-size: 32rpx;
		padding-top: 20rpx;
	}
	.version {
		color: rgba(0,0,0,0.6);
		font-size: 28rpx;
	}
	.item {
		width: 690rpx;
		height: 88rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.1);
		.name {
			color: #000;
			font-size: 30rpx;
			font-weight: 500;
		}
		text {
			font-size: 26rpx;
			color: rgba(0,0,0,0.5);
		}
	}
</style>
