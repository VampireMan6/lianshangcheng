<template>
	<view class="box pl-15 pr-15 pt-20 pb-20">
		<view class="base-data bc-white mb-5">
			<view class="text-center font-12 pt-15 font-light-gray">累计消费(链++)</view>
			<view class="text-center font-20 font-w-b font-yellow nowrap pb-10" v-text="data.invest">0.00</view>
			<view class="data-cont">
				<view class="flex-center flex-j-between">
					<view class="cont flex-center flex-j-center nowrap">
						<view class="text-center font-8 font-light-gray one-row">待领收益(链++)</view>
						<!-- <view class="text-center font-12 font-black ml-5 nowrap" v-text="app._accMul(data.waiting_earnings,0.7)">0.00</view> -->
						<view class="text-center font-12 font-black ml-5 nowrap" v-text="app._toFixed(data.waiting_earnings,2)">0.00</view>
					</view>
					<view class="cont flex-center flex-j-center nowrap">
						<view class="text-center font-8 font-light-gray one-row">已领收益(链++)</view>
						<view class="text-center font-12 font-black ml-5 nowrap" v-text="app._toFixed(data.earnings_otg,2)">0.00</view>
					</view>
				</view>
				<view class="flex-center flex-j-between pt-10">
					<view class="cont flex-center flex-j-center nowrap">
						
					</view>
					<view class="cont flex-center flex-j-center nowrap">
						<view class="text-center font-8 font-light-gray one-row">已领收益(链++)</view>
						<view class="text-center font-12 font-black ml-5 nowrap" v-text="app._toFixed(data.earnings_ots,2)">0.00</view>
					</view>
				</view>
			</view>
		</view>
		<view class="plate-title flex-center flex-j-between mt-20 mb-20">
			<text class="title font-16 font-w-b">我的消费</text>
			<text class="font-14 font-yellow" @click="app.showOpen('index/bill')">收益明细</text>
		</view>
		<view class="list-content">
			<view class="cont-list pl-15 pr-15 mb-10" v-for="(item,index) in data.list" :key="index" @click="app.showOpen('index/billDetails?id='+item.id)">
				<view class="font-12 pt-15 nowrap" v-text="item.name">QSC-17639642996</view>
				<view class="data-cont pt-20 pb-20 flex-center flex-j-between">
					<view class="cont text-center">
						<view class="font-14 font-w-b nowrap pb-5" v-text="app._accMul(item.yield,100)+'%'">4.90%</view>
						<view class="font-10 font-light-gray nowrap">每日赠送比例</view>
					</view>
					<view class="cont text-center">
						<view class="font-14 font-w-b nowrap pb-5" v-text="item.money">0.00</view>
						<view class="font-10 font-light-gray nowrap">链++</view>
					</view>
					<view class="cont text-center">
						<view class="font-14 font-w-b nowrap pb-5 font-yellow" v-text="item.earnings">0.00</view>
						<view class="font-10 font-light-gray nowrap">剩余返回</view>
					</view>
				</view>
			</view>
			<view class="text-center font-light-gray pt-40 pb-50" v-if="data.list.length==0">暂无数据~</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				data:{
					invest:0,
					waiting_earnings:0,
					earnings:0,
					earnings_otg:"",
					earnings_ots:"",
					list:[],
				}
			}
		},
		onLoad() {
			var self=this;
			self.getData();
		},
		methods: {
			getData:function(){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.user.invest",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.data=res.data.data;
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {
						uni.hideNavigationBarLoading();
						if(res.errMsg == 'request:fail timeout'){
							console.log("请求超时了");
						};
						console.log(JSON.stringify(res));
					},
					complete: (res) => {}
				});
			}
		}
	}
</script>

<style>
	.box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 100px;background-color: #1A2B5A;content: "";}
	.base-data{width: 100%;position: relative;z-index: 1;border-radius: 4px;box-shadow: 0px 2px 6px #E9E8E8;}
	.base-data .data-cont{width: 100%;padding: 15px 10px;position: relative;}
	.base-data .data-cont::after{position: absolute;top: 15px;left: 50%;width: 1px;height: calc(100% - 30px);background-color: #F5F5F5;content: "";}
	.base-data .data-cont .cont{width: 50%;}
	.cont-list{width: 100%;box-shadow: 1px 1px 6px #E9E8E8;border-radius: 4px;}
	.cont-list .data-cont{width: 100%;}
	.cont-list .data-cont .cont{width: 33.3%;}
</style>
