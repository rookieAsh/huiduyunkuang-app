<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="tabDiv margin0 flex">
			<view class="tab" :class="{active:tabDivCurrent==0}" @click="changeTabDiv(0,'BTC')">BTC</view>
			<view class="tab" :class="{active:tabDivCurrent==1}" @click="changeTabDiv(1,'ETH')">ETH</view>
			<!-- <view class="tab" :class="{active:tabDivCurrent==2}" @click="changeTabDiv(2,'FIL')">FIL</view> -->
		</view>
		
		<view class="listItem margin50-0 flex-between">
			<view class="price flex align-center">
				<view class="name">矿机价格</view>
				<view class="line"></view>
				<input type="text" placeholder="0.0000" placeholder-style="color:rgba(0,0,0,0.35);font-size:28rpx;" v-model="price"/>
				<view class="key">￥</view>
			</view>
			<view class="quantity flex align-center">
				<view class="number">矿机数量</view>
				<view class="line"></view>
				<input type="number" placeholder="1" placeholder-style="color:rgba(0,0,0,0.35);font-size:28rpx;" v-model="quantity"/>
				<view class="key">台</view>
			</view>
		</view>
		
		<view class="item margin30-0 flex align-center padding-row20">
			<view class="name">算力</view>
			<view class="line"></view>
			<input type="text" placeholder="请输入当前算力" placeholder-style="color:rgba(0,0,0,0.35);font-size:28rpx;" v-model="force"/>
			<view class="key">{{tabDivCurrent==0?"T":"M"}}H/S</view>
		</view>
		
		<view class="item margin30-0 flex align-center padding-row20">
			<view class="name">币价</view>
			<view class="line"></view>
			<input type="text" placeholder="当前币价：0" placeholder-style="color:rgba(0,0,0,0.35);font-size:28rpx;" v-model="coinPrice" disabled/>
			<view class="key">￥</view>
		</view>
		
		<view class="item margin30-0 flex align-center padding-row20">
			<view class="name">电费</view>
			<view class="line"></view>
			<input type="text" placeholder="请输入电费" placeholder-style="color:rgba(0,0,0,0.35);font-size:28rpx;" v-model="bill"/>
			<view class="key">￥/度</view>
		</view>
		
		<view class="item margin30-0 flex align-center padding-row20">
			<view class="name">功耗</view>
			<view class="line"></view>
			<input type="text" placeholder="请输入功耗" placeholder-style="color:rgba(0,0,0,0.35);font-size:28rpx;" v-model="power"/>
			<view class="key">KW/h</view>
		</view>
		
		<view class="btn margin50-0 text-center" @click="submit()">收益计算</view>
		
		<view class="tabBox margin30-0 flex">
			<view class="tab" :class="{active:tabBoxCurrent==1}" @click="changetabBox(1)">日收益</view>
			<view class="tab" :class="{active:tabBoxCurrent==2}" @click="changetabBox(2)">月收益</view>
			<view class="tab" :class="{active:tabBoxCurrent==3}" @click="changetabBox(3)">年收益</view>
		</view>
		
		<view class="circle">{{obj.BackToMoney}}<text>天</text></view>
		<view class="tip text-center">回报周期</view>
		
		<view class="infoBox flex">
			<view class="infiLi flex-column flex-between text-left">
				<view class="coinNum" style="color: #F16C00;">{{obj.multiplyHashrate |number(4)}} {{coin}}</view>
				<view class="rmb">≈ ￥{{obj.dailyEarnings|number(4)}}</view>
				<view class="key">收益</view>
			</view>
			<view class="infiLi flex-column flex-between text-left">
				<view class="coinNum">{{obj.energyChargeCoin|number(4)}} {{coin}}</view>
				<view class="rmb">≈￥{{obj.energyCharge|number(4)}}</view>
				<view class="key">电费</view>
			</view>
			<view class="infiLi flex-column flex-between text-left">
				<view class="coinNum">{{obj.subtractYieldCoin|number(4)}} {{coin}}</view>
				<view class="rmb">≈ ￥{{obj.subtractYield|number(4)}}</view>
				<view class="key">净收益</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				tabDivCurrent:0,
				tabBoxCurrent:1,
				price:'',
				quantity:'',
				force:'',
				coinPrice:'',
				bill:'',
				power:'',
				coin:'BTC',
				obj:{
					BackToMoney:0,
					multiplyHashrate:0.0000,
					dailyEarnings:0.0000,
					energyChargeCoin:0.0000,
					energyCharge:0.0000,
					subtractYieldCoin:0.0000,
					subtractYield:0.0000,
				},
				list:[],
			}
		},
		onShow() {
			this.init()
		},
		methods:{
			init(){
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax('/custody/selectWellatByCoinFlash',{
					address:uni.getStorageSync('hdUserInfo').address,
					type:1
				},(res)=>{
					uni.hideLoading()
					this.list = res.data;
					this.list.forEach((item)=>{
						if(item.coin == 'BTC') {
							this.coinPrice = item.CNY
						}
					})
				})
			},
			getEthinfo(){
				uni.showLoading({
					title:'计算中...'
				})
				if(!this.price) {
					return this.$u.toast("请输入矿机价格")
				}
				if(!this.quantity) {
					return this.$u.toast("请输入矿机数量")
				}
				if(!this.force) {
					return this.$u.toast("请输入当前算力")
				}
				if(!this.bill) {
					return this.$u.toast("请输入电费")
				}
				if(!this.power) {
					return this.$u.toast("请输入功耗")
				}
				this.$Ajax("/MartianOrePool/ethCalculator",{
					coin:this.coin,
					price:this.price,
					number:this.quantity,
					hashrate:this.force,
					energy:this.bill,
					power:this.power,
					type:this.tabBoxCurrent
				},(res)=>{
					if(res.state==0){
						uni.hideLoading();
						this.obj = res.data[0];
					}else {
						uni.hideLoading();
					}
					
				})
			},
			submit(){
				if(this.tabDivCurrent==0){
					this.getBtcinfo()
				}else{
					this.getEthinfo()
				}
			},
			changeTabDiv(index,coin){
				this.tabDivCurrent = index;
				this.coin = coin;
				this.list.forEach((item)=>{
					if(item.coin == coin) {
						this.coinPrice = item.CNY
						if(index==0){
							this.getBtcinfo()
						}else{
							this.getEthinfo()
						}
					}
				})
			},
			changetabBox(index){
				this.tabBoxCurrent = index;
				this.submit()
			},
			getBtcinfo(){
				uni.showLoading({
					title:'计算中...'
				})
				if(!this.price) {
					return this.$u.toast("请输入矿机价格")
				}
				if(!this.quantity) {
					return this.$u.toast("请输入矿机数量")
				}
				if(!this.force) {
					return this.$u.toast("请输入当前算力")
				}
				if(!this.bill) {
					return this.$u.toast("请输入电费")
				}
				if(!this.power) {
					return this.$u.toast("请输入功耗")
				}
				this.$Ajax("/MartianOrePool/calculator",{
					coin:this.coin,
					price:this.price,
					number:this.quantity,
					hashrate:this.force,
					energy:this.bill,
					power:this.power,
					type:this.tabBoxCurrent
				},(res)=>{
					if(res.state==0){
						uni.hideLoading();
						this.obj = res.data[0];
					}else {
						uni.hideLoading();
					}
					
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.tabDiv,.tabBox {
		width: 480rpx;
		height: 80rpx;
		background: #FFF3E7;
		border-radius: 33rpx;
		.tab {
			width: 33.333%;
			font-size: 30rpx;
			color: rgba(0,0,0,0.3);
			line-height: 80rpx;
			text-align: center;
		}
		.active {
			height: 80rpx;
			background: #FFD8B1;
			box-shadow: 2rpx 3rpx 6rpx 0rpx rgba(196, 98, 0, 0.27);
			border-radius: 33rpx;
			font-weight: 600;
			color: #000;
		}
	}
	.tabDiv {
		width: 400rpx;
		.tab {
			width: 50%;
		}
	}
	.tabBox {
		width: 450rpx;
	}

	.listItem,.item {
		width: 690rpx;
		height: 80rpx;
		.price,.quantity {
			width: 360rpx;
			background: #FFF3E7;
			border-radius: 33rpx;
			padding: 0 20rpx;
			.name {
				font-size: 28rpx;
				color: #000;
			}
			.line {
				width: 1rpx;
				height: 20rpx;
				background-color: rgba(0,0,0,0.23);
				margin-left: 20rpx;
			}
			input {
				flex: 1;
				color: #000;
				font-size:28rpx;
				text-align: center;
			}
			.key {
				color: #000;
				font-size:28rpx;
			}
		}
		 .quantity{
			width: 300rpx;
		}
	}

	.item {
		background: #FFF3E7;
		border-radius: 33rpx;
		.line {
			width: 1rpx;
			height: 20rpx;
			background-color: rgba(0,0,0,0.23);
			margin-left: 20rpx;
		}
		input {
			flex: 1;
			color: #000;
			font-size:28rpx;
			padding-left: 30rpx;
		}
	}

	.btn {
		width: 560rpx;
		height: 90rpx;
		background: url("../../static/images/app/btn_bg.png") no-repeat;
		background-size: 100% 100%;
		line-height: 72rpx;
		color: #fff;
		font-size: 36rpx;
		font-weight: 500;
	}

	.circle {
		font-size: 48rpx;
		font-weight: bold;
		color: #F16C00;
		text-align: center;
		padding: 25rpx 0 0rpx;
		text {
			font-size: 24rpx;
			padding-left: 5rpx;
		}
	}
	
	.tip {
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(0,0,0,0.5);
		margin-bottom: 40rpx;
	}
	
	.infoBox {
		width: 690rpx;
		height: 140rpx;
		background: #FFF3E7;
		margin: 0 auto 50rpx;
		.infiLi {
			width: 33.3333%;
			padding: 16rpx 0;
			padding-left: 30rpx;
			font-weight: 500;
			.coinNum {
				font-size: 22rpx;
				color: #000;
			}
			.rmb {
				font-size: 22rpx;
				color: #000;
			}
			.key {
				font-size: 22rpx;
				color: rgba(0,0,0,0.3);
			}
		}
	}

</style>
