<template>
	<view class="box pl-15 pr-15 pb-15" @click="timeSW=false">
		<view style="position: relative;z-index: 1;">
			<view class="choice flex-center flex-j-between font-white pt-15 pb-20" @click.stop="">
				<view class="choice-time flex-center font-16" @click="timeSW=true">
					<view>{{time}}<i class="iconfont icon-shang-copy ml-10"></i></view>
					<view class="time-list" v-if="timeSW" @click.stop="">
						<view class="ct one-row font-gray font-14 text-center" v-text="year+'-'+(index+1)" @click="time=year+'-'+(index+1);init();" v-for="(item,index) in 12" :key="index"></view>
					</view>
				</view>
				<view class="flex-center font-12" @click="popSW=true">筛选<i class="iconfont icon-shang-copy ml-10"></i></view>
			</view>
			<view class="balance-cont flex-center flex-j-between bc-white">
				<view class="cont text-center nowrap">
					<view class="font-12 font-light-gray">当月支出(链++)</view>
					<view class="font-16 font-w-b font-yellow pt-10 pb-10" v-text="data.out">658420.30700</view>
					<view class="font-12 font-black">≈{{data.out_cny}} A</view>
				</view>
				<view class="cont text-center nowrap">
					<view class="font-12 font-light-gray">当月收入(链++)</view>
					<view class="font-16 font-w-b font-yellow pt-10 pb-10" v-text="app._toFixed(data.in,2)">0.00</view>
					<!-- <view class="font-12 font-black">≈{{app._accMul(data.in_cny,7)}} CNY</view> -->
					<view class="font-12 font-black">≈{{data.in_cny}} A</view>
				</view>
			</view>
		</view>
		<view class="list-content pt-10">
			<view class="cont-list flex-center flex-j-between" v-for="(item,index) in list" :key="index">
				<image :src="item.logo"></image>
				<view class="cont-data">
					<view class="flex-center flex-j-between">
						<view class="one-row" v-text="item.coin_name">BTC</view>
						<view class="font-w-b nowrap" v-text="app._toFixed(item.money,2)">316546.015421</view>
					</view>
					<view class="flex-center flex-j-between mt-10">
						<view class="font-12 font-light-gray nowrap" v-text="item.created_at">2020-01-19 08:02</view>
						<view class="font-10 font-light-gray nowrap" :class="{'font-yellow':item.remark=='充值'}" v-text="item.remark">提现</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		<view class="winPopup flex-row flex-j-end" v-if="popSW" @click="popSW=false">
			<view class="Popup-content bc-white pl-15 pr-15 pt-15" @click.stop="">
				<view class="pb-30">
					<view class="font-16 font-w-b text-left">交易币种</view>
					<view class="choice-list flex-center flex-j-between">
						<view class="name nowrap text-center" :class="{'active':coin_id==''}" @click="coin_id=''">全部</view>
						<view class="name nowrap text-center" :class="{'active':coin_id==item.id}" @click="coin_id=item.id" v-for="(item,index) in allCoin" :key="index" v-text="item.en_name">链++</view>
					</view>
				</view>
				<view class="pb-30">
					<view class="font-16 font-w-b text-left">出入类型</view>
					<view class="choice-list flex-center flex-j-between">
						<view class="name nowrap text-center" :class="{'active':type==''}" @click="type=''">全部</view>
						<view class="name nowrap text-center" :class="{'active':type=='1'}" @click="type='1'">入账</view>
						<view class="name nowrap text-center" :class="{'active':type=='2'}" @click="type='2'">出账</view>
					</view>
				</view>
				<view class="pb-30">
					<view class="font-16 font-w-b text-left">账单类型</view>
					<view class="choice-list flex-center flex-j-between">
						<view class="name nowrap text-center" :class="{'active':type_id==''}" @click="type_id=''">全部</view>
						<view class="name nowrap text-center" :class="{'active':type_id==item.id}" @click="type_id=item.id" v-for="(item,index) in type_list" :key="index" v-text="item.name">钱包充值</view>
					</view>
				</view>
				<view class="pb-30">
					<view class="font-16 font-w-b text-left">最小交易金额</view>
					<view class="Input-cont mt-15">
						<input type="text" placeholder="输入内容" v-model="min_money" />
					</view>
				</view>
				<view class="foot-cont flex-center flex-j-between pl-15 pr-15 bc-white">
					<view class="btn" @click="reset()">重置</view><view class="btn" @click="init()">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import coin from "@/common/js/coin.js"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				page:1,
				count:20,
				list:[],
				loadingType: 'more', //加载更多状态
				popSW:false,
				coin_id:"",//交易币种id
				type:"",//1转入 2转出
				type_list:[],
				type_id:"",//类型id
				min_money:"",
				timeSW:false,
				year:"",
				time:"",
				data:{
					in:0,
					in_cny:0,
					out:0,
					out_cny:0,
				}
			}
		},
		onLoad() {
			var self=this;
			self.time=self.getTime(0);
			self.get_type();
			self.get_list();
		},
		onReachBottom(){//加载更多
			this.get_list();
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allCoin']),
		},
		methods: {
			init:function(){
				var self=this;
				self.timeSW=false;
				self.loadingType = 'more';
				self.page = 1;
				self.list = [];
				self.popSW=false;
				self.get_list();
			},
			reset:function(){
				var self=this;
				self.type_id="";//类型id
				self.coin_id="";//币种id
				self.type="";//1转入 2转出
				self.time="";//月份
				self.min_money="";//最小金额
			},
			get_list:function(){
				var self=this;
				if(self.loadingType === 'nomore'){
					return;
				}else{
					self.loadingType = 'loading';
				};
				let send={
					page:self.page,
					count:self.count,
					type_id:self.type_id,//类型id
					coin_id:self.coin_id,//币种id
					type:self.type,//1转入 2转出
					month:self.time,//月份
					min_money:self.min_money,//最小金额
				};
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.coin.bill",
					data: send,
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.data.in=res.data.data.in;
							self.data.out=res.data.data.out;
							self.data.in_cny=self.app._accMul(res.data.data.in,0.25)
							self.data.out_cny=self.app._accMul(res.data.data.out,0.25)
							// self.data.in_cny=self.app._accMul(coin.getCny('链++'),(res.data.data.in));
							// self.data.out_cny=self.app._accMul(coin.getCny('链++'),(res.data.data.out));
							for(var i=0;i<res.data.data.list.length;i++){
								var item=res.data.data.list[i];
								self.list.push(item);
							};
							if(res.data.data.list.length==0 || res.data.data.list.length<self.count){
								self.loadingType = 'nomore';
							}else{
								self.loadingType = 'more';
							};
							self.page++;
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {}
				});
			},
			get_type:function(){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.bill.type",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						config.api_status(res);
						if (res.data.code == 200) {
							self.type_list=res.data.data.list;
						}else{
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {console.log(JSON.stringify(res));},
					complete: (res) => {}
				});
			},
			getTime:function(num){
				var self=this;
				if(!num){num=0;};
				var time=new Date();
				time=time.getTime()+(num*24)*(60*60*1000);
				var t=new Date(time);
				self.year=t.getFullYear()
				let m=(t.getMonth()+1)<10?'0'+(t.getMonth()+1):(t.getMonth()+1);
				let d=t.getDate()<10?'0'+t.getDate():t.getDate();
				var str=t.getFullYear()+"-" + m;
				return str;
			},
		}
	}
