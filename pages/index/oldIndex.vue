<template>
	<view class="box">
		<view class="loop-Img">
			<swiper class="swiper" :autoplay="true" :circular="true" :interval="5000" :duration="1000">
				<swiper-item v-for="(item,index) in data.banner" :key="index">
					<image class="swiper-item" :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="pl-10 pr-10">
			<view class="notice-cont flex-center flex-j-between pl-15 pr-15" @click="app.showOpen('index/notice')">
				<image mode="widthFix" src="../../static/img/notice.png"></image>
				<view class="cont flex-center nowrap">
					<text class="tick font-10 font-white">推荐</text>
					<swiper class="notice nowrap" autoplay="true" circular="true" interval="6000">
						<swiper-item v-for="(item, index) in data.notice" :key="index" v-text="item.title"></swiper-item>
					</swiper>
				</view>
			</view>
			<view class="plate-title mt-25 mb-10 flex-center flex-j-between">
				<text class="title font-16 font-w-b">我的投资</text>
				<view class="flex-center font-12" @click="app.showOpen('index/invest')"><text class="font-yellow">详情</text><i class="iconfont icon-you font-light-gray ml-5 font-20"></i></view>
			</view>
			<view class="profit-cont">
				<view class="font-12 font-light-gray text-center">待领收益</view>
				<view class="font-20 font-yellow text-center font-w-b nowrap" v-text="data.waiting_earnings">0.00</view>
				<view class="flex-center flex-j-between pt-35">
					<view class="cont text-center nowrap">
						<view class="font-12 font-light-gray">收益总额</view>
						<view class="font-16 font-gray mt-5 nowrap" v-text="data.earnings">0.00</view>
					</view>
					<view class="cont text-center nowrap">
						<view class="font-12 font-light-gray">昨日收益</view>
						<view class="font-16 font-gray mt-5 nowrap" v-text="data.yes_earnings">0.00</view>
					</view>
				</view>
			</view>
			<view class="mt-25 mb-15 flex-center flex-j-between">
				<view class=""><text class="title font-16 font-w-b">消费套餐</text><text class="font-10 font-light-gray ml-10">小白投资，汇报无忧</text></view>
				<view class="flex-center font-12" @click="app.showOpen('index/product')"><text class="font-yellow">更多</text><i class="iconfont icon-you font-light-gray ml-5 font-20"></i></view>
			</view>
			<view class="list-content">
				<view class="cont-list pt-15 pb-15 pl-15 pr-15 mb-10" v-for="(item,index) in data.list" :key="index">
					<view class="font-12" v-text="item.name">这里是银行名称</view>
					<view class="data-cont pt-15 pb-20 flex-center flex-j-between">
						<view class="cont text-center">
							<view class="value font-18 font-w-b nowrap font-yellow" v-text="app._accMul(item.yield,100)+'%'">4.90%</view>
							<view class="font-10 font-light-gray nowrap">年化收益率</view>
						</view>
						<view class="cont text-center">
							<view class="value font-14 font-w-b nowrap" v-text="item.min_invest">500.00</view>
							<view class="font-10 font-light-gray">起投({{item.coin_name}})</view>
						</view>
						<view class="cont text-center">
							<view class="value font-14 font-w-b nowrap" v-text="item.earnings_times">0.00</view>
							<view class="font-10 font-light-gray">收益倍率</view>
						</view>
					</view>
					<view @click.stop=""><button class="btn" @click="app.showOpen('index/productDetails?id='+item.id)">立即投资</button></view>
				</view>
				<view class="text-center font-light-gray pt-40 pb-50" v-if="data.list.length==0">暂无数据~</view>
			</view>
		</view>
		<button class="btn mb-10 hide" @click="app.showOpen('login/login')" v-if="!hasLogin">登录</button>
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
				data:{
					banner:[],
					notice:[],
					waiting_earnings:0,
					earnings:0,
					yes_earnings:0,
					list:[],
				}
			}
		},
		onLoad() {
			var self=this;
			setTimeout(function(){
				if(self.hasLogin){
					self.getIndex();
				}
			},500);
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
		},
		methods: {
			...mapMutations(["SetUserInfo"]),
			getIndex:function(){
				var self=this;
				uni.request({
					url: config.api_service + "/get.product.index",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						config.api_status(res);
						if (res.data.code == 200) {
							self.data=res.data.data;
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {
						if(res.errMsg == 'request:fail timeout'){
							console.log("请求超时了");
						};
						console.log(JSON.stringify(res));
					},
					complete: (res) => {}
				});
			},
		},
		watch: {
			hasLogin: function(newValue, oldValue) {
				var self=this;
				if(newValue){
					self.getIndex();
				}else{
					self.data={
						banner:[],
						notice:[],
						waiting_earnings:0,
						earnings:0,
						yes_earnings:0,
						list:[],
					};
				};
			}
		}
	}
</script>

<style>
	/* .box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 150px;background-color: #211817;content: "";} */
	.loop-Img{width: 100%;height: 180px;position: relative;z-index: 1;}
	.loop-Img .swiper{width: 100%;height: 200px;}
	.loop-Img .swiper image{width: 100%;height: 100%;}
	.notice-cont{width: 100%;height: 44px;background-color: #FFFFFF;border-radius: 4px;box-shadow: 1px 1px 6px #E9E8E8;position: relative;z-index: 1;}
	.notice-cont image{width: 36px;}
	.notice-cont .tick{background-color: #E52321;border-radius: 1px;line-height: 14px;width: 20px;margin-right: 10px;}
	.notice-cont .cont{width: calc(100% - 50px);height: 100%;}
	.notice-cont .cont .notice{width: calc(100% - 40px);height: 100%;}
	.notice-cont .cont .notice swiper-item{width: 100%;height: 100%;font-size: 12px;color: #333333;line-height: 44px;}
	.profit-cont{width: 100%;background: url(../../static/img/index-product.png) no-repeat;background-size: 100% 100%;padding: 30px 10px 30px;}
	.profit-cont .cont{width: 50%;}
	.cont-list{width: 100%;border-radius: 4px;box-shadow: 1px 1px 6px #E9E8E8;}
	.cont-list .data-cont{width: 100%;}
	.cont-list .data-cont .cont{width: 33.3%;}
	.cont-list .data-cont .cont .value{line-height: 18px;margin-bottom: 5px;}
	.cont-list button.btn{width: 135px;line-height: 32px;font-size: 14px;}
</style>
