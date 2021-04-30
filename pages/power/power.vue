<template>
	<view class="page fixed">
			<view class="placeholder80"></view>
			<!-- 币种切换 -->
			<view class="tabs-container">
				<u-tabs-swiper
					active-color="#FF891C"
					inactive-color="#000"
					font-size="32"
					ref="tabs"
					:list="tabs"
					:current="current"
					@change="tabClick"
					:is-scroll="false"
					:bar-width="80"
					:bar-height="10"
					swiperWidth="750"
				></u-tabs-swiper>		
			</view>
			
			<!-- 类型切换 -->
			<view class="menuTab margin30 flex">
				<view class="tab" :class="{active:menuTabCurent===0}" @click="changeMenuTab(0)">云算力</view>
				<view class="tab" :class="{active:menuTabCurent===1}" @click="changeMenuTab(1)">联合挖矿</view>
			</view>
		<refresh ref="mixPulldownRefresh" class="panel-content"  @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<swiper class="swiper" :current="swiperIndex" @change="change" @transition="transition" @animationfinish="animationfinish">
				<!-- BTC -->
				<swiper-item>
					<!-- 云算力 -->
					<view class="container" v-if="menuTabCurent===0">
						<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltolower="loadMore()">
							<view class="item_2" v-for="(item,index) in btcList" :key="index" @click="goLink(item,item.unitprice,tabIndex)">
								<view class="flex-between align-center">
									<view class="name">{{item.name}}</view>
									<!-- <view class="btn text-center" @click.stop="$tools.jump('./buyPower')">立即下单</view> -->
								</view>
								<view class="tipBox flex">
									<view class="tipBox_l">产品保障</view>
									<view class="tipBox_r">合约期365天  新手专享</view>
								</view>
								<view class="cell flex-between">
									<view class="key">云算力总量</view>
									<view class="value">{{item.cloud_hashrate}}T</view>
								</view>
								<view class="cell flex-between">
									<view class="key">算力周期</view>
									<view class="value">{{item.period}}</view>
								</view>
								<view class="cell flex-between">
									<view class="key">单T售价</view>
									<view class="value">￥{{item.unitprice}}</view>
								</view>
								<view class="cell flex-between">
									<view class="key">预计日产 <text>{{item.cloud_day}}</text></view>
									<view class="value">开挖时间:{{item.mining_time}}</view>
								</view>
							</view>
							<view class="div" style="height: 500rpx;"  v-if="btcList.length==0">
								<u-empty mode="list"></u-empty>
							</view>
						</scroll-view>
					</view>
				
					<view class="itemBox padding-row30">
						<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
							<view class="item margin10-0 flex" v-for="(item,index) in btcList" :key="index" @click="$tools.jump('../market/mineDetail',item.productId)">
								<view class="pic">
									<image :src="item.image" mode=""></image>
								</view>
								<view class="info flex-between flex-column">
									<view class="subTitle flex">
										<text class="coin ">BTC</text>
										<text class="date ">现货开挖</text>
									</view>
									<view class="name">{{item.name}}</view>
									<!-- <view class="state flex-between">230M 现货</view> -->
									<view class="dollar">￥{{item.activity_price}} <text>￥{{item.mill_cost}}</text></view>
									<view class="flex-between align-center">
										<view class="price">{{item.production}} <text>BTC/日产出</text></view>
										
									</view>
								</view>
							</view>
							<view class="div" style="height: 1000rpx;"  v-if="btcList.length==0">
								<u-empty mode="list"></u-empty>
							</view>
						</scroll-view>
					</view>
					
				</swiper-item>
			
			
				<!-- ETH -->
				<swiper-item>
					<!-- 云算力 -->
					<view class="container" v-if="menuTabCurent===0">
						<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltolower="loadMore()">
							<view class="item_2" v-for="(item,index) in ethList" :key="index" @click="goLink(item,item.unitprice,tabIndex)">
								<view class="flex-between align-center">
									<view class="name">{{item.name}}</view>
									<!-- <view class="btn text-center" @click.stop="$tools.jump('./buyPower')">立即下单</view> -->
								</view>
								<view class="tipBox flex">
									<view class="tipBox_l">产品保障</view>
									<view class="tipBox_r">合约期365天  新手专享</view>
								</view>
								<view class="cell flex-between">
									<view class="key">云算力总量</view>
									<view class="value">{{item.cloud_hashrate}}M</view>
								</view>
								<view class="cell flex-between">
									<view class="key">算力周期</view>
									<view class="value">{{item.period}}</view>
								</view>
								<view class="cell flex-between">
									<view class="key">单T售价</view>
									<view class="value">￥{{item.unitprice}}</view>
								</view>
								<view class="cell flex-between">
									<view class="key">预计日产 <text>{{item.cloud_day}}</text></view>
									<view class="value">开挖时间:{{item.mining_time}}</view>
								</view>
							</view>
							<view class="div" style="height: 500rpx;"  v-if="ethList.length==0">
								<u-empty mode="list"></u-empty>
							</view>
						</scroll-view>
					</view>
					
					<view class="itemBox padding-row30">
						<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
							<view class="item margin10-0 flex" v-for="(item,index) in ethList" :key="index" @click="$tools.jump('../market/mineDetail',item.productId)">
								<view class="pic">
									<image :src="item.image" mode=""></image>
								</view>
								<view class="info flex-between flex-column">
									<view class="subTitle flex">
										<text class="coin ">ETH</text>
										<text class="date ">现货开挖</text>
									</view>
									<view class="name">{{item.name}}</view>
									<!-- <view class="state flex-between">230M 现货</view> -->
									<view class="dollar">￥{{item.activity_price}} <text>￥{{item.mill_cost}}</text></view>
									<view class="flex-between align-center">
										<view class="price">{{item.production}} <text>ETH/日产出</text></view>
										
									</view>
								</view>
							</view>
							<view class="div" style="height: 1000rpx;"  v-if="ethList.length==0">
								<u-empty mode="list"></u-empty>
							</view>
						</scroll-view>
					</view> 	
				</swiper-item>	
			</swiper>
		</refresh>
	</view>
