<template>
	<view class="box pt-20 pl-15 pr-15" v-if="data">
		<view class="base-data pt-15 pl-15 pr-15 bc-white">
			<view class="font-12" v-text="data.name">这里是银行名称</view>
			<view class="data-cont pt-20 pb-20 flex-center flex-j-between">
				<view class="cont text-center">
					<view class="value font-18 font-w-b nowrap font-yellow" v-text="app._accMul(data.yield,100)+'%'">4.90%</view>
					<view class="font-10 font-light-gray nowrap">消费赠送率</view>
				</view>
				<view class="cont text-center">
					<view class="value font-14 font-w-b nowrap" v-text="data.min_invest">0.00</view>
					<view class="font-10 font-light-gray">最低消费</view>
				</view>
				<view class="cont text-center">
					<view class="value font-14 font-w-b nowrap" v-text="data.earnings_times">0.00</view>
					<view class="font-10 font-light-gray">返回倍率</view>
				</view>
			</view>
		</view>
		<view class="product-data bc-white pl-15 pr-15 pt-15 pb-15 mb-10 mt-15">
			<view class="plate-title mb-15">
				<text class="title font-16 font-w-b">消费金额</text>
			</view>
			<view class="price-cont flex-center flex-j-between">
				<view class="price nowrap" :class="{'active':nav==index}" @click="nav=index;data.earnings_times=item.times" v-for="(item,index) in data.times_seting" :key="index">{{item.money}} {{data.coin_name}}</view>
			</view>
			<view class="pay-way flex-center flex-j-between pt-15 pb-15">
				<text class="font-14">支付方式</text>
				<view class="font-14 flex-center" @click="app.showOpen('wallet/choiceCoin')">{{coin_name}}<i class="iconfont icon-you font-light-gray ml-5 font-20"></i></view>
			</view>
			<view class="pay-num flex-center flex-j-between pb-10">
				<text class="font-14 one-row">预计支付数量</text>
				<view class="font-16 font-w-b font-yellow nowrap" v-if="data.coin_name==coin_name">{{data.times_seting[nav]?app._toFixed(data.times_seting[nav].money,6):'0'}} {{coin_name}}</view>
				<view class="font-16 font-w-b font-yellow nowrap" v-else >{{data.times_seting[nav]?app._toFixed(app._accDiv(data.times_seting[nav].money,price),6):'0'}} {{coin_name}}</view>
			</view>
			<view class="balance text-right nowrap font-12 font-light-gray pt-10">{{money}} {{coin_name}} 可用</view>
		</view>
		<view class="time-data pl-15 pr-15 pt-15 pb-15 mb-10">
			<view class="plate-title mb-15">
				<text class="title font-16 font-w-b">时间说明</text>
			</view>
			<view class="line-cont flex-center flex-j-between">
				<view class="line" v-for="(item,index) in 3" :key="index"></view>
			</view>
			<view class="time-cont flex-center flex-j-between pt-15">
				<view class="cont text-left">
					<view class="font-10" v-text="getTime(0)">2020-04-02</view>
					<view class="font-10 lh-30">购买</view>
				</view>
				<view class="cont text-center">
					<view class="font-10" v-text="getTime(1)">2020-04-03</view>
					<view class="font-10 lh-30">生效</view>
				</view>
				<view class="cont text-right">
					<view class="font-10" v-text="getTime(2)">2020-04-04</view>
					<view class="font-10 lh-30">到账</view>
				</view>
			</view>
		</view>
		<view class="product-text pl-15 pr-15 pt-15 pb-15 mb-10">
			<view class="plate-title mb-15">
				<text class="title font-16 font-w-b">消费说明</text>
			</view>
			<view class="cont font-12 newlines" v-text="data.desc">
				这是投资说明这是投资说明这是投资说明这是投资说明是投资说明这是投资说明这是投资说明这是投资说明这是投资说明这是投资说明这是投资说明这是投资说明这是投资说明这是投资说明这是投资说明这是投资说明这是投资说明这是投资说明这是投资说明
				这是投资说明这是投资说明这是投资说明这是投资说明
			</view>
		</view>
		<view class="bottom-cont flex-center"><button class="btn" @click="paySW=true">立即消费</button></view>
		<view class="winPopup flex-center flex-j-center" v-if="paySW" @click="paySW=false">
			<view class="payPass-content bc-white pt-25 pb-25 pl-25 pr-25" @click.stop="">
				<view class="pay-Input">
					<input class="font-14" type="password" placeholder="请输入交易密码" v-model="pass" maxlength="6" />
				</view>
				<view class="font-yellow text-right pt-5 font-12">
					<text @click="app.showOpen('user/payPas?name=忘记支付密码')">忘记密码？</text>
				</view>
				<button class="btn mt-20" @click="go_buy()">确定</button>
			</view>
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
				id:"",
				data:"",
				nav:-1,
				money:0,
				pass:"",
				paySW:false,
				coin_name:"",
				price:"",
			}
		},
		onLoad(e) {
			var self=this;
			self.id=e.id;
			self.getDetails();
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
		},
		methods: {
			...mapMutations(["SetCoin"]),
			getChoice:function(data){
				var self=this;
				self.coin_name=data.en_name;
				self.data.coin_id=data.id;
				self.price=data.price;
				self.money=coin.getMoney(self.coin_name);
			},
			getDetails:function(){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.product.detail",
					data: {
						product_id:self.id,
					},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.data=res.data.data;
							self.coin_name=res.data.data.coin_name;
							self.money=coin.getMoney(self.data.coin_name);
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
			},
			go_buy:function(){
				var self=this;
				if(!self.data.times_seting[self.nav]){
					self.app._toast("请选择投资金额");
					return;
				};
				if(self.pass.trim().length!=6){
					self.app._toast("请输入正确的密码");
					return;
				};
				var send={
					product_id:self.id,
					money:self.data.times_seting[self.nav].money,
					coin_id:self.data.coin_id,
					paypassword:self.pass,
				};
				// console.log(JSON.stringify(send));
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.invest",
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
							setTimeout(function(){
								self.app.goBack();
							},1000);
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
			},
			getTime:function(num){
				if(!num){num=0;};
				var time=new Date();
				time=time.getTime()+(num*24)*(60*60*1000);
				var t=new Date(time);
				let m=(t.getMonth()+1)<10?'0'+(t.getMonth()+1):(t.getMonth()+1);
				let d=t.getDate()<10?'0'+t.getDate():t.getDate();
				var str=t.getFullYear()+"-" + m + "-" + d;
				return str;
			},
		}
	}
