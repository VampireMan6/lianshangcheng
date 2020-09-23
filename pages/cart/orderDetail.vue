<template>
	<view class="box" v-if="data">
		<view class="status-cont font-white" v-if="getStatus(data)=='待支付'">
			<view class="font-16">订单待支付</view>
			<view class="font-14 pt-10">等待买家付款</view>
		</view>
		<view class="status-cont font-white" v-else-if="getStatus(data)=='待收货'">
			<view class="font-16">商家已发货</view>
			<view class="font-14 pt-10">配送：{{data.delivery_name}}</view>
		</view>
		<view class="status-cont font-white" v-else-if="getStatus(data)=='已完成'">
		<view class="font-16">订单已完成</view>
		<view class="font-14 pt-10">祝你生活愉快</view>
		</view>
		<view class="status-cont font-white" v-else-if="getStatus(data)=='待发货'">
			<view class="font-16">订单待发货</view>
			<view class="font-14 pt-10">请等候</view>
		</view>
		<view class="pl-15 pr-15 bc-white mb-15">
			<view class="order-stauts flex-row flex-j-between pt-15 pb-15" v-if="getStatus(data)=='待收货'" @click="app.showOpen('cart/news?data='+JSON.stringify(data))">
				<image mode="widthFix" src="../../static/img/94d696b5ca525948cc811996081ebc7.png"></image>
				<view class="data">
					<view class="nowrap" v-text="newsInfo.context">您的订单已进入第三方卖家仓库，准备出库</view>
					<view class="font-12 font-light-gray pt-10" v-text="newsInfo.time">2019-09-27  11:01:54</view>
				</view>
				<i class="iconfont icon-you"></i>
			</view>
			<view class="address-cont flex-row flex-j-between pt-15 pb-15">
				<image mode="widthFix" src="../../static/img/0e2698189b760e661d3a72419202127.png"></image>
				<view class="data">
					<view class="flex-center nowrap">收货人:{{data.order_address.address_name}}<text class="one-row ml-5" v-text="data.order_address.address_mobile">15823560265</text></view>
					<view class="flex-center newlines font-12 font-light-gray pt-10" v-text="data.order_address.address_detail">浙江省杭州市余杭区  瓶窑镇凤都工业园凤城路1-1  中国邮政3楼</view>
				</view>
				<i class="iconfont icon-you font-white"></i>
			</view>
		</view>
		<view class="cont-list bc-white" v-for="(item,index) in data.order_goods" :key="index">
			<view class="cont-data flex-row flex-j-between">
				<image :src="item.thumb"></image>
				<view class="text-data">
					<view class="name show-row lh-20" v-text="item.title">海南特产大树菠萝蜜十年老树整个海0-12.5kg木菠萝</view>
					<view class="nowrap font-light-gray font-10 pt-10" v-if="item.spec">规格：{{getSpec(item.spec)}}</view>
					<view class="nowrap font-light-gray font-10 pt-10" v-else>规格：{{item.subtitle+item.buy_num+item.unit}}</view>
				</view>
				<view class="price-data text-right">
					<view class="font-11 nowrap">{{item.shop_price}}{{item.coin_name}}</view>
					<view class="font-10 font-light-gray pt-10 nowrap">共{{item.buy_num}}{{item.unit}}</view>
				</view>
			</view>
			<view class="flex-center flex-j-end" v-if="item.return_id==0&&item.refund_id==0&&getStatus(data)=='已完成'"><!--return_id为换货 refund_id 为退款 -->
				<button class="btn btn2" @click="app.showOpen('cart/Service?data='+JSON.stringify(data)+'&index='+index)">申请售后</button>
			</view>
			<view class="flex-center flex-j-end" v-if="item.return_id!=0||item.refund_id!=0">
				<button class="btn btn2" v-if="item.return" @click="app.showOpen('cart/returnInfo?data='+JSON.stringify(data)+'&index='+index)">售后信息</button>
				<button class="btn btn2" v-else @click="goForm(data,index)">填写物流</button>
			</view>
		</view>
		<!-- <view class="bc-white flex-center flex-j-between pt-15 pb-15 pl-15 pr-15">
			<text class="font-14">填写退货物流</text>
			<view class=" flex-center font-12 font-light-gray">自行寄回<i class="iconfont icon-you ml-10"></i></view>
		</view> -->
		<view class="mt-15 pl-15 pr-15 pt-15 pb-15 bc-white">
			<view class="flex-center flex-j-between pb-15 pt-15">
				<text class="one-row font-12 font-light-gray">订单编号：</text>
				<text class="nowrap font-12" v-text="data.sub_sn">100QSC</text>
			</view>
			<view class="flex-center flex-j-between" v-if="data.created_at">
				<text class="one-row font-12 font-light-gray">下单时间：</text>
				<text class="nowrap font-12 " v-text="data.created_at">100QSC</text>
			</view>
			<view class="flex-center flex-j-end pb-15 pay"></view>
			
			<block v-if="getStatus(data)=='待支付'">
				<view class="flex-center flex-j-between pb-15 pt-15">
					<text class="one-row font-12 font-light-gray">支付方式：</text>
					<text class="nowrap font-12">还未支付</text>
				</view>
				<view class="flex-center flex-j-between pb-15">
					<text class="one-row font-12 font-light-gray">配送方式：</text>
					<text class="nowrap font-12">快递</text>
				</view>
			</block>
			<block v-else>
				<view class="flex-center flex-j-between pb-15 pt-15">
					<text class="one-row font-12 font-light-gray">支付方式：</text>
					<text class="nowrap font-12">在线支付</text>
				</view>
				<view class="flex-center flex-j-between pb-15">
					<text class="one-row font-12 font-light-gray">配送方式：</text>
					<text class="nowrap font-12">快递</text>
				</view>
			</block>
		</view>
		<Love :loveList="loveList"></Love>
		<view class="bottom-cont bc-white flex-center flex-j-between pl-20 pr-20">
			<view class="text-center" @click="app.showOpen('user/contact')">
				<image mode="widthFix" src="@/static/img/7b1121224d58ad3d56ca4107aae944f.png"></image>
				<view class="font-11">客服</view>
			</view>
			<view class="btn-cont flex-center" v-if="getStatus(data)=='待支付'">
				<button class="btn btn1" @click="cancelOrder(data.id)">取消订单</button>
			</view>
			<view class="btn-cont flex-center" v-else-if="getStatus(data)=='待收货'">
				<button class="btn btn2" @click="fixOrder(data.sub_sn)">确认收货</button>
			</view>
			<view class="btn-cont flex-center" v-else-if="getStatus(data)=='已完成'">
				<button class="btn btn1" @click="removeOrder(data.id)">删除订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import Love from '@/components/love.vue'
	export default {
		components:{
			Love
		},
		data() {
			return {
				data:"",
				newsInfo:"",
				loveList:[],
			};
		},
		onLoad(e) {
			var self=this;
			e.data=JSON.parse(e.data);
			// self.data=e.data;
			if(self.getStatus(e.data)=='待收货'){
				self.get_cInfo(e.data);
			};
			self.get_data(e.data.sub_sn);
			self.get_Love();
		},
		methods: {
			goForm:function(data,index){
				uni.redirectTo({
				    url: 'cart/logistics?data='+JSON.stringify(data)+'&index='+index
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
											var page=self.app._prePage();
											page.$vm.init();
											self.app.goBack();
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
											var page=self.app._prePage();
											page.$vm.init();
											self.app.goBack();
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
											var page=self.app._prePage();
											page.$vm.init();
											self.app.goBack();
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
			get_data:function(id){
				var self=this;
				let send={
					sub_sn:id,
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.order.detail",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.data=res.data.data;
						}else{
							console.log(JSON.stringify(res));
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {}
				});
			},
			get_cInfo:function(e){
				var self=this;
				var send={
					delivery_num:e.delivery_num,//运单号
					delivery_name:e.delivery_name,//物流公司名称
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.order.logistics",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							if(res.data.data.data.length!=0){
								self.newsInfo=res.data.data.data[0];
							};
						}else{
							console.log(JSON.stringify(res));
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
			get_Love:function(){
				var self=this;
				var send={
					page:1,
					count:20,
				};
				uni.request({
					url: config.api_service + "/get.guess.like",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						config.api_status(res);
						if (res.data.code == 200) {
							self.loveList=res.data.data.list;
						}else{
							console.log(JSON.stringify(res));
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
			}
		}
	}
</script>

<style>
	@import url("@/common/css/order.css");
	page{background-color: #F5F5F5;}
	.box{padding-bottom: 60px;}
	.cont-list{border-radius: 0px;box-shadow: 0px;}
	.status-cont{width: 100%;padding: 0px 15px 30px;background-color: #1A2B5A;text-align: center;}
	.order-stauts{width: 100%;border-bottom: 1px solid #F5F5F5;}
	.address-cont{width: 100%;}
	.order-stauts image,
	.address-cont image{width: 14px;margin-top: 5px;}
	.order-stauts .data,
	.address-cont .data{width: calc(100% - 50px);}
	.pay{border-bottom: 1px solid #F5F5F5;}
	
	/* .box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 150px;background-color: #211817;content: "";} */
	
	/* .list-content{width: 100%;flex-wrap: wrap;}
	.list-content .cont-list{width: 48%;border-radius: 4px;overflow: hidden;box-shadow: 1px 1px 6px #E9E8E8;margin-bottom: 11px;}
	.list-content .cont-list image{width: 100%;height: 140px;} */
	.bottom-cont{width: 100%;height: 50px;position: fixed;bottom: 0px;left: 0px;box-shadow: 0px -2px 10px 0px #CCCCCC;}
	.bottom-cont image{width: 19px;}
	.bottom-cont .btn{font-size: 12px;line-height: 25px;width: 80px;text-align: center;border-radius: 20px;margin: 0px;margin-left: 15px;background-color: #FFFFFF;}
	.bottom-cont .btn.btn1{border: 1px solid #CCCCCC;color: #999999;}
	.bottom-cont .btn.btn2{color: #E52321;border: 1px solid #E52321;}
	.bottom-cont .btn.btn2{color: #FFFFFF;border: 0px solid #BD9E70;background-color: #1A2B5A;}
	.cont-list .btn{font-size: 12px;line-height: 25px;width: 80px;text-align: center;border-radius: 20px;margin: 0px;margin-left: 15px;background-color: #FFFFFF;border: 1px solid #CCCCCC;color: #999999;}
</style>
