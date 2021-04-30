<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="banner margin0 borderBottom flex-column padding-column30 flex-between">
			<view class="flex-between">
				<view class="name">矿机名称</view>
				<view class="val">{{name}}</view>
			</view>
			<view class="flex-between">
				<view class="name">电费天数</view>
				<view class="val">{{days || 90}}天</view>
			</view>
			<view class="flex-between">
				<view class="name">金额</view>
				<view class="val" v-if="active==1">{{millCost/coinPrice}} USDT</view>
				<view class="val" v-else>￥{{cost}}</view>
			</view>
		</view>
		
		<view class="h2">支付方式</view>
		
		<view class="selects flex">
			<view class="select flex align-center">
				<image src="../../static/images/app/usdt.png" style="width: 28rpx;height: 28rpx;"></image>
				<text :class="{active:active==1}" @click="select(1)">USDT支付</text>
			</view>
			<view class="select flex align-center">
				<image src="../../static/images/app/card.png" style="width: 28rpx;height: 24rpx;"></image>
				<text :class="{active:active==2}" @click="select(2)">银行卡支付</text>
			</view>
		</view>
		
		<view class="Div margin30-0 flex-between align-center" v-if="active==1">
			<view class="using">账户余额：{{using}}USDT</view>
			<view class="charge text-center" @click="$tools.jump('../wallet/charge','USDT')">充值</view>
		</view>
		
		
		<view class="h2" v-if="active==2">转账信息</view>
		<view class="banner margin0 borderBottom flex-column padding-column30 flex-between" v-if="active==2">
			<view class="flex-between">
				<view class="name">账户名</view>
				<view class="val">杭州爱挖云科技有限公司</view>
			</view>
			<view class="flex-between">
				<view class="name">开户行</view>
				<view class="val">宁波银行杭州海创园小微企业专营支行</view>
			</view>
			<view class="flex-between">
				<view class="name">对公账号</view>
				<view class="val flex align-center">71230122000139088 
				<image src="../../static/images/app/copy.png" 
				style="width: 24rpx;height: 24rpx;margin-left: 15rpx;" @click="copy()"></image>
				</view>
			</view>
		</view>
		<view class="h2" v-if="active==2">支付信息</view>
		<view class="banner margin0 borderBottom flex-column padding-column30 flex-between" v-if="active==2">
			<view class="flex-between">
				<view class="name">姓名</view>
				<input type="text" placeholder="请输入您的真实姓名" placeholder-class="placeholderClass" v-model="realName"/>
			</view>
			<view class="flex-between">
				<view class="name">卡号</view>
				<input type="text" placeholder="请输入您的银行卡卡号" placeholder-class="placeholderClass" v-model="bankNumber"/>
			</view>
			<view class="flex-between">
				<view class="name">开户行</view> 
				<input type="text" placeholder="请输入您的银行卡开户行" placeholder-class="placeholderClass" v-model="bankName"/>
			</view>
		</view>
		
		
		<view class="btn text-center margin30-0" v-if="active==2" @click="pop()">上传支付凭证截图</view>
		
		<view class="btn text-center margin200-0" @click="showPwd = true" v-if="active==1">确认支付</view>
		
		<!-- 输入支付密码弹框 -->
		<u-popup  v-model="showPwd" :mask="mask" :mode="mode" border-radius="0">
			<view class="popPwd">
				<view class="popTitle text-center relative">
					请输入支付密码
					<image src="../../static/images/common/del.png" style="width: 28rpx;height: 28rpx;right: 30rpx;" 
					class="absolute-middle" @click="showPwd = false"></image>
				</view>
				<view class="placeholder80"></view>
				<u-message-input :mode="mode1" :maxlength="maxlength" :value="value"
				:breathe="breathe" :bold="bold" @finish="finish" :dot-fill="dotFill" :active-color="activeColor" :focus="focus"></u-message-input>
			</view>
		</u-popup>
		
		
		<u-popup v-model="show" :mask="mask" :mode="mode2" border-radius="10">
			<view class="popBot padding30">
				<view class="cnt margin0 relative">
					<view class="pic absolute-auto" @click="upload()">
						<image :src="image" mode=""></image>
					</view>
				</view>
				<view class="btn text-center" @click="submit()">确认</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import webUrl from '../../common/url.js'
	export default {
        data() {
            return {
				active:1,
				bClolr:'#BBBBBB',
				uColor:'#FF891C',
				mode1: 'box',
				maxlength: 6,
				value: '', 
				bold: true,
				breathe: true,
				dotFill: true,
				activeColor:'#FF891C',
				focus:true,
				showPwd:false,
				mask:true,
				mode:'bottom',
				mode2:'center',
				addressKey:'',
				quantity:'',
				productId:'',
				obj:{},
				cost:'',
				millCost:'',
				show:false,
				image:'../../static/images/app/opload.png',
				days:'',
				using:'',
				coinPrice:'',
				mallAdd:'',
				name:'',
				bankNumber:'',
				bankName:'',
				url:webUrl.webUrl,
				realName:''
            }
        },
		onLoad(opt){
			this.cost = opt.cost
			this.days = opt.days
			this.name = opt.name
			this.mallAdd = opt.mallAdd
			this.productId = opt.id
			this.quantity = opt.n
			this.millCost = opt.millCost
		},
        onShow() {
			this.$Ajax('/custody/selectWellatByCoinFlash',{
				address:uni.getStorageSync('hdUserInfo').address,
			},(res)=>{
				res.data.forEach((item)=>{
					if(item.coin == 'USDT') {
						this.addressKey = item.addressKey
						this.using = item.balance
						this.coinPrice = item.CNY;
					}	
				})
			})
        },
        methods: {
			pop(){
				if(!this.realName) {
					return this.$u.toast('请输入真实姓名')
				}
				if(!this.bankNumber) {
					return this.$u.toast('请输入您的银行卡卡号')
				}
				if(!this.bankName) {
					return this.$u.toast('请输入您的银行卡开户行')
				}
				this.show = true
			},
			upload(){
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.image = res.tempFilePaths[0];
					},
					fail: function() {
						console.log("上传图片接口调用失败");
						return;
					}
				});	
			},
			copy(){
				this.$tools.copy('71230122000139088')
			},
			select(index){
				this.active = index;
			},
			// 银行卡支付 上传凭证
			submit(){
				
				if(this.image == '../../static/images/app/opload.png') {
					return this.$u.toast('请上传凭证')
				}
				uni.showLoading({
					title: '上传中...',
				})
				let that = this;
				var token = uni.getStorageSync('token');
				var files=[];
				files.push({'name':'file','uri':that.image});
				uni.uploadFile({
					url: that.url + '/MartianOrePool/payment', //仅为示例，非真实的接口地址
					// header: {
					// 	"Content-Type": "multipart/form-data",
					// 	"token": token
					// },
					files:files,
					formData: {
						'token': token,
						address:uni.getStorageSync('hdUserInfo').address,
						type:that.active,   // 1 usdt支付 2 银行卡支付
						number:that.quantity,
						productId:that.productId,
						money: that.cost,
						backNumber:that.bankNumber,
						name:that.realName,
						backName:that.bankName,
						file:that.image
					},
					success: (res) => {
						uni.hideLoading();
						var data=JSON.parse(res.data);
						if(data.state==0){
							this.$u.toast("凭证上传成功，等待系统审核...");
							this.show = false
						}	
					},
					fail(err) {	
						console.log(err)
						uni.hideLoading();
					}
				})	
			},
			
			// USDT支付
			finish(e){
				this.$Ajax('/MartianOrePool/payment',{
					address:uni.getStorageSync('hdUserInfo').address,
					addressKey:this.addressKey,
					jypassword:e,
					type:this.active,   // 1 usdt支付 2 银行卡支付
					number:this.quantity,
					productId:this.productId,
					money: this.cost/this.coinPrice,
					backNumber:this.bankNumber,
					name:this.realName,
					backName:this.bankName,
					toAddressKey:this.mallAdd,	
				},(res)=>{
					console.log(res)
					if(res.state==0){
						uni.removeStorageSync('data')
						this.$u.toast('购买成功');
						this.showPwd = false;
						setTimeout(()=>{
							this.$tools.back(2);
						},1000)
					}else{
						this.$u.toast(res.message)
						this.showPwd = false
					}
				})
			}
        }
    }
