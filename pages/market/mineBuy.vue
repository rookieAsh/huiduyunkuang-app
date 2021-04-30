<template>
	<view class="page">
		<view class="div margin0 flex align-center">
			<view class="right flex-column flex-between">
				<view class="name">{{obj.name}}</view>
				<view class="number">
					<!-- <view class="price" style="color: #000;font-size: 32rpx;font-weight: 600;margin-bottom: 30rpx;">图灵矿机T6 Pro</view> -->
					<view class="flex relative align-center">
						<view style="color: #989898;font-size: 28rpx;margin-right: 60rpx;">数量</view>
						<view @click="down()" class="relative">
							<u-icon name="minus" color="#000" size="26" class="absolute-auto"></u-icon>
						</view>
						<input type="number" v-model="quantity" placeholder-style="color:#000;font-size:28rpx" disabled/>
						<view @click="up()" class="relative">
							<u-icon name="plus" color="#000" size="30" class="absolute-auto"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<image :src="obj.image" style="width: 220rpx;height: 160rpx;"></image>
		</view>
		
		<view class="bill margin0">
			<view class="subTitle flex-between">电费<view class="tip text-right">最小缴纳30天,最大缴纳90天</view></view>
			<view class="flex align-center">
				<view class="name">今日电费</view>
				<view class="val">{{obj.electricDay}}元/台/天</view>
			</view>
			<view class="flex align-center marTop">
				<view class="name">天数</view>
				<view class="flex align-center">
					<view class="num text-center" :class="{active:active==1}" @click="changeAct(1)">30天</view>
					<view class="num text-center" :class="{active:active==2}" @click="changeAct(2)">90天</view>
					<input type="number" placeholder="自定义" placeholder-style="color:rgba(0,0,0,0.4);font-size:24rpx;" v-model="days"/>
				</view>
				
			</view>
		</view>
		
		<view class="bill margin0 flex align-center" style="height: 90rpx;" @click="$tools.jump('../my/coupon')">
			<view class="th">优惠券</view>
			<view class="td">{{coupon}}{{this.coupon=="点击添加优惠券"?'':'￥'}}{{newAward}}</view>
		</view>
		
		<view class="bill margin0" style="border: none;">
			<view class="subTitle">金额</view>
			<view class="flex align-center marBottom">
				<view class="name">矿机总计</view>
				<view class="val">￥{{obj.mill_cost_sum |number(4)}}</view>
			</view>
			<view class="flex align-center marBottom">
				<view class="name">矿机税费</view>
				<view class="val">￥{{obj.cose |number(4)}}</view>
			</view>
			<view class="flex align-center marBottom">
				<view class="name">电费</view>
				<view class="val">￥{{obj.decimal |number(4)}}</view>
			</view>
			<view class="flex align-center marBottom">
				<view class="name">运费</view>
				<view class="val">￥{{obj.carriage |number(4)}}</view>
			</view>
			<view class="flex align-center">
				<view class="name">预计总价</view>
				<view class="val">￥{{cost |number(4)}}</view>
			</view>
		</view>
		
		<view class="bottomOp flex-between align-center fixed">
			<view class="left">￥{{cost |number(4)}}</view>
			<view class="btn text-center" @click="pay()">支付</view>
		</view>
	</view>
</template>

<script>
	export default {
        data() {
            return {
				obj:{},
				day:30,
				millCost:'',
				days:'',
				cost:'',
				quantity:'',
				active:1,
				orderId:'',
				coupon:"点击添加优惠券",
				newAward:''
            }
        },
        onLoad(opt) {
			this.quantity = opt.quantity
			this.orderId = opt.productId
			// this.cost = this.obj.quantity*this.obj.price + this.obj.charge*this.obj.quantity*90
        },
		onShow() {
			this.getInfo()
		},
		watch:{
			days(){
				if(this.days){
					this.active = '';
					this.getInfo()
				}else{
					this.active = 1;
					this.day = 30;
					setTimeout(()=>{
						this.getInfo()
					},200)
					
				}
			},	
		},
        methods: {
			down(){
				if(this.quantity==1) {
					return
				}else{
					 this.quantity = this.quantity - 1
				}
				this.getInfo()
			},
			up(){
				this.quantity  = Number(this.quantity) + 1
				this.getInfo()
			},
			getInfo(){
				uni.showLoading({
					title:"计算中..."
				})
				this.$Ajax('/MartianOrePool/millOrderPage',{
					orderId: this.orderId,
					day: this.days ? this.days : this.day,
					number: this.quantity
				},(res)=>{
					this.obj = res.data[0]
					this.millCost = Number(this.obj.mill_cost_sum)
					this.cost = Number(this.obj.mill_cost_sum) + Number(this.obj.cose) + Number(this.obj.decimal) + Number(this.obj.carriage) - Number(this.newAward)
					uni.hideLoading()
				})
			},
			pay(){
				let day = this.days ? this.days : this.day
				uni.navigateTo({
					url:'./pay?cost='+this.cost+'&days='+ day + '&name='+ this.obj.name + '&mallAdd=' + this.obj.addressKey +'&id='+this.orderId + '&n='+this.quantity +  '&millCost='+this.millCost
				})
			},
			changeAct(index){
				if(this.days) return
				this.active = index;
				if(index==1){
					this.day = 30;
					this.getInfo()
					this.days = ''
				}else {
					this.day = 90
					this.getInfo()
					this.days = ''
				}
			}
        }
    }
</script>

<style lang="less" scoped>
	.div {
		width: 690rpx;
		height: 300rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.1);
		padding-top: 30rpx;
		.right {
			flex:530rpx;
			height: 160rpx;
			padding-left: 30rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			.name {
				color: #000;
				font-size: 32rpx;
				font-weight: 600;
			}
			.number {
				width: 100%;
				input {
					display: block;
					width: 120rpx;
					height: 60rpx;
					border: 1rpx solid rgba(0,0,0,0.1);
					border-radius: 10rpx;
					margin: 0 30rpx;
					text-align: center;
				}
			}	
		}
	}

	.bill {
		width: 690rpx;
		height: 250rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.1);
		.subTitle {
			color: #000;
			font-weight: 600;
			color: 34rpx;
			padding: 30rpx 0;
		}
		.name {
			width: 200rpx;
			color: rgba(0,0,0,0.6);
			font-size: 28rpx;
		}
		.val {
			color: #000;
			font-size: 28rpx;
		}
		.num {
			width: 100rpx;
			height: 46rpx;
			line-height: 42rpx;
			border: 1rpx solid #FFF4E9;
			border-radius: 5rpx;
			margin-right: 30rpx;
			font-size: 24rpx;
		}
		.active {
			border: 1rpx solid #FF3600;
			background: #FFEEE3;
		}
		input {
			width: 100rpx;
			height: 44rpx;
			background: #FFF4E9;
			text-align: center;
			font-size: 24rpx;
		}
		.marTop {
			margin-top: 30rpx;
		}
		.marBottom {
			margin-bottom: 10rpx;
		}
		.tip {
			flex: 1;
			color: rgba(0,0,0,0.5);
			font-size: 20rpx;
		}
		.th {
			color: rgba(0,0,0,0.5);
			font-size: 28rpx;
		}
		.td {
			color: rgba(0,0,0,1);
			font-size: 28rpx;
			padding-left: 30rpx;
		}
	}
	
	.bottomOp {
		width: 100%;
		height: 110rpx;
		background-color: #F1F1F1;
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
</style>