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
		<u-loading :mode="mode" :show="show" :color="color" :size="size" class="loading"></u-loading>
		<view class="box">
			<refresh ref="mixPulldownRefresh" class="panel-content"  @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
				<swiper class="swiper" :current="swiperIndex" @change="change" @transition="transition" @animationfinish="animationfinish">
					<!-- 云算力部分 -->
					<swiper-item>
						<view class="itemBox padding-row30">
							<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltolower="loadMore()">
								<view class="item margin0" v-for="(item,index) in list2" :key="index" @click="$tools.jump('./mineDetail')">
									<view class="item_top flex">
										<view class="left flex-between flex-column">
											<image src="../../static/images/app/mine.png" style="width: 240rpx;height: 180rpx;"></image>
											<text>{{item.create_time}}</text>
										</view>
										<view class="right">
											<view class="name">{{item.product_name}}</view>
											<view class="placeholder30"></view>
											<view class="row flex align-center">
												<view>X{{item.number}}</view>
												<view class="text-center">{{item.payment_method==1?"币币交易":"银行卡支付"}}</view>
												<view class="text-right" style="color: #F16C00;">{{item.payment_money}}</view>
											</view>
											<view class="row flex align-center">
												<view style="color: rgba(0,0,0,0.5);">台数</view>
												<view class="text-center" style="color: rgba(0,0,0,0.5);">交易方式</view>
												<view class="text-right" style="color: rgba(0,0,0,0.5);">实付金额</view>
											</view>
										</view>
									</view>
									<view class="item_bottom flex-between align-center padding-row30">
										<view class="flex align-center">
											<text>订单编号:{{item.order_number}}</text>
											<image src="../../static/images/app/copy.png" 
											style="width: 28rpx;height: 28rpx;margin-left: 10rpx;" @click="copy(item.order_number)"></image>
										</view>
										<text style="color: #F16C00;">{{['已支付','审核中','购买失败'][item.zt]}}</text>
									</view>
								</view>
								<view class="div" style="height: 1000rpx;"  v-if="list2.length==0">
									<u-empty mode="list"></u-empty>
								</view>
							</scroll-view>
						</view>
						
					</swiper-item>
					<!-- 联合挖矿部分 -->
					<swiper-item>
						<view class="itemBox padding-row30">
							<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltolower="loadMore()">
								<view class="item margin0" v-for="(item,index) in list3" :key="index" @click="$tools.jump('./mineDetail')">
									<view class="item_top flex">
										<view class="left flex-between flex-column">
											<image src="../../static/images/app/mine.png" style="width: 240rpx;height: 180rpx;"></image>
											<text>{{item.create_time}}</text>
										</view>
										<view class="right">
											<view class="name">{{item.product_name}}</view>
											<!-- <view class="name">230M 现货</view> -->
											<view class="placeholder30"></view>
											<view class="row flex align-center">
												<view>X{{item.number}}</view>
												<view class="text-center">{{item.payment_method == 1 ? '币币支付' : '银行卡支付'}}</view>
												<view class="text-right" style="color: #F16C00;">￥{{item.payment_money}}</view>
											</view>
											<view class="row flex align-center">
												<view style="color: rgba(0,0,0,0.5);">台数</view>
												<view class="text-center" style="color: rgba(0,0,0,0.5);">交易方式</view>
												<view class="text-right" style="color: rgba(0,0,0,0.5);">实付金额</view>
											</view>
										</view>
									</view>
									<view class="item_bottom flex-between align-center padding-row30">
										<view class="flex align-center">
											<text>订单编号:{{item.order_number}}</text>
											<image src="../../static/images/app/copy.png" 
											style="width: 28rpx;height: 28rpx;margin-left: 10rpx;" @click="copy(item.order_number)"></image>
										</view>
										
										<text style="color: #F16C00;">{{['已支付','审核中','购买失败'][item.zt]}}</text>
									</view>
								</view>
								<view class="div" style="height: 1000rpx;"  v-if="list3.length==0">
									<u-empty mode="list"></u-empty>
								</view>
							</scroll-view>
						</view>
					</swiper-item>
				</swiper>	
			</refresh>
		</view>
	</view>
</template>

