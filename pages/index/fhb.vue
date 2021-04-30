<template>
	<view class="page">
		<view class="status"></view>
		<view class="header flex-between align-center padding-row30">
			<image src="../../static/images/common/backR.png" style="width: 16rpx;height: 28rpx;" @click="$tools.back(1)"></image>
			<text @click="$tools.jump('./redList')">红包记录</text>
		</view>
		<view class="placeholder30"></view>
		<view class="logo margin0">
			<image src="../../static/images/app/logo_w.png" mode=""></image>
		</view>
		
		<view class="btn margin120-0 text-center" @click="$tools.jump('./redEnvelope')">普通红包</view>
		<view class="btn text-center margin40-0"  @click="$tools.jump('./redEnvelope_pwd')">暗号红包</view>
		<!-- <view class="btn text-center margin40-0">专属红包</view> -->
		
		<view class="type flex-between align-center margin60-0">
			<image src="../../static/images/app/hb_l.png" mode=""></image>
			<text>抢暗号红包</text>
			<image src="../../static/images/app/hb_r.png" mode=""></image>
		</view>
		
		<view class="inpDiv margin30-0 flex align-center">
			<input type="text" placeholder="请输入暗号" 
			placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="cipher"/>
			<view class="line"></view>
			<view class="ok" @click="qiangHb()">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				cipher:'',
			}
		},
		methods:{
			qiangHb(){
				if(!this.cipher) {
					return this.$u.toast("请输入暗号")
				}
				this.$Ajax("/rate/cipherHongbao",{
					address:uni.getStorageSync("hdUserInfo").address,
					cipher:this.cipher
				},(res)=>{
					if(res.state==0){
						this.$u.toast("抢暗号红包成功");
						uni.setStorageSync('data',res.data)
						setTimeout(()=>{
							this.$tools.jump('./redPacket')
						},1000)
					}else{
						this.$u.toast(res.message);
					}
				})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.page {
		width: 750rpx;
		min-height: calc(100vh - var(--window-bottom));
		background: #D85E39;
		.header {
			width: 750rpx;
			height: 92rpx;
			text {
				font-size: 24rpx;
				font-weight: bold;
				color: #FADBBC;
			}
		}
		.logo {
			width: 260rpx;
			height: 66rpx;
			image {
				width: 260rpx;
				height: 66rpx;
			}
		}
		.btn {
			width: 417rpx;
			height: 71rpx;
			background: #FADBBC;
			border-radius: 10rpx;
			line-height: 70rpx;
			color: rgba(0,0,0,0.7);
			font-size: 30rpx;
			font-weight: 500;
		}
		.type {
			width: 400rpx;
			height: 70rpx;
			image {
				width: 78rpx;
				height: 46rpx;
			}
			text {
				font-size: 30rpx;
				font-weight: bold;
				color: #FADBBC;
			}
		}
		
		.inpDiv {
			width: 570rpx;
			height: 88rpx;
			background: #FFFFFF;
			border-radius: 44rpx;
			padding: 0 30rpx;
			.line {
				width: 1rpx;
				height: 53rpx;
				background: #000000;
				opacity: 0.2;
			}
			input {
				flex:1;
				font-size: 30rpx;
				color: #000;
			}
			.ok {
				font-size: 36rpx;
				font-weight: 500;
				color: #D77E26;
				padding: 0 30rpx;
			}
		}
	}
</style>
