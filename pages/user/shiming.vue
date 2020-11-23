<template>	<view class="box">		<view class="form-cont">			<view class="pb-20">
				<view class="flex-center flex-j-between">
					<view class="one-row">姓名</view>
				</view>
				<view class="Input-cont flex-center flex-j-between">
					<input :disabled="isDisabled" placeholder="请输入姓名" v-model="real_name" />
				</view>
			</view>
			<view class="pb-20">
				<view class="flex-center flex-j-between">
					<view class="one-row">身份证号</view>
				</view>
				<view class="Input-cont flex-center flex-j-between">
					<input :disabled="isDisabled" placeholder="请输入身份证号" v-model="id_card" maxlength="18"/>
				</view>
			</view>
			<view class="pb-20">
				<view class="flex-center flex-j-between">
					<view class="one-row">上传身份证</view>
				</view>
				<view class="flex-center flex-j-between">
					<view class="" style="flex: 1;text-align: center;">
						<view v-if="!img1" class="" style="width: 100%;height: 200rpx;background-color: #cbcb98;margin: 32rpx 0 24rpx;border-radius: 12rpx;">
							<text style="color: #FFFEFF;font-size: 88rpx;line-height: 200rpx;" @tap='choicePortrait1'>+</text>
						</view>
						<view v-else class="" style="width: 100%;height: 200rpx;margin: 32rpx 0 24rpx;border-radius: 12rpx;position: relative;">
							<image :src="img1" style="width: 100%;height: 100%;" mode=""></image>
							<image v-if="!isDisabled" src="../../static/img/delect.png" @tap='delect1'
							style="width: 40rpx;height: 40rpx;top: 0;right: 0rpx;position: absolute;" mode=""></image>
						</view>
						<text style="font-size: 12px;margin-top: 32rpx;">身份证正面</text>
					</view>
					<view class="" style="flex: 1;text-align: center;margin-left: 64rpx;">
						<view v-if="!img2" class="" style="width: 100%;height: 100px;background-color: #cbcb98;margin: 32rpx 0 24rpx;border-radius: 12rpx;">
							<text style="color: #FFFEFF;font-size: 88rpx;line-height: 200rpx;" @tap='choicePortrait2'>+</text>
						</view>
						<view v-else class="" style="width: 100%;height: 200rpx;margin: 32rpx 0 24rpx;border-radius: 12rpx;position: relative;">
							<image :src="img2" style="width: 100%;height: 100%;" mode=""></image>
							<image v-if="!isDisabled" src="../../static/img/delect.png" @tap='delect2'
							style="width: 40rpx;height: 40rpx;top: 0;right: 0rpx;position: absolute;" mode=""></image>
						</view>
						<text style="font-size: 12px;padding-top: 16rpx;">身份证反面</text>
					</view>
				</view>
			</view>		</view>
		<view style="margin: 60rpx 0;" v-if="isBohui">
			驳回提示： <text>{{titleMsg}}</text>
		</view>		<button v-if="isBohui" class="btn" @click="shimingEven">重新申请</button>
		<button v-else class="btn mt-40" @click="shimingEven">申请实名</button>	</view></template><script>	import user from "@/common/js/user.js"
	import upload from "@/common/js/upload.js"
	import config from "@/common/js/config.js"
	
	import {
		mapState
	} from 'vuex'
	export default {		data() {			return {
				real_name: '',
				id_card: '',
				imgs: '',
				img1: '',
				img2: '',
				key1: '',
				key2: '',
				load: true,
				isDisabled: false,
				isBohui: false,
				titleMsg: ''
			}
		},
		created() {
			this.get_data();
		},
		computed:{
			...mapState(['qiniu']),
		},
		methods: {
			get_data:function(){
				var self=this;
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/get.certification.detail",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							if(res.data.data.status == 0 || res.data.data.status == 1) { // 待审核 认证通过
								this.isDisabled = true;
								this.real_name = res.data.data.real_name;
								this.id_card = res.data.data.id_card;
								this.img1 = res.data.data.imgs[0];
								this.img2 = res.data.data.imgs[1];
							};
							if(res.data.data.status == 2) {
								this.isBohui = true;
								this.id_card = res.data.data.id_card;
								this.img1 = res.data.data.imgs[0];
								this.img2 = res.data.data.imgs[1];
								this.titleMsg = res.data.data.msg;
							};
						}
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
			choicePortrait1:function(){
				var self=this;
				upload.upload(self.qiniu,function(res){
					self.img1=res.portrait;
					self.key1=res.key;
					self.app._toastIcon("上传成功");
				},function(res){
					self.app._toast(res);
				});
			},
			choicePortrait2:function(){
				var self=this;
				upload.upload(self.qiniu,function(res){
					self.img2=res.portrait;
					self.key2=res.key;
					self.app._toastIcon("上传成功");
				},function(res){
					self.app._toast(res);
				});
			},
			delect1() {
				this.img1 = '';
			},
			delect2() {
				this.img2 = '';
			},
			shimingEven:function(){
				if(this.isDisabled) {
					this.app._toast("正在审核中或已通过");
					return
				};
				var self=this;
				if(!self.real_name.trim()){
					self.app._toast("请输入姓名");
					return;
				};
				if(!self.id_card.trim()){
					self.app._toast("请输入身份证号");
					return;
				};
				if(!self.img1.trim()){
					self.app._toast("请上传身份证正面照");
					return;
				};if(!self.img2.trim()){
					self.app._toast("请上传身份证反面照");
					return;
				};
				if(!self.load){
					self.app._toast("正在申请实名中，请不要重复点击");
					return ;
				};
				self.load=false;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.certification.apply",
					data: {
						real_name: this.real_name,
						id_card: this.id_card,
						imgs: this.key1 + ',' + this.key2
					},
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.app._toastIcon(res.data.message);
							setTimeout(function(){
								self.app.goBack();
							},1000);
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
					complete: (res) => {
						self.load=true;
					}
				});
			},
		}
	}
</script>

<style>
	@import url("@/common/css/login.css");
	.box{padding-top: 0px;}
	.form-cont{padding-top: 0px;}
</style>