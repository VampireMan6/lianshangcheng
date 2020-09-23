<template>
	<view class="box pl-15 pr-15 pb-15">
		<view class="nav-cont flex-center flex-j-around pb-25 pt-20">
			<text class="nav-name" :class="{'active':type==1}" @click="type=1;init();">链++</text>
			<text class="nav-name" :class="{'active':type==2}" @click="type=2;init();">链++</text>
		</view>
		<view class="list-content pl-15 pr-15">
			<view class="cont-list pl-15 pr-15 mb-10" v-for="(item,index) in list" :key="index">
				<view class="flex-center flex-j-between nowrap pb-5">
					<text class="font-14 font-w-b nowrap" v-text="item.mobile?app._phoneMethod(item.mobile):app._phoneMethod(userInfo.mobile)">QSC-17639642996</text>
					<text class="font-12 font-light-gray one-row" v-text="item.release_type==1?'每日释放':item.release_type==2?'直推加速':'团队加速'">每日释放</text>
				</view>
				<view class="flex-center flex-j-between nowrap">
					<text class="font-12 font-light-gray one-row" v-text="item.created_at">2020-04-01 00:30:01</text>
					<text class="font-14 font-yellow font-w-b nowrap">{{item.money}} {{item.coin_name}}</text>
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
				page:1,
				count:20,
				list:[],
				loadingType: 'more', //加载更多状态
				type:1,//1平台币2消费币
				id:"",
			}
		},
		onLoad(e) {
			var self=this;
			self.id=e.id;
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
				var send={
					coin_type:self.type,
					count:self.count,
					page:self.page,
					contribution_id:self.id,
				};
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.contributions.list",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideLoading();
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
	.box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 150px;background-color: #211817;content: "";}
	.nav-cont{width: 100%;position: relative;z-index: 1;}
	.nav-cont .nav-name{color: #F9F9F9;font-size: 16px;position: relative;}
	.nav-cont .nav-name.active{color: #FFFFFF;font-weight: bold;font-size: 20px;}
	.nav-cont .nav-name.active::after{position: absolute;bottom: -2px;width: 100%;height: 3px;left: 0px;background-color: #A99268;border-radius: 2px;content: "";}
	.list-content{width: 100%;min-height: 80vh;position: relative;z-index: 1;border-radius: 4px;background-color: #FFFEFF;box-shadow: 0px 2px 6px #E9E8E8;}
	.cont-list{padding: 16px 0px;position: relative;border-bottom: 1px solid #F5F5F5;}
</style>
