<template>
	<view class="box">
		<view class="portrait-cont text-center">
			<image :src="portrait"></image>
			<view class="mt-10 font-white"><text @click="choicePortrait()">更改头像</text></view>
		</view>
		<view class="form-cont pl-15 pr-15 pt-35">
			<view class="Input-cont flex-center">
				<text class="title one-row font-15 font-white">昵称：</text>
				<input type="text" class="font-white" v-model="name" />
			</view>
			<view class="Input-cont flex-center">
				<text class="title one-row font-15 font-white">等级：</text>
				<input type="text" class="font-white" disabled v-model="lvl" />
			</view>
			<view class="Input-cont flex-center">
				<text class="title one-row font-15 font-white">手机：</text>
				<input type="text" class="font-white" disabled v-model="mobile" />
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import user from "@/common/js/user.js"
	import upload from "@/common/js/upload.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				name:"用户昵称",
				lvl:"0",
				mobile:"***********",
				portrait:"../../static/img/ffa5e294541bd80ca4f122b1bca701e.png",
				address:"",
			}
		},
		onLoad() {
			var self=this;
			self.getUserInfo();
		},
		onNavigationBarButtonTap(e) {
			var self=this;
			if(e.index==0){
				self.setUserInfo();
			};
		},
		computed:{
			...mapState(["hasLogin",'userInfo','qiniu']),
		},
		methods: {
			...mapMutations(["SetUserInfo"]),
			choicePortrait:function(){
				var self=this;
				upload.upload(self.qiniu,function(res){
					self.portrait=res.portrait;
					self.address=res.key;
					self.app._toastIcon("上传成功");
				},function(res){
					self.app._toast(res);
				});
			},
			setUserInfo:function(){
				var self=this;
				if(self.name.length==0){
					return self.app._toast("请输入昵称");
				};
				// if(self.address.length==0){
				// 	return self.app._toast("请选择上传的图片");
				// };
				var send={
					nickname:self.name,
					avatar:self.address,
				};
				// console.log(JSON.stringify(send));
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.user.info.up",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.app._toast(res.data.message);
							// setTimeout(function(){
							// 	self.app.goBack();
							// },800);
							self.address="";
							self.getUserInfo();
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
			getUserInfo:function(){
				var self=this;
				user.user_Info(function(res){
					// console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						self.name=res.data.data.nickname;
						self.mobile=res.data.data.mobile;
						self.lvl= res.data.data.relation.level_name;
						self.portrait=res.data.data.avatar;
						self.SetUserInfo(res.data.data);
					}else{
						self.app._toast(res.data.message);
					};
				}, function(status, msg) {
					self.app._toast(msg);
				});
			},
		}
	}
</script>

<style>
	page{background-color: #1A2B5A;}
	.portrait-cont{padding: 30px 10px;}
	.portrait-cont image{height: 52px;width: 52px;border-radius: 50%;}
	.Input-cont{width: 100%;height: 50px;border-bottom: 1px solid #F5F5F5;}
	.Input-cont input{width: 100%;height: 100%;padding: 0px 15px;}
</style>