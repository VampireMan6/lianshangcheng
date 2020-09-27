<template>
	<view class="box pt-50 pb-15 pl-15 pr-15">
		<view class="mt-50">
			<view class="status flex-center flex-j-center font-20 font-w-b mb-20">
				<i class="iconfont icon-check mr-10"></i>支付成功
			</view>
			<view class="text-center nowrap font-yellow font-25" v-text="money">￥66.80</view>
			<view class="text-center nowrap font-light-gray font-12 mt-15">在线支付</view>
			<view class="btn-cont flex-center flex-a-around pb-25 pt-30">
				<button @click="goIndex()">返回商城</button><button @click="goOrder()">查看订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		data() {
			return {
				money:"",
				type: ''
			}
		},
		onLoad(e) {
			var self=this;
			self.money=e.money;
			self.type = e.type;
		},
		methods: {
			goIndex:function(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			goOrder:function(){
				if(this.type == 'chongzhi') {
					uni.switchTab({
						url: '/pages/chainReform/chainReform'
					})
				}else {
					uni.redirectTo({
						url: '/pages/cart/order?type=0'
					})
				}
			}
		}
	}
</script>

<style>
	.status .iconfont{display: inline-flex;align-items: center;align-content: center;justify-content: center;background-color: #221915;color: #FFFFFF;border-radius: 50%;width: 25px;height: 25px;font-weight: 400;}
	.btn-cont{width: 100%;padding: 0px 10px;}
	.btn-cont button{width: 100px;line-height: 35px;border-radius: 50px;border: 1px solid #221915;color: #221915;font-size: 14px;background-color: #FFFFFF;}
	.list-content{width: 100%;flex-wrap: wrap;}
	.list-content .cont-list{width: 48%;border-radius: 4px;overflow: hidden;box-shadow: 1px 1px 6px #E9E8E8;margin-bottom: 11px;}
	.list-content .cont-list image{width: 100%;height: 140px;}
</style>
