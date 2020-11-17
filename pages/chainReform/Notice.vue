<template>
	<view class="content">
		<rich-text :nodes="text"></rich-text>
		<view class="m-b-32"></view>
		<button v-if="show" class="btn"  @click="app.showOpen('chainReform/applyChainReform')">确认</button>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	
	export default {
		onLoad() {
			var self=this;
			self.get_data();
		},
		data() {
			return {
				text: '',
				show: false
			}
		},
		methods: {
			get_data:function(){
				var self=this;
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.article.detail",
					data: {
						title: '链改须知'
					},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.text = res.data.data.content;
							self.show = true;
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

<style scoped>
	.content {
		padding: 0 32rpx;
	}
	.m-b-32 {margin-bottom: 64rpx;}
</style>
