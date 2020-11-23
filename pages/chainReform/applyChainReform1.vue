<template>
	<view class="box pt-15 pb-15">
		<view class="" v-if="isShow">
			<!-- <scroll-view scroll-y="true" :style="{height: scrollHeight + 'px'}"> -->
				<view style="padding: 0 30rpx;box-sizing: border-box;">
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">用户姓名：</text>
						<view class="flex-1">
							<input disabled placeholder="请填写姓名" placeholder-class="input-placeholder" v-model="name" maxlength="20" />
						</view>
					</view>
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">身份证号：</text>
						<view class="flex-1">
							<input disabled placeholder="请填写身份证号" placeholder-class="input-placeholder" v-model="IdNumber" maxlength="18" />
						</view>
					</view>
					<!-- <view class="cont-list flex-center">
						<text class="title one-row mr-20">联系电话：</text>
						<view class="flex-1">
							<input disabled placeholder="请填写联系电话" placeholder-class="input-placeholder" v-model="mobile" maxlength="11" />
						</view>
					</view> -->
					<!-- <view class="cont-list flex-center" @click="chooseCity">
						<text class="title one-row mr-20">联系地址：</text>
						<view class="nowrap flex-1">{{region.label}}</view>
					</view> -->
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">联系地址：</text>
						<view class="flex-1">
							<input disabled placeholder="请填写联系地址" placeholder-class="input-placeholder" v-model="address" maxlength="20" />
						</view>
					</view>
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">链惠通产品名称：</text>
						<view class="flex-1">
							<input disabled placeholder="请填写链惠通名称" placeholder-class="input-placeholder" v-model="chainReformName" maxlength="20" />
						</view>
					</view>
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">上传链惠通消费凭据：</text>
						<view class="flex-1">
							<image class="image" :src="portrait"></image>
						</view>
					</view>
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">链惠通类型：</text>
						<view class="flex-1">
							<input disabled placeholder="请填写链惠通名称" placeholder-class="input-placeholder" v-model="dataText1" maxlength="20" />
						</view>
					</view>
					<!-- <view class="cont-list flex-center">
						<text class="title one-row mr-20">链惠通类型：</text>
						<picker @change="select1" style="flex: 1" :value="index1" :range="dataList1">
						  <view class="uni-input" style="width: 100%;">{{dataText1}}</view>
						</picker>
					</view> -->
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">链惠通金额：</text>
						<view class="flex-1">
							<input disabled placeholder="请填写链惠通金额" placeholder-class="input-placeholder" v-model="chainReformNumber" maxlength="20" />
						</view>
					</view>
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">链惠通期限：</text>
						<view class="flex-1">
							<input disabled placeholder="请填写链惠通期限" placeholder-class="input-placeholder" v-model="dataText2" maxlength="20" />
						</view>
					</view>
					<!-- <view class="cont-list flex-center">
						<text class="title one-row mr-20">链惠通期限：</text>
						<picker @change="select2" style="flex: 1" :value="index2" :range="dataList2">
						  <view class="uni-input" style="width: 100%;">{{dataText2}}</view>
						</picker>
					</view> -->
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">链惠通月费：</text>
						<view class="flex-1">
							<input disabled type="number" placeholder="请填写链惠通月费" placeholder-class="input-placeholder" v-model="chainReformNumberMonth" maxlength="20" />
						</view>
					</view>
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">链惠通服务费：</text>
						<view class="flex-1">
							<input disabled placeholder="请填写链惠通服务费" placeholder-class="input-placeholder" v-model="serviceCharge" maxlength="20" />
						</view>
					</view>
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">链惠通保证金：</text>
						<view class="flex-1">
							<input disabled placeholder="请填写链惠通保证金" placeholder-class="input-placeholder" v-model="margin" maxlength="20" />
						</view>
					</view>
					<!-- <view class="cont-list flex-center">
						<text class="title one-row mr-20">还款日期：</text>
						<view class="flex-1">
							<input disabled placeholder="请填写还款日期" placeholder-class="input-placeholder" v-model="dataText3" maxlength="20" />
						</view>
					</view> -->
					<view class="cont-list flex-center">
						<text class="title one-row mr-20">协议编码：</text>
						<view class="flex-1">
							<input disabled  placeholder-class="input-placeholder" v-model="sn" maxlength="20" />
						</view>
					</view>
				</view>
			<!-- </scroll-view> -->
			<view style="padding: 30rpx 30rpx 0;box-sizing: border-box;">
				<button class="btn" @click="submit">确定</button>
			</view>
		</view>
		<mpvue-city-picker :themeColor="'#3D6AA1'" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		onLoad(value) {
			this.id = value.id;
			// const res = uni.getSystemInfoSync();
			// this.scrollHeight = res.windowHeight - uni.upx2px(160);
			this.getData();
		},
		components: {
			mpvueCityPicker
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
				chainReformNumberMonth: '',
				dataText1: '请点击选择链惠通类型',
				dataList1: ['车改','房改','讯改','消费改','旅游改','其他改'],
				index1: 0,
				dataText2: '请点击选择链惠通期限',
				dataList2: ['12','24','36'],
				index2: 0,
				dataText3: '请点击选择每月还款日期',
				dataList3: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
				index3: 0,
				sex: 1,
				cityPickerValue: [21, 0, 2],
				province: '',
				city: '',
				county: '',
				id: '',
				isShow: false,
				sn: '',
				margin: '',
				serviceCharge: '',
				portrait: ''
			}
		},
		methods: {
			select1(e) {
			  this.index1 = e.target.value;
				this.dataText1 = this.dataList1[this.index1];
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
			submit() {
				uni.navigateTo({
					url: ('/pages/market/pay?id=' + this.sn)
				})
			},
			getData:function(){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.liangai.abstract",
					data: {
						liangai_id: self.id
					},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.name = res.data.data.name;
							self.IdNumber = res.data.data.id_card;
							self.mobile = res.data.data.mobile;
							self.address = res.data.data.address;
							self.chainReformName = res.data.data.lg_name;
							self.dataText1 = res.data.data.lg_type;
							self.chainReformNumber = res.data.data.amount;
							self.dataText2 = res.data.data.lg_date;
							self.chainReformNumberMonth = res.data.data.month_fee;
							self.serviceCharge = res.data.data.service_fee;
							self.margin = res.data.data.margin;
							// self.dataText3 = res.data.data.day
							self.sn = res.data.data.sn;
							self.portrait = res.data.data.img;
							self.status = false;
							self.isShow = true;
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {}
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
