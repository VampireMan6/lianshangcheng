<template>
	<view class="box pl-15 pr-15 pb-15">
		<view class="balance-cont text-center nowrap pt-15 pb-30 pl-15 pr-15">
			<view class="flex-center flex-j-center font-white" style="opacity: 0.7;">
				总资产
				<view @click.stop=""><i class="iconfont ml-10 font-20" :class="{'icon-visible':!eye,'icon-eye_protection':eye}" @click="eye=!eye"></i></view>
			</view>
			<view class="font-yellow font-24 font-w-b nowrap mt-10" v-text="eye?'******':amount">0</view>
		</view>
		<view class="nav-cont flex-center flex-j-around bc-white mb-25">
			<view class="text-center" @click="app.showOpen('wallet/duihuan1')">
				<image src="../../static/img/c41e0ba6a9e8861ef50609a1e6b94a0.png"></image>
				<view class="font-12 pt-10">链兑银</view>
			</view>
			<view class="text-center" @click="app.showOpen('wallet/duihuan2')">
				<image src="../../static/img/96bf6ca2775d0a187ab81fafac04105.png"></image>
				<view class="font-12 pt-10">银兑链</view>
			</view>
			<view class="text-center" @click="app.showOpen('wallet/duihuan3')">
				<image src="../../static/img/addb9abc141fc4b77ef3fed0ef21ac7.png"></image>
				<view class="font-12 pt-10">卖出</view>
			</view>
			<view class="text-center" @click="app.showOpen('market/details?id=421')">
				<image src="../../static/img/addb9abc141fc4b77ef3fed0ef21ac7.png"></image>
				<view class="font-12 pt-10">买入</view>
			</view>
		</view>
		<view class="pb-15">
			<text class="title font-16 font-w-b">我的资产</text>
		</view>
		<view class="list-content">
			<view class="cont-list flex-center flex-j-between" v-for="(item,index) in dataList" :key="index">
				<view class="cont-data flex-center flex-j-between">
					<view class="">{{item.currency_name}}</view>
					<view class="">
					{{item.balance | text}}克(g)
					<text @click="enterShenqingshiwu(item)" 
					style='padding: 4rpx 8rpx;margin-left: 16rpx;font-size: 12px;color: #FFFFFF;background-color: #1a2b5a;border-radius: 8rpx;'>实物申请</text>
					</view>
				</view>
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
				eye:false,
				dataList: [],
				amount: 0,
				addressList: [],
				addressId: []
			}
		},
		onNavigationBarButtonTap(e) {
			var self=this;
			if(e.index==0){
				self.app.showOpen('wallet/duihuanBill');
			};
		},
		onShow() {
			var self=this;
			self.get_data();
			self.get_address();
		},
		filters: {
			text(val) {
				return  !val? 0 : parseFloat(val).toFixed(2)
			}
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin','allMoney','allCny']),
		},
		methods: {
			...mapMutations(["SetCoin"]),
			get_data:function(){
				var self=this;
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.duihuan.index",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.dataList=res.data.data.list;
							self.amount = res.data.data.amount;
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
			enterShenqingshiwu(item) {
				uni.setStorage({
				    key: 'shenqingshuwu',
				    data: {
							item,
							addressList: this.addressList,
							addressId: this.addressId
						}
				});
				this.app.showOpen('wallet/shenqingshiwu');
			},
			get_address:function(options){
				var self=this;
				uni.request({
					url: config.api_service + "/get.user.address",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						config.api_status(res);
						if (res.data.code == 200) {
							let list = res.data.data;
							if(list.length == 0) {
								self.addressList = [];
							}else {
								list.forEach((item,i)=> {
									self.addressList[i] = `${item.province} ${item.city} ${item.county} ${item.address}`;
									self.addressId[i] = item.id;
									console.log(self.addressList)
								})
							};
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {
						if(res.errMsg == 'request:fail timeout'){
						};
						uni.stopPullDownRefresh()
					},
					complete: (res) => {}
				});
			},
		}
	}
</script>

<style>
	.box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 200px;background-color: #1A2B5A;content: "";}
	.balance-cont{position: relative;z-index: 1;}
	.nav-cont{position: relative;z-index: 1;width: 100%;border-radius: 4px;padding: 16px;box-shadow: 0px 2px 6px #E9E8E8;}
	.nav-cont image{width: 28px;height: 28px;}
	.list-content{width: 100%;border-radius: 4px;box-shadow: 0px 2px 6px #E9E8E8;padding: 0px 16px;}
	.cont-list{width: 100%;padding: 16px 0px;position: relative;border-bottom: 1px solid #F5F5F5;}
	.list-content .cont-list:last-child{border-bottom: 0px;}
	.cont-list image{width: 24px;height: 24px;border-radius: 50%;}
	.cont-list .cont-data{width: 100%;position: relative;}
	.cont-list .cont-data::after{position: absolute;left: 50%;top: 10%;width: 1px;height: 80%;background-color: #F5F5F5;content: "";}
	.cont-list .cont-data .cont{width: 45%;}
	.cont-list .cont-data .cont .vl{width: 100%;position: relative;padding-left: 10px;}
	.cont-list .cont-data .cont .vl::after{position: absolute;left: 0px;top: 50%;height: 2px;width: 2px;display: inline-block;border-radius: 50%;background-color: #BD9E70;content: "";}
	.cont-list .cont-data .cont .vl:last-child::after{background-color: #221915;}
</style>
