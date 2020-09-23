<template>
	<view class="box pl-15 pr-15">
		<view class="cont-list pt-15 pb-15" v-for="(item,index) in list" :key="index" @click="app.showOpen('index/noticeDetails?id='+item.id)">
			<view class="title font-15 nowrap" v-text="item.title">公告标题一行多余省略号...</view>
			<view class="flex-center flex-j-between pt-10 pb-10">
				<view class="cont show-row font-13 font-gray" v-text="item.synopsis">这是一连串很长或者很短的公告内容，后台添加公告标题和公告内容，列表展示两行内容，多余显示省略号...</view>
				<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
			</view>
			<view class="time font-light-gray font-12" v-text="item.created_at">2019-04-23 22:39:41</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				page:1,
				count:20,
				list:[],
				loadingType: 'more', //加载更多状态
			}
		},
		onLoad() {
			var self=this;
			self.get_list();
		},
		onReachBottom(){//加载更多
			this.get_list();
		},
		methods: {
			get_list:function(){
				var self=this;
				if(self.loadingType === 'nomore'){
					return;
				}else{
					self.loadingType = 'loading';
				};
				let send={
					page:self.page,
					count:self.count,
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.notice",
					data: send,
					method: "get",
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						if (res.data.code == 200) {
							for(var i=0;i<res.data.data.list.length;i++){
								var item=res.data.data.list[i];
								self.list.push(item);
							};
							if(res.data.data.list.length==0 || res.data.data.list.length<self.count){
								self.loadingType = 'nomore';
							}else{
								self.loadingType = 'more';
							};
							self.page++;
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
	.cont-list{width: 100%;border-bottom: 1px solid #E1E1E1;}
	.cont-list .cont{width: calc(100% - 30px);line-height: 20px;max-height: 40px;overflow: hidden;}
</style>
