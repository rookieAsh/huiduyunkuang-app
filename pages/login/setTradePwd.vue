<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="item margin0 flex align-center">
			<input type="password" placeholder="请设置6位交易密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="tradePwd"/>
		</view>
		<view class="item margin30-0 flex align-center">
			<input type="password" placeholder="请确认交易密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="reTradePwd"/>
		</view>
		<view class="item margin30-0 flex align-center">
			<text>{{userInfo.address}}</text>
		</view> 
		 <view class="item margin30-0 flex-between align-center">
			<input type="number" placeholder="请输入验证码" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="code"/>
			<view class="code text-center" @click="sendCode()">{{remain}}</view>
		</view>
		
		<view class="btn margin120-0 text-center" @click="submit()">确定</view>
	</view>
</template>

<script>
	export default {
        data() {
            return {
				tradePwd:'',
				reTradePwd:'',
				userInfo:{},
				code:'',
				remain:'获取验证码',
				countDown:60,
				isSend:false,
				timer:null,
            }
        },
        onShow() {
			this.userInfo = uni.getStorageSync("hdUserInfo");
        },
        methods: {
			submit(){
				if(!this.tradePwd){
					return this.$u.toast('请输入交易密码');
				}
				if(this.tradePwd.length !== 6){
					return this.$u.toast('交易密码长度应该为6位');
				}
				if(this.tradePwd!=this.reTradePwd){
					return this.$u.toast('两次密码输入不一致');
				}
				if(!this.code){
					return this.$u.toast('请输入验证码');
				}
				
				this.$Ajax("/register/addJYpassword",{
					userid:this.userInfo.userid,
					jypassword:this.tradePwd,
					jypasswordrep:this.reTradePwd,
					code:this.code
				},(res)=>{
					if(res.state==0){
						this.$u.toast("设置成功");
						setTimeout(()=>{
							this.$tools.back(1)
						},1000)
					}else{
						this.$u.toast(res.message);
					}
				})
				
			},
			// 发送验证码
			sendCode(){
				if(this.isSend) return
				this.isSend = true;
				this.$Ajax("/register/sendSmsSendMessage",{
					address:this.userInfo.address
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
        }
    }
</script>

<style lang="less" scoped>
	.item {
		width: 690rpx;
		height: 88rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.07);
		input {
			flex: 1;
			color: #000;
			font-size: 32rpx;
		}
		text {
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
</style>
