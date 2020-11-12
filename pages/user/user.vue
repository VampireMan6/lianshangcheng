<template>
	<view class="box pt-50 pl-15 pr-15">
		<view class="tab-line"></view>
		<view class="user-data flex-row flex-j-between mb-25">
			<view class="data flex-center flex-j-between" v-if="userInfo.mobile" @click="app.showOpen('user/userInfo')">
				<image :src="userInfo.avatar"></image>
				<view class="name-cont">
					<view class="font-18 font-white font-w-b mb-10" v-text="userInfo.username">ljsj</view>
					<view class="btn" v-text="userInfo.relation.level_name">等级体系</view>
				</view>
			</view>
			<view class="data flex-center flex-j-between" v-else>
				<image src="@/static/img/ffa5e294541bd80ca4f122b1bca701e.png"></image>
				<view class="name-cont">
					<view class="font-18 font-white font-w-b mb-10" v-text="'用户昵称'">ljsj</view>
					<view class="btn" @click="GoLogin()">请先登录</view>
				</view>
			</view>
			<i class="iconfont icon-setup font-white font-20" @click="app.showOpen('user/setUp')"></i>
		</view>
		<view class="balance-cont text-center nowrap mb-20 bc-white pt-30 pb-30">
			<view @click="app.showOpen('wallet/wallet')">
				<view class="flex-center flex-j-center">
					账户总资产折合（链++）
					<view @click.stop=""><i class="iconfont ml-10 font-20" :class="{'icon-visible':!eye,'icon-eye_protection':eye}" @click="eye=!eye"></i></view>
				</view>
				<view class="font-yellow font-20 font-w-b nowrap mt-5" v-text="eye?'******':allMoney">0</view>
				<view class="nowrap mt-5">≈{{eye?'******':allCny}} A</view>
			</view>
			<view class="bill font-yellow font-10 font-w-b" @click="app.showOpen('wallet/bill')">进入</view>
		</view>
		<view class="order-cont mb-20">
			<view class="flex-center flex-j-between">
				<text class="title font-16 font-w-b">我的订单</text>
				<view class="flex-center" @click="app.showOpen('cart/order?type=0')">
					<text class="font-12 font-light-gray">全部订单</text>
					<i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
				</view>
			</view>
			<view class="flex-center flex-j-between pt-20">
				<view class="text-center" @click="app.showOpen('cart/order?type=1')">
					<image src="../../static/img/ac2e976c86e40573e19f3a746c840a4.png"></image>
					<view class="font-12">待支付</view>
				</view>
				<view class="text-center" @click="app.showOpen('cart/order?type=2')">
					<image src="../../static/img/125a8112f8b48d5a05598905330e8c6.png"></image>
					<view class="font-12">待配送</view>
				</view>
				<view class="text-center" @click="app.showOpen('cart/order?type=3')">
					<image src="../../static/img/f5772ce690546d3596a321eb1b15413.png"></image>
					<view class="font-12">配送中</view>
				</view>
				<view class="text-center" @click="app.showOpen('cart/order?type=4')">
					<image src="../../static/img/fbccd835559c699b0cf187fe1b94e95.png"></image>
					<view class="font-12">待评价</view>
				</view>
				<view class="text-center" @click="app.showOpen('cart/PostSale')">
					<image src="../../static/img/949994ddf2f8c93a2a8c574a38d831e.png"></image>
					<view class="font-12">售后/退款</view>
				</view>
			</view>
		</view>
		<view class="setUp-cont mb-20">
			<view class="flex-center flex-j-between">
				<text class="title font-16 font-w-b">我的服务</text>
			</view>
			<view class="flex-center flex-j-between pt-20">
				<view class="text-center cont" @click="app.showOpen('user/team')">
					<view class="pic">
						<image src="../../static/img/35730a54dfde0d37af4a666af0f9eb5.png"></image>
					</view>
					<view class="font-12">我的团队</view>
				</view>
				<!--<view class="text-center cont" @click="app.showOpen('index/invest')">
					<view class="pic">
						<image src="../../static/img/4337532bd23e53b486db282ce9749db.png"></image>
					</view>
					<view class="font-12">我的收益</view>
				</view>-->
				<view class="text-center cont" @click="app.showOpen('index/bill')">
					<view class="pic">
						<image src="../../static/img/4337532bd23e53b486db282ce9749db.png"></image>
					</view>
					<view class="font-12">收益明细</view>
				</view>
				<view class="text-center cont" @click="app.showOpen('wallet/exchange')"><!-- @click="app.showOpen('wallet/integral')" -->
					<view class="pic">
						<image style="width: 100%;height: 100%;" src="../../static/img/d9bdfdf212db7438ecf345e0a66ec9e.png"></image>
					</view>
					<view class="font-12">兑换</view>
				</view>
				<view class="text-center cont" @click="app.showOpen('user/help')">
					<view class="pic">
						<image src="../../static/img/f71dc63be9772196e51b4c4541cdc58.png"></image>
					</view>
					<view class="font-12">帮助中心</view>
				</view>
			</view>
			<view class="flex-center flex-j-between pt-20">
				<view class="text-center cont" @click="app.showOpen('user/about')">
					<view class="pic">
						<image src="../../static/img/26ed8c5710e34dbf50712e41d5acf58.png"></image>
					</view>
					<view class="font-12">关于我们</view>
				</view>
				<view class="text-center cont" @click="app.showOpen('user/contact')">
					<view class="pic">
						<image src="../../static/img/b14fae284d2a4c117f05f4d01df58c9.png"></image>
					</view>
					<view class="font-12">联系我们</view>
				</view>
				<view class="text-center cont" @click="app.showOpen('share/share')" v-if="userInfo.relation&&userInfo.relation.level!=0">
					<view class="pic">
						<image src="../../static/img/f111aba1e47b9da58b2d257e60d96f9.png"></image>
					</view>
					<view class="font-12">应用分享</view>
				</view>
				<view class="text-center cont" @click="app._toast('购买套餐之后才可以分享')" v-else>
					<view class="pic">
						<image src="../../static/img/f111aba1e47b9da58b2d257e60d96f9.png"></image>
					</view>
					<view class="font-12">应用分享</view>
				</view>
				<!--<view class="text-center cont" @click="userInfo.seller==1?app.showOpen('wallet/otcList'):app._toast('你暂无权限')">
					<view class="pic">
						<image src="../../static/img/aac13916187a7699840ea580e8d42b3.png"></image>
					</view>
					<view class="font-12">其他</view>
				</view>-->
				<view class="text-center cont" @click="app._toast('暂未开放')">
					<view class="pic">
						<image src="../../static/img/aac13916187a7699840ea580e8d42b3.png"></image>
					</view>
					<view class="font-12">其他</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import user from "@/common/js/user.js"
	// import coin from "@/common/js/coin.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				eye:false
			}
		},
		onLoad() {
			// console.log(this.userInfo)
			// this.userInfo.seller=1;//测试时才可以用
		},
		onPullDownRefresh() {
			var self=this;
			user.user_Info(function(res){
				self.SetUserInfo(res.data.data)
			});
			self.SetCoin();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed:{
			...mapState(["hasLogin",'userInfo','allMoney','allCny']),
		},
		methods: {
			...mapMutations(["SetUserInfo","SetCoin"]),
			GoLogin:function(){
				uni.reLaunch({
					url:'/pages/login/login'
				});
			}
		}
	}
