<template>
	<view class="page">
		<view class="cnt fixed" style="left: 50%;transform: translate(-50%);top: 0rpx;width: 750rpx;
		height: 118rpx;background: #fff;z-index: 999;">
			<view class="tabs flex margin30-0">
				<view class="tab" :class="{active:tabCurrent===1}" @click="change(1)">发红包记录</view>
				<view class="tab" :class="{active:tabCurrent===2}" @click="change(2)">收红包记录</view>
			</view>
		</view>
		
		<view style="height: 88rpx;"></view>
		
		<view class="item borderBottom margin20-0 flex-between flex-column" v-for="(item,index) in list" :key="index">
			<view class="flex-between">
				<text style="font-weight: 600;">领取{{item.number - item.remainNumber}}/{{item.number}}</text>
				<text>{{item.money |number(8)}} {{item.coin}}</text>
			</view>
			<view class="time flex-between">
				<text>{{item.sj}}</text>
				<text>{{item.type==1 ? "普通红包" : "暗号红包"}}</text>
			</view>
		</view>
		<view class="div" style="height: 1000rpx;"  v-if="list.length==0">
			<u-empty mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
        data() {
            return {
				tabCurrent:1,
				list:[],
            }
        },
        onShow() {
			this.init()
        },
        methods: {
			init(){
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax('/rate/selectRedPacket',{
					address:uni.getStorageSync('hdUserInfo').address
				},(res)=>{
					this.list = res.data
					uni.hideLoading()
				})
			},
			getList(){
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax('/rate/selectRedPacketRoll',{
					address:uni.getStorageSync('hdUserInfo').address
				},(res)=>{
					this.list = res.data
					uni.hideLoading()
				})
			},
			change(index){
				this.tabCurrent = index;
				if(index==1){
					this.init()
				}else{
					this.getList()
				}
			},
        }
    }
</script>

<style lang="less" scoped>
	.tabs {
		width: 460rpx;
		height: 66rpx;
		background: #FFF3E7;
		border-radius: 30px;
		line-height: 66rpx;
		.tab {
			width: 50%;
			text-align: center;
			font-size: 28rpx;
		}
		.active {
			height: 64rpx;
			background: #FFD8B1;
			box-shadow: 2rpx 3rpx 6rpx 0rpx rgba(196, 98, 0, 0.27);
			border-radius: 30rpx;
			color: #000;
			font-weight: 600;
		}
	}
	.item {
		width: 690rpx;
		height: 120rpx;
		padding: 20rpx 0;
		text {
			color: #000;
			font-size: 28rpx;
		}
		.time {
			color: rgba(0,0,0,0.5);
			font-size: 24rpx;
		}
	}
</style>