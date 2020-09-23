<template>
	<view class="box newlines font-14 lh-20 pt-15 pb-15 pl-15 pr-15" v-html="data">
		
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
		onLoad(e) {
			var self=this;
			uni.setNavigationBarTitle({
				title:e.name
			});
			self.get_data(e.name);
		},
		methods: {
			get_data:function(name){
				var self=this;
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.article.detail",
					data: {
						title:name,
					},
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
	.box img{width: 100%;}
</style>
