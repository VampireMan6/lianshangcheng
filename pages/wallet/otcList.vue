<template>
	<view class="box pt-10 pb-15 pl-15 pr-15">
		<view class="nav-list pb-20">
			<view class="nav" :class="{'active':nav==index}" @click="nav=index;init()" v-for="(item,index) in allCoin" :key="index" v-text="item.en_name">链++</view>
		</view>
		<view class="cont-list mb-15" v-for="(item,index) in list" :key="index">
			<view class="user-data flex-center flex-j-between">
				<view class="font-18 font-w-b nowrap flex-center"><image class="mr-10" :src="item.avatar?item.avatar:'../../static/img/ed65e399554bd6a5423f8c5da027b31.png'"></image>{{item.seller_name}}</view>
				<view class="font-12 font-light-gray nowrap">成交{{item.turnover}}笔</view>
			</view>
			<view class="flex-center flex-j-between pt-15">
				<view class="nowrap font-12">限额：</view>
				<view class="nowrap font-12">单价</view>
			</view>
			<view class="flex-center flex-j-between pt-5">
				<view class="nowrap font-12">{{item.min_amont}} {{item.coin_name}}-{{item.max_amount}} {{item.coin_name}}</view>
				<view class="font-18 font-w-b nowrap font-yellow">￥{{item.price}}</view>
			</view>
			<view class="btn-cont flex-center flex-j-between pt-10">
				<view class="nowrap">
					<image src="../../static/img/card.png"></image>
				</view>
				<button class="btn font-14 one-row" @click="app.showOpen('wallet/trade?data='+JSON.stringify(item))">卖出</button>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import coin from "@/common/js/coin.js"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				page:1,
				count:20,
				list:[],
				loadingType: 'more', //加载更多状态
				nav:0,
			}
		},
		onLoad() {
			var self=this;
			self.get_list();
		},
		onReachBottom(){//加载更多
			this.get_list();
		},
		onNavigationBarButtonTap(e) {
			var self=this;
			if(e.index==0){
				self.app.showOpen('wallet/otcRecord');
			};
		},
		computed:{
			...mapState(['allCoin']),
		},
		methods: {
			init:function(){
				var self=this;
				self.loadingType = 'more';
				self.page = 1;
				self.list = [];
				self.get_list();
			},
			get_list:function(){
				var self=this;
				if(self.loadingType === 'nomore'){
					return;
				}else{
					self.loadingType = 'loading';
				};
				let send={
					coin_id:self.allCoin[self.nav].id,
					page:self.page,
					count:self.count,
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.sales.sellers",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							for(var i=0;i<res.data.data.data.length;i++){
								var item=res.data.data.data[i];
								self.list.push(item);
							};
							if(res.data.data.data.length==0 || res.data.data.data.length<self.count){
								self.loadingType = 'nomore';
							}else{
								self.loadingType = 'more';
							};
							self.page++;
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {}
				});
			},
		}
	}
</script>

<style>
	.nav-list{width: 100%;white-space: nowrap;overflow-y: auto;}
	.nav-list .nav{padding-bottom: 5px;color: #999999;font-size: 16px;font-weight: bold;position: relative;margin-right: 25px;display: inline-block;}
	.nav-list .nav.active{color: #221915;}
	.nav-list .nav.active::after{position: absolute;left: 0px;bottom: 0px;height: 2px;width: 100%;background-color: #BD9E70;content: "";}
	.cont-list{width: 100%0;box-shadow: 1px 1px 6px #E9E8E8;padding: 16px;border-radius: 4px;overflow: hidden;}
	.cont-list .user-data{width: 100%;}
	.cont-list .user-data image{width: 25px;height: 25px;border-radius: 50%;}
	.cont-list .btn-cont{width: 100%;}
	.cont-list .btn-cont image{width: 16px;height: 16px;}
	.cont-list .btn-cont button.btn{width: 90px;line-height: 32px;border-radius: 4px;margin: 0px;}
</style>
