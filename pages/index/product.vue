<template>
	<view class="box pt-15 pb-15 pl-15 pr-15">
		<view class="list-content">
			<view class="cont-list pt-15 pb-15 pl-15 pr-15 mb-10" v-for="(item,index) in list" :key="index">
				<view class="font-12" v-text="item.name">这里是银行名称</view>
				<view class="data-cont pt-15 pb-20 flex-center flex-j-between">
					<view class="cont text-center">
						<view class="value font-18 font-w-b nowrap font-yellow" v-text="app._accMul(item.yield,100)+'%'">4.90%</view>
						<view class="font-10 font-light-gray nowrap">消费赠送率</view>
					</view>
					<view class="cont text-center">
						<view class="value font-14 font-w-b nowrap" v-text="item.min_invest">500.00</view>
						<view class="font-10 font-light-gray">最低消费</view>
					</view>
					<view class="cont text-center">
						<view class="value font-14 font-w-b nowrap" v-text="item.earnings_times">0.00</view>
						<view class="font-10 font-light-gray">返回倍率</view>
					</view>
				</view>
				<view @click.stop=""><button class="btn" @click="app.showOpen('index/productDetails?id='+item.id)">立即投资</button></view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
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
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
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
					url: config.api_service + "/get.product.list",
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
	.cont-list{width: 100%;border-radius: 4px;box-shadow: 1px 1px 6px #E9E8E8;}
	.cont-list .data-cont{width: 100%;}
	.cont-list .data-cont .cont{width: 33.3%;}
	.cont-list .data-cont .cont .value{line-height: 18px;margin-bottom: 5px;}
	.cont-list button.btn{width: 135px;line-height: 32px;font-size: 14px;}
</style>
