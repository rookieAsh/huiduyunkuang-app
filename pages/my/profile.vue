<template>
	<view class="page">
		<view class="placeholder50"></view>
		<view class="item margin0 flex-between align-center" @click="showIcon = true">
			<view class="name">头像</view>
			<view class="flex align-center">
				<image :src="obj.icon ? obj.icon : '../../static/images/app/user_icon.png'" 
				style="width: 70rpx;height: 70rpx; margin-right: 30rpx;"></image>
				<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
			</view>
		</view>
		<view class="item margin0 flex-between align-center" @click="showInp = true">
			<view class="name">昵称</view>
			<view class="flex align-center">
				<text>{{obj.nickName || '未设置'}}</text>
				<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
			</view>
		</view>
		<!-- <view class="item margin0 flex-between align-center">
			<view class="name">性别</view>
			<view class="flex align-center">
				<text>男</text>
				<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
			</view>
		</view>
		<view class="item margin0 flex-between align-center" @click="show = true">
			<view class="name">生日</view>
			<view class="flex align-center">
				<text>{{date}}</text>
				<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
			</view>
		</view> -->
		<view class="loginOut text-center margin200-0" @click="show1 = true">退出登录</view>
		
		<!-- 退出登录弹框 -->
		<u-modal ref="uModal" v-model="show1" :show-cancel-button="true"
			:show-title="false" :async-close="false"
			@confirm="confirm" :content="content" 
			:confirm-color="confirmColor1"  :mask-close-able="true"
		>
		</u-modal>
		
		<!-- 昵称弹框 -->
		<u-popup  v-model="showInp" :mask="mask" :mode="mode1" border-radius="18">
			<view class="popBot">
				<view class="title text-center">昵称</view>
				<view class="inpDiv flex align-center margin20-0">
					<input type="text" placeholder="请输入昵称" 
					placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="nickName"/>
				</view>
				<view class="btn text-center margin80-0" @click="submit()">确定</view>
			</view>
		</u-popup>
		<!-- 选择头像弹框 -->
		<u-popup  v-model="showIcon" :mask="mask" :mode="mode1" border-radius="18">
			<view class="popBot" style="height: 520rpx;">
				<view class="title text-center">头像</view>
				<view class="upload margin20-0 relative" @click="upload()">
					<view class="icon text-center absolute-auto" v-if="!src">
						<u-icon name="plus" color="rgba(0,0,0,0.5)" size="40"></u-icon><br><text>选择图片</text>
					</view>
					<image :src="src" style="width: 100%;height: 100%;" v-else></image>
				</view>
				<view class="btn text-center margin40-0" @click="submitAvartar()">确定</view>
			</view>
		</u-popup>
		
		<!-- <u-picker
			:mode="mode"
			:defaultTime="defaultTime"
			v-model="show"
			:params="params"
			end-year="2030"
			@confirm="confirm"
			:defaultSelector="defaultSelector"
			:confirm-color ="confirmColor"
			@columnchange="columnchange"
		></u-picker> -->
	</view>
</template>

<script>
	import webUrl from '../../common/url.js'
	export default {
        data() {
            return {
				showInp:false,
				showIcon:false,
				mask:true,
				mode1:'center',
				nickName:'',
				// confirmColor:'#FF891C',
				// show: false,
				// date: '2000-10-10',
				// mode: 'time',
				// defaultTime: '2000-10-10',
				// defaultSelector: [0],
				// params: {
				// 	year: true,
				// 	month: true,
				// 	day: true,
				// 	hour: false,
				// 	minute: false,
				// 	second: false,
				// },
				src:'',
				webUrl:webUrl.webUrl,
				obj:{
					icon:'',
					nickName:'',
				},
				content: '确定退出账号登录？',
				confirmColor1:'#FF891C',
				show1:false
            }
        },
        onShow() {
			this.init();
        },
        methods: {
			// confirm(e){
			// 	this.date = `${e.year}-${e.month}-${e.day}`
			// },
			init(){
				this.$Ajax('/register/selectNikeNameAndPhoto',{
					userId:uni.getStorageSync('hdUserInfo').userid
				},(res)=>{
					this.obj = res.data[0];
				})
			},
			submit(){
				this.$Ajax("/register/updatenickname",{
					userid:uni.getStorageSync("hdUserInfo").userid,
					nickname:this.nickName
				},(res)=>{
					if(res.state==0){
						this.showInp = false;
						this.$u.toast("设置成功");
						setTimeout(()=>{
							this.$tools.back(1);
						},1000)
					}
				})
			},
			upload(){
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.src= res.tempFilePaths[0];
					},
					fail: function() {
						console.log("上传图片接口调用失败");
						return;
					}
				});					
			},
			confirm(){
				this.$Ajax("/register/exitLogin",{},(res)=>{
					if(res.state==0){
						this.$u.toast(res.message)
						uni.removeStorageSync("token");
						uni.removeStorageSync("hdUserInfo");
						setTimeout(()=>{
							this.$tools.back(1)
						},1000)	
					}
				})
			},
			submitAvartar(){
				let that = this;
				if(!that.src) {
					return that.$u.toast("请上传头像");
				}
				uni.showLoading({
					title: '上传中...',
				})
				var token = uni.getStorageSync('token');
				var files=[];
				files.push({'name':'img','uri':that.src});
				uni.uploadFile({
					url:that.webUrl + '/register/updatenickname', //仅为示例，非真实的接口地址
					// header: {
					// 	"Content-Type": "multipart/form-data",
					// 	"token": token
					// },
					files:files,
					formData: {
						'token': token,
						userId: uni.getStorageSync("hdUserInfo").userid,
						img: that.src,
					},
					success: (res) => {
						uni.hideLoading();
						var data=JSON.parse(res.data);
					    that.$u.toast(data.message);
						if(data.state==0){
							this.$u.toast("上传成功");
							this.showIcon = false
							setTimeout(()=>{
								uni.switchTab({
									url:'./my'
								})
							},1000)	
						}	
					},
					fail(err) {	
						console.log(err)
						uni.hideLoading();
					}
				})	
			}
        }
    }
</script>

<style lang="less" scoped>
	.popBot {
		width: 600rpx;
		height: 460rpx;
		.title {
			color: #000;
			font-size: 34rpx;
			padding: 50rpx 0 30rpx;
		}
		.upload {
			width: 200rpx;
			height: 200rpx;
			background: rgba(0,0,0,0.1);
			text {
				color: rgba(0,0,0,0.5);
				font-size: 24rpx;
			}	
		}
		.inpDiv {
			width: 480rpx;
			height: 88rpx;
			border: 1rpx solid rgba(0,0,0,0.1);
			border-radius: 10rpx;
			input {
				flex: 1;
				color: #000;
				font-size: 30rpx;
				text-align: center;
			}
		}
		.btn {
			width: 400rpx;
			height: 80rpx;
			background:linear-gradient(90deg,#FF9B47,#FFC99B);
			border-radius:30rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: 700;
			line-height: 80rpx;
		}
	}
	.item {
		width: 690rpx;
		height: 140rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.1);
		.name {
			font-size: 32rpx;
			color: #000;
			font-weight: 600;
		}
		text {
			font-size: 30rpx;
			color: rgba(0,0,0,0.5);
			padding-right: 30rpx;
		}
	}
	
	.loginOut {
		width: 500rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: rgba(0,0,0,0.5);
		border-radius: 10rpx;
		font-size: 32rpx;
		color: #fff;
		font-weight: 600;
	}
</style>
