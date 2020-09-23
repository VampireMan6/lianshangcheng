<template>
	<view class="box" v-if="data">
		<view class="cont-list bc-white">
			<view class="cont-data flex-row flex-j-between">
				<image :src="data.thumb"></image>
				<view class="text-data">
					<view class="name show-row lh-20" v-text="data.title">海南特产大树菠萝蜜十年老树整个20-25斤/10-12.5kg木菠萝</view>
					<view class="nowrap font-light-gray font-10 pt-10">规格：13斤-17斤/个</view>
				</view>
				<view class="price-data text-right">
					<view class="font-11 nowrap">{{data.shop_price}}{{data.coin_name}}</view>
					<view class="font-10 font-light-gray pt-10 nowrap">共{{data.buy_num}}{{data.unit}}</view>
				</view>
			</view>
		</view>
		<view class="pl-15 pr-15 bc-white mt-15">
			<view class="Input-cont flex-center flex-j-between" @click="app.showOpen('cart/writeForm?data='+JSON.stringify(data)+'&info='+JSON.stringify(info))">
				<view class="one-row pr-20 flex-center">
					<image mode="widthFix" src="../../static/img/91f5720766ef13a488219fd3238047a.png"></image>
					<text class="ml-15">我要退货:</text>
				</view>
				<view class="font-light-gray">
					退回已收到的商品
					<i class="iconfont icon-you font-light-gray ml-10 font-20"></i>
				</view>
			</view>
			<view class="Input-cont flex-center flex-j-between" @click="app.showOpen('cart/writeForm2?data='+JSON.stringify(data)+'&info='+JSON.stringify(info))">
				<view class="one-row pr-20 flex-center">
					<image mode="widthFix" src="../../static/img/31f64524b438b2c49c4fc16f5b4bf34.png"></image>
					<text class="ml-15">我要换货:</text>
				</view>
				<view class="font-light-gray">
					更换已收到的商品
					<i class="iconfont icon-you font-light-gray ml-10 font-20"></i>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				data:"",
				info:"",
			};
		},
		onLoad(e) {
			var self=this;
			e.data=JSON.parse(e.data);
			self.info=e.data;
			self.data=e.data.order_goods[e.index];
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("@/common/css/order.css");
	page{background-color: #F5F5F5;}
	.cont-list{border-radius: 0px;box-shadow: 0px;}
	.Input-cont{width: 100%;height: 50px;border-bottom: 1px solid #F5F5F5;}
	.Input-cont image{width: 16px;}
</style>
