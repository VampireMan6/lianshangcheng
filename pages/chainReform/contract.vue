<template>
	<view class="content">
		<rich-text :nodes="text"></rich-text>
		<view class="m-b-16"></view>
		<button v-if="show" class="btn"  @click="submit">确认</button>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	
	export default {
		onLoad(options) {
			this.id = options.id;
			this.get_data();
		},
		data() {
			return {
				text: '',
				show: false,
				id: '',
				status: false
			}
		},
		methods: {
			get_data:function(){
				var self=this;
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.liangai.contract",
					data: {
						liangai_id: self.id
					},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.text = res.data.data;
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
					},
					complete: (res) => {}
				});
			},
			submit() {
				if(!this.status) {
					this.status = true;
					this.even();
				}
			},
			even:function(){
				var self=this;
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/post.sign.contract",
					data: {
						liangai_id: self.id
					},
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.app._toast(res.data.message);
							self.status = false;
							// uni.navigateTo({
							// 	url: '/pages/chainReform/applyChainReform1'
							// });
							uni.navigateTo({
								url: ('/pages/chainReform/applyChainReform1?id=' + self.id)
							})
							// setTimeout(()=> {
							// 	uni.switchTab({
							// 		url: '/pages/chainReform/chainReform'
							// 	})
							// },2000)
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
	.m-b-32 {margin-bottom: 32rpx;}
</style>
