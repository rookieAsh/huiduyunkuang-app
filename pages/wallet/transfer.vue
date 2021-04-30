<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="selectDiv margin0 flex-between align-center padding-row20" @click="changeEx(type)">
			<view class="flex align-center">
				<text style="color: rgba(0,0,0,0.8);font-size: 24rpx;padding-right: 15rpx;">从</text>
				<text>{{walletName1}}</text>
			</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		
		<view class="icon_ex margin40" style="width: 50rpx;height: 50rpx;" @click="changeEx(type)">
			<image src="../../static/images/app/exchange.png" style="width: 50rpx;height: 50rpx;"></image>
		</view>
		
		<view class="selectDiv margin0 flex-between align-center padding-row20" @click="changeEx(type)">
			<view class="flex align-center">
				<text style="color: rgba(0,0,0,0.5);font-size: 24rpx;padding-right: 15rpx;">到</text>
				<text>{{walletName2}}</text>
			</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		
		<view class="selectDiv margin40-0 flex-between align-center padding-row20" @click="showCoin = true">
			<view class="flex align-center">
				<image :src="img" style="width: 42rpx;height: 42rpx;"></image>
				<text style="padding-left: 20rpx;">{{coin}}</text>
			</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		<view class="selectDiv margin40-0 flex-between align-center padding-row20">
			<view class="flex align-center">
				<text>数量</text>
			</view>
			<input type="number" placeholder="请输入划转数量" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="quantity"/>
			<view class="all" @click="all()">全部</view>
		</view>
		<view class="tip">注：只有将挖矿账户资产划转到钱包账户，才可以进行闪兑或者提现，划转不收取手续费。</view>
		
		<view class="btn margin120-0 text-center" @click="submit()">划转</view>
		
		<!-- 币种选择弹框 -->
		<u-popup  v-model="showCoin" :mask="mask" :mode="mode" border-radius="0">
			<view class="popBot">
				<view class="title flex-between align-center padding-row30">
					<text class="coin">选择充币币种</text>
					<text @click="showCoin = false">取消</text>
				</view>
				<view class="item padding-row30 text-center flex-between align-center" 
				v-for="(item,index) in coinList" :key="index" 
				@click="selectCoin(item,index)" :class="{active:coinAct===index}">
					<view class="flex align-center" >
						<image :src="item.logo" style="width: 38rpx;height: 38rpx;margin-right: 20rpx;"></image>
						<text :class="{active:coinAct===index}">{{item.coin}}</text>
					</view>
					<u-icon name="checkbox-mark" color="#FF891C" size="40" v-if="coinAct===index"></u-icon>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	export default {
        data() {
            return {
				showCoin:false,
				show:false,
				mask:true,
				mode:'bottom',
				coin:'',
				coinAct:0,
				coinList:[],
				quantity:'',
				using:0,
				addressKey:'',
				typeList:[
					{
						name:'钱包账户',
					},
					{
						name:'挖矿账户',
					}
				],
				type:1,
				walletName1:'',
				walletName2:'',
				img:'',
				status:''
            }
        },
		onLoad() {
			this.getList();
		},
        onShow() {
			this.init()
			this.walletName1 = this.typeList[0].name;
			this.walletName2 = this.typeList[1].name;
        },
		onNavigationBarButtonTap(e) {
			this.$tools.jump('./transferList')
		},
        methods: {
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
					this.addressKey = res.data[0].addressKey;
					this.img = res.data[0].logo;
					this.using = res.data[0].balance
				})
			},
			// 选择币种
			selectCoin(item,index){
				this.coin = item.coin;
				this.coinAct = index;
				this.showCoin = false;
				this.img = item.logo;
				this.using = item.balance
			},
			changeEx(type){
				if(type==1){
					this.type=2;
					let name = this.walletName1;
					this.walletName1 = this.walletName2;
					this.walletName2 = name;
				}else {
					this.type=1;
					let name = this.walletName1;
					this.walletName1 = this.walletName2;
					this.walletName2 = name;
				}
				console.log(this.type)
			},
			all(){
				this.quantity = this.using;
			},
			
			submit(){
				if(!this.quantity){
					this.$u.toast("请输入划转数量");
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
				this.$Ajax("/custody/transfer",{
					address:uni.getStorageSync("hdUserInfo").address,
					fromAddressKey:this.addressKey,
					toAddressKey:this.addressKey,
					coin:this.coin,
					value:this.quantity,
					type:this.type
				},(res)=>{
					if(res.state==0){
						this.$u.toast("划转成功")
						this.quantity = '';
					}else{
						this.$u.toast(res.message)
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
	.selectDiv {
		width: 690rpx;
		height: 88rpx;
		background-color: #FFF8F0;
		border-radius: 30rpx;
		text {
			color: #000;
			font-size: 30rpx;
			font-weight: 600;
		}
		input {
			color: #000;
			font-size: 30rpx;
			flex: 1;
			padding-left: 20rpx;
		}
		.all {
			font-size: 30rpx;
			color: #FF891C;
			font-weight: 600;
		}
	}
	.tip {
		padding: 20rpx 30rpx;
		color: rgba(0,0,0,0.5);
		font-size: 24rpx;
	}
	
	.btn {
		width: 650rpx;
		height: 88rpx;
		background:linear-gradient(90deg,#FF9B47,#FFC99B);
		border-radius:30rpx;
		color: #fff;
		font-size: 32rpx;
		font-weight: 700;
		line-height: 88rpx;
	}
</style>