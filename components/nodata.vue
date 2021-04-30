<template>
	<view class="nodata">
		<view class="cnt flex-between flex-column align-center">
			<image src="../static/images/app/nodata.png" style="width: 160rpx;height: 120rpx;"></image>
			<text>暂无数据</text>
		</view>
	</view>
</template>

<script>
	export default {
        data() {
            return {

            }
        },
        onShow() {

        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
	.cnt {
		width: 160rpx;
		height: 160rpx;
		text {
			color: #F16C00;
			font-size: 22rpx;
		}
	}
</style>
