<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="item margin0 flex align-center">
			<input type="password" placeholder="请输入原登录密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="pwd"/>
		</view>
		<view class="item margin30-0 flex align-center">
			<input type="password" placeholder="请输入新登录密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="newPwd"/>
		</view>
		<view class="item margin30-0 flex align-center">
			<input type="password" placeholder="请确认新登录密码" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="reNewPwd"/>
		</view>
		
		
		
		<view class="btn margin120-0 text-center" @click="submit()">确定</view>
	</view>
</template>

<script>
	export default {
        data() {
            return {
				pwd:'',
				newPwd:'',
				reNewPwd:'',
            }
        },
        onShow() {

        },
        methods: {
			submit(){
				if(!this.pwd) {
					return this.$u.toast('请输入原登录密码');
				}
				if(this.newPwd.length<8||this.newPwd.length>20) {
					return this.$u.toast('登录密码的长度必须为8——20位');
				}
				if(this.newPwd!=this.reNewPwd) {
					return this.$u.toast('两次登录密码输入不一致');
				}
				this.$u.toast("修改成功")
				this.$Ajax("/register/updatePassword",{
					userId:uni.getStorageSync("hdUserInfo").userid,
					oldpassword:this.pwd,
					password:this.newPwd,
					passwordrep:this.newPwd
				},(res)=>{
					if(res.state==0){
						this.$u.toast("修改成功");
						setTimeout(()=>{
							this.$tools.back(2);
							uni.removeStorageSync("hdUserInfo");
							uni.removeStorageSync("token");
						},1000)
					}
				})
			}
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
