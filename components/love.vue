<template>
	<view>
		<view class="text-center pb-15 pt-15">猜您喜欢</view>
		<view class="list-content flex-row flex-j-between pl-15 pr-15">
			<view class="cont-list bc-white" v-for="(item,index) in loveList" :key="index" @click="app.showOpen('market/details?id='+item.id)">
				<image :src="item.thumb"></image>
				<view class="pl-10 pr-10 pt-10 pb-15">
					<view class="name nowrap mb-10 font-14" v-text="item.title">草莓水果沙拉超级无底好吃</view>
					<view class="price nowrap font-14 flex-center">
						<text class="nowrap font-yellow" v-text="item.shop_price">100.0000</text>
						<text class="one-row ml-5" v-text="item.coin_name">QSC</text>
					</view>
					<!-- <view class="cny-price nowrap font-12 font-light-gray lh-20">≈{{app._accMul(item.shop_price,item.rate_cny)}} CNY</view> -->
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	export default {
		props:{
			loveList:{
				type: Array,
				default: () => ([])
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.list-content{width: 100%;flex-wrap: wrap;}
	/* .cont-list{width: 100%;border-radius: 6px;box-shadow: 0px 2px 6px #E9E8E8;padding: 16px;margin-bottom: 15px;}
	.cont-list .store-name{width: 100%;}
	.cont-list .store-name image{width: 15px;}
	.cont-list .cont-data{width: 100%;}
	.cont-list .cont-data image{width: 80px;height: 80px;}
	.cont-list .cont-data .text-data{width: calc(100% - 160px);}
	.cont-list .cont-data .text-data .name{max-height: 40px;}
	.cont-list .cont-data .price-data{width: 60px;}
	.cont-list .btn-cont{width: 100%;}
	.cont-list .btn-cont .order-btn{font-size: 12px;line-height: 25px;width: 80px;text-align: center;border-radius: 20px;margin: 0px;margin-left: 15px;}
	.cont-list .btn-cont .order-btn.btn1{border: 1px solid #CCCCCC;color: #999999;}
	.cont-list .btn-cont .order-btn.btn2{color: #BD9E70;border: 1px solid #BD9E70;} */
	.list-content .cont-list{width: 48%;border-radius: 4px;overflow: hidden;box-shadow: 1px 1px 6px #E9E8E8;margin-bottom: 11px;}
	.list-content .cont-list image{width: 100%;height: 140px;}
	.bottom-cont{width: 100%;height: 50px;position: fixed;bottom: 0px;left: 0px;box-shadow: 0px -2px 10px 0px #CCCCCC;}
	.bottom-cont image{width: 19px;}
	.bottom-cont .btn{font-size: 12px;line-height: 25px;width: 80px;text-align: center;border-radius: 20px;margin: 0px;margin-left: 15px;background-color: #FFFFFF;}
	.bottom-cont .btn.btn1{border: 1px solid #CCCCCC;color: #999999;}
	.bottom-cont .btn.btn2{color: #BD9E70;border: 1px solid #BD9E70;}
</style>
