<template>
	<view class="box">
		<view class="address-cont bc-white" @click="app.showOpen('market/address?type=choice')">
			<view class="flex-center flex-j-between pl-15 pr-15 pt-20 pb-10" v-if="!address">
				<i class="iconfont icon-dizhi font-20"></i>
				<view class="address">
					<view class="font-14">请填写收货地址</view>
				</view>
				<i class="iconfont icon-you"></i>
			</view>
			<view class="flex-center flex-j-between pl-15 pr-15 pt-20 pb-10" v-else>
				<i class="iconfont icon-dizhi font-20 font-light-gray"></i>
				<view class="address">
					<view class="flex-center nowrap font-14 mb-5">
						<text class="mr-15 nowrap" v-text="address.name">小艺</text>
						<text class="one-row" v-text="address.tel">15823560265</text>
					</view>
					<view class="font-12 font-light-gray nowrap">{{address.province+address.city+address.county+address.address}}</view>
				</view>
				<i class="iconfont icon-you"></i>
			</view>
			<image mode="widthFix" src="../../static/img/address-line.png"></image>
		</view>
		<view class="Remarks mt-25 mb-10 bc-white pl-15 pr-15 flex-center flex-j-between mb-10">
			<text class="font-14 one-row">留言:</text>
			<textarea placeholder="填写您的备注信息" @input="getTextarea" maxlength="255"></textarea>
		</view>
		<view class="cart-content bc-white pl-15 pr-15 mb-10">
			<view class="cont-list mb-10" v-for="(item,index) in list" :key="index">
				<view class="store-name flex-center nowrap pb-15 pt-15"><image class="mr-10" mode="widthFix" src="../../static/img/store.png"></image>{{item.shop_name}}</view>
				<view class="data-cont flex-center flex-j-between" v-for="(jtem,jndex) in item.goods" :key="jndex">
					<view class="cont flex-row flex-j-between">
						<image :src="jtem.thumb"></image>
						<view class="data">
							<view class="name font-14 nowrap text-left mb-5" v-text="jtem.title">新鲜上市石榴</view>
							<view class="specs font-12 font-light-gray nowrap" v-if="jtem.spec">规格：
								<text v-for="(ktem,kndex) in JSON.parse(jtem.spec)" :key="kndex">{{ktem.name+': '+ktem.value.title}}</text>
							</view>
							<view class="price-cont flex-center flex-center flex-j-between nowrap mt-20">
								<view class="price flex-center nowrap font-14 font-w-b">
									<text class="font-yellow nowrap" v-text="jtem.shop_price">100.0000</text>
									<text class="one-row ml-5" v-text="jtem.coin_name">QSC</text>
								</view>
								<view class="handle flex-center nowrap">
									<view class="one-row" @click="jtem.buy_num=(jtem.buy_num==1?1:Number(jtem.buy_num)-1);modifyNumber(jtem.cart_id,jtem.buy_num);">
										<image src="../../static/img/reduce.png"></image>
									</view>
									<text class="value nowrap lh-20" v-text="jtem.buy_num">1</text>
									<view class="one-row" @click="jtem.buy_num=(Number(jtem.buy_num)+1);modifyNumber(jtem.cart_id,jtem.buy_num);">
										<image src="../../static/img/add.png"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-data pl-15 pr-15 bc-white">
			<view class="data flex-center flex-j-between">
				<text class="one-row">配送费</text>
				<text class="nowrap font-light-gray" v-text="freight+' 链++'">免运费</text>
			</view>
			<view class="data flex-center flex-j-between">
				<text class="one-row">优惠券</text>
				<text class="nowrap font-light-gray">暂无可用</text>
			</view>
			<view class="data flex-center flex-j-between hide">
				<text class="one-row">付款方式</text>
				<view class="nowrap font-light-gray flex-center">在线支付<i class="iconfont icon-you font-light-gray ml-5 font-20"></i></view>
			</view>
		</view>
		<view class="flex-center flex-j-end nowrap font-12 pt-10 pb-10 pl-15 pr-15">商品总金额：<text class="font-w-b font-yellow" v-text="price">110.0000 QSC</text></view>
		<view class="bottom-cont flex-center flex-j-between">
			<view class="flex-center font-14 font-light-gray nowrap">合计：<text class="font-w-b font-yellow" v-text="price+'， 运费：'+freight+' 链++'">100.0000 QSC</text></view>
			<button class="btn one-row text-center" :disabled="disabled" @click="gobuy()">提交订单</button>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import cart from "@/common/js/cart.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				id:"",
				type:"",
				address:"",
				remark:"",
				list:[],
				buy_data:"",
				coinName:"",
				price:"",
				disabled:false,
				freight:"0",
			}
		},
		onLoad(e) {
			var self=this;
			self.type=e.type;
			if(e.type=="cart"){
				self.id=e.id;
				self.getCart();
			}else{
				e.send=JSON.parse(e.send);
				self.buy_data=e.send;
				self.getBuy();
			};
			self.getDefault();
		},
		computed:{
			...mapState(["cartInfo",'userInfo']),
		},
		methods: {
			...mapMutations(['login','SetCart']),
			gobuy:function(){
				var self=this;
				if(!self.address.id){
					return self.app._toast("请选择收货地址");
				};
				var send={
					address_id:self.address.id,//地址ID
					goods_id:"0",//立即购买时商品id，无传0
					sku_id:"0",//sku_id,立即购买时商品sku_id，无传0
					remark:self.remark,//备注	
				};
				if(self.type=="cart"){
					send.cart_ids=self.id;
				}else{
					// send.number=self.buy_data.number;//立即购买是购买数量
					// send.sku_id=self.buy_data.sku_id;//self.buy_data
					// send.goods_id=self.buy_data.goods_id;//self.buy_data
					send.number=self.list[0].goods[0].buy_num;//立即购买是购买数量
					send.sku_id=self.buy_data.sku_id;//self.buy_data.
					send.goods_id=self.list[0].goods[0].id;//self.buy_data.
				};
				console.log(JSON.stringify(send));
				// return
				if(self.disabled){
					return;
				};
				self.disabled=true;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.order.add",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							uni.redirectTo({
							    url: '/pages/market/pay?type=buy&id='+res.data.data+'&data='+JSON.stringify(self.list)
							});
						}else{
							self.app._toast(res.data.message);
							setTimeout(function(){
								self.app.goBack();
							},500);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {
						setTimeout(function(){
							self.disabled=false;
						},2000);
					}
				});
			},
			getTextarea:function(e){
				this.remark=e.detail.value;
			},
			getAddress:function(data){
				var self=this;
				self.address=data;
			},
			getDefault:function(){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.address.default",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							if(res.data.data.length!=0){
								self.address=res.data.data;
							};
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {}
				});
			},
			getCart:function(){
				var self=this;
				let send={
					cart_id:self.id
				};
				// uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.settlement",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						// uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.list=res.data.data.skus;
							self.freight=res.data.data.freight;
							self.getName();
						}else{
							self.app._toast(res.data.message);
							setTimeout(function(){
								self.app.goBack();
							},500);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {}
				});
			},
			getBuy:function(){
				var self=this;
				let send=self.buy_data;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.buy.now",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.list=res.data.data.skus;
							self.freight=res.data.data.freight;
							self.getName();
						}else{
							self.app._toast(res.data.message);
							setTimeout(function(){
								self.app.goBack();
							},500);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {}
				});
			},
			modifyNumber:function(id,num){
				var self=this;
				if(self.type!="cart"){
					self.getName();
					return;
				};
				var send={
					cart_id:id,
					number:num,
				};
				uni.request({
					url: config.api_service + "/post.cart.num.up",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						if (res.data.code == 200) {
							cart.get_cart(function(cart){
								self.SetCart(cart.data.data);
							});
							self.getCart();
						}else{
							self.app._toast(res.data.message);
							self.getCart();
						};
					},
					fail: (res) => {
						console.log(JSON.stringify(res));
					},
					complete: (res) => {}
				});
			},
			getName:function(){
				var self=this;
				var name={};
				self.list.forEach(function(item){
					item.goods.forEach(function(jtem){
						var str={
							coin:jtem.coin_name,
							all:0,
						};
						name[jtem.coin_name]=str;
					})
				})
				self.coinName=name;	
				self.getPrice();
			},
			getPrice:function(){
				var self=this;
				self.price="";
				var name=self.coinName;
				let data=[];
				for(let s in name){
					name[s].all=0;
				};
				for(let i in name){
					self.list.forEach(function(item){
						item.goods.forEach(function(jtem){
							if(jtem.coin_name==i){
								name[i].all += Number(self.app._accMul(jtem.shop_price,jtem.buy_num));
							};
						});
					});
					let str=i+':'+name[i].all;
					data.push( str );
				}
				self.price=data.toString();
			},
		}
	}
</script>

<style>
	@import url("@/common/css/cart.css");
	page{background-color: #F7F4F8;}
	.address-cont{width: 100%;}
	.address-cont image{width: 100%;}
	.address-cont .address{width: calc(100% - 50px);}
	.Remarks{width: 100%;height: 52px;line-height: 52px;}
	.Remarks textarea{width: 100%;height: 100%;font-size: 14px;color: #333333;line-height: 52px;padding: 0px 20px;}
	.cart-content .cont-list{box-shadow: 0px 0px 0px;}
	.cart-content .cont-list .store-name{padding-left: 0px;}
	.cart-content .cont-list .data-cont .cont{width: 100%;}
	.order-data{width: 100%;}
	.order-data .data{width: 100%;height: 52px;border-bottom: 1px solid #F5F5F5;}
	.price-cont .handle	image{width: 20px;height: 20px;display: block;}
	.price-cont .handle	.value{height: 20px;}
	.bottom-cont button.btn{width: 90px;line-height: 36px;margin: 0px;}
</style>
