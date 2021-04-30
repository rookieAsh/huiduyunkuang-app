<template>
	<view class="page">
		<view class="h2">支付</view>
		<view class="inpDiv margin0 flex-between align-center padding-row20">
			<input type="number" placeholder="0.0000" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="quantity"/>
			<view class="flex align-center">
				<view class="all" @click="all()">全部</view>
				<view class="line"></view>
				<view class="flex align-center" @click="popupCoin()">
					<image :src="coinImg" style="width: 38rpx;height: 38rpx;"></image>
					<text>{{coin}}</text>
					<u-icon name="arrow-down-fill" color="#888989" size="20"></u-icon>
				</view>
			</view>
		</view>
		<view class="using">账户余额 {{using |number(8)}} {{coin}}</view>
		
		<view class="exchange margin40">
			<image src="../../static/images/app/exchange.png" style="width: 68rpx;height: 80rpx;"></image>
		</view>
		
		<view class="h2">兑换</view>
		
		<view class="inpDiv margin0 flex-between align-center padding-row20">
			<input type="number" placeholder="0.0000" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" disabled v-model="toNum"/>
			<view class="flex align-center" @click="popupCoinTo()">
				<image :src="coinToImg" style="width: 38rpx;height: 38rpx;"></image>
				<text>{{coinTo}}</text>
				<u-icon name="arrow-down-fill" color="#888989" size="20"></u-icon>
			</view>
		</view>
		
		<view class="tip flex-between">
			<text>1{{coin}} ≈ {{exchangeRate |number(8)}} {{coinTo}}</text>
			<text class="cost">手续费率：{{service_charge}}%</text>
		</view>
		
		<view class="inpDiv margin30-0 flex-between align-center padding-row20">
			<input type="password" placeholder="请输入交易密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="tradePwd"/>
		</view>
		
		<view class="btn text-center" :class="{btnActive:quantity>0 && tradePwd.length>0}" @click="submit()">立即兑换</view>
		
		<!-- 支付币种选择弹框 -->
		<u-popup  v-model="showCoin" :mask="mask" :mode="mode" border-radius="0">
			<view class="popBot">
				<view class="title flex-between align-center padding-row30">
					<text class="coin">选择支付币种</text>
					<text @click="showCoin = false">取消</text>
				</view>
				<view class="item padding-row30 text-center" 
				v-for="(item,index) in coinList" :key="index" 
				@click="selectCoin(item,index)" :class="{active:coinAct===index}">
					<view class="flex align-center" >
						<image :src="item.logo" style="width: 38rpx;height: 38rpx;margin-right: 20rpx;"></image>
						<!-- <text :class="{active:coinAct===index}">{{item.coin}}</text> -->
						<text>{{item.coin}}</text>
					</view>
					<!-- <u-icon name="checkbox-mark" color="#FF891C" size="40" v-if="coinAct===index"></u-icon>	 -->
				</view>
			</view>
		</u-popup>
		
		<!-- 兑换币种选择弹框 -->
		<u-popup  v-model="showCoinTo" :mask="mask" :mode="mode" border-radius="0">
			<view class="popBot">
				<view class="title flex-between align-center padding-row30">
					<text class="coin">选择兑换币种</text>
					<text @click="showCoinTo = false">取消</text>
				</view>
				<view class="item padding-row30 text-center" 
				v-for="(item,index) in coinList" :key="index" 
				@click="selectCoinTo(item,index)" :class="{active:coinToAct===index}">
					<view class="flex align-center" >
						<image :src="item.logo" style="width: 38rpx;height: 38rpx;margin-right: 20rpx;"></image>
						<!-- <text :class="{active:coinToAct===index}">{{item.coin}}</text> -->
						<text>{{item.coin}}</text>
					</view>
					<!-- <u-icon name="checkbox-mark" color="#FF891C" size="40" v-if="coinToAct===index"></u-icon>	 -->
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				showCoin:false,
				showCoinTo:false,
				mask:true,
				mode:'bottom',
				coinList:[],
				coin:'',
				coinTo:'',
				coinAct:0,
				coinToAct:1,
				quantity:'',
				coinImg:'',
				coinToImg:'',
				tradePwd:'',
				using:0.00,
				exchangeRate:'',
				toNum:0.0000,
				service_charge:0.00,
				usingList:[],
				status:''
			}
		},
		watch:{
			quantity(){
				this.toNum = this.$tools.number(this.exchangeRate * this.quantity,8);
			},
			exchangeRate(){
				this.toNum = this.$tools.number(this.exchangeRate * this.quantity,8);
			}
		},
		onLoad() {
			this.getList();
		},
		onNavigationBarButtonTap(e) {
			this.$tools.jump('./shanduiList')
		},
		onShow() {
			this.init()
			
		},
		methods:{
			// 获取认证信息
			init(){
				this.$Ajax("/Autnentication/selectAuthenticationZt",{
					userId:uni.getStorageSync('hdUserInfo').userid
				},(res)=>{
					this.status = res.data[0].flg;
				})
			},
			// 获取币种
			getList(){
				this.$Ajax("/custody/selectWellatByCoinFlash",{
					address:uni.getStorageSync("hdUserInfo").address,
					type:1
				},(res)=>{
					this.coinList = res.data;
					this.coin = res.data[0].coin;
					this.coinImg = res.data[0].logo;
					this.coinTo = res.data[1].coin;
					this.coinToImg = res.data[1].logo;
					this.using = res.data[0].balance;
					this.getInfo();
				})
			},
			popupCoin(){
				this.showCoin = true;
			},
			popupCoinTo(){
				this.showCoinTo = true;
			},
			// 选择支付币种
			selectCoin(item,index){
				let coinName = this.coin;
				let img = this.coinImg;
				this.coin = item.coin;
				this.coinImg = item.logo;
				this.coinAct = index;
				this.showCoin = false;
				this.using = item.balance;
				if(this.coin == this.coinTo) {
					this.coinTo = coinName;
					this.coinToImg = img
				}
				this.getInfo();
			},
			
			// 选择闪兑币种
			selectCoinTo(item,index){
				let coinName = this.coinTo;
				let img = this.coinToImg;
				this.coinToImg = item.logo;
				this.coinTo = item.coin;
				this.coinToAct = index;
				this.showCoinTo = false;
				if(this.coinTo == this.coin) {
					this.coin = coinName;
					this.coinImg = img
					this.coinList.forEach(item=>{
						if(item.coin==this.coin) {
							this.using = item.balance                   
						}
					})
				}
				this.getInfo();
			},
			// 获取汇率
			getInfo(){
				this.$Ajax("/index/showExchange",{
					symbol:this.coin + this.coinTo
				},(res)=>{
					this.exchangeRate = res.data[0].exchangeRate;
					this.service_charge = res.data[0].ervice_charge;
					console.log(this.service_charge)
				})
			},
			all(){
				this.quantity = this.using;
			},
			
			// 提交闪兑
			submit(){
				this.$Ajax('/register/checkJymimaZt',{
					userId:uni.getStorageSync('hdUserInfo').userid
				},(res)=>{
					if(res.data==0){
						this.$u.toast('请先设置交易密码')
						setTimeout(()=>{
							this.$tools.jump('../login/setTradePwd')
						},1000)
					}else{
						if(!this.quantity||this.quantity===0||this.tradePwd.length===0){
							return 
						}
						if(this.status==0){
							this.$u.toast("用户未认证，请前往认证")
							setTimeout(()=>{
								this.$tools.jump("../my/certification")
							},1000)
							return
						}
						if(this.status==1){
							this.$u.toast("认证审核中，请等待系统审核")
							return
						}
						
						this.$Ajax("/index/exchange",{
							address:uni.getStorageSync("hdUserInfo").address,
							exchangeRate:this.exchangeRate,
							jypassword:this.tradePwd,
							service_charge:this.service_charge/100,
							exchangeMoney:this.quantity,
							coin:this.coinTo,
							getCoin:this.coin
						},(res)=>{
							console.log(res);
							if(res.state==0){
								this.$u.toast("闪兑成功");
								this.quantity = '';	
								this.tradePwd = ''
							}else{
								this.$u.toast(res.message)
							}
						})
					}
				})	
			}
		}
	}
