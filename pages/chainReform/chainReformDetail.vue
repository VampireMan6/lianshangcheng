<template>
	<view class="box pl-15 pr-15 pt-20">
		<view class="" v-if="isShow">
			<view class="base-data bc-white">
				<view class="left flex-row flex-j-between" style="margin-bottom: 16rpx;">
					<view>链改名称 : <text class="m-l-4">{{lg_name}}</text></view>
					<view class="download" @tap='download'>下载协议</view>
				</view>
				<view class="right flex-row flex-j-between" style="margin-bottom: 16rpx;">
					<view>链改金额 : <text class="m-l-4">{{amount | textAmount}}</text></view>
					<view>链改类型 : <text class="m-l-4">{{lg_type}}</text></view>
				</view>
				<view class="right flex-row flex-j-between">
					<view>期限 : <text class="m-l-4">{{lg_date}}</text></view>
					<view>月费 : <text class="m-l-4">{{month_fee | textAmount}}</text></view>
				</view>
			</view>
			<view class="nav-cont flex-center flex-j-around pb-25 pt-20">
				<text class="nav-name" :class="{'active':hierarchy==1}" @click="hierarchy=1">链改消费</text>
				<text class="nav-name" :class="{'active':hierarchy==2}" @click="hierarchy=2">转出记录</text>
			</view>
			<view class="list-content">
				<view class="cont-list flex-center flex-j-between" v-for="(item,index) in dataList" :key="index">
					<view class="">
						<view style="margin-bottom: 16rpx;">{{item.date_num}}期</view>
						<view v-if="hierarchy == 1">{{item.replace_date}}</view>
						<view v-else>{{item.deduct_date}}</view>
					</view>
					<view v-if="hierarchy == 1">
						<view style="margin-bottom: 16rpx;">{{item.amount | textAmount}}</view>
						<view style="text-align: end;" v-if="item.status == 1">已完成</view>
						<view style="text-align: end;" v-else>待转入</view>
					</view>
					<view v-else>
						<view style="margin-bottom: 16rpx;">{{item.amount | textAmount}}(链++)</view>
						<view style="text-align: end;" v-if="item.status == 0">待转出</view>
						<view style="text-align: end;" v-else-if="item.status == 1">已转出</view>
						<view style="text-align: end;" v-else>已逾期</view>
					</view>
				</view>
				<!-- <uni-load-more :status="loadingType"></uni-load-more> -->
			</view>	
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				lg_name:'',
				lg_type: '',
				amount: '',
				lg_date: '',
				month_fee: '',
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
				id: '',
				replaceList: [],
				monthfeeList: [],
				isShow: false,
				url: '',
				status: false
			}
		},
		filters: {
			textAmount(value) {
				return parseFloat(value).toFixed(2)
			}
		},
		computed: {
			dataList() {
				if(this.hierarchy == 1) {
					return this.replaceList
				}else {
					return this.monthfeeList
				}
			}
		},
		onLoad(e) {
			var self=this;
			self.id = e.id;
			self.get_data();
		},
		methods: {
			get_data:function(){
				var self=this;
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.liangai.detail",
					data: {
						liangai_id: self.id
					},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						config.api_status(res);
						if (res.data.code == 200) {
							self.lg_name = res.data.data.detail.lg_name;
							self.lg_type = res.data.data.detail.lg_type;
							self.amount = res.data.data.detail.amount;
							self.url = res.data.data.detail.upload_url;
							self.lg_date = res.data.data.detail.lg_date;
							self.month_fee = res.data.data.detail.month_fee;
							self.replaceList = res.data.data.replace;
							self.monthfeeList = res.data.data.month_fee;
							self.isShow = true;
						}else{
							self.app._toast(res.data.message);
						};
						uni.hideLoading();
					},
					fail: (res) => {
						uni.hideLoading();
						if(res.errMsg == 'request:fail timeout'){
							console.log("请求超时了");
						};
					},
					complete: (res) => {}
				});
			},
			download() {
				if(!this.status) {
					this.status = true;
					uni.showLoading({
						title: '下载中',
						mask: true
					});
					uni.downloadFile({
					  url: this.url,
					    success: (res) => {
					      if (res.statusCode === 200) {
									let tempFilePath = res.tempFilePath;
									console.log(res.tempFilePath)
										uni.saveFile({
											tempFilePath: tempFilePath,
											success: (res)=> {
												uni.showToast({
													icon: 'none',
													mask: true,
													title: '文件已保存：' + res.savedFilePath, //保存路径
													duration: 3000,
												});
												setTimeout(() => {
													uni.openDocument({
														filePath: res.savedFilePath,
														success: function(res) {
															// console.log('打开文档成功');
														}
													});
												}, 1000)
											},
											fail: (err)=> {
												this.app._toast('下载失败');
											}
										});
					      }else {
									this.app._toast('下载失败');
								}
					    },
							fail: (err) => {
								this.app._toast('下载失败');
							},
							complete: (res) => {
								this.status = false;
								uni.hideLoading()
							}
					});
				}
			}
			// get_list:function(){
			// 	var self=this;
			// 	if(self.loadingType === 'nomore'){
			// 		return;
			// 	}else{
			// 		self.loadingType = 'loading';
			// 	};
			// 	var send={
			// 		type:0,
			// 		level:-1,
			// 		count:self.count,
			// 		page:self.page,
			// 		hierarchy:self.hierarchy
			// 	};
			// 	uni.showLoading({title: '获取中，请稍等'});
			// 	uni.request({
			// 		url: config.api_service + "/get.user.team",
			// 		data: send,
			// 		method: "get",
			// 		header: {Authorization: config.getToken()},
			// 		success: res => {
			// 			// console.log(JSON.stringify(res));
			// 			uni.hideLoading();
			// 			config.api_status(res);
			// 			if (res.data.code == 200) {
			// 				self.allcount=res.data.data.list.total;
			// 				// self.yes_earnings_otg=res.data.data.yes_earnings_otg;
			// 				self.yes_earnings_otg=res.data.data.team_num;
			// 				self.all_earnings_otg=res.data.data.all_earnings_otg;
			// 				self.yes_earnings_ots=res.data.data.yes_earnings_ots;
			// 				self.all_earnings_ots=res.data.data.all_earnings_ots;
			// 				self.team_invest=res.data.data.team_invest;
			// 				for(var i=0;i<res.data.data.list.data.length;i++){
			// 					var item=res.data.data.list.data[i];
			// 					self.list.push(item);
			// 				};
			// 				if(res.data.data.list.data.length==0 || res.data.data.list.data.length<self.count){
			// 					self.loadingType = 'nomore';
			// 				}else{
			// 					self.loadingType = 'more';
			// 				};
			// 				self.page++;
			// 			}else{
			// 				self.app._toast(res.data.message);
			// 			};
			// 		},
			// 		fail: (res) => {
			// 			uni.hideLoading();
			// 			if(res.errMsg == 'request:fail timeout'){
			// 				console.log("请求超时了");
			// 			};
			// 			console.log(JSON.stringify(res));
			// 		},
			// 		complete: (res) => {}
			// 	});
			// }
		}
	}
