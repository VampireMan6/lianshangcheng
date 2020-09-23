<template>
	<view class="box pl-15 pr-15 pb-15">
		<view class="nav-cont flex-center flex-j-between">
			<view class="nav-name" :class="{'active':type==0}" @click="type=0;init();">全部</view>
			<view class="nav-name" :class="{'active':type==1}" @click="type=1;init();">待支付</view>
			<view class="nav-name" :class="{'active':type==2}" @click="type=2;init();">待配送</view>
			<view class="nav-name" :class="{'active':type==3}" @click="type=3;init();">配送中</view>
			<view class="nav-name" :class="{'active':type==4}" @click="type=4;init();">待评价</view>
		</view>
		<view class="list-content">
			<view class="cont-list" v-for="(item,index) in list" :key="index">
				<view class="store-name flex-center flex-j-between pb-15">
					<view class="flex-center nowrap">
						<image class="mr-15" mode="widthFix" src="../../static/img/store.png"></image>{{item.shop_name}}
					</view>
					<view class="font-yellow font-12 one-row" v-text="getStatus(item)">已取消</view>
				</view>
				<view v-for="(jtem,jndex) in item.order_goods" :key="jndex">
					<view class="cont-data flex-row flex-j-between mb-15" @click="app.showOpen('cart/orderDetail?data='+JSON.stringify(item))">
						<image :src="jtem.thumb"></image>
						<view class="text-data">
							<view class="name show-row lh-20" v-text="jtem.title">海南特产大树菠萝蜜十年老树整个20-25斤/10-12.5kg木菠萝</view>
							<view class="nowrap font-light-gray font-10 pt-10" v-if="jtem.spec">规格：{{getSpec(jtem.spec)}}</view>
							<view class="nowrap font-light-gray font-10 pt-10" v-else>规格：{{jtem.subtitle+jtem.buy_num+jtem.unit}}</view>
						</view>
						<view class="price-data text-right">
							<view class="font-11 nowrap">{{jtem.shop_price+jtem.coin_name}}</view>
							<view class="font-10 font-light-gray pt-10 nowrap">共{{jtem.buy_num+jtem.unit}}</view>
						</view>
					</view>
					<view class="btn-cont flex-center flex-j-end mb-20" v-if="getStatus(item)=='已完成'&&jtem.iscomment==0">
						<button class="order-btn btn2" @click="app.showOpen('cart/remarks?data='+JSON.stringify(jtem))">评价</button>
					</view>
				</view>
				<view class="btn-cont flex-center flex-j-end" v-if="getStatus(item)=='待支付'">
					<button class="order-btn btn1" @click="cancelOrder(item.id)">取消订单</button>
					<button class="order-btn btn2" @click="goPay(item)">立即支付</button>
				</view>
				<view class="btn-cont flex-center flex-j-end" v-else-if="getStatus(item)=='待收货'">
					<button class="order-btn btn1" @click="app.showOpen('cart/news?data='+JSON.stringify(item))">查看物流</button>
					<button class="order-btn btn2" @click="fixOrder(item.sub_sn)">确认收货</button>
				</view>
				<view class="btn-cont flex-center flex-j-end" v-else-if="getStatus(item)=='已取消'">
					<button class="order-btn btn1" @click="removeOrder(item.id)">删除订单</button>
					<!-- <button class="order-btn btn2" @click="app.showOpen('cart/logistics')">再次购买</button> -->
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
				type:0,
				page:1,
				count:20,
				list:[],
				loadingType: 'more', //加载更多状态
			}
		},
		onLoad(e) {
			var self=this;
			// console.log(config.getToken());
			self.type=e.type;
			self.get_list();
		},
		onReachBottom(){//加载更多
			this.get_list();
		},
		methods: {
			goPay:function(item){
				var self=this;
				uni.redirectTo({
				    url: '/pages/market/pay?id='+item.order_sn
				});
			},
			fixOrder:function(id){//确认收货
				var self=this;
				uni.showModal({
					content: "确定已经收到当前订单的货物了吗？",
					confirmText: "确定",
					cancelText: "没有",
					success: function (e) {
						if(e.confirm){
							var send={
								sub_sn:id,
							};
							uni.showNavigationBarLoading();
							uni.request({
								url: config.api_service + "/post.order.confirm",
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
			removeOrder:function(id){//删除当前订单
				var self=this;
				uni.showModal({
					content: "确定删除当前订单吗？",
					confirmText: "确定",
					cancelText: "取消",
					success: function (e) {
						if(e.confirm){
							var send={
								order_id:id,
							};
							uni.showNavigationBarLoading();
							uni.request({
								url: config.api_service + "/post.order.del",
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
			cancelOrder:function(id){//取消当前订单
				var self=this;
				uni.showModal({
					content: "确定取消当前订单吗？",
					confirmText: "确定",
					cancelText: "取消",
					success: function (e) {
						if(e.confirm){
							var send={
								order_id:id,
							};
							uni.showNavigationBarLoading();
							uni.request({
								url: config.api_service + "/post.order.cancel",
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
			getStatus:function(item){
				if(item.status==1 && item.pay_status==0){
					return "待支付";
				}else if(item.status==1 && item.pay_status==1 && item.delivery_status<2){
					return "待发货";
				}else if(item.status==1 && item.pay_status==1 && item.delivery_status==2 &&item.finish_status==0){
					return "待收货";
				}else if(item.status==1 && item.pay_status==1 && item.delivery_status==2 &&item.finish_status==2){
					return "已完成";
				}else if(item.status==2){
					return "已取消";
				}
			},
			getSpec:function(s){
				s=JSON.parse(s);
				let str="";
				s.forEach(function(item){
					str=str+item.name+':'+item.value.title+";";
				})
				return str
			},
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
					status:self.type,//0：全部，1待支付，2待配送，3配送中，4待评价
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.user.order",
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
	@import url("@/common/css/order.css");
</style>
