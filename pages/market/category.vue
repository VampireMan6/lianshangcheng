<template>
	<view class="box">
		<view class="tab-line"></view>
		<view class="sort-content">
			<view class="sort-cont nowrap font-12" v-for="(item,index) in data":key="index" :class="{'active':nav==index}" @click="nav=index" v-text="item.cate_name">热门推荐</view>
		</view>
		<view class="content">
			<view class="banner pb-15" v-if="data[nav]">
				<image mode="widthFix" v-if="data[nav].img" :src="data[nav].img"></image>
			</view>
			<view class="list-content flex-center flex-j-between" v-if="data[nav]">
				<view class="cont-list text-center" v-for="(item,index) in data[nav].next_cat" :key="index" @click="app.showOpen('market/searchResult?name='+item.cate_name+'&id='+item.id)">
					<image :src="item.img"></image>
					<view class="nowrap font-gray font-12 pt-10" v-text="item.cate_name">玫瑰花</view>
				</view>
				<view class="text-center font-light-gray pt-25 pb-25" style="width: 100%;" v-if="!data[nav].next_cat||data[nav].next_cat.length==0">暂无数据~</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				data:[],
				nav:0,
			}
		},
		onLoad() {
			var self=this;
			self.get_data();
		},
		onPullDownRefresh() {
			var self=this;
			self.getIndex();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onNavigationBarSearchInputClicked: async function(e) {
			var self=this;
			self.app.showOpen('market/search');
		},
		methods: {
			get_data:function(){
				var self=this;
				uni.request({
					url: config.api_service + "/get.category",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						config.api_status(res);
						if (res.data.code == 200) {
							self.data=res.data.data;
						}else{
							console.log(res);
							// self.app._toast(res.data.message);
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
			},
		}
	}
</script>

<style>
	.box{height: 100vh;overflow-y: auto;border-top: 1px solid #F5F5F5;}
	.sort-content{position: fixed;top: 0px;left: 0px;width: 80px;height: 100%;overflow-y: auto;border-right: 1px solid #F5F5F5;}
	.content{position: fixed;top: 0px;right: 0px;width: calc(100% - 80px);height: 100%;overflow-y: auto;}
	
	.sort-content .sort-cont{width: 100%;padding: 15px 13px;position: relative;color: #333333;font-size: 16px;}
	.sort-content .sort-cont.active{color: #1A2B5A;}
	.sort-content .sort-cont.active::after{position: absolute;top: 15px;left: 0px;height: calc(100% - 30px);width: 4px;background-color: #1A2B5A;content: "";}

	.content{padding: 17px 15px;}
	.content .banner{width: 100%;}
	.content .banner image{width: 100%;}
	.content .list-content{width: 100%;flex-wrap: wrap;position: relative;box-shadow: 0px 0px 6px #DEDEDE;border-radius: 6px;}
	.content .list-content::after{width: 33%;content: "";}
	.content .list-content .cont-list{width: 33%;padding: 10px 0px;}
	.content .list-content .cont-list image{width: 40px;height: 40px;border-radius: 50%;}
	
</style>
