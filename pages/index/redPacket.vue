<template>
	<view class="page">
		<view class="banner">
			<view class="status"></view>
			<view class="header relative text-center">
				<image src="../../static/images/common/back-white.png" style="width: 20rpx;height: 32rpx;left: 30rpx;" 
				@click="$tools.back(1)" class="absolute-middle"></image>
				<text>灰度红包</text>
			</view>
			
			<view class="name flex align-center">
				<view class="dot"></view>
				{{obj.address}}的红包
			</view>
			
			<view class="name text-center">一币一别墅</view>
			
			<view class="num flex">{{obj.value}}<text>{{obj.coin}}</text></view>
		</view>
		
		
		<view class="item margin0 borderBottom flex-between flex-column padding-column30" v-for="(item,index) in list" :key="index">
			<view class="str">领取{{obj.number - obj.remainNumber}}/{{obj.number}}，剩余：0.0001522USDS</view>
			<view class="flex-between align-center">
				<view class="name">{{item.accountUid}}</view>
				<viw class="val">{{item.value}} {{obj.coin}}</viw>
			</view>
			<view class="time">{{item.createTime}}</view>
		</view>
	</view>
</template>

<script>
	export default {
        data() {
            return {
				obj:{},
				list:[]
            }
        },
        onShow() {
			this.obj = uni.getStorageSync("data")[0]
			console.log(this.obj)
			this.list = uni.getStorageSync("data")
        },
		onUnload() {
			uni.removeStorageSync("data")
		},
        methods: {

        }
    }
</script>

<style lang="less" scoped>
	.banner {
		width: 750rpx;
		height: 520rpx;
		background: url('../../static/images/app/redPacket.png') no-repeat;
		background-size: 100% 100%;
		.header {
			width: 750rpx;
			height: 92rpx;
			line-height: 92rpx;
			color: #fff;
			font-weight: 600;
			font-size: 32rpx;
		}
		.name {
			justify-content: center;
			.dot {
				width: 45rpx;
				height: 45rpx;
				background: #5678E4;
				border-radius: 50%;
				margin-right: 15rpx;
			}
			color: #F9DBB9;
			font-size: 28rpx;
			padding-top: 40rpx;
		}
		.num {
			font-size: 52rpx;
			font-weight: bold;
			color: #F9DBB9;
			justify-content: center;
			padding-top: 60rpx;
			align-items:baseline;
			text {
				font-size: 24rpx;
				font-weight: bold;
				color: #F9DBB9;
				font-weight: 400;
				padding-left: 10rpx;
			}
		}
	}

	.item {
		width: 690rpx;
		height: 220rpx;
		.str {
			color: #C2C2C2;
			font-size: 28rpx;
		}
		.name,.val {
			color: #000;
			font-size: 28rpx;
		}
		.time {
			color: #C2C2C2;
			font-size: 28rpx;
		}
	}

</style>
