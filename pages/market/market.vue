<template>
	<view class="page fixed">
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
		<!-- <u-loading :mode="mode" :show="show" :color="color" :size="size" class="loading"></u-loading> -->
		<view class="box">
			<refresh ref="mixPulldownRefresh" class="panel-content"  @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
				<swiper class="swiper" :current="swiperIndex" 
				@change="change" @transition="transition" @animationfinish="animationfinish">
					<!-- 全部 -->
					<!-- <swiper-item>
						<view class="itemBox padding-row30">
							<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
								<view class="item margin10-0 flex" v-for="(item,index) in mineAll.listAll" :key="index" @click="routePush(item)">
									<view class="pic">
										<image :src="item.image" mode=""></image>
									</view>
									<view class="info flex-between flex-column">
										<view class="subTitle flex">
											<text class="coin ">{{ ["BTC","ETH","FIL"][item.goods_type-1] }}</text>
											<text class="date ">3月开挖</text>
										</view>
										<view class="name">{{item.name}}</view>
										<view class="dollar">${{item.activity_price}} <text>${{item.unit_price}}</text></view>
										<view class="flex-between align-center">
											<view class="price">{{item.expe_daily_prod}} <text>ETH/日产出</text></view>
											
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</swiper-item> -->
					<!-- BTC -->
					<swiper-item>
						<view class="itemBox padding-row30">
							<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
								<view class="item margin10-0 flex" v-for="(item,index) in btcList" :key="index" @click="$tools.jump('./mineDetail',item.productId)">
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
						<view class="itemBox padding-row30">
							<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
								<view class="item margin10-0 flex" v-for="(item,index) in ethList"
								 :key="index" @click="$tools.jump('./mineDetail',item.productId)">
									<view class="pic">
										<image :src="item.image" mode=""></image>
									</view>
									<view class="info flex-between flex-column">
										<view class="subTitle flex">
											<text class="coin">ETH</text>
											<text class="date">现货开挖</text>
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
					<!-- FIL -->
					<!-- <swiper-item>
						<view class="itemBox padding-row30">
							<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
								<view class="item margin10-0 flex" v-for="(item,index) in filList" :key="index" @click="$tools.jump('./mineDetail',item.productId)">
									<view class="pic">
										<image :src="item.image" mode=""></image>
									</view>
									<view class="info flex-between flex-column">
										<view class="subTitle flex">
											<text class="coin ">FIL</text>
											<text class="date ">3月开挖</text>
										</view>
										<view class="name">{{item.name}}</view>
										<view class="dollar">${{item.activity_price}} <text>${{item.mill_cost}}</text></view>
										<view class="flex-between align-center">
											<view class="price">{{item.hashrate}} <text>FIL/日产出</text></view>
											
										</view>
									</view>
								</view>
								<view class="div" style="height: 1000rpx;"  v-if="filList.length==0">
									<u-empty mode="list"></u-empty>
								</view>
							</scroll-view>
						</view>
					</swiper-item> -->
				</swiper>	
			</refresh>
		</view>
	</view>
</template>

<script>
	import refresh from '../../components/refresh.vue'
	export default {
		data() {
			return {
				enableScroll: true,
				tabs: Object.freeze([
					// { name: '全部'},
					{ name: 'BTC专区'},
					{ name: 'ETH专区'},
					// { name: 'FIL专区'},		
				]),
				tabIndex: 0,
				swiperIndex: 0,
				list:[],
				btcList:[],
				ethList:[],
				filList:[],
				scrollTop:0,
				current:0,
				mode: 'circle',
				color: '#FF891C',
				size: '50', 
				show: false
			}
		},
		components:{
			refresh
		},
		onShow() {
			this.getBtc();
			// this.getEth();
			// this.getFil();
		},
		methods: {
			getBtc(){
				this.btcList = []
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax("/MartianOrePool/selectMillAll",{
					goodsType:1,
					typeMill:3
				},(res)=>{
					this.btcList = res.data;
					uni.hideLoading()
				})
			},
			getEth(){
				this.ethList = []
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax("/MartianOrePool/selectMillAll",{
					goodsType:2,
					typeMill:3
				},(res)=>{
					this.ethList = res.data;
					uni.hideLoading()
				})
			},
			// getFil(){
			// 	this.filList = []
			// 	uni.showLoading({
			// 		title:"加载中...",
			// 		icon:"loading"
			// 	})
			// 	this.$Ajax("/MartianOrePool/selectMillAll",{
			// 		goodsType:3
			// 	},(res)=>{
			// 		this.filList = res.data;
			// 		uni.hideLoading()
			// 	})
				
			// },
			tabClick(index){
				if (this.tabIndex === index) return
				this.swiperIndex = index
			},
			change(e){
				this.tabIndex = e.detail.current;
				if(this.tabIndex==0){
					this.getBtc();
				}else {
					this.getEth();
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
			onPulldownReresh(){
				if(this.tabIndex==0){
					this.getBtc();
				}else {
					this.getEth();
				}
				setTimeout(() => {
					this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh()
					// this.show = false;
				}, 500)
			},
			// 设置scroll-view是否允许滚动
			setEnableScroll(enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.tabs-container {
		width: 100%;
		z-index: 100;
	}
	.loading {
		position: fixed;
		left: 50%;
		top: 300rpx;
		transform: translate(-50%);
		z-index: 99999;
	}
	.box {
		width: 750rpx;
		height: calc(100vh - var(--window-bottom) - 120rpx);
		padding: 30rpx 0;
		.scroll-Y {
			height: calc(100vh - var(--window-bottom) - 120rpx);
		}
		.swiper {
			width: 750rpx;
			height: calc(100vh - var(--window-bottom) - 120rpx);
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
		}
	}
	
	
	
</style>
