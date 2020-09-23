<template>
	<view class="box pl-15 pr-15 pt-10 pb-10">
		<view class="cont-list pb-20" v-for="(item,index) in list" :key="index">
			<view class="newlines font-16 font-w-b lh-25 mb-15">
				<text class="font-yellow" v-text="item.question">问题1：</text>
			</view>
			<view class="cont-text lh-25 newlines" v-text="item.answer">
				枯水期店家我就是片死哦爱好地哦啊死要啊无枯水期店家我就是片死哦爱好地哦啊死要啊无枯水期店家我就是片死哦爱好地哦啊死要啊无
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				list:[]
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
					url: config.api_service + "/get.help.center",
					data: {},
					method: "get",
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideLoading();
						if (res.data.code == 200) {
							self.list=res.data.data;
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
	.cont-text{width: 100%;border-radius: 4px;box-shadow: 1px 1px 6px #E9E8E8;padding: 15px;}
</style>
