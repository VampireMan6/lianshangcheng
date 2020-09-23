<template>
	<view class="box pl-15 pr-15 pb-15" v-if="data">
		<view class="choice-coin flex-center flex-j-between" @click="app.showOpen('wallet/choiceCoin')">
			<view class="flex-center nowrap font-white font-16 font-w-b">
				<image class="mr-10" :src="data.logo"></image>{{data.name}}
			</view>
			<view class="flex-center font-white">
				切换通证<i class="iconfont icon-shang-copy ml-10"></i>
			</view>
		</view>
		<view class="content bc-white">
			<view class="pb-20">
				<view class="pb-10">接收地址</view>
				<view class="Input-cont flex-center flex-j-between">
					<input class="pr-10" type="text" placeholder="请输入/粘贴接收地址" v-model="address" />
					<i class="iconfont icon-icon_xinyong_xianxing_jijin-" @click="get_address()"></i>
				</view>
			</view>
			<view class="pb-20">
				<view class="pb-10">备注码</view>
				<view class="Input-cont flex-center flex-j-between">
					<input type="text" placeholder="请输入备注码" v-model="memo" />
				</view>
			</view>
			<!-- withdraw_fee_type:1固定费用 2 固定费率-->
			<view class="pb-20" v-if="data.withdraw_fee_type==1">
				<view class="pb-10 flex-center flex-j-between">
					<text class="one-row">手续费</text>
					<!-- <view class="nowrap font-12 font-light-gray">费率：
					{{ app._accMul( (app._accMul(number,data.withdraw_fee)>data.min_withdraw_fee?data.withdraw_fee:data.min_withdraw_fee) , 100) }} %
					</view> -->
				</view>
				<view class="Input-cont flex-center flex-j-between">
					<view class="nowrap" v-text="data.withdraw_fee"></view>
					<text class="one-row font-12">{{data.name}}</text>
				</view>
			</view>
			<view class="pb-20" v-else-if="data.withdraw_fee_type==2">
				<view class="pb-10 flex-center flex-j-between">
					<text class="one-row">手续费</text>
					<view class="nowrap font-12 font-light-gray">费率：
					{{ app._accMul(data.withdraw_rate , 100) }} %
					</view>
				</view>
				<view class="Input-cont flex-center flex-j-between">
					<view class="nowrap">{{app._accMul(number,data.withdraw_rate)>data.min_withdraw_fee?app._accMul(number,data.withdraw_rate):data.min_withdraw_fee}}</view>
					<text class="one-row font-12">{{data.name}}</text>
				</view>
			</view>
			<view class="pb-20">
				<view class="pb-10 flex-center flex-j-between">
					<text class="one-row">提现数量</text>
					<view class="nowrap font-12 font-light-gray">{{data.name}} 可用：{{data.other.Money}}</view>
				</view>
				<view class="Input-cont flex-center flex-j-between">
					<input type="text" placeholder="请输入提现金额" v-model="number" />
					<text class="one-row font-12 font-yellow" @click="number=data.other.Money">全部</text>
				</view>
			</view>
			<button class="btn mt-10 mb-30" @click="paySW=true">确认提现</button>
			<view class="font-12 pb-10">温馨提示：</view>
			<view class="font-12 pl-20 lh-25 newlines">请勿提现{{data.name}}以外的地址</view>
			<view class="font-12 pl-20 lh-25 newlines">最低1 {{data.name}}起提</view>
		</view>
		<view class="winPopup flex-center flex-j-center" v-if="paySW" @click="paySW=false">
			<view class="payPass-content bc-white pt-25 pb-25 pl-25 pr-25" @click.stop="">
				<view class="pay-Input">
					<input class="font-14" type="password" placeholder="请输入交易密码" v-model="pass" maxlength="6" />
				</view>
				<view class="font-yellow text-right pt-5 font-12">
					<text @click="app.showOpen('user/payPas?name=忘记支付密码')">忘记密码？</text>
				</view>
				<button class="btn mt-20" @click="goWithdraw()">确定</button>
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
				data:"",
				address:"",//0x429c1176c8a07c5dbcbf6d966ffa5538f1f0b712
				number:"",
				memo:"",
				pass:"",
				paySW:false,
				load:true,
			}
		},
		onLoad() {
			var self=this;
			self.data=self.allCoin[0];
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
		},
		methods: {
			...mapMutations(["SetCoin"]),
			get_address:function(){
				var self=this;
				uni.scanCode({
				    success: function (res) {
				        self.address = res.result;
				    }
				});
			},
			getChoice:function(data){
				var self=this;
				self.data=data;
				self.address="";
				self.number="";
				self.memo="";
			},
			goWithdraw:function(){
				var self=this;
				if(isNaN(self.number) || self.number<0 || self.number.trim().length==0){
					self.app._toast("请输入正确的提现数量");
					return;
				};
				if(Number(self.number) < Number(self.data.min_withdraw)){
					self.app._toast("最少提现"+self.data.min_withdraw);
					return;
				};
				if(self.address.trim().length==0){
					self.app._toast("请输入地址");
					return;
				};
				if(self.pass.trim().length<6){
					self.app._toast("请输入正确的密码");
					return;
				};
				var send={
					coin_id:self.data.id,
					money:self.number,
					address:self.address,
					memo:self.memo,
					paypassword:self.pass,
				};
				if(!self.load){
					self.app._toast("正在提现中，请不要重复点击");
					return console.log("重复点击");
				}
				self.load=false;
				// console.log(JSON.stringify(send));
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.coin.withdraw",
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
						if(res.errMsg == 'request:fail timeout'){
							console.log("请求超时了");
						};
						console.log(JSON.stringify(res));
					},
					complete: (res) => {
						self.load=true;
					}
				});
			},
		}
	}
</script>

<style>
	@import url("@/common/css/withdraw.css");
</style>
