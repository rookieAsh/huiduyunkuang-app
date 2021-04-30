<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="selectDiv margin0 flex-between align-center padding-row20" @click="showCoin = true">
			<view class="flex align-center">
				<image :src="img" style="width: 42rpx;height: 42rpx;"></image>
				<text style="padding-left: 20rpx;">{{coin}}</text>
			</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		<view class="selectDiv margin30-0 flex-between align-center padding-row20">
			<view class="flex align-center">
				<text>提现地址</text>
			</view>
			<input type="text" placeholder="请输入或者粘贴提现地址" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="address"/>
			<image src="../../static/images/app/scan.png" style="width: 38rpx;height: 36rpx;" @click="showScan()"></image>
		</view>	
		<view class="selectDiv margin30-0 flex-between align-center padding-row20">
			<view class="flex align-center">
				<text>数量</text>
			</view>
			<input type="number" placeholder="请输入提币数量" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="quantity"/>
			<view class="all" @click="all()">全部</view>
		</view>
		<view class="using">余额:{{using |number(4)}}</view>
		<view class="selectDiv margin30-0 flex-between align-center padding-row20">
			<view class="flex align-center">
				<text>交易密码</text>
			</view>
			<input type="password" placeholder="请输入交易密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="tradePwd"/>
		</view>	
		<view class="selectDiv margin30-0 flex-between align-center padding-row20">
			<view class="flex align-center">
				<text>手续费 {{withdraw_service}}</text>
			</view>
		</view>
		<textarea placeholder="备注：请输入备注内容" class="margin30-0" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="remark"/>
		
		<view class="btn margin120-0 text-center" @click="submit()">提现</view>
		
		<!-- 币种选择弹框 -->
		<u-popup  v-model="showCoin" :mask="mask" :mode="mode" border-radius="0">
			<view class="popBot">
				<view class="title flex-between align-center padding-row30">
					<text class="coin">选择充币币种</text>
					<text @click="showCoin = false">取消</text>
				</view>
				<view class="item padding-row30 text-center flex-between" 
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
				mask:true,
				mode:'bottom',
				coin:'',
				coinAct:0,
				coinList:[],
				address:'',
				quantity:'',
				tradePwd:'',
				remark:'',
				using:0,
				withdraw_service:'',
				addressKey:'',
				img:'',
				status:''
            }
        },
		onLoad() {
			this.getList();
		},
        onShow() {
			this.init()
        },
		onNavigationBarButtonTap(e) {
			this.$tools.jump('./withdrawList')
		},
        methods: {
			init1(){
				this.$Ajax('/register/checkJymimaZt',{
					userId:uni.getStorageSync('hdUserInfo').userid
				},(res)=>{
					console.log(res)
					if(res.data==0){
						this.$u.toast('请先设置交易密码')
						setTimeout(()=>{
							this.$tools.jump('../login/setTradePwd')
							return
						},1000)
					}
				})
			},
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
					this.using = res.data[0].balance;
					this.addressKey = res.data[0].addressKey;
					this.withdraw_service = res.data[0].withdraw_service;
					this.img = res.data[0].logo;
				})
			},
			// 选择币种
			selectCoin(item,index){
				this.coin = item.coin;
				this.coinAct = index;
				this.using = item.balance;
				this.addressKey = item.addressKey;
				this.withdraw_service = item.withdraw_service;
				this.showCoin = false;	
				this.img = item.logo
			},
			// 扫描
			showScan(){
				let that = this;
				// onlyFromCamera: true,
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						that.address = res.result;
				    },
					fail:function(){
						
					}
				});
			},
			// 提币按钮
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
						if(!this.address) {
							return this.$u.toast("请输入提币地址");
						}
						if(!this.quantity) {
							return this.$u.toast("请输入提币数量");
						}
						if(!this.tradePwd) {
							return this.$u.toast("请输入交易密码");
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
						this.$Ajax("/custody/coinWithdraw",{
							address:uni.getStorageSync("hdUserInfo").address,
							addressKey:this.addressKey,
							coin:this.coin,
							toAddress:this.address,
							withdraw_service:this.withdraw_service,
							value:this.quantity,
							comment:this.remark,
							jypassword:this.tradePwd
						},(res)=>{
							if(res.state==0){
								this.$u.toast("提币成功");
								this.address = '';
								this.quantity = '';
								this.tradePwd = '';
							}else{
								this.$u.toast(res.message);
							}
						})
					}
				})
				
				
			},
			all(){
				this.quantity = this.using;
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
			padding-right: 20rpx;
		}
		.all {
			font-size: 30rpx;
			color: #FF891C;
			font-weight: 600;
		}
		
	}
	.using {
		padding: 15rpx 30rpx;
		color: #FF891C;
	}

	textarea {
		display: block;
		width: 690rpx;
		height: 200rpx;
		background-color: #FFF8F0;
		padding: 20rpx;
		color: #000;
		font-size: 30rpx;
		border-radius: 30rpx;
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