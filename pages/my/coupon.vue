<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="item flex align-center margin0" v-for="(item,index) in list" :key="index" @click="toUse(item.name,item.newAward)">
			<view class="pic">
				<image src="../../static/images/app/coupon.png" style="width: 200rpx;height: 160rpx;"></image>
			</view>
			<view class="inner flex-between flex-column">
				<view class="name">{{item.name}}￥{{item.newAward}}</view>
				<view class="tip">有效期七天</view>
				<view class="flex-between align-center" style="margin-top: 30rpx;">
					<text class="tip">仅限挖矿/算力使用</text>
					<!-- <u-icon name="checkmark-circle-fill" :color="active==index?'#FFAB57':'#999'" size="36"></u-icon> -->
				</view>
			</view>
		</view>
		<view class="div" style="height: 800rpx;"  v-if="list.length==0">
			<u-empty mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
        data() {
            return {
				active:0,
				list:[]
            }
        },
        onShow() {
			this.list = [];
			this.init()
        },
        methods: {
			select(index){
				this.active = index;
			},
			init(){
				uni.showLoading({
					title:"加载中..."
				})
				this.$Ajax('/register/selectNewAward',{
					userId:uni.getStorageSync('hdUserInfo').userid
				},(res)=>{
					this.list = res.data
					uni.hideLoading()
				})	
			},
			toUse(name,newAward){
				this.$tools.prePage().coupon = name
				this.$tools.prePage().newAward = newAward
				uni.navigateBack()			
			},
        }
    }
</script>

<style lang="less" scoped>
	.item {
		width: 630rpx;
		height: 260rpx;
		background: url('../../static/images/app/coupon_item.png') no-repeat;
		background-size: 100% 100%;
		padding: 0 40rpx;
		.inner {
			flex: 1;
			height: 160rpx;
			padding-left: 70rpx;
			.name {
				color: #000;
				font-size: 28rpx;
				font-weight: 600;
			}
			.tip {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
</style>
