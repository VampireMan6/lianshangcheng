<template>	<view class="box">		<view class="form-cont">			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-pass1.png"></image>				<input :type="eye?'password':'text'" placeholder="请输入原密码" v-model="pass" maxlength="6" />
				<i class="iconfont" :class="{'icon-eye_protection':eye,'icon-visible':!eye}" @click="eye=!eye"></i>			</view>			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-pass1.png"></image>				<input :type="eye?'password':'text'" placeholder="请输入新密码" v-model="pass1" maxlength="6" />				<i class="iconfont" :class="{'icon-eye_protection':eye,'icon-visible':!eye}" @click="eye=!eye"></i>			</view>			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-pass2.png"></image>				<input :type="eye?'password':'text'" placeholder="确认新密码" v-model="pass2" maxlength="6" />				<i class="iconfont" :class="{'icon-eye_protection':eye,'icon-visible':!eye}" @click="eye=!eye"></i>			</view>		</view>		<button class="btn mt-40" @click="go_reset_pass()">确认</button>	</view></template><script>	import user from "@/common/js/user.js"
	export default {		data() {			return {				pass:"",				pass1:"",				pass2:"",				eye:true,
			}
		},
		methods: {
			go_reset_pass:function(){
				var self=this;
				user.user_modify_pay_pass(self.pass,self.pass1,self.pass2,function(res) {
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
		}
	}
</script>

<style>
	@import url("@/common/css/login.css");
	.box{padding-top: 0px;}
	.form-cont{padding-top: 0px;}
</style>