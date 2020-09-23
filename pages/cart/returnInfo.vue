<template>
	<view class="box">
		<view class="mt-15 pl-15 pr-15 pt-15 pb-15 bc-white" v-if="data.return">
			<view class="flex-center flex-j-between pb-15">
				<text class="one-row font-12 font-light-gray">物流编号</text>
				<text class="nowrap font-12 " v-text="data.return.delivery_sn">100QSC</text>
			</view>
			<view class="flex-center flex-j-between pb-15">
				<text class="one-row font-12 font-light-gray">物流公司</text>
				<text class="nowrap font-12 " v-text="data.return.delivery_name">100QSC</text>
			</view>
			<view class="flex-center flex-j-between pb-15">
				<text class="one-row font-12 font-light-gray">联系电话</text>
				<text class="nowrap font-12 " v-text="data.return.phone">100QSC</text>
			</view>
			<view class="flex-center flex-j-between pb-15" v-if="data.return.desc">
				<text class="one-row font-12 font-light-gray">说明</text>
				<text class="nowrap font-12 " v-text="data.return.desc">100QSC</text>
			</view>
			<view class="flex-center flex-j-between pb-15 pay">
				<text class="one-row font-12">进度:</text>
				<text class="nowrap font-14 font-w-b font-yellow">{{data.return.schedule==1?'待处理' : data.return.schedule==2?'处理中':'已完成'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				info:"",
				data:"",
			}
		},
		onLoad(e) {
			var self=this;
			e.data=JSON.parse(e.data);
			self.info=e.data;
			self.data=e.data.order_goods[e.index];
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
