-<template>
	<view class="page">
		<view style="width: 100%;height: 100rpx;"></view>
		<view class="block" v-if="status==0">
			<view class="h1">找回密码</view>
			<view class="item margin80-0 flex align-center">
				<input type="text" placeholder="请输入手机号" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="phone" v-if="type==0"/>
				<input type="text" placeholder="请输入邮箱" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="email" v-if="type==1"/>
			</view>
			<view class="item margin30-0 flex-between align-center">
				<input type="number" placeholder="请输入验证码" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="code"/>
				<view class="code text-center" @click="sendCode()">{{remain}}</view>
			</view>
			
			<view class="btn margin120-0 text-center" @click="next()">下一步</view>
		</view>
		
		<view class="block" v-if="status==1">
			<view class="h1">重置密码</view>
			<view class="item margin80-0 flex align-center">
				<input type="text" placeholder="请输入手机号" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="phone" v-if="type==0"/>
				<input type="text" placeholder="请输入邮箱" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="email" v-if="type==1"/>
			</view>
			<view class="item margin30-0 flex align-center">
				<input type="password" placeholder="请输入密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="pwd"/>
			</view>	
			<view class="tip">密码长度必须为8-20位</view>
			<view class="item margin30-0 flex align-center">
				<input type="password" placeholder="请确认密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:32rpx;" v-model="rePwd"/>
			</view>
				
			<view class="btn margin120-0 text-center" @click="submit()">确定</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				type:'',
				remain:'获取验证码',
				countDown:60,
				isSend:false,
				timer:null,
				phoneEmail:'',
				status:0,
				code:'',
				phone:'',
				email:'',
				pwd:'',
				rePwd:'',
			}
		},
		onLoad(opt) {
			this.type = opt.value1;
		},
		onShow() {
			this.status = 0;
			console.log(this.status)
		},
		methods: {
			next(){
				// if(!this.phone&&!this.email){
				// 	return this.$u.toast(this.type==0?"请输入手机号":"请输入邮箱");
				// }
				// this.status = 1;
				if(this.type==0) {
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
				this.$Ajax("/register/verificationMessage",{
					address:this.phoneEmail,
					code:this.code
				},(res)=>{
					console.log(res)
					if(res.state == 0){
						// if(!this.phone&&!this.email){
						// 	return this.$u.toast(this.type==0?"请输入手机号":"请输入邮箱");
						// }
						this.$u.toast("验证码正确");
						this.status = 1
					}else{
						this.$u.toast("验证码错误");
					}
					
					// if(res.state==0){
					// 	this.isSend = true;
					// 	this.$u.toast("发送成功");
					// 	this.remain = this.countDown + 'S后重新获取';
					// 	this.timer = setInterval(()=>{
					// 		this.countDown--;
					// 		this.remain = this.countDown + 'S后重新获取';
					// 		if (this.countDown == 0) {
					// 			clearInterval(this.timer);
					// 			this.remain = '获取验证码';
					// 			this.isSend = false,
					// 			this.countDown = 60;
					// 		}
					// 	},1000)
					// }
				})
				
				
			},
			// 发送验证码
			sendCode(){
				if(this.type==0) {
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
								this.isSend = false,
								this.countDown = 60;
							}
						},1000)
					}
				})
			},
			submit(){
				if(this.pwd.length < 8 || this.pwd.length >20){
					this.$u.toast("密码长度不正确");
					return;
				}
				if(this.pwd  != this.rePwd){
					this.$u.toast("密码不一致");
					return;
				}
				this.$Ajax("/register/forgetPass",{
					address:this.phoneEmail,
					password:this.pwd,
					passwordrep:this.rePwd
				},(res)=>{
					if(res.state==1){
					    this.$u.toast("用户不存在，请注册");
					}else if(res.state==0){
						this.$u.toast("密码重置成功");
						 uni.navigateTo({
						     url: '/pages/login/login',
						})
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
</style>


