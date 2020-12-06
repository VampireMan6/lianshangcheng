<template>
	<view class="box pt-15 pb-15" @touchmove.stop.prevent="moveHandle">
		<scroll-view scroll-y="true" :style="{height: scrollHeight + 'px'}">
			<view style="padding: 0 30rpx;box-sizing: border-box;">
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">用户姓名：</text>
					<view class="flex-1">
						<input placeholder="请填写姓名" placeholder-class="input-placeholder" v-model="name" maxlength="20" />
					</view>
				</view>
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">身份证号：</text>
					<view class="flex-1">
						<input placeholder="请填写身份证号" placeholder-class="input-placeholder" v-model="IdNumber" maxlength="18" />
					</view>
				</view>
				<!-- <view class="cont-list flex-center">
					<text class="title one-row mr-20">联系电话：</text>
					<view class="flex-1">
						<input type="number" placeholder="请填写联系电话" placeholder-class="input-placeholder" v-model="mobile" maxlength="11" />
					</view>
				</view> -->
				<view class="cont-list flex-center" @click="chooseCity">
					<text class="title one-row mr-20">联系地址：</text>
					<view class="nowrap flex-1">{{region.label}}</view>
				</view>
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">详细地址：</text>
					<view class="flex-1">
						<input placeholder="请填写详细地址" placeholder-class="input-placeholder" v-model="address" maxlength="20" />
					</view>
				</view>
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">链惠通产品名称：</text>
					<view class="flex-1">
						<input placeholder="请填写链惠通产品名称" placeholder-class="input-placeholder" v-model="chainReformName" maxlength="20" />
					</view>
				</view>
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">上传链惠通消费凭据：</text>
					<view class="flex-1">
						<image class="image" :src="portrait" @click="choicePortrait"></image>
					</view>
				</view>
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">链惠通类型：</text>
					<picker @change="select1" style="flex: 1" :value="index1" :range="dataList1">
					  <view class="uni-input" style="width: 100%;">{{dataText1}}</view>
					</picker>
				</view>
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">链惠通金额：</text>
					<view class="flex-1">
						<input type="number" placeholder="请填写链惠通金额" placeholder-class="input-placeholder" v-model="chainReformNumber" maxlength="20" />
					</view>
				</view>
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">链惠通期限：</text>
					<picker v-if="!isDisabled" :disabled="isDisabled" @change="select2" style="flex: 1" :value="index2" :range="dataList2">
					  <view class="uni-input" style="width: 100%;">{{dataText2}}</view>
					</picker>
					<view v-else class="flex-1">
						<input disabled placeholder="" placeholder-class="input-placeholder" value="12" maxlength="20" />
					</view>
				</view>
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">链惠通月费：</text>
					<view class="flex-1">
						<input disabled type="number" placeholder="请填写链惠通月费"
						 placeholder-class="input-placeholder" v-model="chainReformNumberMonth" maxlength="20" />
					</view>
				</view>
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">链惠通服务费：</text>
					<view class="flex-1">
						<input disabled placeholder="请填写链惠通服务费" 
						placeholder-class="input-placeholder" 
						v-model="serviceCharge" maxlength="20" />
					</view>
				</view>
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">一次性结清月费（链++）：</text>
					<radio-group @change="radioChange">
						<label class="mr-20">
							<radio color="#1A2B5A" :checked="sex==1" value="1"></radio>
							<text>是</text>
						</label>
						<label class="last">
							<radio color="#1A2B5A" :checked="sex==0" value="0"></radio>
							<text>否</text>
						</label>
					</radio-group>
				</view>
				<view class="cont-list flex-center">
					<text class="title one-row mr-20">链惠通保证金：</text>
					<view class="flex-1">
						<input disabled placeholder="请填写链惠通保证金" placeholder-class="input-placeholder" v-model="margin" maxlength="20" />
					</view>
				</view>
				<!-- <view class="cont-list flex-center">
					<text class="title one-row mr-20">还款日：</text>
					<picker @change="select3" style="flex: 1" :value="index3" :range="dataList3">
					  <view class="uni-input" style="width: 100%;">{{dataText3}}</view>
					</picker>
					
					<view class="flex-1">
						<input type="number" v-model="day" placeholder="请填写每月几号" placeholder-class="input-placeholder" v-model="margin" maxlength="20" />
					</view>
					
				</view> -->
			</view>
		</scroll-view>
		<view style="padding: 30rpx 30rpx 0;box-sizing: border-box;">
			<button class="btn" @click="submit">确认生成协议</button>
		</view>
		<mpvue-city-picker :themeColor="'#3D6AA1'" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import upload from "@/common/js/upload.js"
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import {
		mapState,
	} from 'vuex'
	
	export default {
		onLoad() {
			const res = uni.getSystemInfoSync();
			this.scrollHeight = res.windowHeight - uni.upx2px(160);
		},
		components: {
			mpvueCityPicker
		},
		computed: {
			...mapState(['qiniu']),
			chainReformNumberMonth() { // 链惠通月费
				if(this.chainReformNumber.trim() == '' || this.dataText2 == '请点击选择链惠通期限') {
					return 0
				}else {
					return (parseFloat(this.chainReformNumber) / parseFloat(this.dataText2)).toFixed(2)
				}
			},
			serviceCharge() { // 服务费
				if(this.dataText2 == '请点击选择链惠通期限') {
					return 0
				}else if(this.index2 == 0) {// 24  7倍
					return (this.chainReformNumberMonth * 7).toFixed(2)
				}else if(this.index2 == 1) { // 36 8倍
					return (this.chainReformNumberMonth * 8).toFixed(2)
				}else {// 12 4倍
					return (this.chainReformNumberMonth * 4).toFixed(2)
				}
			},
			margin() {
				if(this.chainReformNumberMonth == 0) {
					return 0
				}else if(this.sex == 1) {
					return 0
				}else {
					return this.chainReformNumberMonth * 2
				}
			},
			addressText() {
				return this.region.label + this.address;
			},
			isDisabled() {
				if(this.dataText1 == '请点击选择链惠通类型') {
					return false;
				} else if (this.dataText1 == '讯惠通') {
					return true;h
				}else {
					return false
				}
			}
		},
		data() {
			return {
				status: false,
				scrollHeight: 0,
				name: '',
				IdNumber: '',
				mobile: '',
				region: {label: "请点击选择地址",value:[],cityCode:""},
				address:"",
				chainReformName: "",
				chainReformNumber: '',
				// chainReformNumberMonth: '',
				dataText1: '请点击选择链惠通类型',
				dataList1: ['车惠通','房惠通','讯惠通','消惠通','旅惠通','其他'],
				index1: 0,
				dataText2: '请点击选择链惠通期限',
				dataList2: ['24','36'],
				index2: 0,
				dataText3: 1,
				dataList3: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
				index3: 0,
				sex: 1,
				cityPickerValue: [21, 0, 2],
				province: '',
				city: '',
				county: '',
				id: '',
				portrait:"../../static/img/addImg.png",
				addressImg: ''
			}
		},
		methods: {
			choicePortrait:function(){
				var self=this;
				upload.upload(self.qiniu,function(res){
					self.portrait=res.portrait;
					self.addressImg=res.key;
					self.app._toastIcon("上传成功");
				},function(res){
					self.app._toast(res);
				});
			},
			select1(e) {
			  this.index1 = e.target.value;
				this.dataText1 = this.dataList1[this.index1];
				if(this.dataText1 == '讯惠通') {
					this.dataText2 = '12';
					this.index2 = 2;
				}else {
					this.dataText2 = '请点击选择链惠通期限';
					this.index2 = 0;
				};
			},
			select2(e) {
			  this.index2 = e.target.value;
				this.dataText2 = this.dataList2[this.index2];
			},
			select3(e) {
			  this.index3 = e.target.value;
				this.dataText3 = this.dataList3[this.index3];
			},
			radioChange:function(e){
				this.sex = e.target.value;
			},
			onConfirm:function(e) {
				var self=this;
				this.region = e;
				console.log(this.region)
				this.cityPickerValue = e.value;//Id
				this.province = e.label.split('-')[0];//省
				this.city = e.label.split('-')[1];//市
				this.county = e.label.split('-')[2];//区
			},
			chooseCity:function() {
				this.$refs.mpvueCityPicker.show();
			},
			moveHandle() {
				return;
			},
			submit() {
				if(!this.name.trim()) {
					return this.app._toast('请输入姓名')
				};
				if(!this.IdNumber.trim()) {
					return this.app._toast('请输入身份证号')
				};
				let reg1 = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				if(!reg1.test(this.IdNumber.trim())) {
					return this.app._toast('身份证号码格式错误')
				}
				// if(!this.mobile.trim()) {
				// 	return this.app._toast('请输入联系电话')
				// };
				// let reg2 = /^1(3|4|5|6|7|8|9)\d{9}$/;
				// if(!reg2.test(this.mobile.trim())) {
				// 	return this.app._toast('手机号格式错误')
				// }
				if(this.region.label == '请点击选择地址') {
					return this.app._toast('请选择联系地址')
				};
				if(!this.address.trim()) {
					return this.app._toast('请输入详细地址')
				};
				if(!this.chainReformName.trim()) {
					return this.app._toast('请输入链惠通名称')
				};
				if(this.portrait == '../../static/img/addImg.png') {
					return this.app._toast('请上传产品图片')
				};
				if(this.dataText1 == '请点击选择链惠通类型') {
					return this.app._toast('请选择链惠通类型')
				};
				if(!this.chainReformNumber.trim()) {
					return this.app._toast('请输入链惠通金额')
				};
				if(this.dataText2 == '请点击选择链惠通期限') {
					return this.app._toast('请选择链惠通期限')
				};
				// if(!this.chainReformNumberMonth.trim()) {
				// 	return this.app._toast('请输入链惠通月费')
				// };
				// if(this.dataText3 == '请点击选择每月还款日期') {
				// 	return this.app._toast('请选择还款日期')
				// };
				if(this.isDisabled == true) {
					this.dataText2 = '12'
				};
				if(!this.status) {
					this.status = true;
					this.even();
				}
			},
			even:function(){
				var self=this;
				var send = {
					name: self.name,
					id_card: self.IdNumber,
					// mobile: self.mobile,
					address: self.addressText,
					lg_name: self.chainReformName,
					lg_type: self.dataText1,
					amount: parseFloat(self.chainReformNumber),
					lg_date: parseInt(self.dataText2),
					month_fee: parseFloat(self.chainReformNumberMonth),
					service_fee: parseFloat(self.serviceCharge),
					is_once_pay: parseFloat(self.sex),
					margin: parseFloat(self.margin),
					// day: self.dataText3,
					img: self.addressImg
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.liangai.apply",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.app._toastIcon(res.data.message);
							// var page=self.app._prePage();
							// page.$vm.get_list();
							// this.status = false;
							console.log(res)
							// setTimeout(function(){
							// 	self.app.goBack();
							// },500);
							uni.navigateTo({
								url: ('/pages/chainReform/contract?id=' + res.data.data)
							})
						}else{
							self.app._toast(res.data.message);
						};
						this.status = false;
					},
					fail: (res) => {console.log(JSON.stringify(res));
					this.status = false;},
					complete: (res) => {
						this.status = false;
					}
				});
			}
		}
	}
</script>

<style>
	.cont-list{width: 100%;padding: 15px 0px;margin-bottom: 20px;border-bottom: 1px solid #F5F5F5;}
	.cont-list input{width: 100%;height: 100%;font-size: 14px;color: #333333;}
	.flex-1 {flex: 1;}
	input {width: 100%;}
	.image {
		width: 96rpx;
		height: 96rpx;
	}
</style>
