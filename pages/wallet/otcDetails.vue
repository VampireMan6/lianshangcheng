<template>
	<view class="box" v-if="data">
		<view class="status-cont flex-center flex-j-between pt-15 pb-15 pl-15 pr-15">
			<view class="cont" v-if="data.status==0">
				<view class="font-24 font-w-b nowrap">商家待付款</view>
				<view class="font-12 nowrap pt-5">商户正在处理打款，请耐心等待</view>
			</view>
			<view class="cont" v-else-if="data.status==1">
				<view class="font-24 font-w-b nowrap">商家已付款</view>
				<view class="font-12 nowrap pt-5">商户已确认打款，请确认是否已收款</view>
			</view>
			<view class="cont" v-else-if="data.status==2">
				<view class="font-24 font-w-b nowrap">交易已完成</view>
				<view class="font-12 nowrap pt-5">商户已确认打款，你确认已收款</view>
			</view>
			<image mode="widthFix" src="../../static/img/f63a670dff02eeb3141ea315b329c95.png" @click="app.showOpen('user/contact')"></image>
		</view>
		<view class="bc-white pt-15 pb-15 pl-15 pr-15 flex-center flex-j-between nowrap mb-20">
			<view class="ct nowrap">
				<view class="font-12 lh-25 nowrap">币种：{{data.coin_name}}</view>
				<view class="font-12 lh-25 nowrap">数量：{{data.amount}} {{data.coin_name}}</view>
				<view class="font-12 lh-25 nowrap">单价：￥{{data.price}}</view>
			</view>
			<view class="ct nowrap">
				<view class="font-12 lh-25 nowrap">订单总价</view>
				<view class="font-20 font-w-b font-yellow nowrap">￥{{app._accMul(data.price,data.amount)}}</view>
			</view>
		</view>
		<view class="bc-white pl-15 pr-15 mb-20">
			<view class="font-16 font-w-b pt-15 pb-10">收款信息</view>
			<view class="cont-list flex-center flex-j-between pt-15 pb-15">
				<text class="one-row font-14 font-light-gray">持卡人</text>
				<view class="nowrap pl-10 font-14" v-text="data.cardholder">会叫的猫</view>
			</view>
			<view class="cont-list flex-center flex-j-between pt-15 pb-15">
				<text class="one-row font-14 font-light-gray">银行卡号</text>
				<view class="nowrap pl-10 font-14">{{data.bank_no}}<image class="ml-10" mode="widthFix" src="../../static/img/copy.png" @click="app._copy(data.bank_no)"></image></view>
			</view>
			<view class="cont-list flex-center flex-j-between pt-15 pb-15">
				<text class="one-row font-14 font-light-gray">开户行</text>
				<view class="nowrap pl-10 font-14" v-text="data.bank_name">建设银行</view>
			</view>
			<view class="cont-list flex-center flex-j-between pt-15 pb-15">
				<text class="one-row font-14 font-light-gray">备注码</text>
				<view class="nowrap pl-10 font-14">{{data.remark}}<image class="ml-10" mode="widthFix" src="../../static/img/copy.png" @click="app._copy(data.remark)"></image></view>
			</view>
		</view>
		<view class="bc-white pl-15 pr-15 mb-20">
			<view class="font-16 font-w-b pt-15 pb-10">订单信息</view>
			<view class="cont-list flex-center flex-j-between pt-15 pb-15">
				<text class="one-row font-14 font-light-gray">订单类型</text>
				<view class="nowrap pl-10 font-14">卖单</view>
			</view>
			<view class="cont-list flex-center flex-j-between pt-15 pb-15">
				<text class="one-row font-14 font-light-gray">买家昵称</text>
				<view class="nowrap pl-10 font-14" v-text="data.seller_name">别致的七月</view>
			</view>
			<view class="cont-list flex-center flex-j-between pt-15 pb-15">
				<text class="one-row font-14 font-light-gray">订单号</text>
				<view class="nowrap pl-10 font-14">{{data.out_trade_no}}<image class="ml-10" mode="widthFix" src="../../static/img/copy.png" @click="app._copy(data.out_trade_no)"></image></view>
			</view>
			<view class="cont-list flex-center flex-j-between pt-15 pb-15">
				<text class="one-row font-14 font-light-gray">下单时间</text>
				<view class="nowrap pl-10 font-14" v-text="data.created_at">2019-10-26 10:25:26</view>
			</view>
		</view>
		<view class="btn-cont bc-white pt-5 pb-5 pl-15 pr-15">
			<button class="btn" :disabled="disabled" v-if="data.status==0">等待买家付款</button>
			<button class="btn" v-else-if="data.status==1" @click="cofirmOrder()">我已确认收款并放币</button>
			<button class="btn" :disabled="disabled" v-else-if="data.status==2">交易完成</button>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				data:"",
			}
		},
		onLoad(e) {
			var self=this;
			e.data=JSON.parse(e.data);
			self.getDetails(e.data.id);
		},
		methods: {
			cofirmOrder:function(){
				var self=this;
				uni.showModal({
					content: "请登录收款账户查收，防止资产损失。",
					confirmText: "确认并放币",
					cancelText: "点错了",
					success: function (e) {
						if(e.confirm){
							var send={
								coin_sales_id:self.data.id,
							};
							uni.showNavigationBarLoading();
							uni.request({
								url: config.api_service + "/post.user.confirm.release",
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
										},600);
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
			getDetails:function(id){
				var self=this;
				var send={
					coin_sales_id:id,
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.user.sales.detail",
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
	page{background-color: #F5F5F5;}
	.box{padding-bottom: 50px;}
	.status-cont{background-color: #221915;color: #FFFFFF;}
	.status-cont image{width: 18px;}
	.ct{max-width: 50%;}
	.cont-list{width: 100%;box-shadow: 1px solid #F5F5F5;}
	.cont-list image{width: 14px;}
	.btn-cont{width: 100%; position: fixed;left: 0px;bottom: 0px;}
	.btn-cont button.btn{width: 100%;}
</style>
