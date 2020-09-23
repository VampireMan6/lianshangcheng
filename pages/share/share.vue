<template>
	<view class="content">
		<view class="bg"><image :src="shareInfo.share_background" mode="aspectFill"></image></view>
		<view class="flex-center flex-j-center">
			<view class="invite-wrap">
				<view class="color_red title">我的邀请码</view>
				<view class="code" @tap="app._copy(userInfo.code)">
					<text>{{userInfo.code}}</text>
					<text class="color_red">复制</text>
				</view>
				<view class="qrcode">
					<tki-qrcode ref="qrcode"
						:val="'https://h5.atbpt.com?InviteCode='+userInfo.code"
						:size="300"
						background="#fff"
						foreground="#000"
						pdground="#000"
						:onval="true"
						:loadMake="true"
						:show="true"
						:showLoading="false"
						unit="upx">
					</tki-qrcode>
				</view>
				<button class="btn" @click="goInvite">立即邀请</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
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
				shareInfo: {}
			}
		},
		onLoad() {
			var self=this;
			self.getInfo();
		},
		computed:{
			...mapState(["hasLogin",'userInfo']),
		},
		methods: {
			goInvite:function(){
				if(this.shareInfo.share_posters_background && this.shareInfo.share_posters_background.length){
					uni.setStorageSync('shareinfo',this.shareInfo);
					uni.navigateTo({
						url: `details`
					});
				}
			},
			getInfo:function(){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.share.info",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						if (res.data.code == 200) {
							self.shareInfo = res.data.data;
						}else{
							console.log(JSON.stringify(res));
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
		}
	}
</script>

<style>
	page,.content{height: 100%;}
	.content .bg,.content .bg image{width: 100%;height: 100%;}
	.invite-wrap{background-color: #FFFFFF;position: absolute;border-radius: 16upx;padding: 30upx 60upx;text-align: center;top: 50%;transform: translateY(-62%);}
	.invite-wrap .title{font-size: 36upx;}
	.invite-wrap .qrcode{width: 300upx;margin: 40upx auto;}
	.invite-wrap button{width: 440upx;}
	.invite-wrap .code{background-color: #E8E8E8;border-radius: 8upx;width: 250upx;margin: 20upx auto 0;font-size: 32upx;padding: 8upx;}
	.invite-wrap .code .color_red{margin-left: 14upx;}
</style>
