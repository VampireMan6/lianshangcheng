<template>
	<view class="box">
		<view v-if="data">
			<view class="loop-Img">
				<swiper class="swiper" :autoplay="true" :circular="true" :interval="5000" :duration="1000">
					<swiper-item v-for="(item,index) in data.imgs" :key="index">
						<image class="swiper-item" :src="item"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="pt-15 pb-15 pl-15 pr-15">
				<view class="newlines font-16 pb-15" v-text="data.title">草莓水果沙拉超级无敌好吃草莓水果沙拉超级无敌好吃</view>
				<view class="flex-center nowrap font-18 font-w-b">
					<text class="font-yellow mr-5" v-text="data.shop_price">100.0000</text>{{data.coin_name}}
				</view>
				<!-- <view class="nowrap font-light-gray">≈{{app._accMul(data.shop_price,data.rate_cny)}} CNY</view> -->
			</view>
			<view class="specs-cont flex-center flex-j-between" v-if="data.specs" @click="specsSW=true">
				<view class="nowrap"v-if="!choice_Id">请选择规格</view>
				<view class="nowrap" v-else>
					<text class="font-light-gray mr-5">已选</text>
					<text v-for="(item,index) in choice_Id.spec" :key="index" v-text="item.name+':'+item.value.title"></text>
				</view>
				<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
			</view>
			<view class="remarks-cont pb-10">
				<view class="flex-center flex-j-between pt-15">
					<text class="title font-16 font-w-b">评价({{Remarks.evaluations.total_counts}})</text>
					<view class="flex-center font-light-gray" @click="app.showOpen('market/remarks?id='+data.id)" v-if="Remarks.evaluations.total_counts!=0">
						查看更多
						<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
					</view>
				</view>
				<view class="remarks-type newlines">
					<view class="type" v-for="(item,index) in Remarks.evaluations_tag.list" :key="'list'+index">{{item.name}}({{item.num}})</view>
					<view class="type" v-for="(item,index) in Remarks.evaluations_tag.list_extr" :key="'list_extr'+index">{{item.name}}({{item.num}})</view>
				</view>
				<view class="remarks-list" v-for="(item,index) in Remarks.evaluations.list" :key="index">
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
			<view class="details-cont pt-15 pb-15 pl-15 pr-15">
				<view class="text-center pb-15">商品详情</view>
				<view class="details" v-html="data.content">
					商品详情商品详情商品详情商品详情
				</view>
			</view>
			<view class="bottom-cont flex-center flex-j-between pl-25 pr-25">
				<view class="text-btn flex-center flex-j-between">
					<!-- <view class="btn text-center">
						<i class="iconfont icon-duomeitiicon- font-20"></i>
						<view class="text font-10">分享</view>
					</view>
					<view class="btn text-center">
						<i class="iconfont icon-jingdiananli_kongwujiaoxing_shoucang font-23"></i>
						<view class="text font-10">收藏</view>
					</view> -->
				</view>
				<view class="btn-cont flex-center">
					<button class="btn" @click="(data.specs?specsSW=true:addCart())">加入购物车</button>
					<button class="btn ml-10" @click="(data.specs?specsSW=true:goBuy())">立即购买</button>
				</view>
			</view>
		</view>
		<view class="winPopup flex-row flex-end flex-j-center" v-if="specsSW" @click="specsSW=false">
			<view class="choice-content bc-white pt-15 pl-15 pr-15 pb-15" @click.stop="">
				<view class="product-data flex-row flex-end flex-j-between">
					<image :src="choice_Id?choice_Id.thumb:data.thumb"></image>
					<view class="data">
						<view class="font-red font-16 font-w-b nowrap" v-text="'￥'+(choice_Id!=''?choice_Id.shop_price:data.shop_price)">￥66.9</view>
						<view class="font-light-gray font-12 nowrap lh-30" v-text="'库存 '+(choice_Id!=''?choice_Id.number:data.sku_total)">库存 995sku_total</view>
						<view class="nowrap" v-if="!choice_Id">请选择规格</view>
						<view class="nowrap" v-else>
							<text v-for="(item,index) in choice_Id.spec" :key="index" v-text="item.name+':'+item.value.title"></text>
						</view>
					</view>
				</view>
				
				<view class="mt-20" v-for="(item,index) in JSON.parse(data.specs)">
					<text v-text="'选择'+item.name">选择规格</text>
					<view class="newlines cont">
						<view class="ct nowrap mr-15 mt-10" :class="{'active': choice_Index[item.id] == jndex}" v-for="(jtem,jndex) in item.value" :key="jndex" v-text="jtem.title" @click="choiceSpec(item,jtem,jndex)">红色2</view>
					</view>
				</view>
				<view class="flex-center flex-j-between pt-15 pb-15">
					<text>数量</text>
					<view class="number flex-center nowrap">
						<view class="one-row" @click="number=(number==1?1:number-1)"><image src="../../static/img/reduce.png"></image></view>
						<view class="nowrap pl-10 pr-10" v-text="number">1</view>
						<view class="one-row" @click="number=Number(number)+1"><image src="../../static/img/add.png"></image></view>
					</view>
				</view>
				<view class="btn-cont flex-center flex-j-between bc-white">
					<button class="btn" @click="addCart()">加入购物车</button>
					<button class="btn" @click="goBuy()">立即购买</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import cart from "@/common/js/cart.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				data:"",
				specsSW:false,
				number:"1",
				choice_Index:{},
				choice_arr:{},
				choice_Id:"",
				Remarks:{
					evaluations:{
						list:[],
						total_counts:0,
					},
					evaluations_tag:{
						list:[],
						list_extr:[],
					}
				},
			}
		},
		onLoad(e) {
			var self=this;
			self.get_data(e.id);
			self.getRemarks(e.id);
		},
		computed:{
			...mapState(["cartInfo",'userInfo']),
		},
		methods: {
			...mapMutations(['login','SetCart']),
			addCart:function(){
				var self=this;
				var send={
					number:self.number,
					sku_id:"",
					goods_id:self.data.id,
				};
				if(self.data.specs){//需要选择规格
					if(self.choice_Id==''){
						self.specsSW=true;
						self.app._toast("请选择规格");
						return;
					};
					send.sku_id=self.choice_Id.id;
				}else{
					send.sku_id=0;
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.cart.add",
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
								cart.get_cart(function(cart){
									self.SetCart(cart.data.data);
								});
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
			},
			goBuy:function(){
				var self=this;
				var send={
					number:self.number,
					sku_id:"0",
					goods_id:self.data.id,
				};
				if(self.data.specs){//需要选择规格
					if(self.choice_Id==''){
						self.specsSW=true;
						self.app._toast("请选择规格");
						return;
					};
					send.sku_id=self.choice_Id.id;
				}else{
					send.sku_id=self.data.id;
				};
				self.app.showOpen('market/confirmOrder?type=buy&send='+JSON.stringify(send));
			},
			choiceSpec:function(item,jtem,jndex){
				var self=this;
				var str=item;
				str.value=jtem;
				self.choice_Index[item.id]=jndex;
				self.choice_Index=JSON.parse(JSON.stringify(self.choice_Index));
				self.choice_arr[item.id]=str;
				var arr=[];
				for (let i in self.choice_arr) {
					arr.push(self.choice_arr[i]);
				};
				var data=self.data.skus.filter(function(item){
					return JSON.stringify(item.spec)==JSON.stringify(arr);
				});
				if(data&&data[0]){
					self.choice_Id=data[0];
				};
			},
			get_data:function(id){
				var self=this;
				var send={
					goods_id:id
				};
				uni.showLoading({title: '获取中'});
				uni.request({
					url: config.api_service + "/get.goods.detail",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							const regex = new RegExp('<img', 'gi');
							res.data.data.content = res.data.data.content.replace(regex, `<img style="max-width: 100%;"`);
							if(res.data.data.specs){
								res.data.data.skus.forEach(function(item){
									item.spec=JSON.parse(item.spec);
								});
							};
							self.data=res.data.data;
						}else{
							// console.log(res);
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
			},
			getRemarks:function(id){
				var self=this;
				var send={
					page:1,
					count:5,
					goods_id:id
				};
				uni.showLoading({title: '获取中'});
				uni.request({
					url: config.api_service + "/get.evaluation",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideLoading();
						// console.log(JSON.stringify(res));
						config.api_status(res);
						if (res.data.code == 200) {
							self.Remarks=res.data.data;
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
	.box{padding-bottom: 70px;}
	.loop-Img{width: 100%;}
	.loop-Img .swiper{width: 100%;height: 300px;}
	.loop-Img image{width: 100%;height: 100%;}
	.specs-cont{width: 100%;padding: 15px;border-top: 10px solid #F7F4F8;}
	.remarks-cont{width: 100%;padding: 0px 15px;border-top: 10px solid #F7F4F8;}
	.remarks-type{width: 100%;}
	.remarks-type .type{margin-right: 10px;line-height: 28px;padding: 0px 5px;color: #666666;font-size: 12px;background-color: #F7F4F8;border-radius: 2px;display: inline-block;margin-top: 20px;}
	.remarks-list{width: 100%;border-bottom: 1px solid #F5F5F5;padding-bottom: 16px;padding-top: 16px;}
	.remarks-list .user-data{width: 100%;}
	.remarks-list .user-data image{width: 37px;height: 37px;border-radius: 50%;}
	.remarks-list .user-data .user-name{width: calc(100% - 50px);}
	.remarks-list .data-cont{width: 100%;padding-left: 50px;}
	.remarks-list .data-cont .text{width: 100%;font-size: 12px;color: #666666;}
	.remarks-list .data-cont .pic-cont{width: 100%;flex-wrap: wrap;position: relative;}
	.remarks-list .data-cont .pic-cont::after{content: "";width: 30%;}
	.remarks-list .data-cont .pic-cont image{width: 30%;height: 100px;margin-top: 15px;}
	.details-cont{width: 100%;border-top: 10px solid #F7F5F6;}
	.details-cont .details{font-size: 14px;color: #333333;line-height: 20px;}
	.details-cont .details img{width: 100%;height: auto;}
	.bottom-cont{width: 100%;height: 50px;position: fixed;bottom: 0px;left: 0px;background-color: #FFFFFF;box-shadow: 1px 1px 6px #E9E8E8;}
	.bottom-cont .text-btn{width: calc(100% - 250px);height: 100%;}
	.bottom-cont .text-btn .iconfont{width: 20px;height: 20px;display:inline-flex;align-items: center;justify-content: center;}
	.bottom-cont .btn{}
	.bottom-cont .btn-cont{}
	.bottom-cont .btn-cont button.btn{line-height: 36px;font-size: 14px;border-radius: 25px;width: 100px;}
	.bottom-cont .btn-cont button.btn:first-child{color: #FFFFFF;background-color: #E52321;}
	.bottom-cont .btn-cont button.btn:last-child{color: #FFFFFF;background-color: #1A2B5A;}
	.choice-content{width: 100%;height: 80vh;border-radius: 20px 20px 0px 0px;position: relative;overflow-y: auto;padding-bottom: 60px;}
	.choice-content .product-data{width: 100%;}
	.choice-content .product-data image{width: 100px;height: 100px;}
	.choice-content .product-data .data{width: calc(100% - 120px);}
	.choice-content .cont{width: 100%;}
	.choice-content .cont .ct{line-height: 25px;padding: 0px 10px;border-radius: 10px;background-color: #D7E2F9;display: inline-block;}
	.choice-content .cont .ct.active{background-color: #1A2B5A;color: #FFFFFF;}
	.choice-content .number image{width: 25px;height: 25px;display: block;border: 1px;}
	.choice-content .btn-cont{width: 100%;padding:10px 15px;position: fixed;bottom: 0px;left: 0px;z-index: 1;}
	.choice-content .btn-cont button.btn{width: 46%;line-height: 40px;font-size: 14px;}
	.choice-content .btn-cont button.btn:first-child{background-color: #E52321;color: #FFFFFF;}
</style>
