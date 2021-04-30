<template>
	<view class="headerWap">
		<view class="status"></view>
		<view class="headeMine">
			<!-- 返回键 -->
		    <view @click="goBack" class="leftImg">
				<image src="/static/images/backB.png"></image>
			</view>
			<!-- 标题内容 -->
			<view class="titleCt">
				 <slot name="title"></slot>
			</view>
			<!-- 右侧记录按钮 -->
			<view class="titleRt">
				 <slot name="rightText"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goBack(){
				this.$tools.back(1)
			}
		}
	}
</script>

<style lang="less" scoped>
.headerWap{
	width: 100%;
	background: #fff;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999999;
	.status{
		width: 100%;
		height: var(--status-bar-height);
	}
	.headeMine{
		width: 100%;
		height: 92upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		line-height: 92upx;
		position: relative;
		
		.leftImg{
			height: 100%;
			width: 36upx;
			display: flex;
			justify-content: left;
			align-items: center;
			position: absolute;
			left: 30upx;
			top: 0;
			image{
				width: 32upx;
				height: 30upx;
			}
		}
		.titleCt{
			width: 100%;
			font-size: 36upx;
			text-align: left;
			margin-left: 62upx;
			font-weight:bold;
			color:rgba(31,32,35,1);
		}
		.titleRt{
			color: #1f3f59;
			font-size: 30upx;
			display: flex;
			justify-content: right;
			align-items: center;
			position: absolute;
			right: 30upx;
			top: 0;
		}
	}
}
</style>
