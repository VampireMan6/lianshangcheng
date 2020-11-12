<template>
	<view class="box pl-15 pr-15 pb-15">
		<view class="content bc-white">
			<view class="cont-list flex-center pb-20">
				<text class="title one-row mr-20" style="font-size: 32rpx;">资产类型：</text>
				<picker @change="select" style="flex: 1" :value="index" :range="dataListCopy">
				  <view class="uni-input" style="width: 100%;font-size: 28rpx;">{{dataList[index].currency_name}}</view>
				</picker>
			</view>
			<view class="pb-20">
				<view class="pb-10 flex-center flex-j-between">
					<view class="one-row">兑换数量  
					<text style="font-size: 20rpx;margin-left: 30rpx;">{{numberXiaoHao}}</text></view>
					<view class="nowrap font-12 font-light-gray">可用：{{coinMsg.balance | textFixTwo}}链++</view>
				</view>
				<view class="Input-cont flex-center flex-j-between">
					<input type="number" placeholder="请输入兑换克数" v-model="number" />
				</view>
			</view>
			<button class="btn mt-10 mb-30" @click="submit">确认兑换</button>
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
				dataText: '请点击选择资产类型',
				// dataList: ['车改','房改','讯改','消费改','旅游改','其他改'],
				index: 0,
				data:"",
				address:"",//0x429c1176c8a07c5dbcbf6d966ffa5538f1f0b712
				memo:"",
				paypassword:"",
				paySW:false,
				load:true,
				number: "", // 兑换数量
				coinMsg: {}, // 币种信息
				dataList: [], // 资产列表
				dataListCopy: []
			}
		},
		onLoad() {
			var self=this;
			// self.data=self.allCoin[0];
			self.get_data();
		},
		filters: {
			textFixTwo(val) {
				return parseFloat(val).toFixed(2)
			}
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
			numberXiaoHao() {
				if(!this.number.trim()) {
					return ''
				}else {
					return '消耗 ' +  (parseFloat(this.dataList[this.index].price) * this.number/parseFloat(this.coinMsg.price)).toFixed(2) + ' 链++';
				}
			}
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
			get_data:function(){
				var self=this;
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.user.property",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.dataList=res.data.data.list;
							self.dataList.forEach((item,i)=> {
								self.dataListCopy[i] = `${item.currency_name}  (${parseFloat(item.price).toFixed(2)}/g)`
							})
							self.coinMsg = res.data.data.coin;
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {
						uni.hideLoading();
						if(res.errMsg == 'request:fail timeout'){
							console.log("请求超时了");
						};
						console.log(JSON.stringify(res));
					},
					complete: (res) => {}
				});
			},
			submit() {
				if(!this.number.trim()) {
					this.app._toast('兑换数量不能为空');
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
					currency_id: this.dataList[this.index].currency_id,
					amount: this.number,
					paypassword: this.paypassword
				};
				if(!self.load){
					self.app._toast("正在兑换中，请不要重复点击");
					return ;
				}
				self.load=false;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.duihuan",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.app._toastIcon(res.data.message);
							// self.get_data();
							// self.index = 0;
							// self.number = '';
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
			// 下拉选择
			select(e) {
			  this.index = e.target.value;
				this.dataText = this.dataList[this.index];
			},
		}
	}
</script>

<style>
	@import url("@/common/css/withdraw.css");
</style>
