<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="item flex-between align-center margin0">
			<view class="name">用户名</view>
			<view class="val">15972011425</view>
		</view>
		<view class="item flex-between align-center margin0">
			<view class="name">名称</view>
			<view class="val">FIL联合挖矿合约</view>
		</view>
		<view class="item flex-between align-center margin0">
			<view class="name">矿机总数</view>
			<view class="flex align-center" style="padding-right: 15rpx;">
				<view @click="quantity==1? '' : quantity--" class="relative">
					<u-icon name="minus" color="#000" size="26" class="absolute-auto"></u-icon>
				</view>
				<input type="number" v-model="quantity" placeholder-style="color:#000;font-size:28rpx" disabled/>
				<view @click="quantity++" class="relative">
					<u-icon name="plus" color="#000" size="30" class="absolute-auto"></u-icon>
				</view>
			</view>
		</view>
		<view class="item flex-between align-center margin0">
			<view class="name">代封存量</view>
			<view class="val">510.00TB</view>
		</view>
		<view class="item flex-between align-center margin0">
			<view class="name">质押总量</view>
			<view class="val">5024FIL</view>
		</view>
		<view class="item flex-between align-center margin0">
			<view class="name">当前封存扇区方案</view>
			<view class="val">32G</view>
		</view>
		<view class="item flex-between align-center margin0">
			<view class="name">质押周期</view>
			<view class="val">180天</view>
		</view>
		<view class="item flex-between align-center margin0">
			<view class="name">挖矿周期</view>
			<view class="val">231（32G）/253天（64G)</view>
		</view>
		<view class="item flex-between align-center margin0">
			<view class="name">开挖时间</view>
			<view class="val">24小时内</view>
		</view>
		<view class="item flex-between align-center margin0">
			<view class="name">合约期预计总收入</view>
			<view class="val">1123FIL</view>
		</view>
		<view class="bottomOp flex-between align-center fixed">
			<view class="left">5024FIL</view>
			<view class="btn text-center" @click="showPwd = true">支付</view>
		</view>
		
		<!-- 输入支付密码弹框 -->
		<u-popup  v-model="showPwd" :mask="mask" :mode="mode" border-radius="0">
			<view class="popPwd">
				<view class="popTitle text-center relative">
					请输入支付密码
					<image src="../../static/images/common/del.png" style="width: 28rpx;height: 28rpx;right: 30rpx;" 
					class="absolute-middle" @click="showPwd = false"></image>
				</view>
				<view class="placeholder80"></view>
				<u-message-input :mode="mode1" :maxlength="maxlength" :value="value"
				:breathe="breathe" :bold="bold" @finish="finish" :dot-fill="dotFill" :active-color="activeColor" :focus="focus"></u-message-input>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
        data() {
            return {
				quantity:1,
				mode1: 'box',
				maxlength: 6,
				value: '', 
				bold: true,
				breathe: true,
				dotFill: true,
				activeColor:'#FF891C',
				focus:true,
				showPwd:false,
				mask:true,
				mode:'bottom',
            }
        },
        onShow() {

        },
        methods: {
			finish(){
				this.$u.toast("密码输入完毕")
			}
        }
    }
</script>

<style lang="less" scoped>
	.item {
		width: 690rpx;
		height: 80rpx;
		.name {
			color: rgba(0,0,0,0.6);
			font-size: 30rpx;
		}
		.val {
			color: rgba(0,0,0,1);
			font-size: 30rpx;
		}
		input {
			width: 120rpx;
			height: 60rpx;
			border: 1rpx solid rgba(0,0,0,0.1);
			border-radius: 10rpx;
			margin: 0 30rpx;
			text-align: center;
		}
	}
	.bottomOp {
		width: 100%;
		height: 110rpx;
		background-color: #f1f1f1;
		z-index: 99;
		bottom: 0;
		.btn {
			width: 250rpx;
			line-height: 110rpx;
			background: #F16C00;
			font-size: 32rpx;
			font-weight: 600;
			color: #fff;
		}
		.left {
			line-height: 110rpx;
			color:#F16C00;
			font-size: 36rpx;
			font-weight: 600;
			padding-left: 30rpx;
		}
	}
	.popPwd {
		.popTitle {
			font-size: 32rpx;
			font-weight: 700;
			color: #000000;
			padding: 50rpx 0;
		}
		padding-bottom: 80rpx;
	}
</style>
