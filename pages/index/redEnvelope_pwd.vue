<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="item flex-between align-center margin0 padding-row30 borderBottom" @click="showCoin = true">
			<view class="name">币种</view>
			<view class="coin flex align-center">
				<image :src="logo" style="width: 32rpx;height: 32rpx;"></image>
				<text>{{coin}}</text>
				<image src="../../static/images/common/arrow_right.png" style="width: 16rpx;height: 24rpx;"></image>
			</view>
		</view>
		<view class="item flex-between align-center margin0 padding-row30 borderBottom">
			<view class="flex align-center">
				<view class="dot text-center ">拼</view>
				<view class="name">总金额</view>
			</view>
			<input type="number" placeholder="请输入红包金额" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="money"/>
			<text class="num">{{coin}}</text>
		</view>
		<view class="item flex-between align-center margin0 padding-row30">
			<view class="flex align-center">
				<view class="name">≈</view>
			</view>
			<text class="num">{{rmb |number(4)}} CNY</text>
		</view>
		
		<view class="tip" v-if="redType==1">每个人领到的金额随机，<text @click="redType=2">改为等额红包</text></view>
		<view class="tip" v-else>每个人领到的金额一样，<text @click="redType=1">改为随机红包</text></view>
		
		<view class="item flex-between align-center margin30-0 padding-row30">
			<view class="flex align-center">
				<view class="name">红包个数</view>
			</view>
			<input type="number" placeholder="请输入红包个数" placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" v-model="quantity"/>
			<text class="num">个</text>
		</view>
		<!-- <view class="item flex-between align-center margin30-0 padding-row30">
			<input type="text" placeholder="祝福语：一币一别墅" 
			placeholder-style="color:rgba(0,0,0,0.5);font-size:30rpx;" style="text-align: left;"/>
		</view> -->
		<view class="tip text-center  margin120-0">24小时未领取的红包，将自动返回到您的账户</view>
		<view class="btn text-center margin0" @click="bagRed()">塞钱进红包</view>
		
		<!-- 币种选择弹框 -->
		<u-popup  v-model="showCoin" :mask="mask" :mode="mode" border-radius="0">
			<view class="popBot">
				<view class="title flex-between align-center padding-row30">
					<text class="coin">选择充币币种</text>
					<text @click="showCoin = false">取消</text>
				</view>
				<view class="itemLi padding-row30 text-center flex-between align-center" 
				v-for="(item,index) in coinList" :key="index"
				@click="selectCoin(item,index)">
					<view class="flex align-center" >
						<image :src="item.logo" style="width: 38rpx;height: 38rpx;margin-right: 20rpx;"></image>
						<text :class="{active:current===index}">{{item.coin}}</text>
					</view>
					<u-icon name="checkbox-mark" color="#FF891C" size="40" v-if="current===index"></u-icon>	
				</view>
			</view>
		</u-popup>
		
		<!-- 设置暗号弹框 -->
		<u-popup  v-model="showPwd" :mask="mask" :mode="mode2" border-radius="0">
			<view class="popPwd">
				<view class="title text-center">设置暗号</view>
				<view class="inpDiv flex align-center margin80-0">
					<input type="text" placeholder="2-14个字符，不支持符号" placeholder-style="color:rgba(0,0,0,0.5);font-size:28rpx;" v-model="cipher">
				</view>
				<div class="send text-center margin30-0" @click="send()">发送红包</div>
			</view>
		</u-popup>
		
		<!-- 分享弹框 -->
		<u-popup  v-model="showShare" :mask="mask" :mode="mode2" border-radius="10">
			<view class="popShare">
				<view class="popTitle text-center">
					微信分享
				</view>
				<view class="tip1 text-center">由于微信分享限制</view>
				<view class="tip1 text-center">请到微信上传图片进行分享</view>
				<view class="btn text-center margin50-0" @click="saveCans()">保存至相册</view>
			</view>
		</u-popup>
		
		<!-- 输入支付密码弹框 -->
		<u-popup  v-model="showP" :mask="mask" :mode="mode" border-radius="0">
			<view class="popP">
				<view class="popTitle text-center relative">
					请输入支付密码
					<image src="../../static/images/common/del.png" style="width: 28rpx;height: 28rpx;right: 30rpx;" 
					class="absolute-middle" @click="showPwd = false"></image>
				</view>
				<view class="placeholder80"></view>
				<u-message-input :mode="mode1" :maxlength="maxlength" :value="value"
				:breathe="breathe" :bold="bold" @finish="finish" :dot-fill="dotFill" 
				:active-color="activeColor" :focus="focus"></u-message-input>
			</view>
		</u-popup>
		
		<!-- 海报弹框 -->
		<u-popup  v-model="showPoster" :mask="mask" :mode="mode2" border-radius="10">
			<view class="showPoster">
				<view class="canvas" @longpress="saveCans()">
					<canvas :style="{ width: cansWidth + 'px', height: cansHeight + 'px' }" 
					canvas-id="firstCanvas"></canvas>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import webUrl from '../../common/url.js'
	import QR from '@/common/wxqrcode.js'
	export default {
        data() {
            return {
				showCoin:false,
				showPwd:false,
				showShare:false,
				showPoster:false,
				showP:false,
				mask:true,
				mode:'bottom',
				mode2:'center',
				coin:'',
				redType:1,  // 红包规则（1 普通红包 2拼手气红包）
				coinList:[],
				
				mode1: 'box',
				maxlength: 6,
				value: '', 
				bold: true,
				breathe: true,
				dotFill: true,
				activeColor:'#FF891C',
				focus:true,
				
				quantity:'',
				money:'',
				rate:'',
				rmb:0.0000,
				current:0,
				cipher:'',
				
				cansWidth: 280, //海报宽度
				cansHeight: 500,
				img:'../../static/images/app/poster2.png',
				text:'',
				logo:'',
				tradePwd:'',
				url:webUrl.webUrl,
				inviteCode:''
            }
        },
        onShow() {
			this.getList()
			this.selseimg()
			this.inviteCode = uni.getStorageSync('hdUserInfo').invitationcode;
        },
		watch:{
			money(){
				this.rmb = this.money * this.rate
			},
			rate(){
				this.rmb = this.money * this.rate
			}
		},
        methods: {
			selseimg(e) { //绘制海报
				let that = this;
				
				
				const shareUrl = `${this.url}/index.html?code=${this.inviteCode}`
				
				const QRCODE = QR.createQrCodeImg(shareUrl, {
					size: parseInt(100) //二维码大小
				})
				const context = uni.createCanvasContext('firstCanvas')
				setTimeout(function() { //定时器，海报方法不能立即执行，等页面渲染完成
					context.drawImage(that.img,0, 0, 280, 500) //个人信息背景	
					context.drawImage(QRCODE, 40, 415, 50, 50) //二维码图片
					
					context.setFillStyle('#FECB95')
					context.setFontSize(10)
					context.fillText('打开灰度红包输入下方暗号抢红包', 64, 292)
					context.fill()
					
					context.setFillStyle('#C6502A')
					context.setFontSize(14)
					context.fillText(that.cipher, 115, 320)
					context.fill()
			
					// context.setFillStyle('#fff')
					// context.setFontSize(10)
					// context.fillText('扫描识别二维码抢红包', 128, 417)
					// context.fill()
					
					// context.setFillStyle('#fff')
					// context.setFontSize(10)
					// context.fillText('长按保存到相册', 128, 432)
					// context.fill()
			
					context.save()
					context.beginPath()
					context.arc(44, 350, 25, 0, 2 * Math.PI)
					context.clip()
					context.restore()
					context.draw()
				}, 1000);
			
			},
			// 获取币种
			getList(){
				this.$Ajax("/rate/checkCoin",{},(res)=>{
					this.coinList = res.data;
					this.coin = res.data[0].coin;
					this.rate = res.data[0].exchangeRate;
					this.logo = res.data[0].logo;
				})
			},
			// 选择币种
			selectCoin(item,index){
				this.coin = item.coin;
				this.rate = item.exchangeRate;
				this.showCoin = false;
				this.logo = item.logo;
				this.current = index;
			},
			bagRed(){
				if(!this.money||this.money===0){
					return this.$u.toast("请输入红包金额")
				}
				if(!this.quantity||this.quantity===0){
					return this.$u.toast("请输入红包数量")
				}
				this.$Ajax('/register/checkJymimaZt',{
					userId:uni.getStorageSync('hdUserInfo').userid
				},(res)=>{
					console.log(res)
					if(res.data==0){
						this.$u.toast('请先设置交易密码')
						setTimeout(()=>{
							this.$tools.jump('../login/setTradePwd')
							return
						},1000)
					}else{
						this.showP = true;
					}
				})	
			},
			finish(e){
				this.showPwd = true
				this.showP = false
				this.tradePwd = e;
			},
			send(){
				if(!this.cipher) {
					return this.$u.toast("请输入暗号")
				}
				this.$Ajax("/rate/sendRedPacket",{
					coin:this.coin,
					sendMoney:this.money,
					address:uni.getStorageSync('hdUserInfo').address,
					jypassword:this.tradePwd,
					type:2,
					cipher:this.cipher,
					number:this.quantity,
					typeMoney:this.redType,
					addressUid:uni.getStorageSync('hdUserInfo').addressUid
				},(res)=>{
					if(res.state==0){
						this.selseimg()
						this.showPwd = false;
						this.showPoster = true;
					}else{
						this.$u.toast(res.message)
					}
				})
			},
			saveCans(e) { //保存海报
				let that = this;
				uni.showLoading({
					title: '保存海报中'
				});
				console.log('保存');
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
	.showPoster {
		width: 280px;
		height: 500px;
	}
	.popShare {
		width: 600rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		padding-bottom: 50rpx;
		.popTitle {
			font-size: 32rpx;
			font-weight: 700;
			color: #000000;
			padding: 30rpx 0;
		}
		.tip1 {
			color: #333;
			font-size: 24rpx;
		}
		.btn {
			width: 395rpx;
			height: 70rpx;
			background: #55C18D;
			border-radius: 30rpx;
			line-height: 70rpx;
			font-weight: 500;
		}
	}
	
	.popP {
		.popTitle {
			font-size: 32rpx;
			font-weight: 700;
			color: #000000;
			padding: 30rpx 0;
		}
		padding-bottom: 80rpx;
	}
	
	.popPwd {
		width: 560rpx;
		height: 500rpx;
		background: url("../../static/images/app/redBg.png") no-repeat;
		background-size: 100% 100%;
		.title {
			font-size: 36rpx;
			font-weight: 500;
			color: #F9DBB9;
			padding: 60rpx 0 50rpx;
		}
		.inpDiv {
			width: 422rpx;
			height: 80rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			input {
				flex: 1;
				text-align: center;
				font-size: 28rpx;
				color: #000;
			}
		}
		.send {
			width: 422rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #F9DBB9;
			border-radius: 40rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #81603D;
		}
	}
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
		.itemLi {
			width: 100%;
			height: 100rpx;
			border-top: 1rpx solid rgba(0,0,0,0.1);
			line-height: 100rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #000;
			.active {
				font-weight: 700;
			}
		}
	}
	
	.item {
		width: 690rpx;
		height: 96rpx;
		background: #FFF8F0;
		.dot {
			width: 34rpx;
			height: 34rpx;
			line-height: 34rpx;
			background: #ECBB8D;
			border-radius: 5rpx;
			color: #fff;
			font-size: 26rpx;
			margin-right: 10rpx;
		}
		.name {
			color: #000;
			font-size: 32rpx;
		}
		text {
			color: #000;
			font-size: 32rpx;
			padding: 0 20rpx;
			font-weight: 600;
		}
		.num {
			padding: 0;
		}
		input {
			flex: 1;
			color: #000;
			font-size: 30rpx;
			text-align: right;
			padding-right: 10rpx;
		}
	}
	.tip {
		font-size: 24rpx;
		color: rgba(0,0,0,0.5);
		padding: 20rpx 30rpx;
		text {
			color: #ECBB8D;
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
