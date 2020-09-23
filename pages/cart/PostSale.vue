<template>
	<view class="box pl-15 pr-15 pb-15">
		<view class="list-content">
			<view class="cont-list" v-for="(item,index) in list" :key="index">
				<view class="store-name flex-center flex-j-between pb-15">
					<view class="flex-center nowrap">
						<image class="mr-15" mode="widthFix" src="../../static/img/store.png"></image>{{item.shop_name}}
					</view>
					<view class="font-yellow font-12 one-row" v-if="item.refund_id!=0&&item.return_id!=0">申请退货中</view>
					<view class="font-yellow font-12 one-row" v-else-if="item.return_id!=0">申请换货中</view>
				</view>
				<view class="cont-data flex-row flex-j-between">
					<image :src="item.sku.thumb"></image>
					<view class="text-data">
						<view class="name show-row lh-20" v-text="item.sku.title">海南特产大树菠萝蜜十年老树整个20-25斤/10-12.5kg木菠萝</view>
						<view class="nowrap font-light-gray font-10 pt-10">规格：13斤-17斤/个</view>
					</view>
					<view class="price-data text-right">
						<view class="font-11 nowrap">{{item.sku.shop_price}}{{item.sku.coin_name}}</view>
						<view class="font-10 font-light-gray pt-10 nowrap">共{{item.sku.buy_num}}{{item.sku.unit}}</view>
					</view>
				</view>
				<view class="btn-cont flex-center flex-j-end pt-10">
					<button class="order-btn btn1" @click="app.showOpen('cart/orderDetail?data='+JSON.stringify(item))">查看详情</button>
					<button class="order-btn btn2" @click="cancelOrder(item.return_id)">取消申请</button>
				</view>
				
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
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
			}
		},
		onLoad() {
			var self=this;
			self.get_list();
		},
		onReachBottom(){//加载更多
			this.get_list();
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
					page:self.page,
					count:self.count,
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.user.after.sale",
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
			cancelOrder:function(id){//取消
				var self=this;
				uni.showModal({
					content: "确定取消当前订单的售后请求吗？",
					confirmText: "确定",
					cancelText: "暂不",
					success: function (e) {
						if(e.confirm){
							var send={
								return_id:id,
							};
							uni.showNavigationBarLoading();
							uni.request({
								url: config.api_service + "/post.return.cancel",
								data: send,
								method: "post",
								header: {Authorization: config.getToken()},
								success: res => {
									// console.log(JSON.stringify(res));
									uni.hideNavigationBarLoading();
									config.api_status(res);
									if (res.data.code == 200) {
										self.app._toast(res.data.message);
										setTimeout(function(){
											self.init();
										},500);
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
						};
					}
				})
			},
		}
	}
</script>

<style>
	@import url("@/common/css/order.css");
</style>
