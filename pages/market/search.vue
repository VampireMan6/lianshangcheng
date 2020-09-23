<template>
	<view class="box pt-10 pb-10 pl-15 pr-15">
		<view class="search-cont flex-center flex-j-between">
			<view class="search flex-center">
				<i class="iconfont icon-search" @click="app.showOpen('market/searchResult')"></i>
				<input type="text" placeholder="" v-model="value" />
			</view>
			<text class="one-row ml-10 font-14" @click="go_search()">搜索</text>
		</view>
		<view class="flex-center flex-j-between pt-25 pb-15">
			<text class="font-12">历史搜索</text><i class="iconfont icon-lajixiang font-light-gray font-18" @click='removeHistory()'></i>
		</view>
		<view class="data-cont newlines">
			<view class="data" v-for="(item,index) in list" :key='index' v-text="item" @click="app.showOpen('market/searchResult?name='+item+'&id='+item+'&type=keyword');">蜜瓜</view>
			<view class="text-center pt-30 pb-30" v-if="list.length==0">空</view>
		</view>
		<!-- <view class="flex-center flex-j-between pb-15">
			<text class="font-12">热门搜索</text>
		</view>
		<view class="data-cont newlines">
			<view class="data active">蜜柚</view><view class="data">水果拼盘</view><view class="data">蓝莓</view><view class="data">香蕉</view><view class="data">猕猴桃</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:"",
				list:[],
			}
		},
		onLoad() {
			var self=this;
			self.list=uni.getStorageSync("history")||[];
		},
		methods: {
			go_search:function(){
				var self=this;
				if(self.value.trim().length==0){
					return self.app._toast("请输入搜索内容");;
				};
				self.setHistory();
				self.app.showOpen('market/searchResult?name='+self.value+'&id='+self.value+'&type=keyword');
				self.value="";
			},
			setHistory:function(){
				var self=this;
				self.list.push(self.value);
				uni.setStorageSync("history",self.list);
			},
			removeHistory:function(){
				var self=this;
				uni.setStorageSync("history",[]);
				self.list=uni.getStorageSync("history")||[];
			}
		}
	}
</script>

<style>
	.search-cont {width: 100%;}
	.search-cont .search{width: 100%;height: 32px;position: relative;z-index: 1;background-color: #F5F5F5;border-radius: 15px;padding: 0px 20px;}
	.search-cont .search .iconfont{font-size: 20px;color: #999999;}
	.search-cont .search input{width: 100%;height: 100%;font-size: 14px;color: #333333;padding: 0px 15px;}
	.data-cont{width: 100%;}
	.data-cont .data{margin-right: 10px;line-height: 28px;padding: 0px 12px;color: #333333;font-size: 14px;background-color: #F5F5F5;border-radius: 2px;display: inline-block;margin-bottom: 20px;}
	.data-cont .data.active{background-color: #221915;color: #FFFFFF;}
</style>
