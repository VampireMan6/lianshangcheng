<template>
	<view class="box pl-15 pr-15">
		<view class="list-content">
			<view class="cont-list flex-center flex-j-between" :class="{'active':item.check}" v-for="(item,index) in list" :key="index" @click="choiceAddress(item)">
				<i class="iconfont choice icon-check" @click="item.check=!item.check"></i>
				<view class="cont">
					<view class="flex-center nowrap font-14 mb-5">
						<text class="mr-15 nowrap" v-text="item.name">小艺</text><text class="one-row" v-text="item.tel">15823560265</text>
					</view>
					<view class="font-12 font-light-gray nowrap">
						<text class="tick" v-if="item.is_default==1">默认</text>
						{{item.province+item.city+item.county+item.address}}
					 </view>
				</view>
				<view @click.stop=""><i class="iconfont icon-edit font-light-gray font-22" @click="app.showOpen('market/editAddress?type=edit&item='+JSON.stringify(item))"></i></view>
			</view>
			<view class="text-center font-light-gray pt-25 pb-25" v-if="list.length==0">暂时没有数据</view>
		</view>
		<view class="bottom-cont flex-center"><button class="btn" @click="app.showOpen('market/editAddress?type=add')">添加新地址</button></view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				list:[],
				type:"",
			}
		},
		onLoad(e) {
			var self=this;
			self.get_list();
			if(e.type){
				self.type=e.type;
			};
		},
		onNavigationBarButtonTap(e) {
			var self=this;
			if(e.index == 0){
				var choice=[];
				self.list.forEach(function(item){
					if(item.check){
						choice.push(item.id);
					};
				});
				if(choice.length==0){
					return self.app._toast("请选择需要删除的地址");
				};
				var send={
					address_id:choice.toString(),
				};
				uni.showModal({
					content: "确定删除当前所选的地址吗？",
					confirmText: "确定",
					cancelText: "取消",
					success: function (e) {
						if(e.confirm){
							// console.log(JSON.stringify(send));
							uni.showNavigationBarLoading();
							uni.request({
								url: config.api_service + "/post.address.del",
								data: send,
								method: "post",
								header: {Authorization: config.getToken()},
								success: res => {
									// console.log(JSON.stringify(res));
									uni.hideNavigationBarLoading();
									config.api_status(res);
									if (res.data.code == 200) {
										self.app._toastIcon(res.data.message);
										self.get_list();
									}else{
										self.app._toast(res.data.message);
									};
								},
								fail: (res) => {console.log(JSON.stringify(res));},
								complete: (res) => {}
							});
						};
					}
				});
			};
		},
		methods: {
			get_list:function(){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.user.address",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							res.data.data.forEach(function(item){
								item.check=false;
							});
							self.list=res.data.data;
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {}
				});
			},
			choiceAddress:function(item){
				var self=this;
				if(self.type){
					var page=self.app._prePage();
					page.$vm.getAddress(item);
					self.app.goBack();
				};
			}
		}
	}
</script>

<style>
	.box{padding-bottom: 70px;}
	.cont-list{width: 100%;padding: 16px 0px;border-bottom: 1px solid #F5F5F5;}
	.cont-list .choice{width: 20px;height: 20px;border-radius: 50%;background-color: #FFFFFF;color: #FFFFFF;display: inline-flex;align-content: center;align-items: center;justify-content: center;border: 1px solid #999999;}
	.cont-list.active .choice{background-color: #E52321;border: 0px;}
	.cont-list .cont{width: calc(100% - 60px);}
	.cont-list .tick{color: #E52321;font-size: 10px;line-height: 14px;border: 1px solid #E52321;border-radius: 2px;margin-right: 10px;padding: 0px 5px;}
	.bottom-cont{position: fixed;z-index: 1;width: 100%;height: 50px;background-color: #FFFFFF;padding: 0px 15px;bottom: 0px;left: 0px;box-shadow:0px -3px 6px rgba(245,245,245,1);}
</style>
