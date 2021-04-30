<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="selectDiv margin0 flex-between align-center padding-row20" @click="showCoin = true">
			<view class="flex align-center">
				<image :src="image" style="width: 42rpx;height: 42rpx;"></image>
				<text style="padding-left: 20rpx;">{{coin}}</text>
			</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
		<view class="h2">充币地址</view>
		<view class="codeDiv margin30-0 relative">
			<view class="code absolute-auto">
				<image class="image" v-if="img != ''" :src="img" :style="{ width: size+'upx', height: size + 'upx' }" />
			</view>
		</view>
		
		<view class="link text-center" @click="copy()">
			<text>{{address}}</text>
			<image src="../../static/images/app/copy.png" style="width: 26rpx;height: 26rpx;margin-left: 15rpx;" @click="copy()"></image>
		</view>
		
		<view class="btn margin120-0 text-center" @click="saveImageToPhotosAlbum()">保存二维码</view>
		
		
		<!-- 币种选择弹框 -->
		<u-popup  v-model="showCoin" :mask="mask" :mode="mode" border-radius="0">
			<view class="popBot">
				<view class="title flex-between align-center padding-row30">
					<text class="coin">选择充币币种</text>
					<text @click="showCoin = false">取消</text>
				</view>
				<view class="item padding-row30 text-center flex-between align-center" 
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
	import QR from "../../common/qrcode/qrcode.js";
	export default {
        data() {
            return {
				img:'',
				size:300,
				showCoin:false,
				show:false,
				mask:true,
				mode:'bottom',
				coin:'',
				coinAct:0,
				coinList:[],
				image:'',
				address:''
            }
        },
		onLoad(opt) {
			if(opt && opt.value1!= 'undefined'){
				console.log(opt.value1)
				this.$Ajax("/custody/selectWellatByCoinFlash",{
					address:uni.getStorageSync("hdUserInfo").address,
					type:1
				},(res)=>{
					this.coinList = res.data;
					res.data.forEach((item,index)=>{
						if(item.coin == 'USDT') {
							this.coin = item.coin
							this.image = item.logo
							this.address = item.addressKey
							this.coinAct = index
							setTimeout(()=>{
								this.creatQrcode()
							},200)
						}
					})
				})
			}else{
				this.getList()
			}
		},
        onShow() {
			
        },
		onNavigationBarButtonTap(e) {
			this.$tools.jump('./chargeList')
		},
        methods: {
			copy(){
				this.$tools.copy(this.address);
			},
			
			// 获取币种
			getList(){
				this.$Ajax("/custody/selectWellatByCoinFlash",{
					address:uni.getStorageSync("hdUserInfo").address,
					type:1
				},(res)=>{
					this.coinList = res.data;
					this.coin = res.data[0].coin;
					this.image = res.data[0].logo;
					this.address = res.data[0].addressKey;
					setTimeout(()=>{
						this.creatQrcode()
					},200)
				})
			},
			
			// 获取充币地址
			getLink (coin){
				this.$Ajax("/custody/topUp",{
					address:uni.getStorageSync('hdUserInfo').address,
					coin:coin
				},(res)=>{
					if(res.state==0){
						this.val = res.data;
						setTimeout(()=>{
							this.creatQrcode()
						},200)
					}
				})
			},
			// 选择币种
			selectCoin(item,index){
				this.coin = item.coin;
				this.coinAct = index;
				this.showCoin = false;
				this.image = item.logo;
				this.address = item.addressKey;
				setTimeout(()=>{
					this.creatQrcode()
				},200)
			},
			// 创建二维码
			creatQrcode(){
				let val = String(this.address)
				if(val == ''){
					return false
				}
				let img = QR.createQrCodeImg(val, {
					size: parseInt(this.size)
				})
				this.img = img;
			},
			// 保存二维码
			saveImageToPhotosAlbum(){
				let that=this;
				var bitmap = new plus.nativeObj.Bitmap(); 
				// 加载海报图片
				bitmap.loadBase64Data(that.img, function() { 
					//保存到系统相册
					bitmap.save("_doc/poster_2.jpg", { 
						overwrite: true, //是否覆盖已有图片， true 是
						quality: 100 //图片质量，1-100 默认50， 100质量最高
					}, function(e) { 
			            //重点就是这里， 需要将bitmap保存的临时路径再使用saveImageToPhotosAlbum进行保存
						uni.saveImageToPhotosAlbum({
							filePath: e.target,
							success: function () {
								uni.showToast({
									title: "二维码保存成功",
									icon: "none",
									position:'center'
								});
							}
						});
					}, function(e) { 
						uni.showToast({
							title: "二维码保存失败",
							icon: "none",
							position:'center'
						});
					}); 
				}, function(e) { 
					uni.showToast({
						title: "图片保存失败",
						icon: "none",
						position:'center'
					});
				});
			},
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
	}
	.h2 {
		color: #000;
		font-weight: 600;
		font-size: 34rpx;
		padding: 80rpx 30rpx 50rpx;
	}
	.codeDiv {
		width: 350rpx;
		height: 350rpx;
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
