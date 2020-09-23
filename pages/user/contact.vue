<template>
	<view class="box">
		<view class="tips-cont flex-center flex-j-end pt-30 pb-30 pl-15 pr-15">
			<view class="tips-text font-white">您好！联系客服请添加下面的微信或者QQ</view>
			<image mode="widthFix" src="@/static/img/contact.png"></image>
		</view>
		<view class="pl-15 pr-15 pt-10 pb-10">
			<view class="cont flex-center flex-j-between" v-for="(item,index) in data">
				<view class="font-black"><text class="one-row mr-20" v-text="item.title">微信客服</text>{{item.value}}</view>
				<button class="copy" @click="app._copy(item.value)">复制</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				data:{
					qq:"1179686192",
					wechat:"wxid_kk9j3mmzi04722",
					email:"13564653@qq.com"
				},
			}
		},
		onLoad() {
			var self=this;
			self.get_data();
		},
		methods: {
			get_data:function(){
				var self=this;
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.server",
					data: {},
					method: "get",
					success: res => {
						console.log(JSON.stringify(res));
						uni.hideLoading();
						if (res.data.code == 200) {
							self.data=res.data.data;
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
			}
		}
	}
</script>

<style>
	/* .box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 150px;background-color: #211817;content: "";} */
	.tips-cont{width: 100%;position: relative;z-index: 1;background-color: #1A2B5A;}
	.tips-cont image{width: 32px;margin-left: 20px;}
	.tips-cont .tips-text{width: auto;position: relative;display: inline-block;line-height: 30px;border-radius: 10px;background-color: #FFFFFF;padding: 0px 15px;color: #1A2B5A !important;}
	/* .tips-cont .tips-text::after{border-right: 5px solid transparent;border-top: 8px solid #38302E;border-left: 20px solid transparent;content: "";position: absolute;top: 100%;right: 10px;} */
	.tips-cont .tips-text::after{border-right: 20px solid transparent;border-bottom: 10px solid #FFFFFF;border-left: 20px solid transparent;content: "";position: absolute;top: 20px;right: -10px;}
	.cont{width: 100%;padding: 16px 0px;border-bottom: 1px solid #F5F5F5;}
	.cont button.copy{background-color: #1A2B5A;border-radius: 13px;line-height: 25px;color: #FFFFFF;font-size: 12px;margin: 0px;}
</style>
