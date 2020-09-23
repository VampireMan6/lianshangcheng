<template>
	<view class="box pt-10 pl-15 pr-15">
		<view class="tab-line"></view>
		<view class="cart-content">
			<view class="cont-list mb-10" v-for="(item,index) in cart_list" :key="index">
				<view class="store-name flex-center nowrap pb-15 pt-15">
					<image class="mr-10" mode="widthFix" src="../../static/img/store.png"></image>{{item.shop_name}}
				</view>
				<view class="data-cont flex-center flex-j-between" :class="{'active':jtem.check}" v-for="(jtem,jndex) in item.cart" :key="jndex" @click="app.showOpen('market/details?id='+jtem.goods_id)">
					<view @click.stop="">
						<i class="iconfont choice icon-check" @click="goChoice(index,jndex)"></i>
					</view>
					<view class="cont flex-row flex-j-between">
						<image :src="jtem.thumb"></image>
						<view class="data">
							<view class="name font-14 nowrap text-left mb-5" v-text="jtem.title">新鲜上市石榴</view>
							<view class="specs font-12 font-light-gray nowrap" v-if="jtem.spec">规格：
								<text v-for="(ktem,kndex) in JSON.parse(jtem.spec)" :key="kndex">{{ktem.name+': '+ktem.value.title}}</text>
							</view>
							<view class="price-cont flex-center flex-center flex-j-between nowrap mt-20">
								<view class="price flex-center nowrap font-12 font-w-b">
									<text class="font-yellow nowrap" v-text="jtem.shop_price">100.0000</text>
									<text class="one-row ml-5" v-text="jtem.coin_name">QSC</text>
								</view>
								<view class="handle flex-center nowrap" @click.stop="" v-if="numSW">
									<view class="one-row" @click="jtem.buy_num=(jtem.buy_num==1?1:jtem.buy_num-1);modifyNumber(jtem.cart_id,jtem.buy_num);">
										<image src="../../static/img/reduce.png"></image>
									</view>
									<text class="value nowrap" v-text="jtem.buy_num">1</text>
									<view class="one-row" @click="jtem.buy_num=(Number(jtem.buy_num)+1);modifyNumber(jtem.cart_id,jtem.buy_num);">
										<image src="../../static/img/add.png"></image>
									</view>
								</view>
								<view class="handle flex-center nowrap" @click.stop="" v-else>
									<view class="one-row">
										<image src="../../static/img/reduce.png"></image>
									</view>
									<text class="value nowrap" v-text="jtem.buy_num">1</text>
									<view class="one-row">
										<image src="../../static/img/add.png"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<block v-if="cartInfo.length==0">
			<view class="no-cart text-center">
				<image mode="widthFix" src="../../static/img/no-cart.png"></image>
				<view class="font-12 font-light-gray pt-10">您的购物车还没有宝贝哟~</view>
			</view>
			<view>
				<!-- <view class="text-center pb-15">猜您喜欢</view>
				<view class="list-content flex-row flex-j-between">
					<view class="cont-list" @click="app.showOpen('market/details')">
						<image src="../../static/cc3d2d9be82a562aaafb68019475037.png"></image>
						<view class="pl-10 pr-10 pt-10 pb-15">
							<view class="name nowrap mb-10 font-14">草莓水果沙拉超级无底好吃</view>
							<view class="price nowrap font-14 flex-center">
								<text class="nowrap font-yellow">100.0000</text>
								<text class="one-row ml-5">QSC</text>
							</view>
							<view class="cny-price nowrap font-12 font-light-gray lh-20">≈20.00 CNY</view>
						</view>
					</view>
				</view> -->
				<Love :loveList="loveList"></Love>
			</view>
		</block>
		<view class="bottom-cont flex-center flex-j-between">
			<view class="flex-center nowrap" @click="checkAll()">
				<view class="flex-center font-light-gray"><i class="iconfont choice icon-check mr-5" :class="{'active':checkSW}"></i></view>
				<view class="flex-center font-14 font-light-gray nowrap">合计：<text class="font-w-b font-yellow" v-text="price">0 QSC</text></view>
			</view>
			<button class="btn" :disabled="choice.length==0" @click="app.showOpen('market/confirmOrder?type=cart&id='+choice)">去结算</button>
		</view>
		<!-- <go-login :show="!hasLogin"></go-login> -->
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import cart from "@/common/js/cart.js"
	import Love from '@/components/love.vue'
	import goLogin from "@/components/go-login/go-login.vue";
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components:{
			Love,
			goLogin
		},
		data() {
			return {
				cart_list:[],
				list:[],
				choice:[],
				choicePrice:[],
				price:"",
				checkSW:false,
				coinName:"",
				loveList:[],
				numSW:true,
			}
		},
		onShow() {
			var self=this;
			self.get_data();
		},
		onLoad() {
			var self=this;
			self.get_Love();
		},
		onNavigationBarButtonTap(e) {
			var self=this;
			if(e.index == 0){
				if(self.choice.length==0){
					return self.app._toast("请选择需要删除的商品");
				};
				var send={
					cart_id :self.choice.toString(),
				};
				uni.showModal({
					content: "确定删除当前所选的商品吗？",
					confirmText: "确定",
					cancelText: "取消",
					success: function (e) {
						if(e.confirm){
							// console.log(JSON.stringify(send));
							uni.showNavigationBarLoading();
							uni.request({
								url: config.api_service + "/post.cart.del",
								data: send,
								method: "post",
								header: {Authorization: config.getToken()},
								success: res => {
									// console.log(JSON.stringify(res));
									uni.hideNavigationBarLoading();
									config.api_status(res);
									if (res.data.code == 200) {
										self.app._toastIcon(res.data.message);
										self.get_data();
									}else{
										self.app._toast(res.data.message);
									};
								},
								fail: (res) => {console.log(JSON.stringify(res));},
								complete: (res) => {}
							});
						};
					}
				});
			};
		},
		computed:{
			...mapState(["hasLogin","cartInfo",'userInfo']),
		},
		methods: {
			...mapMutations(['login','SetCart']),
			getPrice:function(){
				var self=this;
				self.price="";
				var name=self.coinName;
				let data=[];
				for(let s in name){
					name[s].all=0;
				};
				for(let i in name){
					self.choicePrice.forEach(function(item){
						if(item.name==i){
							name[i].all+=Number(self.app._accMul(item.price,item.num));
						};
					})
					let str=i+':'+name[i].all;
					data.push( str );
				}
				self.price=data.toString();
			},
			checkAll:function(){
				var self=this;
				self.checkSW=!self.checkSW;
				self.choice=[];
				self.choicePrice=[];
				self.cart_list.forEach(function(item){
					item.cart.forEach(function(jtem){
						if(self.checkSW){
							jtem.check=true;
							self.choice.push(jtem.cart_id);
							let str={
								id:jtem.cart_id,
								price:jtem.shop_price,
								num:jtem.buy_num,
								name:jtem.coin_name,
							};
							self.choicePrice.push(str);
						}else{
							jtem.check=false;
						};
					})
				});
				self.getPrice();
			},
			goChoice:function(index,jndex){
				var self=this;
				let all=true;
				self.cart_list[index].cart[jndex].check=!self.cart_list[index].cart[jndex].check;
				self.cart_list=JSON.parse(JSON.stringify(self.cart_list));
				self.choice=[];
				self.choicePrice=[];
				self.cart_list.forEach(function(item){
					item.cart.forEach(function(jtem){
						if(jtem.check){
							self.choice.push(jtem.cart_id);
							let str={
								id:jtem.cart_id,
								price:jtem.shop_price,
								num:jtem.buy_num,
								name:jtem.coin_name,
							};
							self.choicePrice.push(str);
						}else{
							all=false;
						};
					})
				});
				self.checkSW=all;
				self.getPrice();
			},
			setChoice:function(){
				var self=this;
				var name={};
				if(self.cart_list){
					self.cart_list.forEach(function(item){
						item.cart.forEach(function(jtem){
							jtem.check=false;
							var str={
								coin:jtem.coin_name,
								all:0,
							};
							name[jtem.coin_name]=str;
						});
					});
				};
				self.coinName=name;	
				self.choice=[];
				self.choicePrice=[];
				self.checkSW=false;
				self.getPrice();
			},
			get_data:function(){
				var self=this;
				cart.get_cart(function(res){
					// console.log(res);
					self.SetCart(res.data.data);
					self.cart_list=res.data.data;
					self.setChoice();
				});
			},
			modifyNumber:function(id,num,old){
				var self=this;
				self.numSW=false;
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
						setTimeout(function(){
							self.numSW=true;
						},300);
						if (res.data.code == 200) {
							self.get_data();
						}else{
							self.app._toast(res.data.message);
							self.get_data();
						};
					},
					fail: (res) => {
						console.log(JSON.stringify(res));
					},
					complete: (res) => {}
				});
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
							// self.app._toast(res.data.message);
							console.log(res);
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
		},
		watch:{
			cartInfo: function(newValue,oldValue){
				var self=this;
				if(newValue){
					self.cart_list=self.cartInfo;
					self.setChoice();
				};
			}
		}
	}
</script>

<style>
	@import url("@/common/css/cart.css");
</style>