</script>

<style lang="less" scoped>
	.popBot {
		width: 750rpx;
		.title {
			width: 100%;
			height: 120rpx;
			text {
				color: rgba(0,0,0,0.5);
				font-size: 26rpx;
				font-weight: 500;
			}
			.coin {
				color: #000;
				font-size: 32rpx;
				font-weight: 600;
			}
		}
		.item {
			width: 100%;
			height: 100rpx;
			border-top: 1rpx solid rgba(0,0,0,0.1);
			line-height: 100rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #000;
		}
		.active {
			color: #F16C00;
			font-weight: 700;
		}
	}
	.h2 {
		font-size: 36rpx;
		font-weight: bold;
		color: #000000;
		padding: 30rpx;
	}
	.inpDiv {
		width: 690rpx;
		height: 88rpx;
		background-color: #FFF3E7;
		border-radius: 30rpx;
		input {
			flex: 1;
			font-size: 34rpx;
			color: #000;
		}
		.all {
			color: #000;
			font-size: 28rpx;
		}
		.line {
			width: 2rpx;
			height: 36rpx;
			background-color: rgba(0,0,0,0.23);
			margin: 0 20rpx;
		}
		text {
			color: #000;
			font-size: 28rpx;
			font-weight: 500;
			padding: 0 15rpx;
		}
	}
	.using {
		color: rgba(0,0,0,0.5);
		font-size: 24rpx;
		padding: 10rpx 30rpx;
	}
	.exchange {
		width: 68rpx;
		height: 80rpx;
	}
	
	.tip {
		width: 100%;
		font-size: 24rpx;
		padding: 10rpx 30rpx;
		color: #000;
		.cost {
			color: #F16C00;
		}
	}
	
	.btn {
		width: 560rpx;
		height: 90rpx;
		background-color: #D4D4D4;
		border-radius:30rpx;
		color: #fff;
		font-size: 32rpx;
		font-weight: 700;
		line-height: 86rpx;
		margin: 100rpx auto 0;
	}
	.btnActive {
		background:linear-gradient(90deg,#FF9B47,#FFC99B);
	}
</style>
