<template>
	<view class="box pl-15 pr-15 pt-15 pb-15">
		<view class="cont nowrap flex-center" v-for="(item,index) in allCoin" :key="index" @click="choice(item,index)">
			<image class="mr-15" :src="item.logo"></image>
			{{item.name}} <text class="font-light-gray font-10 ml-10">{{item.en_name}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		computed:{
			...mapState(['allCoin']),
		},
		methods: {
			choice:function(item,index){
				var self=this;
				var page=self.app._prePage();
				page.$vm.getChoice(item);
				self.app.goBack();
			}
		}
	}
</script>

<style>
	.cont{width: 100%;height: 50px;border-bottom: 1px solid #F5F5F5;}
	.cont image{width: 30px;height: 30px;border-radius: 50%;}
</style>
