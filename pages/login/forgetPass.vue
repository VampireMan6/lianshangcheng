<template>	<view class="box">		<view class="form-cont">
			<!-- <view class="Input-cont flex-center flex-j-between">
				<image mode="widthFix" src="../../static/img/login-name.png"></image>
				<input type="text" placeholder="请输入用户名" v-model="name" maxlength="20" />
			</view> -->			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/login-phone.png"></image>				<input type="text" placeholder="请输入手机号码" v-model="mobile" maxlength="11" />			</view>			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-code.png"></image>				<input type="text" placeholder="请输入验证码" v-model="code" maxlength="6" />				<text class="one-row font-yellow" v-if="!CodeSW" @tap="get_code()">获取验证码</text>
				<text class="one-row font-yellow" v-else>{{second}}S后发送</text>			</view>			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-pass1.png"></image>				<input :type="eye?'password':'text'" placeholder="登录密码(8-20位) 数字和字母组成" v-model="pass1" maxlength="20" />				<i class="iconfont" :class="{'icon-eye_protection':eye,'icon-visible':!eye}" @click="eye=!eye"></i>			</view>			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-pass2.png"></image>				<input :type="eye?'password':'text'" placeholder="确认登录密码" v-model="pass2" maxlength="20" />				<i class="iconfont" :class="{'icon-eye_protection':eye,'icon-visible':!eye}" @click="eye=!eye"></i>			</view>		</view>		<button class="btn mt-40" @click="go_reset_pass()">确认</button>	</view></template><script>	import user from "@/common/js/user.js"
	import sms from "@/common/js/sms.js"	export default {		data() {			return {
				// name:"",				mobile:"",				code:"",				pass1:"",				pass2:"",				eye:true,
				second:60,//倒计时
				CodeSW:false,//验证码开关
			}
		},
		methods: {
			go_reset_pass:function(){
				var self=this;
				user.user_forget_pass(self.mobile,self.code,self.pass1,self.pass2,function(res) {
					if (res.data.code == 200) {
						self.app._toast(res.data.message);
						setTimeout(function(){
							uni.navigateBack();
						},300);
					}else{
						self.app._toast(res.data.message);
					};
				}, function(status, msg) {
					self.app._toast(msg);
				});
			},
			movetime: function() {//倒计时几秒发送验证码的函数
				var self = this;
				self.CodeSW = true;
				var interval = setInterval(function() {
					if(self.second != 0) {
						self.second--;
					} else {
						clearInterval(interval);
						self.CodeSW = false;
						self.second = 60;
					};
				}, 1000);
			},
			get_code:function(){
				var self=this;
				sms.send_sms(self.mobile,'3',function(res) {
					if (res.data.code == 200) {
						self.app._toast(res.data.message);
						self.movetime();
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
	.box{padding-top: 0px;}
	.form-cont{padding-top: 0px;}
</style>