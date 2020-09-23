<template>
	<view class="box">
		<view class="remarks-type newlines pl-15 pr-15 pt-15">
			<view class="type" v-for="(item,index) in type_list.list" :key="'list'+index" @click="type=item.name;init();">{{item.name}}({{item.num}})</view>
			<view class="type" v-for="(item,index) in type_list.list_extr" :key="'list_extr'+index" @click="type=item.name;init();">{{item.name}}({{item.num}})</view>
		</view>
		<view class="pl-15 pr-15">
			<view class="remarks-list" v-for="(item,index) in list" :key="index">
				<view class="user-data flex-center flex-j-between">
					<image :src="!item.wechat_avatar?'../../static/img/ed65e399554bd6a5423f8c5da027b31.png':item.wechat_avatar"></image>
					<view class="user-name">
						<view class="font-14 nowrap" v-text="item.wechat_name">weixin_9806224782</view>
						<view class="font-12 font-light-gray nowrap mt-5" v-text="item.created_at">2019.12.17</view>
					</view>
				</view>
				<view class="data-cont mt-10">
					<view class="text newlines" v-text="item.comment_content">老板人很好。</view>
					<view class="pic-cont flex-center flex-j-between">
						<image :src="jtem" v-for="(jtem,jndex) in item.imgs" :key="jndex"></image>
					</view>
				</view>
			</view>
		</view>
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
				id:"",
				page:1,
				count:20,
				list:[],
				loadingType: 'more', //加载更多状态
				type_list:{
					list:[],
					list_extr:[],
				},
				type:"",
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
					goods_id:self.id,
					comment_tag:self.type,
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.evaluation",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.type_list.list=res.data.data.evaluations_tag.list;
							self.type_list.list_extr=res.data.data.evaluations_tag.list_extr;
							for(var i=0;i<res.data.data.evaluations.list.length;i++){
								var item=res.data.data.evaluations.list[i];
								self.list.push(item);
							};
							if(res.data.data.evaluations.list.length==0 || res.data.data.evaluations.list.length<self.count){
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
	.remarks-cont{width: 100%;padding: 0px 15px;}
	.remarks-type{width: 100%;border-bottom: 10px solid #F5F5F5;}
	.remarks-type .type{margin-right: 10px;line-height: 28px;padding: 0px 5px;color: #666666;font-size: 12px;background-color: #F7F4F8;border-radius: 2px;display: inline-block;margin-bottom: 20px;}
	.remarks-type .type.active{}
	.remarks-list{width: 100%;border-bottom: 1px solid #F5F5F5;padding-bottom: 16px;padding-top: 16px;}
	.remarks-list .user-data{width: 100%;}
	.remarks-list .user-data image{width: 37px;height: 37px;border-radius: 50%;}
	.remarks-list .user-data .user-name{width: calc(100% - 50px);}
	.remarks-list .data-cont{width: 100%;padding-left: 50px;}
	.remarks-list .data-cont .text{width: 100%;font-size: 12px;color: #666666;}
	.remarks-list .data-cont .pic-cont{width: 100%;flex-wrap: wrap;position: relative;}
	.remarks-list .data-cont .pic-cont::after{content: "";width: 30%;}
	.remarks-list .data-cont .pic-cont image{width: 30%;height: 100px;margin-top: 15px;}
</style>
