<template>
	<view class="box pt-15 pb-15 pl-15 pr-15">
		<view class="no-list flex-center flex-j-center" v-if="list.length==0">
			<image mode="widthFix" src="../../static/img/no-card.png"></image>
			<view class="font-12 pt-10 text-center">您还未绑定银行卡哟!</view>
		</view>
		<view v-else>
			<view class="font-12 pb-15">银行卡</view>
			<view class="cont-list flex-center flex-j-between mb-15 bc-white pt-15 pb-15 pl-15 pr-15" v-for="(item,index) in list" :key="index" @click="choiceCard(item)">
				<view class="data">
					<view class="font-16 nowrap" v-text="item.bank_name">中国建设银行储蓄卡</view>
					<view class="font-14 font-light-gray nowrap pt-10" v-text="item.bank_no">****  ****  ****  1220</view>
				</view>
				<view class="icon" @click.stop="">
					<i class="iconfont icon-edit font-18 one-row mb-10" @click="app.showOpen('card/addCard?type=modify&data='+JSON.stringify(item))"></i>
					<i class="iconfont icon-lajixiang one-row" @click="removeCard(item)"></i>
				</view>
			</view>
		</view>
		<view class="add-btn text-center bc-white font-light-gray" @click="app.showOpen('card/addCard?type=add')"><i class="iconfont icon-jia mr-10"></i>添加银行卡</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				list:[],
			}
		},
		onLoad() {
			var self=this;
			self.getCard();
		},
		methods: {
			choiceCard:function(item){
				var self=this;
				var page=self.app._prePage();
				page.$vm.getChoice(item);
				self.app.goBack();
			},
			removeCard:function(item){
				var self=this;
				uni.showModal({
					content: "确定删除当前选择的银行卡？",
					confirmText: "确定",
					cancelText: "暂不",
					success: function (e) {
						if(e.confirm){
							var send={
								user_bank_id:item.id,
							};
							uni.showNavigationBarLoading();
							uni.request({
								url: config.api_service + "/post.user.bank.del",
								data: send,
								method: "post",
								header: {Authorization: config.getToken()},
								success: res => {
									// console.log(JSON.stringify(res));
									uni.hideNavigationBarLoading();
									config.api_status(res);
									if (res.data.code == 200) {
										self.app._toast(res.data.message);
										setTimeout(function(){
											self.getCard();
										},500);
									}else{
										self.app._toast(res.data.message);
									};
								},
								fail: (res) => {
									uni.hideNavigationBarLoading();
									if(res.errMsg == 'request:fail timeout'){
										console.log("请求超时了");
									};
									console.log(JSON.stringify(res));
								},
								complete: (res) => {}
							});
						};
					}
				})
			},
			getCard:function(){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.user.bank",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.list=res.data.data;
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
	page{background-color: #F5F5F5;}
	.box{padding-bottom: 50px;}
	.no-list{width: 100%;height: calc(100vh - 100px);flex-wrap: wrap;}
	.no-list view{color: #666666;width: 100%;}
	.no-list image{width: 140px;}
	.add-btn{width: 100%;line-height: 50px;position: fixed;bottom: 0px;left: 0px;z-index: 1;}
	.add-btn image{width: 18px;}
	.cont-list{width: 100%;border-radius: 4px;}
	.cont-list .data{width: calc(100% - 60px);}
	.cont-list .icon{width: 50px;}
	.cont-list .icon .iconfont{width: 100%;text-align: center;display: inline-block;}
</style>