</script>

<style>
	.box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 179px;background-color: #1A2B5A;content: "";}
	.user-data{position: relative;z-index: 1;}
	.user-data .data{width: calc(100% - 50px);}
	.user-data image{width: 60px;height: 60px;border-radius: 50%;}
	.user-data .name-cont{width: calc(100% - 80px);}
	.user-data .name-cont .btn{color: #FFFFFF;font-size: 10px;font-weight: bold;line-height: 24px;background-color: #E52321;border-radius: 20px;padding: 0px 10px;display: inline-flex;}
	.balance-cont{width: 100%;border-radius: 4px;box-shadow: 0px 2px 6px #E9E8E8;position: relative;z-index: 1;}
	.balance-cont .bill{position: absolute;right: -3px;top: 20px;background-color: #E52321;z-index: 2;line-height: 24px;padding: 0px 15px;border-radius: 20px 0px 0px 20px;color: #FFFFFF !important;}
	.order-cont{width: 100%;border-radius: 4px;box-shadow: 0px 1px 6px #E9E8E8;padding: 20px 16px;}
	.order-cont image{width: 22px;height: 22px;margin-bottom: 5px;}
	.setUp-cont{width: 100%;border-radius: 4px;box-shadow: 0px 1px 6px #E9E8E8;padding: 20px 16px;}
	.setUp-cont .cont{width: 20%;}
	.setUp-cont .cont .pic{margin-bottom: 10px;width: 30px;height: 30px;border-radius: 50%;background-color: #211817;display: inline-flex;align-items: center;justify-content: center;}
	.setUp-cont .cont .pic image{width: 14px;height: 14px;}

</style>
