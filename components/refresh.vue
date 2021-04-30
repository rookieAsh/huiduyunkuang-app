<template>
	<view
		class="cy-refresh-content"
		:style="{
			transform: 'translateY(' + pageDeviation + 'px)',
			transition: pageTransition + 's',
			height: height ? height : `calc(100vh - ${pageTop}px)`,
			maxHeight: height ? height : `calc(100vh - ${pageTop}px)`
		}"
		@touchstart="pageTouchstart"
		@touchmove="pageTouchmove"
		@touchend="pageTouchend"
	>
		<!-- 下拉刷新 -->
		<view class="cy-loading-wrapper">
			<text class="iconfont icon-pay-logo" :class="{ active: refreshing, ready: refreshReady }"></text>
		</view>

		<slot></slot>
	</view>
</template>

<script>
let startY,
	moveY,
	windowHeight = 500,
	platform
let timeDiff = 0
let touchending
export default {
	name: 'cy-refresh',
	props: {
		top: {
			//距离顶部距离，单位rpx
			type: Number,
			default: 0
		},
		height: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			pageDeviation: 0, //下偏移量
			pageTransition: 0, //回弹过渡时间
			refreshReady: false, //进入刷新准备状态
			refreshing: false // 进入刷新状态
		}
	},
	computed: {
		pageTop() {
			return uni.upx2px(this.top)
		}
	},
	created() {
		uni.getSystemInfo({
			success: function(e) {
				platform = e.platform
				windowHeight = e.windowHeight
			}
		})
	},
	methods: {
		pageTouchstart(e) {
			touchending = false
			this.pageTransition = 0
			startY = e.touches[0].pageY
		},
		pageTouchmove(e) {
			if (touchending) {
				return
			}
			moveY = (e.touches[0].pageY - startY) * 0.4
			if (moveY >= 0) {
				this.pageDeviation = moveY

				this.$emit('setEnableScroll', false)
			}
			if (moveY >= 50 && this.refreshReady === false) {
				this.refreshReady = true
			} else if (moveY < 50 && this.refreshReady === true) {
				this.refreshReady = false
			}
			if (platform === 'ios' && e.touches[0].pageY > windowHeight + 10) {
				this.pageTouchend()
			}
		},
		pageTouchend() {
			touchending = true
			if (moveY === 0) {
				return
			}
			this.pageTransition = 0.3
			if (moveY >= 50) {
				this.startPulldownRefresh()
			} else {
				this.pageDeviation = 0
			}

			if (this.refreshReady === true) {
				this.refreshReady = false
			}
			//修复下拉一点回弹后页面无法滚动的bug
			this.$emit('setEnableScroll', true)
			startY = moveY = 0
		},
		//开启下拉刷新
		startPulldownRefresh() {
			if (+new Date() - timeDiff < 100) {
				return
			}
			timeDiff = +new Date()
			this.refreshing = true
			this.pageDeviation = uni.upx2px(90)
			this.$emit('refresh')
		},
		//结束下拉刷新
		endPulldownRefresh() {
			this.refreshing = false
			this.pageDeviation = uni.upx2px(0)
		}
	}
}
</script>

<style lang="scss" scoped>
.cy-refresh-content {
	display: flex;
	flex-direction: column;
	position: relative;
}
/* 下拉刷新部分 */
.cy-loading-wrapper {
	position: absolute;
	left: 0;
	top: 0;
	transform: translateY(-100%);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	
}

.icon-pay-logo {
	font-size: 64rpx;
	color: #ff4d5e;
	transition: 0.3s;
}
.icon-pay-logo.ready {
	transform: scaleX(1.3);
}
.icon-pay-logo.active {
	animation: loading 0.5s ease-in infinite both alternate;
}

@keyframes loading {
	0% {
		transform: translateY(-20rpx) scaleX(1);
	}
	100% {
		transform: translateY(4rpx) scaleX(1.3);
	}
}
</style>
