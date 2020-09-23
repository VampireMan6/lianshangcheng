<template>
	<view class="box pt-10 pb-10">
		<view class="bc-white pl-15 pr-15">
			<view class="cont-list pt-15 pb-15" v-for="(item,index) in list" :key="index" @click="app.showOpen('wallet/otcDetails?data='+JSON.stringify(item))">
				<view class="flex-center flex-j-between pb-15">
					<text class="font-16 font-w-b nowrap">卖出{{item.item}}</text>
					<view class="flex-center one-row">
						<text class="font-12 mr-5" v-if="item.status==0">商家等待付款</text>
						<text class="font-12 mr-5 font-yellow" v-else-if="item.status==1">买家已付款</text>
						<text class="font-12 mr-5 font-light-gray" v-else-if="item.status==2">交易完成</text>
						<i class="iconfont icon-you font-18 font-light-gray"></i>
					</view>
				</view>
				<view class="flex-center flex-j-between">
					<view class="ct font-light-gray font-12 text-left nowrap">时间</view>
					<view class="ct font-light-gray font-12 text-center nowrap">数量({{item.item}})</view>
					<view class="ct font-light-gray font-12 text-right nowrap">总额(CNY)</view>
				</view>
				<view class="flex-center flex-j-between pt-5">
					<view class="ct font-12 text-left nowrap" v-text="item.created_at">00:00:00</view>
					<view class="ct font-12 text-center nowrap" v-text="item.amount">0</view>
					<view class="ct font-12 text-right nowrap" v-text="app._accMul(item.amount,item.price)">0</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex'
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
			init:function(){
				var self=this;
				self.loadingType = 'more';
				self.page = 1;
				self.list = [];
				self.get_list();
			},
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
					url: config.api_service + "/get.user.sales",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							for(var i=0;i<res.data.data.data.length;i++){
								var item=res.data.data.data[i];
								self.list.push(item);
							};
							if(res.data.data.data.length==0 || res.data.data.data.length<self.count){
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
	page{background-color: #F5F5F5;}
	.cont-list{width: 100%;border-bottom: 1px solid #F5F5F5;}
	.ct{width: 33.33%;}
</style>
