<template>	<view class="box">		<view class="form-cont">			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/login-phone.png"></image>				<input type="text" placeholder="请输入手机号码" v-model="mobile" maxlength="11" />			</view>			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-code.png"></image>				<input type="text" placeholder="请输入验证码" v-model="code" maxlength="6" />				<text class="one-row font-yellow">获取验证码</text>			</view>			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-pass1.png"></image>				<input :type="eye?'password':'text'" placeholder="登录密码(8-20位) 数字和字母组成" v-model="pass1" maxlength="20" />				<i class="iconfont" :class="{'icon-eye_protection':eye,'icon-visible':!eye}" @click="eye=!eye"></i>			</view>			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-pass2.png"></image>				<input :type="eye?'password':'text'" placeholder="确认登录密码" v-model="pass2" maxlength="20" />				<i class="iconfont" :class="{'icon-eye_protection':eye,'icon-visible':!eye}" @click="eye=!eye"></i>			</view>		</view>		<button class="btn mt-40" @click="go_reset_pass()">确认</button>	</view></template><script>	import user from "@/common/js/user.js"	export default {		data() {			return {				mobile:"",				code:"",				pass1:"",				pass2:"",				eye:true,
			}
		},
		methods: {
			go_reset_pass:function(){
				var self=this;
				user.user_register(self.mobile, self.pass,function(res) {
					console.log(JSON.stringify(res))
					if(res.status==1){
						self.app._toast(res.msg);
						setTimeout(function(){
							uni.navigateBack();
						},300);
					}else{
						self.app._toast(res.msg);
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