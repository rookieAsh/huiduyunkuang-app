<template>
	<view class="page">
		<view class="canvas margin0">
			<canvas :style="{ width: cansWidth + 'px', height: cansHeight + 'px' }" canvas-id="firstCanvas"></canvas>
		</view>
		<view class="opBox flex-between align-center margin30-0">
			<view class="box relative" @longpress="$u.toast('111')">
				<u-icon name="weixin-fill " class="absolute-auto" color="#07C160" size="50"></u-icon>
			</view>
			<view class="box relative">
				<u-icon name="moments " class="absolute-auto" color="#07C160" size="50"></u-icon>
			</view>
			<view class="box relative" @click="saveCans()">
				<u-icon name="../../static/images/app/keep_icon.png " class="absolute-auto" color="#07C160" size="50"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import QR from '../../common/wxqrcode.js'
	export default {
        data() {
            return {
				img:'../../static/images/app/poster1.png',
				cansWidth: 300, //海报宽度
				cansHeight: 520, //海报高度
            }
        },
		
        onShow() {
			this.selseimg()
        },
        methods: {

			selseimg(e) { //绘制海报
			let that = this;
				// if (that.userdata.text.length > 3) { //昵称太长加省略号
				// 	that.userdata.text = that.userdata.text.slice(0, 3) + "..."
				// }
				uni.showLoading({
					title: '生成海报中'
				});
				const shareUrl = `www.baidu.com`
					const QRCODE = QR.createQrCodeImg(shareUrl, {
					size: parseInt(100) //二维码大小
				})
				const context = uni.createCanvasContext('firstCanvas')
				setTimeout(function() { //定时器，海报方法不能立即执行，等页面渲染完成
					context.drawImage(that.img, 0, 0, 300, 520)  //个人信息背景(left,top,width,height)
					context.drawImage(QRCODE,60, 400, 60, 60) //二维码图片
			
					context.setFillStyle('#F2DCD8')
					context.setFontSize(12)
					context.fillText('打开红包页面可以用', 140, 412)
					context.fillText('打折买币就挖矿！', 140, 432)
					context.fill()
					
					context.setFillStyle('#DB9B8C')
					context.setFontSize(10)
					context.fillText('扫描识别二维码抢红包', 140, 458)
					context.fill()
			
					context.save()
					context.beginPath()
					context.arc(44, 350, 25, 0, 2 * Math.PI)
					context.clip()
					context.restore()
					context.draw()
					uni.hideLoading();
				}, 1000);
			
			},
			saveCans(e) { //保存海报
				let that = this;
				uni.showLoading({title: '保存海报中'});
				let tempRatio = 1.5;
				// #ifdef H5 || APP-PLUS
				tempRatio = 1;
				// #endif
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: that.cansWidth * tempRatio,
					height: that.cansHeight * tempRatio,
					destWidth: that.cansWidth * tempRatio * 2,
					destHeight: that.cansHeight * tempRatio * 2,
					canvasId: 'firstCanvas',
					success: function(res) {
						uni.hideLoading()
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function(red) {
								uni.showToast({title: '保存相册成功'})	
							},
							fail(res) {
								if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
									uni.showModal({
										title: '您需要授权相册权限',
										success(res) {
											if (res.confirm) {
												uni.openSetting({
													success(res) {},
													fail(res) {console.log(res)}
												})
											}
										}
									})
								}
							}
						});
					},
					fail(res) {
						uni.hideLoading()
					}
				}, this)
			},
        }
    }
</script>

<style lang="less" scoped>
.page {
	width: 100%;
	height: 100%;
	padding-top: 30rpx;
	.canvas {
		width: 300px;
		height: 1040rpx;
	}
	.opBox {
		width: 480rpx;
		height: 120rpx;
		background-color: rgba(255,255,255,1);
		.box {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 30rpx;
			background-color: #FFF8F0;
		}
	}
}
	
</style>