<template>
	<view class="box pl-15 pr-15 pt-15 pb-15">
		<view class="goodsInfo flex-center flex-j-between pb-15">
			<image :src="data.thumb"></image>
			<view class="cont-data flex-row flex-a-around">
				<view class="name-cont">
					<view class="name show-row" v-text="data.title">海南特产大树菠萝蜜十年老树整个20-25斤</view>
					<view class="font-11 nowrap font-light-gray pt-5" v-if="data.spec">规格：{{getSpec(data.spec)}}</view>
					<view class="font-11 nowrap font-light-gray pt-5" v-else>规格：{{data.subtitle+data.buy_num+data.unit}}</view>
				</view>
				<view class="flex-center">
					<text class="mr-10">商品评分</text>
					<uni-rate active-color="#E52321" :size="18" :value="star" @change="onChange" />
				</view>
			</view>
		</view>
		<view class="Input-cont">
			<textarea maxlength="500" @input="getTextarea" class="font-12" placeholder="说说你对商品的感受，分享给其他想买的小伙伴吧！"></textarea>
			<view class="text-right font-11 font-light-gray pt-10">{{textlen}}/500</view>
		</view>
		<view class="pic-content pt-20 flex-center flex-j-between">
			<view class="add text-center flex-center flex-j-center mb-15" v-if="img_arr.length<6" @click="choicePortrait()">
				<image mode="widthFix" src="../../static/img/0251c22be1dcf7944a36a77f89a1b33.png"></image>
				<view class="text font-11 font-light-gray pt-10">上传图片</view>
			</view>
			<view class="pic mb-15" v-for="(item,index) in img_arr" :key="index">
				<image :src="item"></image>
				<text class="remove" @click="removePic(index)">删除</text>
			</view>
		</view>
		<!-- <view class="flex-center flex-j-between pt-20 pb-10">
			<view class="flex-center" @click="def=!def">
				<radio color="#E52321" :checked="def"></radio>
				<text class="font-15">匿名</text>
			</view>
			<text class="font-14 font-light-gray">写的评论会以匿名的形式展现</text>
		</view> -->
		<view class="btn-cont">
			<button class="btn" @click="setRemarks()">提交评价</button>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import upload from "@/common/js/upload.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			uniRate,
		},
		data() {
			return {
				data:"",
				star:5,
				text:"",
				textlen:"0",
				def:false,
				img_arr:[],
				img_address:[],
			}
		},
		onLoad(e) {
			var self=this;
			self.data=JSON.parse(e.data);
		},
		computed:{
			...mapState(["hasLogin",'userInfo','qiniu']),
		},
		methods: {
			removePic:function(index){
				var self=this;
				self.img_arr.splice(index,1);
				self.img_address.splice(index,1);
			},
			choicePortrait:function(){
				var self=this;
				upload.upload(self.qiniu,function(res){
					self.img_arr.push(res.portrait);
					self.img_address.push(res.key);
					self.app._toastIcon("上传成功");
				},function(res){
					self.app._toast(res);
				});
			},
			getTextarea:function(e){
				this.text=e.detail.value;
				this.textlen=e.detail.value.length;
			},
			onChange:function(e) {
				// console.log('星星rate发生改变:' + JSON.stringify(e));
				this.star=e.value;
			},
			setRemarks:function(){
				var self=this;
				if(self.text.length==0){
					return self.app._toast("请输入你对商品的感受");
				};
				var send={
					order_sku_id:self.data.order_sku_id,
					goods_id:self.data.goods_id,
					sku_id:self.data.sku_id,
					comment_content:self.text,
					star:self.star,
					anonymous:self.def,
					imgs:self.img_address.toString(),
				};
				// console.log(JSON.stringify(send));
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.evaluation.add",
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
								var page=self.app._prePage();
								page.$vm.init();
								self.app.goBack();
							},800);
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
			getSpec:function(s){
				s=JSON.parse(s);
				let str="";
				s.forEach(function(item){
					str=str+item.name+':'+item.value.title+";";
				})
				return str
			},
		}
	}
</script>

<style>
	.goodsInfo{width: 100%;}
	.goodsInfo image{width: 80px;height: 80px;}
	.goodsInfo .cont-data{width: calc(100% - 95px);height: 80px;flex-wrap: wrap;}
	.goodsInfo .cont-data .name{max-height: 40px;}
	.goodsInfo .name-cont{width: 100%;}
	.uni-rate{min-height: 18px;margin-bottom: -15px;}
	.Input-cont{width: 100%;border-radius: 4px;background-color: #F6F5F8;padding: 15px;}
	.Input-cont textarea{width: 100%;height: 150px;}
	.pic-content{width: 100%;flex-wrap: wrap;position: relative;}
	.pic-content::after{width: 30%;content: "";}
	.pic-content .add{width: 30%;height: 100px;border: 1px dashed #CCCCCC;flex-wrap: wrap;}
	.pic-content .add image{width: 25px;}
	.pic-content .add .text{width: 100%;}
	.pic-content .pic{width: 30%;height: 100px;position: relative;}
	.pic-content .pic .remove{position: absolute;bottom: 0px;right: 0px;background-color: red;color: #FFFFFF;font-size: 8px;padding: 5px 10px;border-radius: 2px;}
	.pic-content .pic image{width: 100%;height: 100%;border-radius: 2px;}
	.btn-cont{width: 100%;position: fixed;bottom: 0px;left: 0px;padding: 15px 16px;}
</style>