</script>

<style>
	.box{padding-bottom: 70px;}
	.box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 100px;background-color: #211817;content: "";}
	.base-data{width: 100%;position: relative;z-index: 1;border-radius: 4px;box-shadow: 0px 2px 6px #E9E8E8;}
	.base-data .data-cont{width: 100%;}
	.base-data .data-cont .cont{width: 33.3%;}
	.base-data .data-cont .cont .value{line-height: 18px;margin-bottom: 4px;}
	.product-data{width: 100%;border-radius: 4px;box-shadow: 1px 1px 6px #E9E8E8;}
	.product-data .price-cont{width: 100%;position: relative;flex-wrap: wrap;padding: 0px 10px 8px;border-bottom: 1px solid #F5F5F5;}
	.product-data .price-cont::after{width: 30%;content: "";}
	.product-data .price-cont .price{width: 30%;line-height: 23px;border-radius: 2px;background-color: #F9F5F2;color: #E52321;font-size: 12px;text-align: center;margin-bottom: 10px;}
	.product-data .price-cont .price.active{background-color: #E52321;color: #FFFFFF;}
	.pay-num{border-bottom: 1px solid #F5F5F5;}
	.time-data{width: 100%;border-radius: 4px;box-shadow: 1px 1px 6px #E9E8E8;}
	.time-data .line-cont{width: 100%;position: relative;}
	.time-data .line-cont::after{position: absolute;top: 5px;content: "";left: 0px;width: 100%;height: 1px;background-color: #333333;}
	.time-data .line-cont .line{width: 10px;height: 10px;border-radius: 5px;background-color: #333333;position: relative;}
	.time-data .line-cont .line::after{position: absolute;top: 3px;left: 3px;width: 4px;height: 4px;border-radius: 50%;background-color: #FFFFFF;content: "";z-index: 1;}
	.time-data .cont{width: 33.3%;}
	.product-text{width: 100%;border-radius: 4px;box-shadow: 1px 1px 6px #E9E8E8;}
	.product-text .cont{color: #666666;}
	.bottom-cont{position: fixed;z-index: 1;width: 100%;height: 50px;background-color: #FFFFFF;padding: 0px 15px;bottom: 0px;left: 0px;box-shadow:0px -3px 6px rgba(245,245,245,1);}
</style>
