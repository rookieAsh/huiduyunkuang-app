<template>
	<view class="page">
		<view class="title">{{detailObj.subtitle}}</view>
		<view class="time">{{detailObj.creatTime}}</view>
		<view class="content">{{detailObj.describe}}</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				detailObj:{},
			}
		},
		onLoad(opt) {
			this.id = opt.value1;
		},
		onShow() {
			this.getDetail()
		},
		methods:{
			getDetail(){
				this.$Ajax('/notice/selectNoticeById',{
					noticeId:this.id
				},(res)=>{
					this.detailObj = res.data[0];
					console.log(this.detailObj)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.title {
		color: #000;
		font-size: 32rpx;
		font-weight: 600;
		padding: 30rpx;
		line-height: 42rpx;
	}
	.time {
		color: #999;
		font-size: 24rpx;
		padding: 0 30rpx;
	}
	.content {
		padding: 40rpx 30rpx;
		text-indent: 2em;
		font-size: 28rpx;
		line-height: 42rpx;
	}
</style>
