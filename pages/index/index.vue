<template>
	<view class="page">
		<view class="topBox fixed">
			<view class="status"></view>
			<view class="topView margin0 relative">
				<text class="name absolute-auto">
					<image src="../../static/images/app/logo.png" style="width: 180rpx;height: 55rpx;"></image>
				</text>
				<view @click="$tools.toast('暂无消息')" class="absolute-middle" style="right: 30rpx;">
					<image src="../../static/images/app/news.png" style="width: 50rpx;height: 50rpx;"></image>
				</view>
			</view>
		</view>
		
		<view class="place"></view>
		
		<!-- 轮播图部分 -->
		<view class="banner margin10-0">
			<swiper class="swiper" :indicator-dots="indicatorDots"
			:autoplay="autoplay" :interval="interval" :duration="duration"
			:indicator-active-color="indicatorActiveColor" :indicator-color="indicatorColor"
			:circular="circular">
			    <swiper-item v-for="(item,index) in lunList" :key="item.id">
			        <image :src="item.url"></image>
			    </swiper-item>
			</swiper>
		</view>
		
		<!-- 公告部分 -->
		<view class="hint margin20-0 flex-between align-center">
			<image src="../../static/images/app/icon_hint.png" class="hintIcon"></image>
			<view class="text">
				<swiper class="swiper" :indicator-dots="false"
				:autoplay="true" :interval="interval" :duration="duration" :vertical="true"
				:circular="circular">
				    <swiper-item v-for="(item,index) in hintList" :key="item.noticeId" @click="$tools.jump('./hintDetail',item.noticeId)">
						<view class="ellipsis txt">{{item.subtitle}}</view> 
				    </swiper-item>  
				</swiper>
			</view>
			<image src="../../static/images/app/icon_list.png" class="listIcon" @click="$tools.jump('./hintList')"></image>
		</view>
		
		<!-- 首页菜单部分 -->
		<view class="menuBox flex-wrap">
			<view class="menuLi flex-between flex-column align-center" @click="$tools.jumpTo('../power/power')">
				<image src="../../static/images/app/ysl.png" mode=""></image>
				<text>云算力</text>
			</view>
			<view class="menuLi flex-between flex-column align-center" @click="goLink()">
				<image src="../../static/images/app/lhwk.png" mode=""></image>
				<text>联合挖矿</text>
			</view>
			<view class="menuLi flex-between flex-column align-center" @click="$tools.jump('./syjs')">
				<image src="../../static/images/app/jsq.png" mode=""></image>
				<text>计算器</text>
			</view>
			<view class="menuLi flex-between flex-column align-center" @click="$tools.goNavigiteTo('./shandui')">
				<image src="../../static/images/app/sd.png" mode=""></image>
				<text>闪兑</text>
			</view>
			<view class="menuLi flex-between flex-column align-center" @click="$tools.goNavigiteTo('./fhb')">
				<image src="../../static/images/app/fhb.png" mode=""></image>
				<text>发红包</text>
			</view>
			<view class="menuLi flex-between flex-column align-center" @click="$tools.goNavigiteTo('../my/invite')">
				<image src="../../static/images/app/yqhy.png" mode=""></image>
				<text>邀请好友</text>
			</view>
			<view class="menuLi flex-between flex-column align-center" @click="show = true">
				<image src="../../static/images/app/hdsq.png" mode=""></image>
				<text>灰度社区</text>
			</view>
			<view class="menuLi flex-between flex-column align-center" @click="$tools.jump('./vedioShow')">
				<image src="../../static/images/app/vedioShow.png" mode=""></image>
				<text>教程</text>
			</view>
		</view>
		
		
		<!-- 市场热销部分 -->
		<view class="titleDiv flex">
			<view class="h2">市场热销</view>
			<view class="h3">抓住牛市 挖矿红利</view>
		</view>
		
		
		
		<view class="item margin10-0 flex" v-for="(item,index) in list" :key="index" 
		@click="$tools.jump('../market/mineDetail',item.productId)">
			<view class="pic">
				<image :src="item.image" mode=""></image>
			</view>
			<view class="info flex-between flex-column">
				<view class="subTitle flex">
					<text class="coin ">{{ item.cmc_subarea }}</text>
					<text class="date ">现货开挖</text>
				</view>
				<view class="name">{{item.name}}</view>
				<!-- <view class="state flex-between">230M 现货</view> -->
				<view class="dollar">￥{{item.activity_price}}<text>￥{{item.mill_cost}}</text></view>
				<view class="flex-between align-center">
					<view class="price">{{item.production}}  <text>{{item.cmc_subarea}}/日产出</text></view>
					<!-- <view class="dollar">${{item.activity_price}}</view> -->
				</view>
			</view>
		</view>
		
		<!-- 灰度社区弹框 -->
		<u-popup  v-model="show" :mask="mask" :mode="mode" border-radius="50">
			<view class="popBot">
				<view class="popTitle text-center">有任何疑问联系官方客服</view>
				<view class="tip text-center padding-column20">扫一扫二维码，加微信</view>
				<view class="codeDiv margin20-0 relative">
					<image src="../../static/images/app/bg1.png" class="bg1 absolute"></image>
					<image src="../../static/images/app/bg2.png" class="bg2 absolute"></image>
					<image src="../../static/images/app/codeMa.jpg" class="codeMa absolute-auto"></image>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				indicatorDots:true,
				autoplay:true,
				interval:3000,
				duration:500,
				indicatorColor:"rgba(255,255,255,.5)",
				indicatorActiveColor:"#fff",
				circular:true,
				show:false,
				mask:true,
				mode:'center',
				hintList:[],
				lunList:[],
				list:[],
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
			uni.removeStorageSync('data')
			this.getHintList();
			this.getLunList();
			this.getList();
		},
		methods:{
			getHintList(){
				this.$Ajax("/notice/selectNoticeAll",{},(res)=>{
					this.hintList = res.data;
				})
			},
			getLunList(){
				this.$Ajax("/index/getBannerList",{},(res)=>{
					this.lunList = res.data;
				})
			},
			getList(){
				this.$Ajax("/MartianOrePool/selectMillAllByHost",{},(res)=>{
					this.list= res.data;
					
				})
			},
			goLink(){
				uni.setStorageSync('setFlag',1)
				uni.switchTab({
					url:"../power/power"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.topBox {
		width: 100%;
		background-color: #fff;
		height: calc(100rpx + var(--status-bar-height));
		z-index: 999;
		.topView {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			padding: 0 30rpx;
			.name {
				font-size: 40rpx;
				color: #000;
				font-weight: 700;
			}
			text {
				font-size: 30rpx;
				font-weight: 600;
				color: #000;
			}
		}
	}
	
	.place {
		width: 100%;
		height: calc(100rpx + var(--status-bar-height));;
	}
	
	.banner {
		width: 690rpx;
		height: 250rpx;
		.swiper {
			width: 690rpx;
			height: 250rpx;
			border-radius: 8rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
		}
	}
	
	.hint {
		width: 690rpx;
		height: 30rpx;
		.hintIcon {
			width: 24rpx;
			height: 28rpx;
		}
		.text {
			flex: 1;
			padding-left: 18rpx;
			padding-right: 40rpx;
			.swiper {
				height: 30rpx;
				width: 100%;
				.txt {
					font-size: 24rpx;
					font-weight: 500;
					color: #000000;
					line-height: 30rpx;
				}
			}
		}
		.listIcon {
			width: 24rpx;
			height: 24rpx;
		}
	}

	.menuBox {
		width: 690rpx;
		margin: 0rpx auto;
		.menuLi {
			width: 25%;
			height: 150rpx;
			padding: 15rpx 0;
			image {
				width: 88rpx;
				height: 88rpx;
			}
			text {
				font-size: 24rpx;
				color: #000000;
			}
		}
	}

	.titleDiv {
		width: 100%;
		height: 80rpx;
		padding: 0 30rpx;
		.h2 {
			font-size: 36rpx;
			font-weight: bold;
			color: #000000;
			line-height: 74rpx;
		}
		.h3 {
			font-size: 24rpx;
			font-weight: 500;
			color: #000000;
			padding-left: 15rpx;
			line-height: 82rpx;
		}
	} 

	.item {
		width: 690rpx;
		height: 240rpx;
		background: url("../../static/images/app/index_item_bg.png") no-repeat;
		background-size: 100% 100%;
		padding: 25rpx 10rpx 25rpx 30rpx;
		.pic {
			width: 240rpx;
			height: 190rpx;
			image {
				width: 240rpx;
				height: 190rpx;
			}
		}
		.info {
			flex: 1;
			height: 190rpx;
			padding-left: 20rpx;
			.subTitle {
				width: 180rpx;
				height: 36rpx;
				background: url("../../static/images/app/item_title_bg.png") no-repeat;
				background-size: 100% 100%;
				.coin {
					width: 70rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
				}
				.date {
					width: 110rpx;
					font-size: 24rpx;
					color: #323232;
					text-align: center;
				}
			}
			.name,.state {
				font-size: 30rpx;
				font-weight: bold;
				color: #000000;
			}
			.dollar {
				font-size: 30rpx;
				font-weight: 700;
				color: #F16C00;
				text {
					color: rgba(0,0,0,0.5);
					padding-left: 10rpx;
					font-size: 20rpx;
					text-decoration:line-through;
					font-weight: 400;
				}
			}
			.price {
				font-size: 22rpx;
				color: #000000;
				text {
					color: rgba(0,0,0,0.5);
					padding-left: 10rpx;
				}
			}
		}
	}

	.popBot {
		width: 600rpx;
		height: 800rpx;
		background: url("../../static/images/app/ewm_bg.png") no-repeat;
		background-size: 100% 100%;
		.popTitle {
			color: #fff;
			font-size: 34rpx;
			font-weight: 700;
			padding-top: 50rpx;
		}
		.tip {
			color: rgba(255,255,255,0.75);
			font-size: 28rpx;
			
		}
		.codeDiv {
			width: 420rpx;
			height: 480rpx;
			background-color: #fff;
			border-radius: 20rpx;
			.bg1 {
				width: 105rpx;
				height: 70rpx;
				bottom: -20rpx;
				left: -20rpx;
			}
			.bg2 {
				width: 139rpx;
				height: 98rpx;
				bottom: -10rpx;
				right: -40rpx;
			}
			.codeMa {
				width: 300rpx;
				height: 380rpx;
			}
		}
	}
</style>