</script>

<style>
	/* .box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 150px;background-color: #211817;content: "";} */
	.nav-cont{width: 100%;position: relative;z-index: 1;}
	.nav-cont .nav-name{color: #262626;font-size: 16px;position: relative;}
	.nav-cont .nav-name.active{color: #595959;font-weight: bold;font-size: 20px;}
	.nav-cont .nav-name.active::after{position: absolute;bottom: -2px;width: 100%;height: 3px;left: 0px;background-color: #A99268;border-radius: 2px;content: "";}
	.base-data{width: 100%;border-radius: 4px;position: relative;padding: 16px;z-index: 1;box-shadow: 0px 2px 6px #E9E8E8;}
	/* .base-data::after{position: absolute;top: 16px;left: 50%;height: calc(100% - 32px);width: 1px;background-color: #F5F5F5;content: "";} */
	.base-data .data-cont{width: 42%;}
	.plate-title{position: relative;z-index: 1;}
	.list-content{width: 100%;border-top: 1px solid #F5F5F5;position: relative;z-index: 1;}
	.cont-list{width: 100%;padding: 24rpx 0px;border-bottom: 1px solid #F5F5F5;}
	.cont-list image{width: 36px;height: 36px;border-radius: 50%;}
	.cont-list .cont-data{width: calc(100% - 50px);}
	.cont-list .cont-data .lvl{background-color: #221915;border-radius: 10px;line-height: 20px;padding: 0px 10px;margin-left: 10px;color: #E52321;font-size: 11px;}
	.m-l-4 {margin-left: 16rpx;}
	.download {background-color: rgb(26, 43, 90);color: #fff;border-radius: 8rpx;
	padding: 4rpx 8rpx;font-size: 12px;}
</style>
