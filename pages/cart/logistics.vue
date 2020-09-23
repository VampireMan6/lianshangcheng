<template>
	<view class="box">
		<view class="cont-list bc-white">
			<view class="cont-data flex-row flex-j-between">
				<image :src="data.thumb"></image>
				<view class="text-data">
					<view class="name show-row lh-20" v-text="data.title">海南特产大树菠萝蜜十年老树整个20-25斤/10-12.5kg木菠萝</view>
					<view class="nowrap font-light-gray font-10 pt-10" v-if="data.spec">规格：{{getSpec(data.spec)}}</view>
					<view class="nowrap font-light-gray font-10 pt-10"v-else>规格：{{data.subtitle+data.buy_num+data.unit}}</view>
				</view>
				<view class="price-data text-right">
					<view class="font-11 nowrap" v-text="data.shop_price+data.coin_name">100QSC</view>
					<view class="font-10 font-light-gray pt-10 nowrap">共{{data.buy_num}}{{data.unit}}</view>
				</view>
			</view>
		</view>
		<view class="pl-15 pr-15 mt-15 mb-15 bc-white">
			<view class="Input-cont flex-center flex-j-between">
				<text class="one-row pr-20">物流单号:</text>
				<input type="text" placeholder="填写物流单号" v-model="sn" />
				<i class="iconfont icon-icon_xinyong_xianxing_jijin-" @click="getCode()"></i>
			</view>
			<!-- <view class="Input-cont flex-center flex-j-between">
				<text class="one-row pr-20">物流公司</text>
				<view class="font-light-gray">
					请选择物理公司
					<i class="iconfont icon-you font-light-gray ml-10 font-20"></i>
				</view>
			</view> -->
			<view class="Input-cont flex-center flex-j-between">
				<text class="one-row pr-20">物流公司</text>
				<input type="text" placeholder="填写物流公司" v-model="name" />
			</view>
		</view>
		<view class="pl-15 bc-white">
			<view class="Input-cont flex-center flex-j-between">
				<text class="one-row pr-20">联系电话:</text>
				<input type="text" placeholder="填写联系电话" v-model="mobile" maxlength="11" />
			</view>
			<view class="Input-cont flex-center flex-j-between">
				<text class="one-row pr-20">退货说明:</text>
				<input type="text" placeholder="选填" v-model="desc" />
			</view>
		</view>
		<view class="btn-cont bc-white">
			<button class="btn" @click="goSend()">提交</button>
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
				name:"",
				mobile:"",
				desc:"",
				sn:"",
			}
		},
		onLoad(e) {
			var self=this;
			e.data=JSON.parse(e.data);
			self.info=e.data;
			self.data=e.data.order_goods[e.index];
		},
		methods: {
			getCode:function(){
				var self=this;
				uni.scanCode({
				    success: function (res) {
				        self.sn=res.result;
				    }
				});
			},
			goSend:function(){
				var self=this;
				if(self.sn.trim().length==0){
					return self.app._toast("请填写快递单号");
				};
				if(self.name.trim().length==0){
					return self.app._toast("请填写快递名称");
				};
				if(self.mobile.trim().length==0){
					return self.app._toast("请填写手机号");
				};
				var send={
					delivery_name:self.name,//物流公司名称
					phone:self.mobile,
					desc:self.desc,
					delivery_sn:self.sn,
				};
				if(self.data.return_id!=0){
					send.return_id=self.data.return_id;
				}else if(self.data.refund_id!=0){
					send.return_id=self.data.refund_id;
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.return.delivery.up",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.app._toast(res.data.message);
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
			getSpec:function(s){
				s=JSON.parse(s);
				let str="";
				s.forEach(function(item){
					str=str+item.name+':'+item.value.title+";";
				})
				return str
			},
		}
	}
</script>

<style>
	@import url("@/common/css/order.css");
	page{background-color: #F6F5F8;}
	.cont-list{border-radius: 0px;box-shadow: 0px;}
	.Input-cont{width: 100%;height: 50px;border-bottom: 1px solid #F5F5F5;}
	.Input-cont input{width: 100%;height: 100%;}
	.btn-cont{width: 100%;position: fixed;left: 0px;bottom: 0px;padding: 15px 15px;}
</style>
