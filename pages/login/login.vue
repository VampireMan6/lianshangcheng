<template>
	<view class="box">
		<view class="page-name text-center">
			<text class="name">登录</text>
			<view class="tips hide">欢迎来到 链++ </view>
		</view>
		<view class="form-cont">
			<view class="Input-cont flex-center flex-j-between">
				<image mode="widthFix" src="../../static/img/login-name.png"></image>
				<input type="text" placeholder="请输入手机号" v-model="mobile" maxlength="20" />
			</view>
			<view class="Input-cont flex-center flex-j-between">
				<image mode="widthFix" src="../../static/img/login-pass.png"></image>
				<input :type="eye?'password':'text'" placeholder="请输入登录密码" v-model="pass" maxlength="20" />
				<i class="iconfont" :class="{'icon-eye_protection':eye,'icon-visible':!eye}" @click="eye=!eye"></i>
			</view>
		</view>
		<view class="text-right font-12 mt-10 font-yellow">
			<text @click="app.showOpen('login/forgetPass')">忘记密码？</text>
		</view>
		<button class="btn mt-40" @click="go_login()">登录</button>
		<view class="go-register text-center font-12">还没有账号？<text class="font-yellow" @click="app.showOpen('login/register')">去注册</text></view>
	</view>
</template>

<script>
	import user from "@/common/js/user.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				mobile:"",//15178789924 18183181696
				pass:"",//Aa123123 aa123456
				eye:true,
			}
		},
		onLoad() {
			this.logout();
		},
		methods: {
			...mapMutations(['login','SetCoin','logout']),
			go_login:function(){
				var self=this;
				user.user_login(self.mobile, self.pass,function(res) {
					// console.log(res)
					if (res.data.code == 200) {
						self.app._toast(res.data.message);
						self.login(res.data.data);//登录
						self.SetCoin();//获取币种信息
						setTimeout(function(){
							uni.switchTab({
								url:"/pages/index/index"
							});
						},300);
					}else{
						self.app._toast(res.data.message);
					};
				}, function(status, msg) {
					self.app._toast(msg);
				});
			}
		}
	}
</script>

<style>
	@import url("@/common/css/login.css");
</style>
