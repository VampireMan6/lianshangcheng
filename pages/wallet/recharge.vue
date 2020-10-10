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
			<view class="w-100 nowrap text-center pb-15">
				<text style="border-radius: 10rpx;padding: 4rpx 8rpx;">备注码:{{remark}}</text>
				<text style="background-color: #1a2b5a;font-size: 10px;color:#fff;
				border-radius: 10rpx;padding: 4rpx 8rpx;margin-left: 30rpx;"
				@tap="app._copy(remark)">复制</text>
			</view>
			<view class="code mb-30">
				<image :src="images" style="width: 320upx;height: 320upx;" mode=""></image>
				<!-- <tki-qrcode ref="qrcode" :val="address" 
				:size="160" background="#fff" foreground="#000" pdground="#000" 
				:onval="true" :loadMake="true"  :show="true" unit="px"></tki-qrcode> -->
			</view>
			<view class="text-center font-light-gray pb-15">转入地址</view>
			<view class="text-center font-16 pb-30 nowrap" v-text="address">0x157457fada36900c84af6219edf8af5c</view>
			<button class="btn mb-30" @click="app._copy(address)">复制地址</button>
			<view class="font-12 pb-10">温馨提示：</view>
			<view class="font-12 pl-20 lh-25 newlines">请勿充值{{data.name}}以外的资产</view>
			<view class="font-12 pl-20 lh-25 newlines">最低1 {{data.name}}起充</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import QR from "@/common/js/wxqrcode.js"
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				data:"",
				address:"",
				remark:"",
				images: ''
			}
		},
		onLoad() {
			var self=this;
			self.data=self.allCoin[0];
			if(self.data){
				self.get_address();
			};
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
		},
		methods: {
			getChoice:function(data){
				var self=this;
				self.data=data;
				self.get_address();
			},
			get_address:function(){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.coin.address",
					data: {
						coin_id:self.data.id,
					},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						if (res.data.code == 200) {
							// self.address=res.data.data;
							self.address=res.data.data.address;
							self.remark=res.data.data.address_code;
							this.images =  QR.createQrCodeImg(self.address, { size: parseInt(260) });
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {
						if(res.errMsg == 'request:fail timeout'){
							console.log("请求超时了");
						};
						console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
					},
					complete: (res) => {}
				});
			}
			
		}
	}
</script>

<style>
	page{background-color: #1A2B5A;}
	.choice-coin{width: 100%;padding: 16px 0px;}
	.choice-coin image{width: 20px;height: 20px;border-radius: 50%;}
	.content{width: 100%;height: calc(100vh - 80px);border-radius: 8px;padding: 40px 16px 16px;overflow-y: auto;}
	.content .code{width: 160px;height: 160px;overflow: hidden;margin: auto;}
</style>
