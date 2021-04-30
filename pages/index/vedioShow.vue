<template>
	<view class="page">
		<view class="placeholder30"></view>
		<view class="item flex-between align-center margin30-0" 
		v-for="(item,index) in list" :key="index" @click="$tools.jump('./showInfo',item.name,item.ver)">
			<view>{{item.name}}</view>
			<image src="../../static/images/common/a_right.png" style="width: 16rpx;height: 28rpx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
        data() {
            return {
				list:[
					{
						name:'BTC挖矿',
						ver:1
					},
					{
						name:'ETH挖矿',
						ver:2
					},
					{
						name:'LTC挖矿',
						ver:3
					},
					{
						name:'多矿机工作，但矿池只显示1台机器',
						ver:4
					},
					{
						name:'矿机固件升级（更新固件）方法',
						ver:5
					},
					{
						name:'如何ping挖矿地址？',
						ver:6
					},
					{
						name:'如何安装矿机？',
						ver:7
					},
					{
						name:'如何查找矿机IP？',
						ver:8
					},
					{
						name:'如何设置静态IP？',
						ver:9
					},
					{
						name:'如何使用IP地址挖矿？',
						ver:10
					},
					{
						name:'神马矿机WhatsMiner操作指南（M3为例） ',
						ver:11
					}
				]
            }
        },
        onShow() {

        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
	.item {
		width: 690rpx;
		height: 60rpx;
		border-bottom: 1rpx solid #ececec;
	}
</style>
