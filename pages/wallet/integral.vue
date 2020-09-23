<template>
	<view class="box pl-15 pr-15 pb-15 pt-20">
		<view class="content bc-white pl-15 pr-15">
			<view class="name-cont flex-center flex-j-between" @click="app.showOpen('wallet/choiceCoin')">
				<view class="name font-16 font-w-b flex-center">
					<image class="mr-5" :src="coinData.logo"></image>
					{{coinData.name}}<i class="iconfont icon-shang-copy ml-5"></i>
				</view>
				<image mode="widthFix" src="../../static/img/efbbe7a2246d3199a415a7fc18e7e6e.png"></image>
				<view class="name font-16 font-w-b flex-center flex-j-end">
					<image class="mr-5" src="../../static/img/7918844e397449cc56e969109684a96.png"></image>
					链++
				</view>
			</view>
			<view class="flex-center flex-j-between font-12 font-light-gray pt-15"><text>数量</text><text>数量 (预估)</text></view>
			<view class="Input-cont flex-center flex-j-between pt-15 pb-15">
				<input class="font-18 font-w-b text-left" type="text" placeholder="输入数量" v-model="number" />
				<input class="font-18 font-w-b text-right" type="text" placeholder="实时换算" />
			</view>
			<view class="font-12 font-light-gray newlines pt-10 pb-10">兑换比例：1 链++ : 20 链++</view>
			<view class="btn-cont pt-10 pb-20">
				<button class="btn" @click="paySW=true">立即兑换</button>
			</view>
		</view>
		<view class="plate-title mt-20 mb-20">
			<text class="title font-16 font-w-b">兑换记录</text>
		</view>
		<view class="list-content">
			<view class="cont-list flex-center flex-j-between mb-15" v-for="(item,index) in 10" :key="index">
				<view class="cont">
					<view class="flex-center nowrap font-w-b">
						<image class="mr-5" src="../../static/289e7e9e7d243d2e27e12b1d67de5fd.png"></image>
						链++
					</view>
					<view class="font-12 font-light-gray pt-5">2019-12-27 15:08:00</view>
				</view>
				<view class="cont flex-center flex-j-end nowrap">
					<text class="nowrap font-yellow">2000</text>
					<text class="ml-5 one-row">链++</text>
				</view>
			</view>
		</view>
		<view class="winPopup flex-center flex-j-center" v-if="paySW" @click="paySW=false">
			<view class="payPass-content bc-white pt-25 pb-25 pl-25 pr-25" @click.stop="">
				<view class="pay-Input">
					<input class="font-14" type="password" placeholder="请输入交易密码" v-model="pass" />
				</view>
				<view class="font-yellow text-right pt-5 font-12">
					<text @click="app.showOpen('user/payPas?name=忘记支付密码')">忘记密码？</text>
				</view>
				<button class="btn mt-20" @click="goExchange()">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				coinData:"",
				number:"1",
				pass:"123456",
				paySW:false,
				page:1,
				count:20,
				list:[],
				loadingType: 'more', //加载更多状态
			}
		},
		onLoad() {
			var self=this;
			self.coinData=self.allCoin[0];
			self.get_list();
		},
		onReachBottom(){//加载更多
			this.get_list();
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
		},
		methods: {
			...mapMutations(["SetCoin"]),
			getChoice:function(data){
				var self=this;
				self.coinData=data;
				self.number="";
			},
			goExchange:function(){
				var self=this;
				if(isNaN(self.number) || self.number<0 || self.number.trim().length==0){
					self.app._toast("请输入正确的提现数量");
					self.paySW=false;
					return;
				};
				if(self.pass.trim().length<6){
					self.app._toast("请输入正确的密码");
					return;
				};
				var send={
					coin_id:self.coinData.id,
					money:self.number,
					paypassword:self.pass,
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.integral.exchange",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.app._toastIcon(res.data.message);
							setTimeout(function(){
								self.app.goBack();
							},1000);
						}else{
							if(res.data.code == 70052){
								self.app.showOpen("user/payPas")
							}
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
					type_id:"5",//类型id
					coin_id:"",//币种id
					type:"",//1转入 2转出
					month:"",//月份
					min_money:"",//最小金额
				};
				// console.log(send)
				// console.log(config.getToken())
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.coin.bill",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.data.in=res.data.data.in;
							self.data.out=res.data.data.out;
							self.data.in_cny=self.app._accMul(coin.getCny('链++'),(res.data.data.in));
							self.data.out_cny=self.app._accMul(coin.getCny('链++'),(res.data.data.out));
							for(var i=0;i<res.data.data.list.length;i++){
								var item=res.data.data.list[i];
								self.list.push(item);
							};
							if(res.data.data.list.length==0 || res.data.data.list.length<self.count){
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
	.box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 150px;background-color: #211817;content: "";}
	.content{width: 100%;border-radius: 4px;position: relative;z-index: 1;box-shadow: 1px 1px 6px #E9E8E8;}
	.content .name-cont{width: 100%;padding: 18px 0px;border-bottom: 1px solid #F5F5F5;}
	.content .name-cont image{width: 14px;}
	.content .name-cont .name{width: calc(50% - 10px);}
	.content .name-cont .name image{width: 18px;height: 18px;}
	.content .Input-cont{width: 100%;border-bottom: 1px solid #F5F5F5;}
	.content .Input-cont input{width: 50%;}
	.cont-list{width: 100%;box-shadow: 0px 2px 6px #E9E8E8;border-radius: 4px;padding: 16px;}
	.cont-list .cont{width: 50%;}
	.cont-list .cont image{width: 16px;height: 16px;border-radius: 50%;}
</style>
