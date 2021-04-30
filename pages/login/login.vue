<template>
	<view class="page">
		<view style="width: 100%;height: 100rpx;"></view>
		<view class="h1">让我们从登录</view>
		<view class="h1">开始</view>
		
		<view class="tabs flex-between">
			<view class="tab" :class="{active:tabCureent==0}" @click="change(0)">密码登录<view class="line"></view></view>
			<view class="tab" :class="{active:tabCureent==1}" @click="change(1)">快速登录<view class="line"></view></view>
		</view>
		
		<view v-if="tabCureent==0">
			<view class="item margin80-0 flex align-center">
				<input type="text" placeholder="请输入手机号或邮箱" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="phoneEmail"/>
			</view>
			<view class="item margin30-0 flex-between align-center">
				<input :type="type" placeholder="请输入登录密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="pwd"/>
				<u-icon :name="eyes" color="#7F7F7F" size="36" @click="changeEye()"></u-icon>
			</view>
		</view>
		
		<view v-if="tabCureent==1">
			<view class="item margin80-0 flex align-center">
				<input type="number" placeholder="请输入手机号" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="phone"/>
			</view>
			<view class="item margin30-0 flex-between align-center">
				<input type="password" placeholder="请输入验证码" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="code"/>
				<view class="code text-center" @click="sendCode()">{{remain}}</view>
			</view>
		</view>
		
		<view class="btn margin120-0 text-center" @click="loginBtn(tabCureent)">登录</view>
		<view class="btns flex-between margin0">
			<text style="color: #F16C00;" @click="$tools.jump('./reg')">账号注册</text>
			<text style="color: rgba(0,0,0,0.5);" @click="show = true">忘记密码?</text>
		</view>
		
		<view class="tip fixed">登录即代表您已阅读并同意
			<text>灰度云矿
				<text style="color:#FF891C" @click="$tools.jump('../my/agreement')">用户服务</text>
				与
				<text style="color:#FF891C" @click="$tools.jump('../my/privacy')">隐私协议</text>
			</text>
		</view>
		
		<!-- 找回密码方式弹框 -->
		<u-popup  v-model="show" :mask="mask" :mode="mode" border-radius="0">
			<view class="popBot">
				<view class="item" @click="$tools.jump('./forget',0)">手机号找回</view>
				<view class="line"></view>
				<view class="item" @click="$tools.jump('./forget',1)">邮箱找回</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				phoneEmail:'',
				phone:'',
				pwd:'',
				code:'',
				tabCureent:0,
				type:'password',
				eyes:'eye-off',
				remain:'获取验证码',
				countDown:60,
				isSend:false,
				timer:null,
				show:false,
				mask:true,
				mode:'bottom',
			}
		},
		onShow() {
			this.show = false;
		},
		methods: {
			change(index){
				this.tabCureent = index;
			},
			changeEye(){
				if(this.type=='password') {
					this.type = 'text';
					this.eyes = 'eye-fill'
				}else {
					this.type = 'password';
					this.eyes = 'eye-off'
				}
			},
		
			// 发送验证码
			sendCode(){
				if(this.isSend) {
					return this.$u.toast(this.countDown + '后重新获取')
				}
				let isPhone = this.$u.test.mobile(this.phone);
				if(!isPhone) {
					return this.$u.toast("手机号输入不正确")
				}
				this.$Ajax("/register/sendSmsSendMessage",{
					address:this.phone
				},(res)=>{
					if(res.state==0){
						this.isSend = true;
						this.$u.toast("发送成功");
						this.remain = this.countDown + 'S后重新获取';
						this.timer = setInterval(()=>{
							this.countDown--;
							this.remain = this.countDown + 'S后重新获取';
							if (this.countDown == 0) {
								clearInterval(this.timer);
								this.remain = '获取验证码';
								this.isSend = false,
								this.countDown = 60;
							}
						},1000)
					}
				})
			},
			// 登录操作
			loginBtn(index){
				if(index==0){
					let isPhone = this.$u.test.mobile(this.phoneEmail);
					let isEmail = this.$u.test.email(this.phoneEmail);
					if(!isPhone && !isEmail) {
						return this.$u.toast("手机号或邮箱输入不正确")
					}
					if(!this.pwd) {
						return this.$u.toast("请输入登录密码")
					}
					this.$Ajax("/register/login",{
						address:this.phoneEmail,
						password:this.pwd
					},(res)=>{
						if(res.data.state==0){
							let token = res.token;
							uni.setStorageSync("token",token);
							uni.setStorageSync("hdUserInfo",res.data.data[0])
							this.$u.toast("登录成功");
							setTimeout(()=>{
								this.$tools.jumpTo("../index/index")
							},1000)
						}else{
							this.$u.toast(res.data.message);
						}
					})
				}else{
					let isPhone = this.$u.test.mobile(this.phone);
					if(!isPhone) {
						return this.$u.toast("手机号输入不正确")
					}
					if(!this.code) {
						return this.$u.toast("请输入短信验证码")
					}
					this.$Ajax("/register/celerityLogin",{
						address:this.phone,
						code:this.code
					},(res)=>{
						if(res.data.state==0){
							let token = res.token;
							uni.setStorageSync("token",token);
							uni.setStorageSync("hdUserInfo",res.data.data)
							this.$u.toast("登录成功");
							setTimeout(()=>{
								this.$tools.jumpTo("../index/index")
							},1000)
						}else{
							this.$u.toast(res.data.message);
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.h1 {
		font-size: 52rpx;
		font-weight: bold;
		color: #000000;
		padding: 0 30rpx;
	}
	.tabs {
		margin: 100rpx auto 0;
		width: 380rpx;
		.tab {
			color: rgba(0,0,0,0.5);
			font-size: 36rpx;
			font-weight: 500;
		}
		.active {
			font-weight: 700;
			color: #000;
			position: relative;
			.line {
				width: 80rpx;
				height: 10rpx;
				position: absolute;
				border-radius: 10rpx;
				background: linear-gradient(111deg, #F38D50, #FED7B7);
				left: 50%;
				transform: translate(-50%);
				bottom: -20rpx;
			}
		}
	}
	
	.item {
		width: 690rpx;
		height: 80rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.07);
		input {
			flex: 1;
			color: #000;
			font-size: 32rpx;
		}
		.code {
			width: 180rpx;
			height: 50rpx;
			background-color: #FCE6D9;
			color: #F16C00;
			font-size: 24rpx;
			line-height: 50rpx;
			font-weight: 600;
			border-radius: 10rpx;
		}
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
	
	.btns {
		width: 650rpx;
		padding: 20rpx 0;
		text {
			font-size: 28rpx;
		}
	}

	.popBot {
		width: 750rpx;
		height: 201rpx;
		.item {
			width: 100%;
			height: 100rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #000000;
			line-height: 100rpx;
			text-align: center;
		}
		.line {
			width: 100%;
			height: 1rpx;
			background: 1rpx solid rgba(0,0,0,0.1);
		}
	}
	
	.tip {
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		left: 50%;
		transform: translate(-50%);
		bottom: 50rpx;
		color: rgba(0,0,0,0.5);
	}
</style>
