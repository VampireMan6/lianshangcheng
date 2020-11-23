<template>
	<view class="box pl-15 pr-15 pt-10">
		<view class="cont flex-center flex-j-between" @click="app.showOpen('user/userInfo')">
			<view class="flex-center">
				<image mode="widthFix" src="../../static/img/ca9577b1945e87c12cf72fd89d25910.png"></image>
				<text class="one-row ml-10">个人资料</text>
			</view>
			<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
		</view>
		<view class="cont flex-center flex-j-between" @click="app.showOpen('user/shiming')">
			<view class="flex-center">
				<image mode="widthFix" src="../../static/img/ca9577b1945e87c12cf72fd89d25910.png"></image>
				<text class="one-row ml-10">实名认证</text>
			</view>
			<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
		</view>
		<view class="cont flex-center flex-j-between" @click="app.showOpen('market/address')">
			<view class="flex-center">
				<image mode="widthFix" src="../../static/img/f037edcdaa5ac9df652e6dabfb8350e.png"></image>
				<text class="one-row ml-10">收货地址</text>
			</view>
			<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
		</view>
		<view class="cont flex-center flex-j-between" @click="app.showOpen('login/modifyPass')">
			<view class="flex-center">
				<image mode="widthFix" src="../../static/img/fa98d465a28592faf5b48286047f1ce.png"></image>
				<text class="one-row ml-10">修改登录密码</text>
			</view>
			<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
		</view>
		<view class="cont flex-center flex-j-between" v-if="userInfo.paypassword!=''" @click="app.showOpen('login/modifyPayPass')">
			<view class="flex-center">
				<image mode="widthFix" src="../../static/img/fa98d465a28592faf5b48286047f1ce.png"></image>
				<text class="one-row ml-10">修改交易密码</text>
			</view>
			<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
		</view>
		<view class="cont flex-center flex-j-between" @click="app.showOpen('user/payPas')">
			<view class="flex-center">
				<image mode="widthFix" src="../../static/img/301bc3c1baf8102da7d6c4546655ed9.png"></image>
				<text class="one-row ml-10" v-if="userInfo.paypassword==''">设置交易密码</text>
				<text class="one-row ml-10" v-else>忘记交易密码</text>
			</view>
			<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
		</view>
		<view class="cont flex-center flex-j-between" @click="app.showOpen('user/text?name=用户协议')">
			<view class="flex-center">
				<image mode="widthFix" src="../../static/img/33fce04e8ee9b63e4e8fd070a085ec5.png"></image>
				<text class="one-row ml-10">用户协议</text>
			</view>
			<view class="flex-center font-light-gray">
				<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
			</view>
		</view>
		<view class="cont flex-center flex-j-between" @click="app.showOpen('user/text?name=隐私政策')">
			<view class="flex-center">
				<image mode="widthFix" src="../../static/img/dba9c1b9f0718e9b3581d142cd58d9b.png"></image>
				<text class="one-row ml-10">隐私政策</text>
			</view>
			<view class="flex-center font-light-gray">
				<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
			</view>
		</view>
		<view class="cont flex-center flex-j-between" @click="checkUpdata()">
			<view class="flex-center">
				<image mode="widthFix" src="../../static/img/a30e40e9e1b6de23c690080a90b16cc.png"></image>
				<text class="one-row ml-10">检查更新</text>
			</view>
			<view class="flex-center font-light-gray">
				<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
			</view>
		</view>
		<view class="btn-cont">
			<button class="btn" @click="set_logout()">退出登录</button>
		</view>
	</view>
</template>

<script>
	import update from "common/js/update.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		computed:{
			...mapState(["hasLogin",'userInfo']),
		},
		methods: {
			...mapMutations(['logout','SetUserInfo']),
			set_logout:function(){
				var self=this;
				uni.showModal({
					content: "确定退出当前账号吗？",
					confirmText: "确定",
					cancelText: "取消",
					success: function (e) {
						if(e.confirm){
							self.logout();
							uni.reLaunch({
								url:'/pages/login/login'
							});
						};
					}
				})
			},
			checkUpdata:function(){
				update.check('1','1');
			}
		}
	}
</script>

<style>
	.box{padding-bottom: 150px;}
	.cont{width: 100%;padding: 20px 0px;border-bottom: 1px solid #F5F5F5;}
	.cont image{width: 16px;}
	.btn-cont{width: 100%;position: fixed;bottom: 0px;left: 0px;padding: 75px 20px;}
	.btn-cont button.btn{border-radius: 2px;background-color: #FFFFFF;line-height: 44px;font-size: 14px;box-shadow: 0px 0px 6px #E9E8E8;color: #333333;}
</style>
