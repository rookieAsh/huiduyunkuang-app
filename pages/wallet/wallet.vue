<template>
	<view class="page">
		<view class="banner relative">
			<view class="placeholder80"></view>
			<view class="title text-center">钱包总资产</view>
			<view>
				<view class="rmb text-center">≈￥{{assets |number(4)}}</view>
				<!-- <view class="using text-center">≈ 0.00000BTC </view> -->
			</view>
			
			<view class="show absolute-center padding-row30 flex-between align-center"  @click="$tools.jump('record')" v-if="token">
				<block>
					<view class="flex align-center show_l">
						<image src="../../static/images/app/list.png" style="width: 32rpx;height: 40rpx;"></image>
						<text class="time" v-if="arr.length>0">{{arr[0].create_time}}</text>
						<text class="time" v-else>暂无USDT流水记录</text>
					</view>
					<view class="flex align-center show_r">
						<text class="num" v-if="arr.length>0">{{arr[0].money}} USDT</text>
						<u-icon name="list" color="#F8801B"></u-icon>
					</view>
				</block>
			</view>
			
			<view class="show absolute-center text-center" 
			v-else style="line-height: 86rpx;">
				用户未登录，点击<text style="color:#F8801B;font-weight: 600;padding-left: 10rpx;" @click="$tools.jump('../login/login')">登录</text>
			</view>
		</view>
		
		<view class="btns flex-between margin80-0" v-if="token">
			<view class="btn flex-between align-center" @click="$tools.jump('./charge')">
				<image src="../../static/images/app/charge.png" style="width: 38rpx;height: 38rpx;"></image>
				<text>充币</text>
			</view>
			<view class="btn flex-between align-center" @click="$tools.jump('./withdraw')">
				<image src="../../static/images/app/withdraw.png" style="width: 38rpx;height: 38rpx;"></image>
				<text>提币</text>
			</view>
			<view class="btn flex-between align-center" @click="$tools.jump('./transfer')">
				<image src="../../static/images/app/change.png" style="width: 38rpx;height: 38rpx;"></image>
				<text>划转</text>
			</view>
		</view>
		
		<view class="tabs margin50-0 flex" v-if="token">
			<view class="tab" :class="{active:tabCurrent===1}" @click="change(1)">钱包账户</view>
			<view class="tab" :class="{active:tabCurrent===2}" @click="change(2)">挖矿账户</view>
		</view>
		
		<block v-if="tabCurrent===1"> 
			<view class="itemBox margin30-0">
				<view class="item flex-between align-center" v-for="(item,index) in list" :key="index">
					<view class="flex align-center">
						<image :src="item.logo" style="width: 72rpx;height: 72rpx;"></image>
						<view class="view_l">
							<view class="name">{{item.coin}}</view>
							<text>可用{{item.validMoney}} 冻结{{item.freezeMoney}}</text>
						</view>	
					</view>
					<view class="view_r text-right">
						<view class="name">{{item.balance}}</view>
						<text>≈{{item.balanceCNY}}元</text>
					</view>	
				</view>
			</view>
		</block>
		
		<block v-if="tabCurrent===2">
			
			<view class="name" style="color: #999;padding: 30rpx;">挖矿账户资产</view>
			<view class="flex-between align-center padding-row30" @click="goLink()">
				<text style="color:#F8801B;font-size:36rpx">￥{{obj1.countEarnings |number(4)}}</text>
				<u-icon name="arrow-right" color="#999" size="30"></u-icon>
			</view>
			
			<view class="itemBox margin30-0">
				<view class="li">昨日收益:￥{{obj1.yesterdayEarnings |number(4)}}</view>
				<view class="li">累计挖出:￥{{obj1.sumEarnings |number(4)}}</view>
				<view class="li">可提取:￥{{obj1.calidEarnings |number(4)}}</view>
			</view>
			
			<view class="coinTabs margin50-0 flex">
				<view class="tab" :class="{active:coinCurrent===0}" @click="changeCoin(0)">BTC</view>
				<view class="tab" :class="{active:coinCurrent===1}" @click="changeCoin(1)">ETH</view>
				<!-- <view class="tab" :class="{active:coinCurrent===2}" @click="changeCoin(2)">FIL</view> -->
			</view>
			<view class="itemBox margin50">
				<view class="li">昨日收益:{{obj2.earnings |number(4)}}{{obj2.subarea}}</view>
				<view class="li">累计挖出:{{obj2.countEarnings |number(4)}}{{obj2.subarea}}</view>
				<view class="li">可提取:{{obj2.validMoney |number(4)}}{{obj2.subarea}}</view>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabCurrent:1,
				coinCurrent:0,
				list:[],
				token:'',
				assets:0,
				obj1:{},
				obj2:{},
				arr:[],
			}
		},
		onShow() {
			this.token = uni.getStorageSync('token');
			this.init()
			this.getList();
		},
		methods: {
			goLink(){
				uni.navigateTo({
					url:'./mineAward?obj='+ encodeURIComponent(JSON.stringify(this.obj2))
				})
			},
			getList(){
				this.$Ajax('/custody/selectUsdtRecord',{
					address:uni.getStorageSync('hdUserInfo').address,
					coin:'USDT',
				},(res)=>{
					this.arr = res.data.slice(1)
				})
			},
			change(index){
				this.tabCurrent = index;
				if(index==0) {
					this.init()
				}else{
					this.getInfo()
				}
			},
			changeCoin(index){
				this.coinCurrent = index;
				setTimeout(()=>{
					this.getInfo()
				},100)
				
			},
			// 账户钱包
			init(){
				this.list = [];
				this.assets = 0;
				this.$Ajax('/custody/selectWellatByCoinFlash',{
					address:uni.getStorageSync("hdUserInfo").address,
				},(res)=>{
					this.list = res.data;
					this.list.forEach((item)=>{
						if(item.balanceCNY){
							item.balanceCNY = Number(item.balanceCNY);
							this.assets = this.assets + item.balanceCNY
							this.assets = Number(this.assets)
						}	
					})
				})
			},
			// 挖矿钱包
			getInfo(){
				this.$Ajax('/custody/checkMiningEarnings',{
					address:uni.getStorageSync('hdUserInfo').address,
					type:this.coinCurrent + 1
				},(res)=>{
					this.obj1 = res.data[0]
					this.obj2 = res.data[1]
		
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.banner {
		width: 750rpx;
		height: 460rpx;
		background: linear-gradient(90deg, rgba(254, 164, 77, 0.8), rgba(254, 164, 77, 0.9), rgba(247, 126, 23, 1));
		// box-shadow: 0px 6px 16px 0px rgba(255, 114, 0, 0.36);
		border-radius: 0px 0px 20rpx 20rpx;
		.title {
			color: #fff;
			font-size: 36rpx;
			font-weight: 700;
			height: 80rpx;
			line-height: 80rpx;
		}
		.rmb {
			color: #fff;
			font-size: 60rpx;
			margin-top: 30rpx;
		}
		.using {
			padding-top: 30rpx;
			color: rgba(255,255,255,0.5);
			font-size: 28rpx;
		}
		.show {
			width: 660rpx;
			height: 86rpx;
			background: #FFFFFF;
			box-shadow: 0px 6rpx 24rpx 0px rgba(29, 39, 53, 0.13);
			border-radius: 40rpx;
			bottom: -43rpx;
			.show_l {
				height: 86rpx;
				.time {
					font-size: 22rpx;
					font-weight: bold;
					color: #000000;
					padding-left: 20rpx;
				}
			}
			.show_r {
				height: 86rpx;
				.num {
					font-size: 22rpx;
					font-weight: bold;
					color: #F8801B;
					padding-right: 20rpx;
				}
			}
		}
	}
	.btns {
		width: 100%;
		height: 96rpx;
		padding: 0 30rpx;
		.btn {
			width: 210rpx;
			height: 96rpx;
			line-height: 96rpx;
			background: linear-gradient(90deg, rgba(254, 164, 77, 0.8), rgba(254, 164, 77, 0.9), rgba(247, 126, 23, 1));
			box-shadow: 0px 6rpx 16rpx 0px rgba(255, 114, 0, 0.36);
			border-radius: 10rpx;
			padding: 0 46rpx;
			text {
				font-size: 30rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}

	.tabs {
		width: 350rpx;
		height: 66rpx;
		background: #FFF3E7;
		border-radius: 30px;
		line-height: 66rpx;
		.tab {
			width: 50%;
			text-align: center;
			font-size: 28rpx;
		}
		.active {
			height: 64rpx;
			background: #FFD8B1;
			box-shadow: 2rpx 3rpx 6rpx 0rpx rgba(196, 98, 0, 0.27);
			border-radius: 30rpx;
			color: #000;
			font-weight: 600;
		}
	}
	.h2 {
		color: rgba(0,0,0,0.6);
		font-size: 28rpx;
		font-weight: 600;
		padding: 50rpx 30rpx 10rpx;
	}
	.assets {
		color: #F8801B;
		font-size: 34rpx;
		padding-left: 30rpx;
		text {
			color: rgba(0,0,0,0.5);
			font-size: 26rpx;
			padding-left: 10rpx;
		}
	}
	
	.itemBox {
		width: 690rpx;
		border-top: 1rpx solid rgba(0,0,0,0.03);
		.item {
			width: 100%;
			height: 120rpx;
			border-bottom: 1rpx solid rgba(0,0,0,0.03);
			.view_l,.view_r {
				padding-left: 20rpx;
				.name {
					font-size: 30rpx;
					color: #000;
					font-weight: 600;
				}
				text {
					font-size: 24rpx;
					color: rgba(0,0,0,0.5);
				}
			}	
		}
		
		.li {
			width: 100%;
			height: 70rpx;
			line-height: 70rpx;
			border-bottom: 1rpx solid rgba(0,0,0,0.05);
		}
	}
	
	.coinTabs {
		width: 300rpx;
		height: 66rpx;
		background: #FFF3E7;
		border-radius: 30px;
		line-height: 66rpx;
		.tab {
			width: 150rpx;
			text-align: center;
			font-size: 28rpx;
		}
		.active {
			height: 64rpx;
			background: #FFD8B1;
			box-shadow: 2rpx 3rpx 6rpx 0rpx rgba(196, 98, 0, 0.27);
			border-radius: 30rpx;
			color: #000;
			font-weight: 600;
		}
	}

</style>
