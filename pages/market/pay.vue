<template>
	<view class="box">
		<view class="pay-price pt-25 pb-25 text-center">
			<view class="font-25 font-w-b font-yellow nowrap" v-text="money">￥66.80</view>
			<view class="font-25 font-w-b font-yellow nowrap" v-if="is_lii_amount">或 链++: 
				<text>{{parseFloat(lii_amount_total).toFixed(2)}}</text>
			</view>
			<view class="font-11 font-light-gray nowrap mt-5">下单后请尽快付款</view><!-- 剩余：23小时58分钟 -->
		</view>
		<view class="pl-15 pr-15 list-content">
			<!-- <view class="cont-list" v-for="(item,index) in list" :key="index">
				<view class="flex-center flex-j-between pt-20 pb-20">
					<view class="flex-center">
						<image class="mr-10" src="../../static/img/65ca5cd487b378147604a25a805cbf3.png" v-if="(item.coin_name).toLocaleUpperCase=='OTS'"></image>
						<image class="mr-10" src="../../static/img/7918844e397449cc56e969109684a96.png" v-else></image>
						{{item.coin_name}}支付
					</view>
				</view>
				<view class="Input-cont flex-center flex-j-between pb-10">
					<text class="one-row font-18 font-gray">￥</text>
					<input class="text-center font-18 font-w-b font-yellow" type="text" disabled :value="item.money" />
				</view>
			</view> -->
			<!-- 币种支付 -->
			<!-- <view class="cont-list" v-if="1===3">
				<view class="flex-center flex-j-between pt-20 pb-20">
					<view class="flex-center">
						<image class="mr-10" src="../../static/img/7918844e397449cc56e969109684a96.png"></image>
						链++
					</view>
					<radio color="#BD9E70" :checked="type==1"></radio>
				</view>
				<view class="Input-cont flex-center flex-j-between pb-10">
					<text class="one-row font-18 font-gray">￥</text>
					<input class="text-center font-18 font-w-b font-yellow" type="text" />
				</view>
			</view> -->
		</view>
		<view class="pl-15 pr-15 list-content">
			<radio-group @change="radioChange">
				<view class="cont-list">
					<view class="flex-center flex-j-between pt-20 pb-20">
						<view class="flex-center">
							<image class="mr-10" src="../../static/img/a15595aac9ae7778880c651b6b4201c.png"></image>
							微信支付
						</view>
						<radio value="WXAPP" color="#E52321"></radio>
					</view>
					<view class="Input-cont flex-center flex-j-between pb-10 hide">
						<text class="one-row font-18 font-gray">￥</text>
						<input class="text-center font-18 font-w-b font-yellow" type="text" />
					</view>
				</view>
				<!-- <view class="cont-list">
					<view class="flex-center flex-j-between pt-20 pb-20">
						<view class="flex-center">
							<image class="mr-10" src="../../static/img/c0684daffd689c1850ca783bf4f87e8.png"></image>
							支付宝支付
						</view>
						<radio value="ALIAPP" color="#E52321"></radio>
					</view>
					<view class="Input-cont flex-center flex-j-between pb-10 hide">
						<text class="one-row font-18 font-gray">￥</text>
						<input class="text-center font-18 font-w-b font-yellow" type="text" />
					</view>
				</view> -->
				<view class="cont-list">
					<view class="flex-center flex-j-between pt-20 pb-20">
						<view class="flex-center">
							<image class="mr-10" src="../../static/img/balance.png"></image>
							余额支付
						</view>
						<radio value="BALANCE" color="#E52321"></radio>
					</view>
					<view class="Input-cont flex-center flex-j-between pb-10 hide">
						<text class="one-row font-18 font-gray">￥</text>
						<input class="text-center font-18 font-w-b font-yellow" type="text" />
					</view>
				</view>
				<view class="cont-list" v-if="is_lii_amount">
					<view class="flex-center flex-j-between pt-20 pb-20">
						<view class="flex-center">
							<image class="mr-10" src="../../static/img/lianimg.png"></image>
							链++({{parseFloat(lii_amount_total).toFixed(2)}})
						</view>
						<radio value="LJJ" color="#E52321"></radio>
					</view>
					<view class="Input-cont flex-center flex-j-between pb-10 hide">
						<text class="one-row font-18 font-gray">￥</text>
						<input class="text-center font-18 font-w-b font-yellow" type="text" />
					</view>
				</view>
			</radio-group>	
		</view>
		<view class="bottom-cont flex-center">
			<button v-if="type != 'LJJ'" class="btn" @click="goPay()" :disabled="disabled">立即支付{{money}}</button>
			<button v-else class="btn" @click="goPay()" :disabled="disabled">立即支付链++{{lii_amount_total}}</button>
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
	export default {
		data() {
			return {
				list:[],
				money:"",
				id:"",
				disabled:false,
				type:"",
				price:"",
				paySW:false,
				pass: '',
				status: false,
				balance: '',
				moneyNumber: '',
				lii_amount_total: 0,
				is_lii_amount: false,
				ljj_balance: 0 //链++ 余额
			}
		},
		onLoad(e) {
			var self=this;
			self.getPay(e.id);
			self.id=e.id;
			uni.getProvider({
			    service: 'payment',
			    success: function (res) {
			        // console.log(res)
			        // if (~res.provider.indexOf('qq')) {
			        //     uni.login({
			        //         provider: 'qq',
			        //         success: function (loginRes) {
			        //             console.log(JSON.stringify(loginRes));
			        //         }
			        //     });
			        // }
			    }
			});

		},
		methods: {
			radioChange:function(evt){
				var self=this;
				self.type=evt.detail.value;
			},
			weixinPay() {
				var self=this;
			    uni.login({
			        success: (e) => {
			            console.log(JSON.stringify(e));
						console.log(e.code)
						console.log((self.price))
			            uni.request({
			                url: `https://unidemo.dcloud.net.cn/payment/wx/mp?code=${e.code}&amount=${self.price}`,
			                success: (res) => {
			                    console.log("pay request success", res);
			                    if (res.statusCode !== 200) {
			                        uni.showModal({
			                            content: "支付失败，请重试！",
			                            showCancel: false
			                        });
			                        return;
			                    }
			                    if (res.data.ret === 0) {
			                        console.log("得到接口prepay_id", res.data.payment);
			                        let paymentData = res.data.payment;
			                        uni.requestPayment({
			                            timeStamp: paymentData.timeStamp,
			                            nonceStr: paymentData.nonceStr,
			                            package: paymentData.package,
			                            signType: 'MD5',
			                            paySign: paymentData.paySign,
			                            success: (res) => {
			                                uni.showToast({
			                                    title: "感谢您的赞助!"
			                                })
			                            },
			                            fail: (res) => {
			                                uni.showModal({
			                                    content: "支付失败,原因为: " + res
			                                        .errMsg,
			                                    showCancel: false
			                                })
			                            },
			                            complete: () => {
			                                this.loading = false;
			                            }
			                        })
			                    } else {
			                        uni.showModal({
			                            content: res.data.desc,
			                            showCancel: false
			                        })
			                    }
			                },
			                fail: (e) => {
			                    console.log("fail", e);
			                    this.loading = false;
			                    uni.showModal({
			                        content: "支付失败,原因为: " + e.errMsg,
			                        showCancel: false
			                    })
			                }
			            })
			        },
			        fail: (e) => {
			            console.log("fail", e);
			            this.loading = false;
			            uni.showModal({
			                content: "支付失败,原因为: " + e.errMsg,
			                showCancel: false
			            })
			        }
			    })
			},
			goPay:function(){
				var self=this;
				if(self.type==""){
					return self.app._toast("请选中支付方式");
				};
				if(self.type == 'BALANCE') {
					if(parseFloat(self.moneyNumber) > parseFloat(self.balance)){
						this.app._toast("余额不足，请换个支付方式支付哦");
						return;
					};
					self.paySW = true;
					return;
				};
				if(self.type == 'LJJ') {
					if(parseFloat(self.lii_amount_total) > parseFloat(self.ljj_balance)){
						this.app._toast("链++余额不足，请换个支付方式支付哦");
						return;
					};
					self.paySW = true;
					return;
				};
				var send={
					trade_type:self.type,
					out_trade_no:self.id
				};
				if(self.disabled){
					return;
				};
				self.disabled=true;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.pay",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							let provider;
							if(self.type=="WXAPP"){
								provider="wxpay";
							}else{
								provider="alipay";
							};
							uni.requestPayment({
							    provider: provider,
							    orderInfo: (res.data.data),
							    success: (res) => {
									uni.redirectTo({
									    url: '/pages/market/payResult?money='+self.money + '&type=nochongzhi'
									});
							    },
							    fail: (err) => {
								}
							});
						}else{
							self.app._toast(res.data.message);
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
			getPay:function(id){
				var self=this;
				var send={
					out_trade_no:id
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.pay.money",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.list=res.data.data;
							self.money="";
							self.price="";
							self.list.forEach(function(item){
								self.money=self.money+item.coin_name+':'+item.money+' ';
								self.price=Number(item.money)+Number(self.price);
								self.balance = item.balance;
								self.moneyNumber = item.money;
								self.lii_amount_total += item.lii_amount;
								self.ljj_balance = item.ljj_balance;
							});
							if(parseFloat(self.lii_amount_total) > 0) {
								self.is_lii_amount = true;
							}else{
								self.is_lii_amount = false;
							}
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
					trade_type: self.type,
					out_trade_no:self.id,
					paypassword: self.pass
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.pay",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideNavigationBarLoading();
						config.api_status(res);
						this.status = false;
						if (res.data.code == 200) {
							uni.redirectTo({
							    url: '/pages/market/payResult?money='+self.money + '&type=chongzhi'
							});
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {
						this.status = false;
					},
					complete: (res) => {
						setTimeout(function(){
							self.disabled=false;
							this.status = false;
						},2000);
					}
				});
			},
		}
	}
</script>

<style>
	.box{padding-bottom: 70px;}
	.list-content{border-top: 10px solid #F6F6F6;}
	.cont-list{width: 100%;border-bottom: 1px solid #F5F5F5;}
	.cont-list image{width: 16px;height: 16px;}
	.cont-list .Input-cont{width: 100%;}
	.cont-list .Input-cont input{width: 100%;}
	.bottom-cont{position: fixed;z-index: 1;width: 100%;height: 50px;background-color: #FFFFFF;padding: 0px 15px;bottom: 0px;left: 0px;box-shadow:0px -3px 6px rgba(245,245,245,1);}
	@import url("@/common/css/withdraw1.css");
</style>
