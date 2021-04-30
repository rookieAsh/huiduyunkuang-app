<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="banner margin0 padding30 flex-between flex-column">
			<view class="title">总计 USDT</view>
			<view class="flex-between align-center">
				<view class="using">{{obj.money}}<text>≈ {{obj.CNY}}CNY</text></view>
				<view class="flex align-center">
					<view class="txt">可用 {{obj.validMoney}}</view>
					<view class="line"></view>
					<view class="txt">冻结 {{obj.freezeMoney}}</view>
				</view>
			</view>
		</view>
		<view class="placeholder50"></view>
		<view class="item margin0 flex-column flex-between" v-for="(item,index) in list" :key="index">
			<view class="flex-between align-center">
				<view class="type">{{ item.side == 'deposit'? '充币':'提币' }}</view>
				<view class="num">{{item.money}}USDT</view>
			</view>
			<view class="flex-between align-center">
				<view class="time">{{item.create_time}}</view>
				<view class="str" v-if="item.status=='success'">交易成功</view>
				<view class="str" v-if="item.status=='pending'">审核中</view>
				<view class="str" v-if="item.status=='fail'">交易失败</view>
			</view>
		</view>
		
		<view class="div" style="height: 500rpx;"  v-if="list.length==0">
			<u-empty mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
        data() {
            return {
				obj:{
					money:0,
					CNY:0,
					validMoney:0,
					freezeMoney:0
				},
				list:[],
            }
        },
        onShow() {
			this.init()
        },
        methods: {
			init(){
				this.$Ajax('/custody/selectUsdtRecord',{
					address:uni.getStorageSync('hdUserInfo').address,
					coin:'USDT',
				},(res)=>{
					if(res.data.length==0){
						return
					} else {
						this.obj = res.data[0];
						let list = res.data;
						this.list = list.slice(1)
					}
					
				})
			}
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
