<template>
	<view class="page">
		<view style="width: 100%;height: 100rpx;"></view>
		<view class="h1" v-if="isPhone">手机号注册</view>
		<view class="h1" v-else>邮箱注册</view>
		<view class="item margin80-0 flex align-center">
			<input type="text" placeholder="请输入手机号" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="phone" v-if="isPhone"/>
			<input type="text" placeholder="请输入邮箱" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="email" v-else/>
		</view>
		<view class="item margin30-0 flex align-center">
			<input type="password" placeholder="请输入密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="pwd"/>
		</view>	
		<view class="tip">密码长度必须为8-20位</view>
		<view class="item margin30-0 flex align-center">
			<input type="password" placeholder="请确认密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="rePwd"/>
		</view>	
		<view class="item margin30-0 flex-between align-center">
			<input type="number" placeholder="请输入验证码" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="code"/>
			<view class="code text-center" @click="sendCode()">{{remain}}</view>
		</view>
		<view class="item margin30-0 flex align-center">
			<input type="text" placeholder="请输入邀请码(选填)" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="inviteCode"/>
		</view>	
		<view class="btn margin120-0 text-center" @click="regBtn()">注册</view>
		<view class="btns flex-between margin0">
			<text style="color: #F16C00;" @click="isPhone=!isPhone;pwd='';rePwd='';" v-if="isPhone">邮箱注册</text>
			<text style="color: #F16C00;" @click="isPhone=!isPhone;pwd='';rePwd='';" v-else>手机号注册</text>
			<text style="color: rgba(0,0,0,0.5);" @click="$tools.jump('./login')">已有账号? <text style="color: #F16C00;">去登录</text></text>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				email:'',
				phone:'',
				pwd:'',
				rePwd:'',
				inviteCode:'',
				code:'',
				remain:'获取验证码',
				countDown:60,
				isSend:false,
				timer:null,
				isPhone:true,
				phoneEmail:'',
			}
		},
		methods: {
			// 注册按钮
			regBtn(){
				if(this.isPhone) {
					this.phoneEmail = this.phone;
					let isPhone = this.$u.test.mobile(this.phone);
					if(!isPhone) {
						return this.$u.toast("手机号输入不正确")
					}
				}else{
					this.phoneEmail = this.email;
					let isEmail = this.$u.test.email(this.email);
					if(!isEmail) {
						return this.$u.toast("邮箱输入不正确")
					}
				}
				if(!this.pwd) {
					return this.$u.toast("请输入登录密码")
				}
				if(this.pwd.length<8||this.pwd.length>20) {
					return this.$u.toast('密码长度必须为8-20位')
				}
				if(this.pwd!=this.rePwd) {
					return this.$u.toast("两次登录密码输入不一致")
				}
				if(!this.code) {
					return this.$u.toast("请输入验证码")
				}
				this.$Ajax("/register/registerPhoneOrEmail",{
					address:this.phoneEmail,
					password:this.pwd,
					passwordrep:this.rePwd,
					invitationcode:this.inviteCode,
					code:this.code
				},(res)=>{
					if(res.state==0){
						this.$u.toast("注册成功");
						setTimeout(()=>{
							this.$tools.jump("./login")
						},1000)	
					}else{
						this.$u.toast(res.message)
					}
				})
			},
			
			// 发送验证码
			sendCode(){
				if(this.isPhone) {
					this.phoneEmail = this.phone;
					let isPhone = this.$u.test.mobile(this.phone);
					if(!isPhone) {
						return this.$u.toast("手机号输入不正确")
					}
				}else{
					this.phoneEmail = this.email;
					let isEmail = this.$u.test.email(this.email);
					if(!isEmail) {
						return this.$u.toast("邮箱输入不正确")
					}
				}
				if(this.isSend) return
				this.isSend = true;
				this.$Ajax("/register/sendSmsSendMessage",{
					address:this.phoneEmail
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
								this.countDown = 60;
								this.isSend = false
							}
						},1000)
					}
				})
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
	.item {
		width: 690rpx;
		height: 80rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.07);
		input {
			outline: none;
			color: #000;
			font-size: 32rpx;
			width: 100%;
		}
		.code {
			width: 220rpx;
			height: 50rpx;
			background-color: #FCE6D9;
			color: #F16C00;
			font-size: 24rpx;
			line-height: 50rpx;
			font-weight: 600;
			border-radius: 10rpx;
		}
	}
	.tip {
		color: rgba(0,0,0,0.5);
		font-size: 24rpx;
		padding: 15rpx 30rpx 0;
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
</style>


