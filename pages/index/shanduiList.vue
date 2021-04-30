<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="item margin0 flex-column flex-between" v-for="(item,index) in 5" :key="index">
			<view class="flex-between align-center">
				<view class="type">充币</view>
				<view class="num">+1000 USDT</view>
			</view>
			<view class="flex-between align-center">
				<view class="time">2021.3.9 12:27:10</view>
				<view class="str">区块确认中</view>
			</view>
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
	.banner {
		width: 690rpx;
		height: 170rpx;
		background: url("../../static/images/app/record_bg.png") no-repeat;
		background-size: 100% 100%;
		.title {
			font-size: 30rpx;
			color: #000;
		}
		.using {
			color: #000;
			font-size: 42rpx;
			font-weight: 600;
			text {
				color: rgba(0,0,0,0.6);
				font-size: 24rpx;
				padding-left: 10rpx;
			}
		}
		.txt {
			color: #000;
			font-size: 24rpx;
		} 
		.line {
			width: 1rpx;
			height: 20rpx;
			background-color: rgba(0,0,0,0.5);
			margin: 0 20rpx;
		}
	}


	.item {
		width: 690rpx;
		height: 140rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.1);
		padding: 24rpx 0;
		.type {
			color: #000;
			font-size: 34rpx;
			font-weight: 600;
		}
		.num {
			color: #02AD8F;
			font-size: 30rpx;
			font-weight: 600;
		}
		.isDown {
			color: #D24F67;
		}
		.time {
			color: rgba(0,0,0,0.4);
			font-size: 28rpx;
		}
		.str {
			color: #000;
			font-size: 28rpx;
		}
	}

</style>