</script>

<style lang="less" scoped>
	.banner {
		width: 690rpx;
		height: 220rpx;
		.name {
			color: #999;
			font-size: 28rpx;
		}
		.val {
			color: #000;
			font-size: 28rpx;
			font-weight: 600;
		}
		input {
			color:#000;
			font-size: 28rpx;
			text-align: right;
		}
	}
	
	.h2 {
		font-size: 30rpx;
		padding: 30rpx;
		font-weight: 500;
		color: #000000;
		font-weight: 600;
	}
	
	.selects {
		width: 100%;
		height: 46rpx;
		padding-left: 30rpx;
		margin-bottom: 30rpx;
		.select {
			width: 230rpx;
			line-height: 46rpx;
			background: #FFFAF6;
			border-radius: 5rpx;
			margin-right: 30rpx;
			justify-content: center;
			text {
				color: #999;
				padding-left: 10rpx;
				font-size: 24rpx;
			}
			.active {
				color: #000;
				font-weight: 600;
			}
		}
	}
	
	.Div {
		width: 690rpx;
		height: 80rpx;
		background: #F5F5F5;
		border-radius: 8rpx;
		padding: 0 30rpx;
		.using {
			color: #999;
			font-size: 26rpx;
		}
		.charge {
			width: 88rpx;
			height: 40rpx;
			background: linear-gradient(100deg, #FF7503, #FFBB80);
			box-shadow: 0px 7rpx 8rpx 1rpx rgba(65, 79, 98, 0.08);
			color: #fff;
			font-size: 24rpx;
			line-height: 40rpx;
			border-radius: 8rpx;
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

	.popPwd {
		.popTitle {
			font-size: 32rpx;
			font-weight: 700;
			color: #000000;
			padding: 50rpx 0;
		}
		padding-bottom: 80rpx;
	}

	.popBot {
		width: 600rpx;
		background: #FFFFFF;
		.cnt {
			width: 430rpx;
			height: 280rpx;
			.pic {
				width: 230rpx;
				height: 200rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.btn {
			width: 228rpx;
			height: 56rpx;
			line-height: 56rpx;
			background: #EDEDED;
			border-radius: 10rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #000000;
			margin: 30rpx auto 0;
		}
	}

</style>
