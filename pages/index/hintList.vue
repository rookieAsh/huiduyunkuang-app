<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="item margin0 flex-column flex-between" v-for="(item,index) in list" :key="item.noticeId" @click="$tools.jump('./hintDetail',item.noticeId)">
			<view class="title wordHide">{{item.subtitle}}</view>
			<view class="time">{{item.creatTime}}</view>
		</view>
		<view class="div" style="height: 1000rpx;"  v-if="list.length==0">
			<u-empty mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		onShow() {
			this.init()
		},
		methods:{
			init(){
				this.$Ajax("/notice/selectNoticeAll",{},(res)=>{
					this.list = res.data;
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.item {
		width: 690rpx;
		height: 150rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.1);
		padding: 20rpx 0;
		.title {
			color: #000;
			font-size: 30rpx;
			font-weight: 600;
			line-height: 32rpx;
		}
		.time {
			color: #999;
			font-size: 24rpx;
		}
	}
</style>
