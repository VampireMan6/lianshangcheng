<template>
	<view class="box pl-15 pr-15 pb-15" @touchmove.stop.prevent="moveHandle">
		<view class="content bc-white">
			<view class="pb-20">
				<view class="pb-10">充值金额</view>
				<view class="Input-cont flex-center flex-j-between">
					<input type="number" placeholder="请输入充值金额" v-model="money" />
				</view>
			</view>
			<button class="btn mt-10 mb-30" @click="submit">确认充值</button>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				money: "",
				status: false
			}
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
		},
		methods: {
			moveHandle() {
				return;
			},
			submit() {
				if(!this.money.trim()) {
					this.app._toast('请输入充值金额');
					return;
				};
				if(!this.status) {
					this.status = true;
					this.get_data();
				}
			},
			get_data:function(){
				var self=this;
				uni.showLoading({title: '获取中，请稍等'});
				uni.request({
					url: config.api_service + "/post.recharge",
					data: {
						amount: this.money
					},
					method: "post",
					header: {Authorization: config.getToken()},
					success: res => {
						uni.hideLoading();
						this.status = false;
						uni.navigateTo({
							url: ('/pages/market/pay?id=' + res.data.data)
						})
					},
					fail: (res) => {
						uni.hideLoading();
						if(res.errMsg == 'request:fail timeout'){
							console.log("请求超时了");
						};
						console.log(JSON.stringify(res));
					},
					complete: (res) => {}
				});
			}
		}
	}
</script>

<style>
	@import url("@/common/css/withdraw1.css");
</style>
