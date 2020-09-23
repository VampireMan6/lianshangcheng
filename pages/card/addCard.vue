<template>
	<view class="box pt-15 pb-15 pl-15 pr-15">
		<view class="font-12 font-light-gray">请绑定持卡人本人的银行卡</view>
		<view class="pt-20">
			<view class="pb-10">持卡人</view>
			<view>
				<input placeholder="请输入持卡人" v-model="name" />
			</view>
		</view>
		<view class="pt-20">
			<view class="pb-10">卡号</view>
			<view>
				<input placeholder="请输入卡号" v-model="no" />
			</view>
		</view>
		<view class="pt-20">
			<view class="pb-10">银行卡类型</view>
			<view>
				<input placeholder="请输入银行卡类型" v-model="bank_name" />
			</view>
		</view>
		<view class="pt-20">
			<view class="pb-10">手机号码</view>
			<view>
				<input placeholder="请输入手机号码" v-model="mobile" />
			</view>
		</view>
		<!-- <view class="pt-20">
			<view class="pb-10">验证码</view>
			<view class="cont-list flex-center flex-j-between">
				<input placeholder="请输入验证码" /><button class="one-row">获取验证码</button>
			</view>
		</view> -->
		<view class="btn pt-30 pb-20">
			<button class="btn" @click="setCard()">下一步</button>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				name:"",
				no:"",
				bank_name:"",
				mobile:"",
				type:"add",
				id:"",
			}
		},
		onLoad(e) {
			var self=this;
			if(e.type=='modify'){
				e.data=JSON.parse(e.data);
				self.type=e.type;
				self.name=e.data.cardholder;
				self.no=e.data.bank_no;
				self.bank_name=e.data.bank_name;
				self.mobile=e.data.bank_phone;
				self.id=e.data.id;
			};
		},
		methods: {
			setCard:function(){
				var self=this;
				if(self.name.trim().length==0){
					return self.app._toast("请输入持卡人");
				};
				if(self.no.trim().length==0){
					return self.app._toast("请输入银行卡号");
				};
				if(self.bank_name.trim().length==0){
					return self.app._toast("请输入开户行");
				};
				if(self.mobile.trim().length==0){
					return self.app._toast("请输入银行卡绑定手机号");
				};
				var send={
					cardholder:self.name,
					bank_no:self.no,
					bank_name:self.bank_name,
					bank_phone:self.mobile,
				};
				var url="/post.user.bank.add";
				if(self.type=="modify"){
					url="/post.user.bank.up";
					send.user_bank_id=self.id;
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + url,
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.app._toast(res.data.message,2000);
							setTimeout(function(){
								var page=self.app._prePage();
								page.$vm.getCard();
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
					complete: (res) => {}
				});
			},
		}
	}
</script>

<style>
	input{width: 100%;height: 48px;line-height: 48px;border: 1px solid #CCCCCC;border-radius: 4px;padding: 0px 10px;}
	.cont-list button{background-color: #1A2B5A;border-radius: 4px;height: 48px;line-height: 48px;color: #FFFFFF;font-size: 14px;width: 100px;margin-left: 20px;}
	.cont-list input{width: calc(100% - 120px);}
</style>
