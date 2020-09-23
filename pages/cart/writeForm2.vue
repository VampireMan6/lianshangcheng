<template>
	<view class="box">
		<view class="cont-list bc-white">
			<view class="cont-data flex-row flex-j-between">
				<image :src="data.thumb"></image>
				<view class="text-data">
					<view class="name show-row lh-20" v-text="data.title">海南特产大树菠萝蜜十年老树整个20-25斤/10-12.5kg木菠萝</view>
					<view class="nowrap font-light-gray font-10 pt-10">规格：13斤-17斤/个</view>
				</view>
				<view class="price-data text-right">
					<view class="font-11 nowrap">{{data.shop_price}}{{data.coin_name}}</view>
					<view class="font-10 font-light-gray pt-10 nowrap">共{{data.buy_num}}{{data.unit}}</view>
				</view>
			</view>
		</view>
		<view class="pl-15 pr-15 mt-15 mb-10 bc-white">
			<view class="Input-cont flex-center flex-j-between" @click="ppSw=true">
				<text class="one-row pr-20">换货原因</text>
				<view class="font-light-gray nowrap">
					{{nav==-1?'请选择':reason[nav]}}
					<i class="iconfont icon-you font-light-gray ml-10 font-20"></i>
				</view>
			</view>
		</view>
		<view class="pl-15 font-yellow">仅限更换同款价格商品</view>
		<view class="btn-cont bc-white">
			<button class="btn" @click="setSend()">提交</button>
		</view>
		<view class="winPopup flex-row flex-end flex-j-center" v-if="ppSw" @click="ppSw=false">
			<view class="content bc-white pt-15 pb-25 pl-15 pr-15" @click.stop="">
				<view class="font-16 text-center">换货原因</view>
					<radio-group @change="radioChange">
						<view class="flex-center flex-j-between mt-20" v-for="(item,index) in reason" :key="index">
							<view class="newlines font-14" v-text="item">商品开线/走丝</view>
							<view class="one-row">
								<radio color="#E52321" :value="index" :checked="nav==index"></radio>
							</view>
						</view>
					</radio-group>
				<view class="mt-20">
					<button class="btn" @click="ppSw=false">确定</button>
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
				info:"",
				reason:[
					"质量问题",
					"7天无理由换货",
					"商品与描述不符",
					"卖家发错货",
					"其他",
				],
				ppSw:false,
				nav:-1,
			};
		},
		onLoad(e) {
			var self=this;
			e.data=JSON.parse(e.data);
			e.info=JSON.parse(e.info);
			self.data=e.data;
			self.info=e.info;
		},
		methods: {
			setSend:function(id){
				var self=this;
				if(self.nav==-1){
					return self.app._toast("请选择换货原因");
				};
				let send={
					sub_sn:self.info.sub_sn,
					order_sku_ids:self.data.order_sku_id,
					name:self.info.order_address.address_name,
					tel:self.info.order_address.address_mobile,
					return_type:3,
					return_cause:self.reason[self.nav],
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.after.sale.apply",
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
								uni.switchTab({
									url:"/pages/user/user"
								});
							},600);
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {}
				});
			},
			radioChange:function(e){
				this.nav = e.target.value;
			},
		}
	}
</script>

<style>
	@import url("@/common/css/order.css");
	page{background-color: #F5F5F5;}
	.cont-list{border-radius: 0px;box-shadow: 0px;}
	.Input-cont{width: 100%;height: 50px;border-bottom: 1px solid #F5F5F5;}
	.Input-cont input{width: 100%;height: 100%;}
	.status-btn{height: auto;}
	.status-btn .btn{width: 80px;line-height: 28px;border-radius: 20px;font-size: 12px;background-color: #FFFFFF;text-align: center;margin: 0px 30px;color: #999999;border: 1px solid #999999;}
	.status-btn .btn.active{color: #FFFFFF;background-color: #221915;}
	.btn-cont{width: 100%;position: fixed;left: 0px;bottom: 0px;padding: 15px 15px;}
	.winPopup{width: 100%;}
	.winPopup .content{width: 100%;border-radius: 5px 5px 0px 0px;max-height: 90vh;overflow-y: auto;}
</style>
