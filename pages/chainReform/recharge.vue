<template>
	<view class="box pl-15 pr-15 pb-15" @touchmove.stop.prevent="moveHandle">
		<view class="content bc-white">
			<view class="pb-20">
				<view class="pb-10">充值金额</view>
				<view class="Input-cont flex-center flex-j-between">
					<input type="text" placeholder="请输入充值金额" v-model="money" />
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
				money: ""
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
				console.log(this.userInfo)
				// uni.navigateTo({
				// 	url: '/pages/market/pay?id=' + this.userInfo
				// })
			}
		}
	}
</script>

<style>
	@import url("@/common/css/withdraw1.css");
</style>
