<template>
	<view class="box pl-15 pr-15 pb-15">
		<view class="content bc-white">
			<view class="cont-list flex-center pb-20">
				<text class="title one-row mr-20" style="font-size: 32rpx;">资产类型：</text>
				<text>{{item.currency_name}}</text>
			</view>
			<view class="pb-20">
				<view class="pb-10 flex-center flex-j-between">
					<view class="one-row">申请数量</view>
					<view class="nowrap font-12 font-light-gray">可用：{{item.balance | textFixTwo}}克</view>
				</view>
				<view class="Input-cont flex-center flex-j-between">
					<input type="number" placeholder="请输入申请数量" v-model="number" />
				</view>
			</view>
			<view class="cont-list flex-center"style="margin-bottom: 40rpx;">
				<text class="title one-row mr-20">地址：</text>
				<picker @change="select" style="flex: 1" :value="index" :range="addressList">
				  <view class="uni-input" style="width: 100%;font-size: 28rpx;">{{address}}</view>
				</picker>
				<!-- <picker @change="select" style="flex: 1" :value="index" :range="addressList">
				  <view class="uni-input" style="width: 100%;">{{address}}</view>
				</picker> -->
			</view>
			<button class="btn mt-10 mb-30" @click="submit">确认申请</button>
		</view>
		<!-- 弹框 -->
		<view class="winPopup flex-center flex-j-center" v-if="paySW" @click="paySW=false">
			<view class="payPass-content bc-white pt-25 pb-25 pl-25 pr-25" @click.stop="">
				<view class="pay-Input">
					<input class="font-14" type="password" placeholder="请输入交易密码" v-model="paypassword" maxlength="6" />
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
				addressList: [],
				addressListCopy: [],
				index: 0,
				data:"",
				address:"请选择",
				memo:"",
				paypassword:"",
				paySW:false,
				load:true,
				number: "", // 兑换数量
				coinMsg: {}, // 币种信息
				dataList: [], // 资产列表 下拉框
				coinList: [],
				item: {}
			}
		},
		onLoad() {
			this.item = uni.getStorageSync('shenqingshuwu').item;
			this.addressList = uni.getStorageSync('shenqingshuwu').addressList;
			this.addressId = uni.getStorageSync('shenqingshuwu').addressId;
			var self=this;
		},
		filters: {
			textFixTwo(val) {
				return parseFloat(val).toFixed(2)
			}
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
		},
		methods: {
			...mapMutations(["SetCoin"]),
			select(e) {
			  this.index = e.target.value;
				this.address = this.addressList[this.index];
			},
			submit() {
				if(!this.number.trim()) {
					this.app._toast('申请数量不能为空');
					return
				};
				if(this.number < 100) {
					this.app._toast('申请数量最低100g');
					return
				};
				if(this.address == '请选择') {
					this.app._toast('地址不能为空');
					return
				};
				this.paySW  = true;
			},
			goWithdraw:function(){
				
				var self=this;
				if(!self.paypassword.trim()){
					self.app._toast("请输入密码");
					return;
				};
				var send={
					currency_id: this.item.currency_id,
					amount: this.number,
					paypassword: this.paypassword,
					address_id : this.addressId[this.index]
				};
				if(!self.load){
					self.app._toast("正在申请中，请不要重复点击");
					return ;
				}
				self.load=false;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.real.apply",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.app._toastIcon(res.data.message);
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
			}
		}
	}
</script>

<style>
	@import url("@/common/css/withdraw.css");
</style>
