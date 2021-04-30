<template>
	<view class="page">
		<view class="banner relative">
			<view class="status"></view>
			<view class="header relative">
				<image src="../../static/images/common/back-white.png" style="width: 20rpx;height: 32rpx;left: 30rpx;" 
				class="absolute-middle" @click="$tools.back(1)"></image>
				<view class="title text-center">邀请返佣</view>
			</view>
			<view class="inner absolute-center">
				<view class="inner_li flex-between align-center borderBottom">
					<view class="name" style="width: 200rpx;">邀请链接</view>
					<view class="name flex align-center ">
						<view style="width: 450rpx;" class="ellipsis">{{ url + '/index.html' + '?code=' + obj.invitationCode }}</view>
						<image src="../../static/images/app/copy.png" style="width: 28rpx;height: 28rpx;margin-left: 15rpx;" 
						@click="copy(url + '/index.html' + '?code=' + obj.invitationCode)">
						</image>
					</view>
				</view>
				<view class="inner_li flex-between align-center borderBottom">
					<view class="name">专属邀请码</view>
					<view class="name flex align-center">{{obj.invitationCode}}<image src="../../static/images/app/copy.png" style="width: 28rpx;height: 28rpx;margin-left: 15rpx;" @click="copy(obj.invitationCode)"></image></view>
				</view>
				<view class="inner_li flex-between align-center"><text>邀请新用户，有机会获得返佣奖励，邀请越多，返佣越多，赶快行动起来吧！</text></view>
			</view>
		</view>
		
		<view class="myAward">
			<view class="th borderBottom margin0">我的收益</view>
			<view class="td padding-column30 flex-between flex-column">
				<view class="flex">
					<view style="width: 33.333%;color: font-size: 28px;font-weight: bold;color: #FFAB58;" 
					class="text-center">{{obj.person}}</view>
					<view style="width: 33.333%;color: font-size: 28px;font-weight: bold;color: #FFAB58;" 
					class="text-center">{{obj.buy_number}}</view>
					<view style="width: 33.333%;color: font-size: 28px;font-weight: bold;color: #FFAB58;" 
					class="text-center">{{obj.reward}}</view>
				</view>
				<view class="flex">
					<view style="width: 33.333%;color: font-size: 28px;font-weight: bold;color: #999;" class="text-center">邀请人数</view>
					<view style="width: 33.333%;color: font-size: 28px;font-weight: bold;color: #999;" class="text-center">好友购买台数</view>
					<view style="width: 33.333%;color: font-size: 28px;font-weight: bold;color: #999;" class="text-center">奖励金额(USDT）</view>
				</view>
			</view>
		</view>
		
		<view class="box margin40-0">
			<view class="th borderBottom margin0">奖励规则</view>
			<view class="h2">基础规则</view>
			<view class="text">1.享受直接推广与间接推广两级奖励；</view>
			<view class="text">2.需注册并完成一级实名认证，才可推广；</view>
			<view class="text">3.邀请关系有效期终身；</view>
			<view class="text">4.好友通过您的邀请进行注册并实名认证后，单笔购买额≥1000元且订单未退款视为有效推荐。</view>
			<view class="h2">推广奖励</view>
			<view class="list margin0">
				<view class="cell1 flex text-center">
					<view class="cell_li">平台用户</view>
					<view class="cell_li color">推广角色</view>
					<view class="cell_li color">VIP1</view>
					<view class="cell_li color">VIP2</view>
					<view class="cell_li color">VIP3</view>
				</view>
				
				<view class="cell2 flex text-center" style="border-right: none;">
					<view class="cell_li">推广条件</view>
					<view class="cell_li">
						<view class="li">直接推广数</view>
						<view class="li">间接推广数</view>
						<view class="li" style="border-bottom: none;">总推广业绩</view>
					</view>
					<view class="cell_li">
						<view class="li">10人以内</view>
						<view class="li">50人以内</view>
						<view class="li" style="border-bottom: none;">10万以内</view>
					</view>
					<view class="cell_li">
						<view class="li">10-49人</view>
						<view class="li">50-299人</view>
						<view class="li" style="border-bottom: none;">11万-50万</view>
					</view>
					<view class="cell_li" style="border-right: none;">
						<view class="li" >50人以上</view>
						<view class="li">300人以上</view>
						<view class="li" style="border-bottom: none;">51万以上</view>
					</view>
				</view>
				
				<view class="cell1 flex text-center">
					<view class="cell_li" style="border-bottom: none;">业绩</view>
					<view class="cell_li">直接推广</view>
					<view class="cell_li">2%</view>
					<view class="cell_li">3%</view>
					<view class="cell_li">4%</view>
				</view>
				<view class="cell1 flex text-center">
					<view class="cell_li" style="border-bottom: none;">返点</view>
					<view class="cell_li">间接推广</view>
					<view class="cell_li">0.50%</view>
					<view class="cell_li">1%</view>
					<view class="cell_li">1.50%</view>
				</view>	
			</view>
			<view class="h2">返佣到账规则</view>
			<view class="text">1.用户订单生效一周后，核算并结算推广奖励。</view>
			<view class="text">2.奖励结算到账后，可立即提现或使用。</view>
			<view class="text">备注：以上规则如有调整，请以灰度云矿最新的规则为准，活动最终解释权归灰度云矿所有，请持续留意灰度云矿官方公告。</view>
		</view>
		
		<view class="btn text-center fixed" @click="pop()">专属海报</view>
		
		
		<view class="mask" v-if="show">
			<view class="content fixed" style="z-index: 1004;">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" @change="change">
				    <swiper-item v-for="(item,index) in imgs.length" :key="index">
						<!-- <image :src="item" style="width: 100%;height: 100%;"></image> -->
						<view class="canvas">
							<canvas :style="{ width: cansWidth + 'px', height: cansHeight + 'px' }" 
							:canvas-id="'canvas'+ index"></canvas>
						</view>
				    </swiper-item>
				</swiper>
			</view>	
			<view class="popBot fixed">
				<view class="popTop flex-between align-center">
					<view class="share_li">
						<image src="../../static/images/app/pyq.png" mode=""></image>
					</view>
					<view class="share_li" @click="shareWx()">
						<image src="../../static/images/app/wx.png" mode=""></image>
					</view>
					<view class="share_li">
						<image src="../../static/images/app/qq.png" mode=""></image>
					</view>
					<view class="share_li" @click="saveCans()">
						<image src="../../static/images/app/keep.png" mode=""></image>
					</view>
				</view>
				<view class="cancle text-center" @click="show = false">取消</view>
			</view>	
		</view>			
	</view>
</template>

<script>
	import webUrl from '../../common/url.js'
	import QR from '@/common/wxqrcode.js'
	export default {
        data() {
            return {
				show:false,
				indicatorDots:true,
				autoplay:false,
				imgs:[
					'../../static/images/app/poster3.png',
					'../../static/images/app/poster4.png',
					'../../static/images/app/poster5.png',
				],
				inviteLink:'../../static/images/app/inviteLink1.png',
				current:0,
				obj:{
					person:0,
					buy_number:0,
					reward:0
				},
				cansWidth: 325, //海报宽度
				cansHeight: 600,
				url:webUrl.webUrl,
            }
        },
		// computed() {
		// 	uni.getSystemInfo({
		// 	    success: function (res) {
		// 	        console.log(res.screenWidth);
		// 	        console.log(res.screenHeight);
		// 			let w = res.windowWidth/750
		// 			let h = res.windowHeight/750
		// 			console.log(w+'-------'+h)
		// 			this.cansWidth = 650*Number(w)
		// 			this.cansHeight = 1200*Number(h)
		// 			console.log(this.cansWidth+'-------'+this.cansHeight)
		// 	    }
		// 	});
		// },
        onShow() {
			this.init()
        },
        methods: {
			pop(){
				this.show = true;
				setTimeout(()=>{
					this.selseimg()
				},200)
				
			},
			selseimg(e) { //绘制海报
				uni.showLoading({
					title:'海报生成中...'
				})
				let that = this;
				
				that.imgs.forEach((item,index)=>{
					const shareUrl = `${that.url}/index.html?code=${that.obj.invitationCode}`;
					const QRCODE = QR.createQrCodeImg(shareUrl, {
						size: parseInt(100) //二维码大小
					})
					const context = uni.createCanvasContext('canvas'+ index)
					setTimeout(function() { //定时器，海报方法不能立即执行，等页面渲染完成
						context.drawImage(that.imgs[index],0, 0, 325, 600) //个人信息背景	
						context.drawImage(QRCODE, 248, 516, 66, 66) //二维码图片
		
						// context.setFillStyle('#fff')
						// context.setFontSize(14)
						// context.fillText("邀请码:" + that.obj.invitationCode, 120, 150)
						// context.fill()
		
						context.save()
						context.beginPath()
						context.arc(44, 350, 25, 0, 2 * Math.PI)
						context.clip()
						context.restore()
						context.draw()
					}, 1000);	
				})	
				setTimeout(()=>{
					uni.hideLoading()
				},1100)
			},
			
			
			change(e){
				this.current = e.target.current;
			},
			
			init(){
				this.$Ajax('/register/invitation',{
					userId:uni.getStorageSync('hdUserInfo').userid
				},(res)=>{
					console.log(res)
					this.obj = res.data;
					console.log(this.obj)
				})
			},
			copy(val){
				this.$tools.copy(val)
			},
			
			shareWx(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 2,
				    imageUrl: this.imgs[this.current],
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			
			saveCans(e) { //保存海报
				let that = this;
				uni.showLoading({
					title: '保存中'
				});
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
					canvasId: 'canvas' + this.current,
					success: function(res) {
						uni.hideLoading()
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function(res) {
								uni.showToast({
									title: '保存相册成功'
								})
								this.showPoster = false
							},
							fail(res) {
								if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
									uni.showModal({
										title: '您需要授权相册权限',
										success(res) {
											if (res.confirm) {
												uni.openSetting({
													success(res) {
													},
													fail(res) {
														console.log(res)
													}
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
	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(0,0,0,0.5);
		z-index: 99999;
		left: 0;
		top: 0;
		.popBot {
			width: 750rpx;
			height: 240rpx;
			background-color: #fff;
			bottom: 0;
			left: 0;
			z-index: 1099;
			.popTop {
				height: 160rpx;
				background: #F4F4F4;
				padding: 0 80rpx;
				.share_li {
					width: 80rpx;
					height: 80rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			.cancle {
				font-size: 30rpx;
				line-height: 80rpx;
				font-weight: 500;
				color: #000000;
			}
		}
		
		.content {
			width: 325px;
			height: 600px;
			left: 50%;
			transform: translate(-50%);
			bottom: 240rpx;
			z-index: 999;
			.swiper {
				width: 325px;
				height: 600px;
				.swiper_item {
					width: 325px;
					height: 600px;
					image {
						width: 100%;
						height: 100%;
					}
				}
				
			}
		}	
			
	}
	
	.banner {
		width: 750rpx;
		height: 700rpx;
		background: url('../../static/images/app/inviteBnaaer.png') no-repeat;
		background-size: 100% 100%;
		.header {
			width: 750rpx;
			height: 92rpx;
			.title {
				font-size: 36rpx;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 92rpx;
			}
		}
		.inner {
			width: 690rpx;
			height: 270rpx;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 16rpx 0px rgba(0, 0, 0, 0.05);
			border-radius: 10rpx;
			bottom: -90rpx;
			padding: 0 30rpx;
			.inner_li {
				height: 90rpx;
				text {
					color: rgba(0,0,0,0.5);
					font-size: 20rpx;
					line-height: 38rpx;
				}
			}
		}
	}
	
	.myAward {
		width: 690rpx;
		height: 240rpx;
		background: #FFFFFF;
		box-shadow: 0px 4rpx 16rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 10rpx;
		margin: 140rpx auto 30rpx;
		.th {
			width: 630rpx;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 30rpx;
			color: #000000;
		}
		.td {
			width: 100%;
			height: 150rpx;
		}
	}

	.box {
		width: 690rpx;
		background: #FFFFFF;
		box-shadow: 0px 4rpx 16rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 10rpx;
		padding-bottom: 110rpx;
		.th {
			width: 630rpx;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 30rpx;
			color: #000000;
		}
		.h2 {
			color: #000;
			font-size: 28rpx;
			font-weight: 600;
			padding: 20rpx 30rpx;
		}
		.text {
			font-size: 26rpx;
			color: #666;
			padding: 0 30rpx;
		}
		.list {
			width: 630rpx;
			height: 300rpx;
			border: 1rpx solid #999;
			.cell1 {
				width: 100%;
				height: 50rpx;
				.cell_li {
					width: 25%;
					line-height: 50rpx;
					color: #000;
					font-size: 24rpx;
					border-bottom: 1rpx solid #999;
					border-right: 1rpx solid #999;
				}
				.cell_li:nth-child(5){
					border-right: 0;
				}
				.color {
					background: #B8CCE4;
				}
			}
		
			.cell2 {
				width: 100%;
				height: 150rpx;
				border-bottom: 1rpx solid #999;
				border-right: 1rpx solid #999;
				.cell_li {
					width: 25%;
					line-height: 50rpx;
					color: #000;
					font-size: 24rpx;
					border-right: 1rpx solid #999;
					.li {
						color: #000;
						font-size: 24rpx;
						border-bottom: 1rpx solid #999;
					}
				}
				.cell_li:nth-child(5){
					border-right: 0;
				}
			}
		}
	}

	.btn {
		width: 750rpx;
		height: 96rpx;
		line-height: 96rpx;
		background: #F16C00;
		left: 0;
		bottom: 0;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

</style>