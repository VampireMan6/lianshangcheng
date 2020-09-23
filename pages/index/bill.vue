<template>
	<view class="box pl-15 pr-15 pt-20 pb-20">
		<!--<view class="nav-cont flex-center flex-j-around pb-25 pt-10">
			<text class="nav-name" :class="{'active':nav==1}" @click="nav=1;init();">链++</text>
			<text class="nav-name" :class="{'active':nav==2}" @click="nav=2;init();">链++</text>
		</view>-->
		<view class="list-content pl-15 pr-15">
			<view class="cont-list pl-15 pr-15 mb-10" v-for="(item,index) in list" :key="index">
				<view class="flex-center flex-j-between nowrap pb-5">
					<text class="font-14 font-w-b nowrap" v-text="item.mobile?app._phoneMethod(item.mobile):app._phoneMethod(userInfo.mobile)">QSC-17639642996</text>
					<!-- <text class="font-12 font-light-gray one-row" v-text="item.release_type==1?'推荐奖励':item.release_type==2?'直推加速':item.release_type==3?'团队加速':'领导奖'">每日释放</text> -->
					<text class="font-12 font-light-gray one-row" v-text="'推荐奖励'">每日释放</text>
				</view>
				<view class="flex-center flex-j-between nowrap">
					<text class="font-12 font-light-gray one-row" v-text="item.created_at">2020-04-01 00:30:01</text>
					<text class="font-14 font-yellow font-w-b nowrap">{{item.money}}</text>
				</view>
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
				// release_type 收益类型 1每日释放；2直推加速；3团队加速
				nav:1,
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
			...mapState(["hasLogin",'userInfo','qiniu']),
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
					coin_type:self.nav,//币种类型 1平台币；2消费币
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.earnings.list",
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
	.box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 150px;background-color: #1A2B5A;content: "";}
	.nav-cont{width: 100%;position: relative;z-index: 1;}
	.nav-cont .nav-name{color: #F9F9F9;font-size: 16px;position: relative;}
	.nav-cont .nav-name.active{color: #FFFFFF;font-weight: bold;font-size: 20px;}
	.nav-cont .nav-name.active::after{position: absolute;bottom: -2px;width: 100%;height: 3px;left: 0px;background-color: #A99268;border-radius: 2px;content: "";}
	.list-content{width: 100%;min-height: 80vh;position: relative;z-index: 1;border-radius: 4px;background-color: #FFFEFF;box-shadow: 0px 2px 6px #E9E8E8;}
	.cont-list{padding: 16px 0px;position: relative;border-bottom: 1px solid #F5F5F5;}
</style>