</script>

<style>
	.box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 120px;background-color: #1A2B5A;content: "";z-index: 0;}
	.choice{width: 100%;position: relative;z-index: 1;}
	.choice-time{position: relative;}
	.choice-time .time-list{position: absolute;top: 25px;left: 0px;width: auto;min-height: 380px;background-color: #FFFFFF;box-shadow: 0px 2px 6px #E9E8E8;border-radius: 5px;padding: 10px 0px;}
	.choice-time .time-list .ct{line-height: 30px;padding: 0px 15px;}
	.balance-cont{width: 100%;position: relative;border-radius: 4px;box-shadow: 0px 2px 6px #E9E8E8;padding: 16px 10px;}
	.balance-cont::after{position: absolute;top: 16px;left: 50%;width: 1px;height: calc(100% - 32px);content: "";background-color: #FAFAF8;}
	.balance-cont .cont{width: 48%;text-align: center;}
	.list-content{min-height: 70vh;}
	.cont-list{width: 100%;padding: 16px 0px;border-bottom: 1px solid #F5F5F5;}
	.cont-list image{width: 24px;height: 24px;border-radius: 50%;}
	.cont-list .cont-data{width: calc(100% - 40px);position: relative;}
	.Popup-content{width: 80%;height: 100%;overflow-y: auto;position: relative;padding-bottom: 70px;}
	.Popup-content .choice-list{width: 100%;flex-wrap: wrap;position: relative;}
	.Popup-content .choice-list::after{width: 30%;content: "";}
	.Popup-content .choice-list .name{display: inline-block;width: 30%;line-height: 32px;color: #666666;border: 1px solid #666666;border-radius: 2px;margin-top: 16px;}
	.Popup-content .choice-list .name.active{color: #FFFFFF;background-color: #1A2B5A;border: 0px;}
	.Popup-content .Input-cont{width: 100%;height: 40px;border-radius: 2px;background-color: #F5F5F5;overflow: hidden;}
	.Popup-content .Input-cont input{width: 100%;height: 100%;padding: 0px 20px;font-size: 14px;color: #333333;}
	.Popup-content .foot-cont{width: 80%;height: 70px;position: fixed;bottom: 0px;right: 0px;}
	.Popup-content .foot-cont .btn{line-height: 44px;width: 45%;border-radius: 22px;text-align: center;font-size: 16px;}
	.Popup-content .foot-cont .btn:first-child{background-color: #E52321;color: #FFFFFF;}
	.Popup-content .foot-cont .btn:last-child{background-color: #1A2B5A;color: #FFFFFF;}
	
</style>