<script>
	import refresh from '../../components/refresh.vue'
	import nodata from '../../components/nodata.vue'
	export default {
        data() {
            return {
				tabs: Object.freeze([
					// { name: '矿机', status: 0 },
					{ name: '云算力', status: 1 },
					{ name: '联合挖矿', status: 2},			
				]),
				current:0,
				tabIndex: 0,
				swiperIndex: 0,
				list1:[],
				list2:[],
				list3:[],
				scrollTop:0,
				mode: 'circle',
				color: '#FF891C',
				size: '50', 
				show: false
            }
        },
        onShow() {	
			this.getList2();
			// this.getList2();
			// this.getList3();
        },
		components:{
			refresh,
			nodata
		},
        methods: {
			// getList1(){
			// 	this.list1 = []
			// 	uni.showLoading({
			// 		title:"加载中...",
			// 		icon:"loading"
			// 	})
			// 	this.$Ajax("/MartianOrePool/selectOrderByAddress",{
			// 		address:uni.getStorageSync("hdUserInfo").address,
			// 		type:1
			// 	},(res)=>{
			// 		this.list1 = res.data;
			// 		uni.hideLoading()
			// 	})
			// },
			getList2(){
				this.list2 = []
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax("/MartianOrePool/selectOrderByAddress",{
					address:uni.getStorageSync("hdUserInfo").address,
					type:1
				},(res)=>{
					this.list2 = res.data;
					uni.hideLoading()
				})
			},
			getList3(){
				this.list3 = []
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax("/MartianOrePool/selectOrderByAddress",{
					address:uni.getStorageSync("hdUserInfo").address,
					type:2
				},(res)=>{
					this.list3 = res.data;
					uni.hideLoading()
				})
			},
			
			tabClick(index){
				if (this.tabIndex === index) return
				this.swiperIndex = index
			},
			change(e){
				this.tabIndex = e.detail.current;
				if(this.tabIndex==0){
					this.getList2();
				}else {
					this.getList3();
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
				console.log("见底了")
				this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh()
			},
			onPulldownReresh(){
				if(this.tabIndex==0){
					this.getList2();
				}else {
					this.getList3();
				}
				setTimeout(() => {
					this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh()
				}, 500)
			},
			// 设置scroll-view是否允许滚动
			setEnableScroll(enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable
				}
			},
			copy(val){
				this.$tools.copy(val)
			}
        }
    }
</script>

<style lang="less" scoped>
	.tabs-container {
		width: 100%;
		left: 0;
		top: calc( var(--status-bar-height) + 120rpx);
		z-index: 999;
	}
	.box {
		width: 750rpx;
		height: calc(100vh - var(--window-bottom) - 220rpx);
		padding: 30rpx 0 100rpx;
		.scroll-Y {
			height: calc(100vh - var(--window-bottom) - 220rpx);
		}
		.swiper {
			width: 750rpx;
			height: calc(100vh - var(--window-bottom) - 220rpx);
			.item {
				width: 690rpx;
				height: 320rpx;
				margin-bottom: 30rpx;
				.item_top {
					width: 100%;
					height: 260rpx;
					background-color: #FFF7F0;
					padding: 20rpx 30rpx;
					.left {
						width: 240rpx;
						text {
							color: rgba(0,0,0,0.5);
							font-size: 24rpx;
						}
					}
					.right {
						color: #000;
						font-size: 30rpx;
						font-weight: 600;
						width: 390rpx;
						padding-left: 20rpx;
						.row {
							width: 100%;
							margin-top: 20rpx;
							>view {
								width: 44%;
								font-size: 26rpx;
							}
							>view:nth-child(1){
								width: 20%;
							}
							>view:nth-child(2){
								width: 36%;
							}
						}
					}
				}
				.item_bottom {
					width: 100%;
					height: 60rpx;
					
					background: #FFFFFF;
					box-shadow: 0px 6px 8px 1px rgba(89, 40, 0, 0.09);
					text {
						color: #000;
						font-size: 24rpx;
					}
				}
			}
		}
	}
	.loading {
		position: fixed;
		left: 50%;
		top: 300rpx;
		transform: translate(-50%);
		z-index: 99999;
	}
</style>
