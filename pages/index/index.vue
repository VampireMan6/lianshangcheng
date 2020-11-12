<template>
	<view class="box">
		<view class="tab-line"></view>
		<view class="heade-cont flex-center flex-j-between pl-15">
			<view class="cont flex-center font-14 font-w-b" style="color: #FFFEFF;">
				<image class="mr-10" style="border-radius: 50%;" mode="widthFix" src="../../static/img/cd1c607680e0d8d47b5e0f2494114f3.jpg"></image>
				链++区块链数字平台
			</view>
			<view class="pr-20 pl-20" @click="app.showOpen('market/search')">
				<image class="icon" mode="widthFix" src="../../static/img/search.png"></image>
			</view>
		</view>
		<view class="loop-Img">
			<swiper class="swiper" :autoplay="true" :circular="true" :interval="5000" :duration="1000">
				<swiper-item v-for="(item,index) in data.banner" :key="index">
					<image class="swiper-item" :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="pl-10 pr-10">
			<view class="notice-cont flex-center flex-j-between pl-15 pr-15" @click="app.showOpen('index/notice')">
				<!-- <image mode="widthFix" src="../../static/img/notice.png"></image> -->
				<text style="font-weight: 700;">公告</text>
				<view class="cont flex-center nowrap">
					<text class="tick font-10 font-white">推荐</text>
					<swiper class="notice nowrap" autoplay="true" circular="true" interval="6000">
						<swiper-item v-for="(item, index) in data.notice" :key="index" v-text="item.title"></swiper-item>
					</swiper>
				</view>
			</view>
			<!-- <view class="flex-center flex-j-between mt-25">
				<view class="block-cont flex-center flex-j-between" @click="app.showOpen('market/searchResult?name=购物券专区&coin_id=3')">
					<view>
						<view class="font-14 font-black font-w-b pb-15">购物券专区</view>
						<view class="btn font-white font-10 text-center">立即进入</view>
					</view>
					<image mode="widthFix" src="../../static/img/0c571d6ad9305b21632c9f91ae9a54b.png"></image>
				</view>
				<view class="block-cont flex-center flex-j-between" @click="app.showOpen('market/searchResult?name=OTS消费专区&coin_id=1')">
					<view>
						<view class="font-14 font-black font-w-b pb-15">OTS消费专区</view>
						<view class="btn font-white font-10 text-center">立即进入</view>
					</view>
					<image mode="widthFix" src="../../static/img/1edc415595ae18df941684b8a000c21.png"></image>
				</view>
			</view> -->
			<view v-if="data.template_list&&data.template_list[0]">
				<view class="flex-center flex-j-between mt-30 mb-20">
					<view class="title font-16 font-w-b" style="background-color: #ff1e0a;border-radius: 12rpx;padding: 8rpx 16rpx;" 
					v-text="data.template_list[0].title">店主推荐</view>
					<view class="flex-center font-12" @click="app.showOpen('market/searchResult?type=seller_cat_id&name='+data.template_list[0].title+'&id='+data.template_list[0].id)">
						<text class="font-light-gray">更多</text><i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
					</view>
				</view>
				<view class="elect-content">
					<view class="cont-list mr-15" v-for="(item,index) in data.template_list[0].list" :key="index" @click="app.showOpen('market/details?id='+item.id)">
						<image :src="item.thumb"></image>
						<view class="pl-10 pr-10 pt-10 pb-15">
							<view class="name nowrap mb-10 font-14" v-text="item.title">草莓水果沙拉超级无底好吃</view>
							<view class="price nowrap font-14 flex-center">
								<text class="nowrap font-yellow" v-text="item.shop_price">100.0000</text>
								<text class="one-row ml-5" v-text="item.coin_name">QSC</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="data.template_list&&data.template_list[1]">
				<view class="flex-center flex-j-between mt-30 mb-20">
					<view class="title font-16 font-w-b" v-text="data.template_list[1].title"
					style="background-color: #ff1e0a;border-radius: 12rpx;padding: 8rpx 16rpx;">订购系列</view>
					<view class="flex-center font-12" @click="app.showOpen('market/searchResult?type=seller_cat_id&name='+data.template_list[1].title+'&id='+data.template_list[1].id)">
						<text class="font-light-gray">更多</text><i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
					</view>
				</view>
				<view class="plate-cont" v-for="(item,index) in data.template_list[1].list" :key="index" v-if="index==0" @click="app.showOpen('market/details?id='+item.id)">
					<image :src="item.thumb"></image>
					<view class="pl-10 pr-10 pt-10 pb-15">
						<view class="nowrap font-14 flex-center flex-j-between">
							<view class="ct nowrap" v-text="item.title">主标题</view>
							<view class="ct nowrap flex-center flex-j-end"><text class="font-yellow" v-text="item.shop_price">0.00</text>{{item.coin_name}}</view>
						</view>
						<view class="nowrap font-14 flex-center flex-j-between mt-5">
							<view class="ct nowrap font-11 font-light-gray" v-text="item.subtitle">副标题 副标题 副标题 副标题 副标题</view>
							<!-- <view class="ct nowrap font-12 font-light-gray">≈{{app._accMul(item.shop_price,item.rate_cny)}} CNY</view> -->
						</view>
					</view>
				</view>
			</view>
			<view v-if="data.template_list&&data.template_list[2]">
				<view class="flex-center flex-j-between mt-30 mb-20">
					<text class="title font-16 font-w-b" v-text="data.template_list[2].title">每日热销</text>
					<view class="flex-center font-12" @click="app.showOpen('market/searchResult?type=seller_cat_id&name='+data.template_list[2].title+'&id='+data.template_list[2].id)">
						<text class="font-light-gray">更多</text><i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
					</view>
				</view>
				<view class="list-content flex-row flex-j-between">
					<view class="cont-list" v-for="(item,index) in data.template_list[2].list" :key="index" @click="app.showOpen('market/details?id='+item.id)">
						<image :src="item.thumb"></image>
						<view class="pl-10 pr-10 pt-10 pb-15">
							<view class="name nowrap mb-10 font-14" v-text="item.title">草莓水果沙拉超级无底好吃</view>
							<view class="price nowrap font-14 flex-center">
								<text class="nowrap font-yellow" v-text="item.shop_price">100.0000</text>
								<text class="one-row ml-5" v-text="item.coin_name">QSC</text>
							</view>
							<!-- <view class="cny-price nowrap font-12 font-light-gray lh-20">≈{{app._accMul(item.shop_price,item.rate_cny)}} CNY</view> -->
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="mt-25 mb-15 flex-center flex-j-between">
				<view class=""><text class="title font-16 font-w-b">消费套餐</text><text class="font-10 font-light-gray ml-10 hide">小白投资，汇报无忧</text></view>
				<view class="flex-center font-12 hide" @click="app.showOpen('index/product')"><text class="font-yellow">更多</text><i class="iconfont icon-you font-light-gray ml-5 font-20"></i></view>
			</view>
			<view class="pr-list pt-15 pb-15 pl-15 pr-15 mb-10" v-for="(item,index) in data.list" :key="index" v-if="index==0" @click="app.showOpen('index/productDetails?id='+item.id)">
				<view class="font-12 flex-center flex-j-between nowrap">
					<text class="font-12 nowrap" v-text="item.name">这里是银行名称</text>
					<i class="iconfont icon-you font-light-gray font-20"></i>
				</view>
				<view class="data-cont pt-15 pb-20 flex-center flex-j-between">
					<view class="cont text-center">
						<view class="value font-18 font-w-b nowrap font-yellow" v-text="app._accMul(item.yield,100)+'%'">4.90%</view>
						<view class="font-10 font-light-gray nowrap">消费赠送率</view>
					</view>
					<view class="cont text-center">
						<view class="value font-14 font-w-b nowrap" v-text="item.min_invest">500.00</view>
						<view class="font-10 font-light-gray">最低消费</view>
					</view>
					<view class="cont text-center">
						<view class="value font-14 font-w-b nowrap" v-text="item.earnings_times+'倍'">0.00</view>
						<view class="font-10 font-light-gray">返回倍率</view>
					</view>
				</view>
			</view> -->
		</view>
		<!-- <go-login :show="!hasLogin"></go-login> -->
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import goLogin from "@/components/go-login/go-login.vue";
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			goLogin
		},
		data() {
			return {
				data:{
					banner:[],
					notice:[],
					template_list:[],
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
		onPullDownRefresh() {
			var self=this;
			self.getIndex();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
		},
		methods: {
			...mapMutations(["SetUserInfo"]),
			getIndex:function(){
				var self=this;
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.product.index",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideLoading();
						// console.log(JSON.stringify(res));
						config.api_status(res);
						if (res.data.code == 200) {
							self.data=res.data.data;
							console.log(self.data)
						}else{
							console.log(JSON.stringify(res));
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {
						uni.hideLoading();
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
						list:[],
					};
				};
			}
		}
	}
</script>

<style>
	@import url("@/common/css/index.css");
</style>
