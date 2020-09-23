<template>
	<view class="box pt-15 pb-15 pl-15 pr-15 lh-25" v-html="data">
		以下内容是后台富文本编辑器添加的文本或者是图片等
		用户服务协议、支付协议和关于我们是一样的，都是由
		后台添加。
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				data:"",
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
					url: config.api_service + "/get.aobute.us",
					data: {},
					method: "get",
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideLoading();
						if (res.data.code == 200) {
							const regex = new RegExp('<img', 'gi');
							res.data.data.content = res.data.data.content.replace(regex, `<img style="max-width: 100%;"`);
							self.data=res.data.data.content;
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
	.box::after{position: fixed;top: 0px;left: 0px;width: 100%;height: 1px;content: "";background-color: #F6F6F6;}
	.box img{width: 100%;}
</style>
