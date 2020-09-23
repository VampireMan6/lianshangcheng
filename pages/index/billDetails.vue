<template>
	<view class="box pl-15 pr-15 pt-20 pb-20" v-if="data">
		<view class="base-data text-center pt-10 pb-25">
			<view class="title font-12 pb-10">金额({{data.invest.coin_name}})</view>
			<view class="value font-yellow font-w-b" v-text="data.invest.money">0.00</view>
		</view>
		<view class="data-content">
			<view class="product-data bc-white pl-15 pr-15 mb-25 pt-15">
				<view class="plate-title mb-20">
					<text class="title font-16 font-w-b">消费信息</text>
				</view>
				<view class="data-cont flex-center flex-j-between nowrap font-12 pb-20">
					<text class="one-row">订单编号</text>
					<text class="nowrap" v-text="data.invest.out_trade_no">QSC-17639642996</text>
				</view>
				<view class="data-cont flex-center flex-j-between nowrap font-12 pb-20">
					<text class="one-row">日赠送率</text>
					<text class="nowrap" v-text="app._accMul(data.invest.yield,100)+'%'">4.90%</text>
				</view>
				<view class="data-cont flex-center flex-j-between nowrap font-12 pb-20">
					<text class="one-row">消费金额</text>
					<text class="nowrap">{{ app._accMul(data.invest.money,data.invest.earnings_times) - data.invest.earnings }} {{data.invest.coin_name}} / {{app._accMul(data.invest.money,data.invest.earnings_times)}} {{data.invest.coin_name}}</text>
				</view>
				<view class="data-cont flex-center flex-j-between nowrap font-12 pb-20">
					<text class="one-row">消费时间</text>
					<text class="nowrap" v-text="data.invest.pay_time">2020-04-01 18:22:10</text>
				</view>
				<view class="data-cont flex-center flex-j-between nowrap font-12 pb-20">
					<text class="one-row">生效时间</text>
					<text class="nowrap" v-text="data.invest.effect_time">2020-04-02</text>
				</view>
			</view>
			<view class="nav-cont flex-center">
				<text class="nav-name" :class="{'active':nav==1}" @click="nav=1;getDetails();">链++</text>
				<text class="nav-name" :class="{'active':nav==2}" @click="nav=2;getDetails();">链++</text>
			</view>
			<view class="list-content pl-15 pr-15">
				<view class="cont-list pl-5 pr-5 mb-10" v-for="(item,index) in data.list" :key="index">
					<view class="flex-center flex-j-between nowrap pb-5">
						<text class="font-14 font-w-b nowrap" v-text="item.mobile?app._phoneMethod(item.mobile):app._phoneMethod(userInfo.mobile)">QSC-17639642996</text>
						<!-- <text class="font-12 font-light-gray one-row" v-text="item.release_type==1?'每日释放':item.release_type==2?'直推加速':item.release_type==3?'团队加速':'领导奖'">每日释放</text> -->
						<text class="font-12 font-light-gray one-row">推荐奖励</text>
					</view>
					<view class="flex-center flex-j-between nowrap">
						<text class="font-12 font-light-gray one-row" v-text="item.created_at">2020-04-01 00:30:01</text>
						<text class="font-14 font-yellow font-w-b nowrap">{{item.money}} {{item.coin_name}}</text>
					</view>
				</view>
				<view class="text-center font-light-gray pt-40 pb-50" v-if="data.list.length==0">暂无数据~</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				id:"",
				nav:1,
				data:"",
			}
		},
		onLoad(e) {
			var self=this;
			self.id=e.id;
			self.getDetails();
		},
		computed:{
			...mapState(["hasLogin",'userInfo','qiniu']),
		},
		methods: {
			getDetails:function(){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.invest.detail",
					data: {
						invest_id:self.id,
						coin_type:self.nav,
					},
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
			},
		}
	}
</script>

<style>
	.box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 150px;background-color: #211817;content: "";}
	.base-data{width: 100%;position: relative;z-index: 1;}
	.base-data .title{color: #F9F9F9;}
	.base-data .value{font-size: 24px;}
	.data-content{position: relative;z-index: 1;width: 100%;}
	.data-content .product-data{border-radius: 4px;box-shadow: 0px 2px 6px #E9E8E8;}
	.nav-cont{width: 100%;position: relative;z-index: 1;padding-bottom: 16px;}
	.nav-cont .nav-name{color: #999999;font-size: 14px;position: relative;margin-right: 30px;}
	.nav-cont .nav-name.active{color: #E52321;font-weight: bold;font-size: 16px;}
	.list-content{width: 100%;position: relative;z-index: 1;border-radius: 4px;background-color: #FFFEFF;box-shadow: 1px 1px 6px #E9E8E8;}
	.cont-list{padding: 16px 0px;position: relative;border-bottom: 1px solid #F5F5F5;}
</style>
