<template>	<view class="box">		<view class="form-cont">
			<!-- <view class="Input-cont flex-center flex-j-between">
				<image mode="widthFix" src="../../static/img/login-name.png"></image>
				<input type="text" placeholder="请输入用户名" v-model="name" maxlength="20" />
			</view> -->			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/login-phone.png"></image>				<input type="text" placeholder="请输入手机号码" v-model="mobile" maxlength="11" disabled />			</view>			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-code.png"></image>				<input type="text" placeholder="请输入验证码" v-model="code" maxlength="6" />				<text class="one-row font-yellow" v-if="!CodeSW" @tap="get_code()">获取验证码</text>
				<text class="one-row font-yellow" v-else>{{second}}S后发送</text>
			</view>			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-pass1.png"></image>				<input :type="eye?'password':'text'" placeholder="交易密码6位数" maxlength="6" v-model="pass1" />				<i class="iconfont" :class="{'icon-eye_protection':eye,'icon-visible':!eye}" @click="eye=!eye"></i>			</view>			<view class="Input-cont flex-center flex-j-between">				<image mode="widthFix" src="../../static/img/register-pass2.png"></image>				<input :type="eye?'password':'text'" placeholder="确认密码" maxlength="6" v-model="pass2" />				<i class="iconfont" :class="{'icon-eye_protection':eye,'icon-visible':!eye}" @click="eye=!eye"></i>			</view>		</view>		<button class="btn mt-40" @click="set_pass()">确认</button>	</view></template><script>	import user from "@/common/js/user.js"
	import sms from "@/common/js/sms.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'	export default {		data() {			return {
				// name:"",				mobile:"",				code:"",				pass1:"",				pass2:"",				eye:true,
				second:60,//倒计时
				CodeSW:false,//验证码开关
			}
		},
		onLoad(e) {
			var self=this;
			self.mobile=self.userInfo.mobile;
			if(e.name){
				uni.setNavigationBarTitle({				　　title:e.name				});
			}
			
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allMoney','allCny']),
		},
		methods: {
			...mapMutations(['login','SetUserInfo']),
			set_pass:function(){
				var self=this;
				user.user_setPass(self.mobile,self.code,self.pass1,self.pass2,function(res) {
					if (res.data.code == 200) {
						var info=self.userInfo;
						info.paypassword="已经设置了";
						self.SetUserInfo(info);//登录
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
				sms.send_sms(self.mobile,'4',function(res) {
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