<template>
	<view class="page">
		<view class="placeholder80"></view>
		
		<view class="topView padding-row30 flex align-center margin20-0">
			<view class="avartar" @click="token ? $tools.jump('./profile') : $tools.jump('../login/login')">
				<image :src="obj.icon ? obj.icon : '../../static/images/app/avartar.png'" mode=""></image>
			</view>
			<view class="phone flex-column flex-between" v-if="token" @click="$tools.jump('./profile')">
				<text>{{ obj.nickName ? obj.nickName: userInfo.address }}</text>
				<text style="color: rgba(0,0,0,0.5);font-size: 26rpx;">邀请码:{{userInfo.invitationcode}}</text>
			</view>
			<text class="noLogin" v-else @click="$tools.jump('../login/login')">用户未登录，<text style="color:#F16C00;">去登录</text></text>
		</view>
		
		<view class="item flex-between align-center margin80-0" @click="$tools.goNavigiteTo('./orders')">
			<view class="flex align-center">
				<image src="../../static/images/app/order.png" style="width: 44rpx;height: 48rpx;"></image>
				<text>我的订单</text>
			</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		<view class="item flex-between align-center margin0" @click="$tools.goNavigiteTo('./security')">
			<view class="flex align-center">
				<image src="../../static/images/app/aqzx.png" style="width: 44rpx;height: 52rpx;"></image>
				<text>账号安全</text>
			</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		<view class="item flex-between align-center margin0" @click="$tools.goNavigiteTo('./certification')">
			<view class="flex align-center">
				<image src="../../static/images/app/sfyz.png" style="width: 48rpx;height: 48rpx;"></image>
				<text>身份验证</text>
			</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		<view class="item flex-between align-center margin0" @click="$tools.goNavigiteTo('./invite')">
			<view class="flex align-center">
				<image src="../../static/images/app/hy.png" style="width: 48rpx;height: 48rpx;"></image>
				<text>邀请好友</text>
			</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		<view class="item flex-between align-center margin0" @click="$tools.jump('./about')">
			<view class="flex align-center">
				<image src="../../static/images/app/about.png" style="width: 48rpx;height: 54rpx;"></image>
				<text>关于我们</text>
			</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		<view class="item flex-between align-center margin0" @click="checkVersion()">
			<view class="flex align-center">
				<image src="../../static/images/app/checkV.png" style="width: 50rpx;height: 54rpx;"></image>
				<text>检查更新</text>
			</view>
			<view class="flex align-center">
				<text style="color: rgba(0,0,0,0.5);font-size: 26rpx;padding-right: 20rpx;">v{{version}}</text>
				<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				token:'',
				userInfo:{},
				show:false,
				mask:true,
				mode:'center',
				version:'',
				obj:{}
			}
		},
		watch:{
			show(){
				if(this.show) {
					uni.hideTabBar()
				}else {
					uni.showTabBar()
				}
			}
		},
		onShow() {
			/* #ifdef APP-PLUS */
			this.getVersion()
			/* #endif */
			this.userInfo = uni.getStorageSync("hdUserInfo");
			this.token = uni.getStorageSync("token");
			this.init()
		},
		methods:{
			init(){
				this.$Ajax('/register/selectNikeNameAndPhoto',{
					userId:uni.getStorageSync('hdUserInfo').userid
				},(res)=>{
					if(res.state==0){
						if(res.data){
							this.obj = res.data[0];
						}else{}
					}else{
						this.obj.icon = '';
						this.obj.nickName = '';
					}
				})
			},
			getVersion(){
				let that = this;
				plus.runtime.getProperty(plus.runtime.appid, function(info) {
					that.version = info.version;
					console.log(info);
					console.log(that.version)
				})
			},
			checkVersion(){
				this.$u.toast("已经是最新版本")
			}
		}
	}
</script>

<style lang="less" scoped>
	.topView {
		width: 100%;
		height: 92rpx;
		.avartar {
			width: 92rpx;
			height: 92rpx;
			image {
				width: 120rpx;
				height: 120rpx;
			}
		}
		.phone {
			height: 92rpx;
			color: #000;
			font-weight: 600;
			font-size: 32rpx;
			padding-left: 50rpx;
		}
		.noLogin {
			color: #999;
			font-size: 28rpx;
			padding-left: 50rpx;
		}
	}
	
	.item {
		width: 690rpx;
		height: 112rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.03);
		text {
			color: #000;
			font-size: 30rpx;
			font-weight: 600;
			padding-left: 25rpx;
		}
	}

	


</style>