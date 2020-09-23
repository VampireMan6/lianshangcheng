<template>
	<view class="box" v-if="data">
		<view class="sn-data bc-white flex-center flex-j-between pl-15 pr-15 pt-15 pb-15">
			<view class="data">
				<view class="newlines font-13">订单编号：{{data.delivery_num}}</view>
				<view class="newlines font-13 mt-10">配送方式：{{data.delivery_name}}</view>
			</view>
		</view>
		<view class="pt-10 pb-10 pl-15 pr-15">
			<view class="content bc-white pt-15 pb-15 pl-15 pr-15">
				<view class="cont-list flex-row flex-j-between">
					<view class="line-cont">
						<view class="icon flex-center flex-j-center active">
							<i class="iconfont icon-dizhi font-white font-14"></i>
						</view>
					</view>
					<view class="news-cont newlines font-13 lh-20 pb-20">[收货地址]{{data.order_address.address_detail}}</view>
				</view>
				<view class="cont-list flex-row flex-j-between" v-for="(item,index) in newsInfo" :key="index">
					<view class="line-cont">
						<view class="icon flex-center flex-j-center"></view>
					</view>
					<view class="news-cont newlines font-13 lh-20 pb-20">
						<view class="font-light-gray font-13 newlines lh-20" v-text="item.time"></view>
						<view class="font-light-gray font-13 newlines" v-text="item.context"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				data:"",
				newsInfo:"",
			}
		},
		onLoad(e) {
			var self=this;
			e.data=JSON.parse(e.data);
			self.data=e.data;
			self.getData(e.data);
		},
		methods: {
			getData:function(e){
				var self=this;
				var send={
					delivery_num:e.delivery_num,//运单号
					delivery_name:e.delivery_name,//物流公司名称
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.order.logistics",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.newsInfo=res.data.data.data;
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
			},
			cancelOrder:function(id){
				var self=this;
				uni.showModal({
					content: "确定取消当前订单吗？",
					confirmText: "确定",
					cancelText: "取消",
					success: function (e) {
						if(e.confirm){
							var send={
								order_id:id,
							};
							uni.showNavigationBarLoading();
							uni.request({
								url: config.api_service + "/post.order.cancel",
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
											self.init();
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
			
		}
	}
</script>

<style>
	page{background-color: #F7F7F7;}
	.sn-data{width: 100%;}
	.sn-data .data{width: 100%;}
	/* .sn-data .data{width: calc(100% - 80px);} */
	/* .sn-data .btn{border: 1px solid #CCCCCC;border-radius: 20px;line-height: 25px;width: 80px;color: #999999;} */
	.content{width: 100%;border-radius: 6px;}
	.cont-list{width: 100%;position: relative;}
	.cont-list .line-cont{width: 40px;position: relative;}
	.cont-list .line-cont::after{position: absolute;top: 8px;left: 50%;width: 1px;height: 100%;content: "";background-color: #CCCCCC;}
	.cont-list .line-cont .icon{width: 6px;height: 6px;border-radius: 50%;background-color: #CCCCCC;overflow: hidden;position: absolute;left: calc(50% - 3px);top: 8px;}
	.cont-list .line-cont .icon.active{width: 20px;height: 20px;border-radius: 50%;background-color: #E52321;overflow: hidden;position: absolute;left: calc(50% - 10px);top: 0px;z-index: 1;}
	.cont-list:last-child .line-cont::after{height:0px;}
	.cont-list .news-cont{width: calc(100% - 40px);}
</style>
