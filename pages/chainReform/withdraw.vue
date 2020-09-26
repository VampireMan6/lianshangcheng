<template>
	<view class="box pl-15 pr-15 pb-15">
		<view class="content bc-white">
			<view class="pb-20">
				<view class="pb-10">姓名</view>
				<view class="Input-cont flex-center flex-j-between">
					<input class="pr-10" type="text" placeholder="请输入姓名" v-model="name" />
				</view>
			</view>
			<view class="pb-20">
				<view class="pb-10">开户行</view>
				<view class="Input-cont flex-center flex-j-between">
					<input type="text" placeholder="请输入开户行" v-model="bankName" />
				</view>
			</view>
			<view class="pb-20">
				<view class="pb-10">卡号</view>
				<view class="Input-cont flex-center flex-j-between">
					<input type="text" placeholder="请输入卡号" v-model="cardNumber" />
				</view>
			</view>
			<view class="pb-20">
				<view class="pb-10 flex-center flex-j-between">
					<text class="one-row">提现数量</text>
					<view class="nowrap font-12 font-light-gray">可用：{{balance}}</view>
				</view>
				<view class="Input-cont flex-center flex-j-between">
					<input type="number" placeholder="请输入提现金额" v-model="number" />
					<text class="one-row font-12 font-yellow" @click="number=balance">全部</text>
				</view>
			</view>
			<button class="btn mt-10 mb-30" @click="submit">确认提现</button>
		</view>
		<view class="winPopup flex-center flex-j-center" v-if="paySW" @click="paySW=false">
			<view class="payPass-content bc-white pt-25 pb-25 pl-25 pr-25" @click.stop="">
				<view class="pay-Input">
					<input class="font-14" type="password" placeholder="请输入交易密码" v-model="pass" maxlength="6" />
				</view>
				<view class="font-yellow text-right pt-5 font-12">
					<text @click="app.showOpen('user/payPas?name=忘记支付密码')">忘记密码？</text>
				</view>
				<button class="btn mt-20" @click="goWithdraw">确定</button>
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
				name: "",
				bankName: "",
				cardNumber: "",
				balance: 0,
				status: false
			}
		},
		onLoad() {
			this.get_data();
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
		},
		methods: {
			...mapMutations(["SetCoin"]),
			get_data:function(){
				var self=this;
				// uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.balance",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						config.api_status(res);
						if (res.data.code == 200) {
							self.balance = res.data.data.balance;
							if(res.data.data.name) {
								self.name = res.data.data.name;
								self.bankName = res.data.data.bank_name;
								self.cardNumber = res.data.data.card_num;
							};
						}else{
							self.app._toast(res.data.message);
						};
						// uni.hideLoading();
					},
					fail: (res) => {
						uni.hideLoading();
						if(res.errMsg == 'request:fail timeout'){
							console.log("请求超时了");
						};
					},
					complete: (res) => {}
				});
			},
			submit() {
				if(!this.name.trim()) {
					this.app._toast('请输入姓名');
					return;
				};
				if(!this.bankName.trim()) {
					this.app._toast('请输入开户行');
					return;
				};
				if(!this.cardNumber.trim()) {
					this.app._toast('请输入卡号');
					return;
				};
				if(this.number<=0 || !this.number.trim()){
					this.app._toast("请输入正确的提现数量");
					return;
				};
				if(this.number < Number(this.data.min_withdraw)){
					this.app._toast("最少提现"+this.data.min_withdraw);
					return;
				};
				this.paySW = true;
			},
			goWithdraw() {
				if(this.pass.trim().length<6){
					this.app._toast("请输入正确的密码");
					return;
				};
				if(!this.status) {
					this.status = true;
					this.goWithdraw1();
				}
			},
			goWithdraw1:function(){
				var self=this;
				var send={
					amount: self.number,
					name: self.name,
					bank_name: self.bankName,
					card_num: self.cardNumber,
					paypassword:self.pass
				};
				if(!self.load){
					self.app._toast("正在提现中，请不要重复点击");
					return console.log("重复点击");
				};
				self.load=false;
				// console.log(JSON.stringify(send));
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.withdrawal",
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
						this.status = false;
					},
					fail: (res) => {
						if(res.errMsg == 'request:fail timeout'){
							console.log("请求超时了");
						};
						this.status = false;
					},
					complete: (res) => {
						self.load=true;
						this.status = false;
					}
				});
			},
		}
	}
</script>

<style>
	@import url("@/common/css/withdraw1.css");
</style>
