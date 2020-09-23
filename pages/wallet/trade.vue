<template>
	<view class="box">
		<view class="account pt-20 pb-15 pl-15 pr-15 bc-white mb-10">
			<view class="flex-center nowrap font-18 font-w-b pb-10">
				<image class="mr-10 pic" src="../../static/img/ed65e399554bd6a5423f8c5da027b31.png"></image>
				{{data.seller_name}}
			</view>
			<view class="font-12 font-light-gray nowrap flex-center flex-j-between">
				<text class="nowrap">限额：{{data.min_amont}} {{data.coin_name}}-{{data.max_amount}} {{data.coin_name}}</text>
				<text class="one-row">单价</text>
			</view>
			<view class="flex-center flex-j-between mt-5">
				<image class="card" src="../../static/img/card.png"></image>
				<view class="text-right font-18 font-w-b nowrap lh-20 font-yellow">￥{{data.price}}</view>
			</view>
			
		</view>
		<view class="bc-white pt-15 pb-15 pl-15 pr-15 mb-10">
			<view class="flex-center flex-j-between nowrap">
				<text class="font-16 font-w-b one-row">卖出数量</text>
				<view class="font-12 font-light-gray nowrap">{{data.coin_name}}可用：{{balance}}</view>
			</view>
			<view class="Input-cont flex-center flex-j-between pt-15 pb-15 mt-10">
				<input class="font-20" type="text" v-model="number" />
				<text class="one-row font-14 font-yellow pl" @click="number=balance">全部</text>
			</view>
			<view class="font-12 font-light-gray pt-10">限额：{{data.min_amont}} {{data.coin_name}}-{{data.max_amount}} {{data.coin_name}}</view>
		</view>
		<view class="bc-white flex-center flex-j-between pt-15 pb-15 pl-15 pr-15 nowrap mb-10" @click="app.showOpen('card/card')">
			<text class="one-row">收款方式：</text>
			<view class="font-14 flex-center">{{!way?'请选择':way.bank_name}}<i class="iconfont icon-you font-light-gray ml-5 font-20"></i></view>
		</view>
		<view class="bc-white flex-center flex-j-between pt-15 pb-15 pl-15 pr-15 nowrap">
			<text class="one-row">应收款：</text>
			<view class="font-20 font-w-b font-yellow nowrap">￥{{app._accMul(number,data.price)}}</view>
		</view>
		<view class="pt-30 pb-30 pl-15 pr-15">
			<button class="btn" @click="goSell()">立即卖出</button>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import coin from "@/common/js/coin.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				data:"",
				number:"",
				balance:0,
				way:"",
			}
		},
		onLoad(e) {
			var self=this;
			e.data=JSON.parse(e.data);
			self.data=e.data;
			self.getBalance();
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
		},
		methods: {
			...mapMutations(["SetCoin"]),
			getBalance:function(){
				var self=this;
				let data=self.allCoin.filter(function(item){
					return item.en_name.toUpperCase()==self.data.coin_name.toUpperCase();
				});
				if(data){
					if(data[0].other){
						self.balance=data[0].other.Money;
					}else{
						self.balance=0;
					};
					
				}else{
					self.balance=0;
				};
			},
			getChoice:function(item){
				var self=this;
				self.way=item;
			},
			goSell:function(){
				var self=this;
				if(isNaN(self.number)){
					return self.app._toast("请输入正确的数量");
				};
				if(Number(self.number)<Number(self.data.min_amont)||Number(self.number)>Number(self.data.max_amount)){
					return self.app._toast("请注意限额");
				};
				if(!self.way){
					return self.app._toast("请选择收款方式");
				};
				var send={
					sale_seller_id:self.data.id,
					amount:self.number,
					user_bank_id:self.way.id
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.coin.sale",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.app._toastIcon(res.data.message);
							self.SetCoin();
							var page=self.app._prePage();
							page.$vm.init();
							setTimeout(function(){
								self.app.goBack();
							},1000);
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
	page{background-color: #F7F5F6;}
	.account{width: 100%;}
	.account image.pic{width: 25px;height: 25px;border-radius: 50%;}
	.account image.card{width: 16px;height: 16px;}
	.Input-cont{width: 100%;border-bottom: 1px solid #F5F5F5;}
	.Input-cont input{width: 100%;min-height: 30px;}
</style>
