<template>
	<view class="box pt-15 pb-15 pl-15 pr-15" v-if="data">
		<view class="font-15 font-w-b newlines" v-text="data.title">这里是后台设置公告的标题，有多少展示多少，可跨行展示</view>
		<view class="font-12 font-light-gray pt-15 pb-15" v-text="'发布时间：'+data.created_at">发布时间：2019-04-23 22:39:41</view>
		<view class="content font-14 newlines lh-20 font-gray">
			<image mode="widthFix" :src="data.img"></image>
			<view class="pt-20" v-html="data.content"></view>
		</view>
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
			self.get_data(e.id);
		},
		methods: {
			get_data:function(id){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.notice.detail",
					data: {
						notice_id:id
					},
					method: "get",
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						if (res.data.code == 200) {
							self.data=res.data.data;
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {}
				});
			},
		}
	}
</script>

<style>
	.content{overflow: hidden;}
	.content image{width: 100%;}
</style>