</template>

<script>
	import refresh from '../../components/refresh.vue'
	export default {
        data() {
            return {
				enableScroll: true,
				tabs: Object.freeze([
					{ name: 'BTC专区', status: 1 },
					{ name: 'ETH专区', status: 2 },		
				]),
				current:0,
				swiperIndex: 0,
				menuTabCurent:'',
				scrollTop:0,
				btcList:[],
				ethList:[],
				filList:[],
				tabIndex:0
            }
        },
        onShow() {
			let data = uni.getStorageSync("setFlag");
			console.log(data)
			uni.removeStorageSync("setFlag")
			if(!data){
				this.menuTabCurent = 0;
				this.tabIndex = 0;
				this.current = 0;
				this.swiperIndex = 0;
				this.getBtc();
			}else {
				this.menuTabCurent = data;
				this.getLhBtc();
			}
        },
		components:{
			refresh
		},
        methods: {
			tabClick(index){
				if (this.tabIndex === index) return
				this.swiperIndex = index
				if(this.menuTabCurent==0) {
					if(this.tabIndex==0) {
						this.getBtc();
					}else{
						this.getEth()
					}
				}else {
					if(this.tabIndex==0) {
						this.getLhBtc();
					}else{
						this.getLhEth()
					}
				}
			},
			goLink(item,price,tabIndex){
				uni.setStorageSync('data',item)
				uni.navigateTo({
					url:'./powerDetail?price='+ price + '&index='+ tabIndex
				})
			},
			getBtc(){
				this.btcList = [];
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax("/MartianOrePool/selectCloudHashrate",{
					typeMill:1,
					goodsType:1
				},(res)=>{
					this.btcList = res.data;
					uni.hideLoading()
				})
			},
			getEth() {
				this.ethList = [];
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax("/MartianOrePool/selectCloudHashrate",{
					typeMill:1,
					goodsType:2
				},(res)=>{
					this.ethList = res.data;
					uni.hideLoading()
				})
			},
			getFil() {
				this.filList = [];
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax("/MartianOrePool/selectCloudHashrate",{
					typeMill:1,
					goodsType:3
				},(res)=>{
					this.filList = res.data;
					uni.hideLoading()
				})
			},	
			
			
			// 联合挖矿
			getLhBtc(){
				this.btcList = [];
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax("/MartianOrePool/selectMillAll",{
					goodsType:1,
					typeMill:3,
				},(res)=>{
					this.btcList = res.data;
					uni.hideLoading()
				})
			},
			getLhEth(){
				this.ethList = [];
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax("/MartianOrePool/selectMillAll",{
					goodsType:2,
					typeMill:3,
				},(res)=>{
					this.ethList = res.data;
					uni.hideLoading()
				})
			},
			change(e){
				this.tabIndex = e.detail.current;
				if(this.menuTabCurent==0) {
					if(this.tabIndex==0) {
						this.getBtc();
					}else{
						this.getEth()
					}
				}else {
					if(this.tabIndex==0) {
						this.getLhBtc();
					}else{
						this.getLhEth()
					}
				}
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx)
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperIndex = current;
				this.tabIndex = current;	
			},
			loadMore(){
				
			},
			onPulldownReresh(){
				if(this.menuTabCurent==0) {
					if(this.current==0) {
						this.getBtc();
					}else{
						this.getEth()
					}
				}else {
					if(this.current==0) {
						this.getLhBtc();
					}else{
						this.getLhEth()
					}
				}
				setTimeout(() => {
					this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh()
					uni.hideLoading()
				}, 500)
			},
			// 设置scroll-view是否允许滚动
			setEnableScroll(enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable
				}
			},
			changeMenuTab(index){
				this.menuTabCurent = index;
				if(this.menuTabCurent==0) {
					if(this.tabIndex==0) {
						this.getBtc();
					}else{
						this.getEth()
					}
				}else {
					if(this.tabIndex==0) {
						this.getLhBtc();
					}else{
						this.getLhEth()
					}
				}
			}
        }
    }
