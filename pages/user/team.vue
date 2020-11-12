<template>
	<view class="box pl-15 pr-15 pt-20">
		<view class="base-data bc-white flex-row flex-j-between">
			<view class="data-cont">
				<view class="font-w-b font-16 font-black">团队总业绩</view>
				<view class="nowrap font-10 flex-center pt-10">
					<text class="font-light-gray">链++：</text>
					<text class="font-yellow" v-text="team_invest">0</text>
				</view>
			</view>
			<view class="data-cont">
				<view class="font-w-b font-16 font-black">团队总人数</view>
				<view class="nowrap font-10 flex-center pt-10">
					<text class="font-light-gray">人数：</text>
					<text class="font-yellow" v-text="yes_earnings_otg">0</text>
				</view>
			</view>
		</view>
<!-- 		<view class="plate-title flex-center flex-j-between mt-20 mb-20 bc-white">
			<text class="title font-16 font-w-b" v-text="type==2?'分享列表':'粉丝列表'">直推列表</text>
			<text class="font-12 font-light-gray">共{{allcount}}人</text>
		</view> -->
		<view class="nav-cont flex-center flex-j-around pb-25 pt-20">
			<text class="nav-name" :class="{'active':hierarchy==1}" @click="init();">我的推荐</text>
			<!-- <text class="nav-name" :class="{'active':hierarchy==2}" @click="hierarchy=2;init();">我的间推</text> -->
		</view>
		<view class="list-content">
			<view class="cont-list flex-center flex-j-between" v-for="(item,index) in list" :key="index" @click="app.showOpen('user/teamDetail?id='+item.user_id)">
				<image :src="item.avatar?item.avatar:'../../static/img/ed65e399554bd6a5423f8c5da027b31.png'"></image>
				<view class="cont-data">
					<view class="flex-center flex-j-between">
						<view class="flex-center font-w-b nowrap">
							{{item.username}}
							<text class="lvl one-row">LV.{{item.level}}</text>
						</view>
						<text class="font-12">推荐奖励 ：{{item.contribution}}</text>
					</view>
					<view class="flex-center flex-j-between nowrap font-12 font-light-gray mt-5">
						<text class="nowrap">联系方式：{{item.mobile}}</text>
						<text class="nowrap">注册时间：{{app._formatDate(item.created_at)}}</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>	
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
				allcount:"0",
				type:2,//1粉丝2直推
				yes_earnings_otg:0,
				all_earnings_otg:0,
				yes_earnings_ots:0,
				all_earnings_ots:0,
				team_invest:0,
				hierarchy:1,
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
				var send={
					type:0,
					level:-1,
					count:self.count,
					page:self.page,
					hierarchy:self.hierarchy
				};
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.user.team",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.allcount=res.data.data.list.total;
							// self.yes_earnings_otg=res.data.data.yes_earnings_otg;
							self.yes_earnings_otg=res.data.data.team_num;
							self.all_earnings_otg=res.data.data.all_earnings_otg;
							self.yes_earnings_ots=res.data.data.yes_earnings_ots;
							self.all_earnings_ots=res.data.data.all_earnings_ots;
							self.team_invest=res.data.data.team_invest;
							for(var i=0;i<res.data.data.list.data.length;i++){
								var item=res.data.data.list.data[i];
								self.list.push(item);
							};
							if(res.data.data.list.data.length==0 || res.data.data.list.data.length<self.count){
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
	/* .box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 150px;background-color: #211817;content: "";} */
	.nav-cont{width: 100%;position: relative;z-index: 1;}
	.nav-cont .nav-name{color: #262626;font-size: 16px;position: relative;width: 100%;}
	.nav-cont .nav-name.active{color: #595959;font-weight: bold;font-size: 20px;}
	/* .nav-cont .nav-name.active::after{position: absolute;bottom: -2px;width: 100%;height: 3px;left: 0px;background-color: #A99268;border-radius: 2px;content: "";} */
	.base-data{width: 100%;border-radius: 4px;position: relative;padding: 16px;z-index: 1;box-shadow: 0px 2px 6px #E9E8E8;}
	.base-data::after{position: absolute;top: 16px;left: 50%;height: calc(100% - 32px);width: 1px;background-color: #F5F5F5;content: "";}
	.base-data .data-cont{width: 42%;}
	.plate-title{position: relative;z-index: 1;}
	.list-content{width: 100%;border-top: 1px solid #F5F5F5;position: relative;z-index: 1;}
	.cont-list{width: 100%;padding: 24px 0px;border-bottom: 1px solid #F5F5F5;}
	.cont-list image{width: 36px;height: 36px;border-radius: 50%;}
	.cont-list .cont-data{width: calc(100% - 50px);}
	.cont-list .cont-data .lvl{background-color: #221915;border-radius: 10px;line-height: 20px;padding: 0px 10px;margin-left: 10px;color: #E52321;font-size: 11px;}
</style>
