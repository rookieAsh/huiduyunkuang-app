<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="benner margin0  flex-between flex-column">
			<view class="flex">
				<view class="li">
					<view class="name">昨日挖出：</view>
					<view class="val">{{obj.earnings |number(4)}}{{obj.subarea}}</view>
				</view>
				<view class="li">
					<view class="name">累计挖出：</view>
					<view class="val">{{obj.countEarnings |number(4)}}{{obj.subarea}}</view>
				</view>
			</view>
			<view class="li">
				<view class="name">可提取：</view>
				<view class="val">{{obj.validMoney |number(4)}}{{obj.subarea}}</view>
			</view>
		</view>
		
		<view class="h4">收益记录</view>
		
		<view class="item margin0 borderBottom flex-between flex-column padding-column20" v-for="(item,index) in list" :key="index">
			<view class="li">{{item.createTime}}</view>
			<view class="flex-between">
				<view class="li">日算力 {{item.hashrate}}</view>
				<view class="li">{{item.addMoney}}{{item.subarea}}</view>
			</view>
		</view>
		<view class="div" style="height: 500rpx;"  v-if="list.length==0">
			<u-empty mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
        data() {
            return {
				list:[],
				obj:{}
            }
        },
		onLoad(opt) {
			this.obj = JSON.parse(decodeURIComponent(opt.obj))
			console.log(this.obj.subarea)
		},
        onShow() {
			this.getInfo()
        },
        methods: {
			// 挖矿钱包
			getInfo(){
				uni.showLoading({
					title:"加载中...",
					icon:"loading"
				})
				this.$Ajax('/custody/selectHashrateByAddressAndCoin',{
					address:uni.getStorageSync('hdUserInfo').address,
				},(res)=>{
					this.list = res.data
					uni.hideLoading()
				})
			}
        }
    }
</script>

<style lang="less" scoped>
	.benner {
		width: 690rpx;
		height: 240rpx;
		background: #FFF8F0;
		border-radius: 20rpx;
		padding: 30rpx;
		.li {
			width: 50%;
		}
	}
	.h4 {
		font-size: 26rpx;
		font-weight: bold;
		color: #000000;
		padding: 30rpx;
	}
	.item {
		width: 690rpx;
		height: 140rpx;
		.li {
			font-size: 28rpx;
			font-weight: 600;
		}
	}
</style>