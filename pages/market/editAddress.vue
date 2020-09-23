<template>
	<view class="box pt-15 pb-15 pl-15 pr-15">
		<view class="cont-list flex-center">
			<text class="title one-row mr-20">收货人：</text>
			<view>
				<input placeholder="请填写收货人姓名" placeholder-class="input-placeholder" v-model="name" maxlength="20" />
			</view>
		</view>
		<view class="cont-list flex-center">
			<text class="title mr-30">性别：</text>
			<radio-group @change="radioChange">
				<label class="mr-20">
					<radio color="#E52321" :checked="sex==1" value="1"></radio>
					<text>先生</text>
				</label>
				<label class="last">
					<radio color="#E52321" :checked="sex==2" value="2"></radio>
					<text>女士</text>
				</label>
			</radio-group>
		</view>
		<view class="cont-list flex-center">
			<text class="title one-row mr-20">联系电话：</text>
			<view>
				<input placeholder="请填写收货人联系电话" placeholder-class="input-placeholder" v-model="mobile" maxlength="11" />
			</view>
		</view>
		<view class="cont-list flex-center" @click="chooseCity">
			<text class="title one-row mr-20">所在地区：</text>
			<view class="nowrap">{{region.label}}</view>
		</view>
		<view class="cont-list flex-center">
			<text class="title one-row mr-20">详细地址：</text>
			<view>
				<input placeholder="请填写收货人详细地址" placeholder-class="input-placeholder" v-model="address" maxlength="20" />
			</view>
		</view>
		<view class="cont-list flex-center flex-j-between">
			<text class="title one-row mr-20">设为默认地址：</text>
			<view>
				<switch color="#E52321" @change="switchChange" :checked="isDefault == 1 ? true : false"/>
			</view>
		</view>
		<button class="btn" @click="addAddress()">保存</button>
		<mpvue-city-picker :themeColor="'#3D6AA1'" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				type:"",
				name:"",
				sex: 1,
				mobile:"",
				address:"",
				province:"",
				isDefault: 0,
				cityPickerValue: [21, 0, 2],
				region: {label: "请点击选择地址",value:[],cityCode:""},
				province: '',
				city: '',
				county: '',
				id:"",
			}
		},
		onLoad(e) {
			var self=this;
			self.type=e.type;
			if(e.type="add"){
				uni.setNavigationBarTitle({				　　title:"新建收货地址"				});
			};
			if(e.item){
				e.item=JSON.parse(e.item);
				this.id = e.item.id;
				this.name = e.item.name;
				this.sex = e.item.sex;
				this.mobile = e.item.tel;
				this.address = e.item.address;
				this.isDefault = e.item.is_default;
				this.province = e.item.province;
				this.city = e.item.city;
				this.county = e.item.county;
				this.region.label = this.province + '-' + this.city + '-' + this.county;
			};
		},
		methods: {
			onConfirm:function(e) {
				var self=this;
				this.region = e;
				this.cityPickerValue = e.value;//Id
				this.province = e.label.split('-')[0];//省
				this.city = e.label.split('-')[1];//市
				this.county = e.label.split('-')[2];//区
			},
			radioChange:function(e){
				this.sex = e.target.value;
			},
			switchChange:function(e){
				this.isDefault = e.target.value ? 1 : 0;
			},
			chooseCity:function() {
				this.$refs.mpvueCityPicker.show();
			},
			addAddress:function(){
				var self=this;
				if(self.name.trim().length==0){
					return self.app._toast("请输入收货人姓名");
				};
				if(self.mobile.trim().length==0){
					return self.app._toast("请输入收货人电话");
				};
				if(!self.province){
					return self.app._toast("请选择收货地址");
				};
				if(self.address.trim().length==0){
					return self.app._toast("请输入详细地址");
				};
				var send={
					address_id:self.id,
					name:self.name,
					tel:self.mobile,
					province:self.province,
					city:self.city,
					county:self.county,
					address:self.address,
					is_default:self.isDefault,//(0否1是)
					sex:self.sex,//1男2女
				};
				// console.log(JSON.stringify(send));
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/post.address.edit",
					data: send,
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.app._toastIcon(res.data.message);
							var page=self.app._prePage();
							page.$vm.get_list();
							setTimeout(function(){
								self.app.goBack();
							},500);
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
</style>
