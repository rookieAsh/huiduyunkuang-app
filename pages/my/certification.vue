<template>
	<view class="page">
		<!-- <view class="placeholder30"></view> -->
		<!-- <view class="item flex align-center margin0">
			<view class="name">选择国籍：</view>
			<view class="right flex align-center">
				<view class="val text-right">中国大陆</view>
				<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
			</view>
		</view> -->
		<view class="tipSuccess" v-if="status==1">认证中,待系统审核,请勿重复提交</view>
		<view class="tipFail" v-if="status==2">用户认证成功,请勿重复提交</view>
		<view class="item flex align-center margin30">
			<view class="name">真实姓名：</view>
			<view class="right flex align-center">
				<input type="text" placeholder="请输入真实姓名，认证后无法修改" 
				placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="realName"/>
			</view>
		</view>
		<view class="item flex align-center margin30">
			<view class="name">身份证号：</view>
			<view class="right flex align-center">
				<input type="text" placeholder="请输入身份证号，认证后无法修改" 
				placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="idCard"/>
			</view>
		</view>
		<view class="item flex align-center margin0">
			<view class="name">身份证正反面照：</view>
		</view>
		<view class="card_z margin30 relative" @click="upload_z()">
			<image :src="src1" mode=""></image>
			<text class="absolute-center" v-if="src1=='../../static/images/app/card_z.png'">上传身份证正面照</text>
		</view>
		<view class="card_f margin30-0 relative" @click="upload_f()">
			<image :src="src2" mode=""></image>
			<text class="absolute-center" v-if="src2=='../../static/images/app/card_f.png'">上传身份证反面照</text>
		</view>
		
		<view class="tip">请确保照片的内容完整并清晰可见</view>
		<view class="tip">仅支持JPG和PNG图片格式，图片大小小于2M</view>
		
		<view class="btn text-center margin50-0" @click="submit()" :class="{isColor:status==1||status==2}">提交</view>
		<view class="placeholder10"></view>
	</view>
</template>

<script>
	import webUrl from '../../common/url.js'
	export default{
		data(){
			return{
				src1:'../../static/images/app/card_z.png',
				src2:'../../static/images/app/card_f.png',
				url:webUrl.webUrl,
				realName:'',
				idCard:'',
				temp_file1:'',
				temp_file2:'',
				fils1Path:'',
				fils2Path:'',
				status:''
			}
		},
		onShow() {
			this.init();
		},
		methods:{
			init(){
				this.$Ajax("/Autnentication/selectAuthenticationZt",{
					userId:uni.getStorageSync('hdUserInfo').userid
				},(res)=>{
					this.status = res.data[0].flg;
				})
			},
			// 上传证件正面
			upload_z(){
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						that.src1 = res.tempFilePaths[0];
						that.fils1Path = res.tempFilePaths[0];
						that.temp_file1 = '';
					},
					fail: function() {
						console.log("上传图片接口调用失败");
						return;
					}
				});	
			},
			// 上传证件反面
			upload_f(){
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						that.src2= res.tempFilePaths[0];
						that.fils2Path = res.tempFilePaths[0];
						that.temp_file2 = '';
					},
					fail: function() {
						console.log("上传图片接口调用失败");
						return;
					}
				});
			},
		
			submit(){
				let that = this;
				if(that.status == 1) {
					return that.$u.toast("认证中,待系统审核,请勿重复提交")
				}
				if(that.status == 2) {
					return that.$u.toast("用户认证成功,请勿重复提交")
				}
				if(!that.realName) {
					return that.$u.toast("请输入真实姓名");
				}
				if(!that.$u.test.idCard(that.idCard)) {
					return that.$u.toast("身份证号格式输入不正确");
				}
				if(that.src1=='../../static/images/app/card_z.png') {
					return that.$u.toast("请上传身份证正面");
				}
				if(that.src2=='../../static/images/app/card_f.png') {
					return that.$u.toast("请上传身份证反面");
				}
				uni.showLoading({
					title: '上传中...',
				})
				var token = uni.getStorageSync('token');
				var files=[];
				files.push({'name':'picOcr','uri':that.fils1Path});
				files.push({'name':'picRear','uri':that.fils2Path});
				console.log(files)
				uni.uploadFile({
					url: that.url + '/Autnentication/picUpOCR', //仅为示例，非真实的接口地址
					// header: {
					// 	"Content-Type": "multipart/form-data",
					// 	"token": token
					// },
					files:files,
					formData: {
						'token': token,
						'idNumber': that.idCard,
						'userId': uni.getStorageSync("hdUserInfo").userid,
						'username': that.realName,
						'picOcr':that.fils1Path,  // 正面
						'picRear':that.fils2Path,  // 反面
					},
					success: (res) => {
						uni.hideLoading();
						var data=JSON.parse(res.data);
					    that.$u.toast(data.message);
						console.log(data)
						if(data.state==0){
							this.$u.toast("提交认证成功");
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
	.item {
		width: 690rpx;
		height: 80rpx;
		.name {
			color: #000;
			font-size: 32rpx;
			font-weight: 600;
			margin-right: 30rpx;
		}
		.right {
			flex: 1;
			height: 80rpx;
			border-bottom: 1rpx solid rgba(0,0,0,0.1);
			.val {
				flex: 1;
				color: rgba(0,0,0,0.5);
				font-size: 30rpx;
				padding-right: 30rpx;
			}
			input {
				flex: 1;
				color: #000;
				font-size: 30rpx;
				text-align: right;
			}
		}
		
	}

	.card_z,.card_f {
		width: 500rpx;
		height: 315rpx;
		image {
			width: 100%;
			height: 100%;
		}
		text {
			bottom: 22rpx;
			font-size: 28rpx;
			color: rgba(0,0,0,0.5);
		}
	}
	
	.tip {
		font-size: 24rpx;
		color: rgba(0,0,0,0.5);
		padding: 0 125rpx;
		margin-top: 20rpx;
		line-height: 24rpx;
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
		margin: 88rpx auto;
	}
	.isColor {
		background: #999 !important; 
	}

	.tipSuccess {
		width: 750rpx;
		height: 60rpx;
		line-height: 60rpx;
		background: #FFF8F0;
		text-align: center;
		color: #FF9C00;
	}
	.tipFail {
		width: 750rpx;
		height: 60rpx;
		line-height: 60rpx;
		background: #67C23A;
		text-align: center;
		color: #fff;
		opacity: 0.5;
	}
	

</style>