</script>

<style lang="less" scoped>
	.place {
		width: 100%;
		height: 245rpx;
	}
	
	.menuTab {
		width: 380rpx;
		height: 72rpx;
		background: #FFF3E7;
		border-radius: 33rpx;
		.tab {
			width: 190rpx;
			font-size: 28rpx;
			color: rgba(0,0,0,0.65);
			line-height: 72rpx;
			text-align: center;
		}
		.active {
			width: 190rpx;
			height: 70rpx;
			background: #FFD8B1;
			box-shadow: 2rpx 3rpx 6rpx 0rpx rgba(196, 98, 0, 0.27);
			border-radius: 33rpx;
			font-weight: 600;
			color: #000;
		}
	}

	.swiper {
		width: 750rpx;
		height: calc(100vh - var(--window-bottom) - 300rpx);
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
						opacity: 0.51;
						color: #000000;
						padding-left: 10rpx;
						font-size: 18rpx;
						text-decoration:line-through;
					}
				}
				.price {
					font-size: 20rpx;
					color: #000000;
					text {
						opacity: 0.51;
						color: #000000;
						padding-left: 10rpx;
					}
				}
			}
		}
		.container {
			height: calc(100vh - var(--window-bottom) - 300rpx);
			.scroll-Y {
				height: calc(100vh - var(--window-bottom) - 300rpx);
			}
			width: 100%;
			padding: 0 30rpx;
			.item_3 {
				width: 100%;
				padding: 30rpx;
				background-color: #FFFAF5;
				border-radius: 10rpx;
				margin: 0 auto 20rpx;
				.cell_one {
					width: 100%;
					.name {
						color: #000;
						font-size: 30rpx;
						font-weight: 600;
					}
					.btn {
						width: 160rpx;
						height: 50rpx;
						background: linear-gradient(90deg,#FF9E4D,#FCE1C9);
						border-radius: 10rpx;
						line-height: 50rpx;
						color: #fff;
						font-size: 24rpx;
					}
				}
				.cell_two {
					width: 100%;
					height: 100rpx;
					.cell_two_th {
						.li {
							width: 33.333%;
							font-size: 24rpx;
							color: rgba(0,0,0,0.5);
						}
					}
					.cell_two_td {
						.li {
							width: 33.333%;
							font-size: 32rpx;
							color: #F16C00;
							font-weight: 600;
							text {
								color: #000;
								font-size: 24rpx;
							}
						}
					}
				}
				.tip {
					font-size: 20rpx;
					color: rgba(0,0,0,0.5);
					padding: 10rpx 0;
				}
				.cell {
					width: 100%;
					.li {
						width: 50%;
						font-size: 28rpx;
						color: #000;
						line-height: 52rpx;
					}
				}
			}
			.item_2 {
				width: 100%;
				padding: 30rpx;
				background-color: #FFFAF5;
				border-radius: 10rpx;
				margin: 0 auto 20rpx;
				.name {
					color: #000;
					font-size: 30rpx;
					font-weight: 600;
				}
				.btn {
					width: 160rpx;
					height: 50rpx;
					background: linear-gradient(90deg,#FF9E4D,#FCE1C9);
					border-radius: 10rpx;
					line-height: 50rpx;
					color: #fff;
					font-size: 24rpx;
				}
				.tipBox {
					width: 420rpx;
					height: 40rpx;
					line-height: 40rpx;
					background: url("../../static/images/app/item_bg.png") no-repeat;
					background-size: 100% 100%;
					margin-top: 30rpx;
					margin-bottom: 15rpx;
					.tipBox_l {
						width: 130rpx;
						text-align: center;
						color: #fff;
						font-size: 24rpx;
					}
					.tipBox_r {
						width: 290rpx;
						text-align: center;
						color: #000;
						font-size: 24rpx;
					}
				}
				.cell {
					line-height: 52rpx;
					.key {
						color: rgba(0,0,0,0.7);
						font-size: 28rpx;
						text {
							color: #F16C00;
							font-size: 34rpx;
							font-weight: 600;
							padding-left: 10rpx;
						}
					}
					.value {
						color: #000;
						font-size: 28rpx;
						font-weight: 600;
					}
				}
			}
		}
	}

	
	


</style>