<template>
	<view class="box pt-10 pb-10 pl-15 pr-15">
		<view class="list-content flex-row flex-j-between">
			<view class="cont-list" v-for="(item,index) in list" :key="index" @click="app.showOpen('market/details?id='+item.id)">
				<image :src="item.thumb"></image>
				<view class="pl-10 pr-10 pt-10 pb-15">
					<view class="name nowrap mb-10 font-14" v-text="item.title">草莓水果沙拉超级无底好吃</view>
					<view class="price nowrap font-14 flex-center">
						<text class="nowrap font-yellow" v-text="item.shop_price">100.0000</text>
						<text class="one-row ml-5" v-text="item.coin_name">QSC</text>
					</view>
					<!-- <view class="cny-price nowrap font-12 font-light-gray lh-20">≈{{app._accMul(item.shop_price,item.rate_cny)}} CNY</view> -->
				</view>
			</view>
		</view>
		<!-- <view class="text-center font-light-gray pt-25 pb-25">追求到底~</view> -->
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
				list:[],
				page:1,
				count:20,
				loadingType: 'more', //加载更多状态
				id:"",
				type:"",
				coin_id:"",
			}
		},
		onLoad(e) {
			var self=this;
			uni.setNavigationBarTitle({			　　title:e.name			});
			self.id=e.id;
			self.type=e.type;
			self.coin_id=e.coin_id;
			self.get_list(self.id,self.type);		},
		onReachBottom(){//加载更多
			var self=this;
			self.get_list(self.id,self.type);
		},
		methods: {
			get_list:function(id,type){
				var self=this;
				var send={cat_id:id,};
				if(type=='seller_cat_id'){
					send={seller_cat_id:id};
				}else if(type=='keyword'){
					send={keyword:id};
				};
				send.page=self.page;
				send.coin_id=self.coin_id;
				send.count=self.count;
				console.log(send)
				uni.request({
					url: config.api_service + "/get.goods",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						config.api_status(res);
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
					fail: (res) => {
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
	.list-content{width: 100%;flex-wrap: wrap;}
	.list-content .cont-list{width: 48%;border-radius: 4px;overflow: hidden;box-shadow: 1px 1px 6px #E9E8E8;margin-bottom: 11px;}
	.list-content .cont-list image{width: 100%;height: 140px;}
</style>
