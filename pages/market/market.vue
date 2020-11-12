<template>
	<view class="box">
		<view class="heade-cont flex-center flex-j-between pb-20">
			<view class="cont flex-center font-18 font-yellow font-w-b">
				<image class="mr-10" mode="widthFix" src="../../static/img/e30e55bc56d0534e955888f0efc5a88.png"></image>QSC
			</view>
			<image class="icon" mode="widthFix" src="../../static/img/e5fd05a0ccea30b2dc92b488286b5b6.png"></image>
		</view>
		<view class="search-cont flex-center">
			<i class="iconfont icon-search" @click="app.showOpen('market/search')"></i>
			<input type="text" placeholder="搜索你的理想物品" />
		</view>
		<view class="category-data flex-center flex-j-between">
			<view class="category-cont">
				<view class="name active">全部</view>
				<view class="name">家居日用</view><view class="name">地方特产</view><view class="name">酒水饮料</view>
				<view class="name">家居日用</view><view class="name">地方特产</view><view class="name">酒水饮料</view>
			</view>
			<image @click="app.showOpen('market/category')" mode="widthFix" src="../../static/img/505f250387736adf0118b7fd1de7ed4.png"></image>
		</view>
		<view class="loop-Img">
			<image mode="widthFix" src="../../static/3a067e2291b4495971a50a9af9b7fec.png"></image>
		</view>
		<view class="flex-center flex-j-between mt-30 mb-20">
			<text class="title font-16 font-w-b">每日热销</text>
			<view class="flex-center font-12" @click="app.showOpen('index/invest')">
				<text class="font-light-gray">更多</text><i class="iconfont icon-you font-light-gray ml-5 font-20"></i>
			</view>
		</view>
		<view class="list-content flex-row flex-j-between">
			<view class="cont-list">
				<image src="../../static/cc3d2d9be82a562aaafb68019475037.png"></image>
				<view class="pl-10 pr-10 pt-10 pb-15">
					<view class="name nowrap mb-10 font-14">草莓水果沙拉超级无底好吃</view>
					<view class="price nowrap font-14 flex-center">
						<text class="nowrap font-yellow">100.0000</text>
						<text class="one-row ml-5">QSC</text>
					</view>
					<view class="cny-price nowrap font-12 font-light-gray lh-20">≈20.00 A</view>
				</view>
			</view>
			<view class="cont-list">
				<image src="../../static/289e7e9e7d243d2e27e12b1d67de5fd.png"></image>
				<view class="pl-10 pr-10 pt-10 pb-15">
					<view class="name nowrap mb-10 font-14">草莓水果沙拉超级无底好吃</view>
					<view class="price nowrap font-14 flex-center">
						<text class="nowrap font-yellow">100.0000</text>
						<text class="one-row ml-5">QSC</text>
					</view>
					<view class="cny-price nowrap font-12 font-light-gray lh-20">≈20.00 A</view>
				</view>
			</view>
			<view class="cont-list">
				<image src="../../static/629fd37933b378d5f6fcc208b6b30e4.png"></image>
				<view class="pl-10 pr-10 pt-10 pb-15">
					<view class="name nowrap mb-10 font-14">草莓水果沙拉超级无底好吃</view>
					<view class="price nowrap font-14 flex-center">
						<text class="nowrap font-yellow">100.0000</text>
						<text class="one-row ml-5">QSC</text>
					</view>
					<!-- <view class="cny-price nowrap font-12 font-light-gray lh-20">≈20.00 CNY</view> -->
				</view>
			</view>
			<view class="cont-list">
				<image src="../../static/da59d875473842364a79e8007b1fb3a.png"></image>
				<view class="pl-10 pr-10 pt-10 pb-15">
					<view class="name nowrap mb-10 font-14">草莓水果沙拉超级无底好吃</view>
					<view class="price nowrap font-14 flex-center">
						<text class="nowrap font-yellow">100.0000</text>
						<text class="one-row ml-5">QSC</text>
					</view>
					<view class="cny-price nowrap font-12 font-light-gray lh-20">≈20.00 A</view>
				</view>
			</view>
		</view>
		<view class="text-center font-light-gray pt-25 pb-25">呕嚯，没有了~</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.box{padding: 50px 15px 15px;}
	.box::after{position: absolute;top: 0px;left: 0px;width: 100%;height: 240px;background-color: #211817;content: "";}
	.heade-cont{width: 100%;position: relative;z-index: 1;}
	.heade-cont .cont image{width: 20px;}
	.heade-cont image.icon{width: 18px;}
	.search-cont{width: 100%;height: 32px;position: relative;z-index: 1;background-color: #FFFFFF;border-radius: 20px;padding: 0px 20px;}
	.search-cont .iconfont{font-size: 20px;color: #999999;}
	.search-cont input{width: 100%;height: 100%;font-size: 14px;color: #333333;padding: 0px 15px;}
	.category-data{width: 100%;position: relative;z-index: 1;padding: 16px 0px;}
	.category-data image{width: 18px;}
	.category-data .category-cont{width: calc(100% - 30px);white-space: nowrap;overflow-x: auto;}
	.category-data .category-cont .name{color: #FFFFFF;font-size: 16px;margin-right: 18px;display: inline-block;position: relative;line-height: 25px;}
	.category-data .category-cont .name.active{font-weight: bold;}
	.category-data .category-cont .name.active::after{position: absolute;content: "";bottom: 0px;left: 0px;width: 100%;height: 2px;background-color: #A99268;border-radius: 2px;}
	.loop-Img{width: 100%;position: relative;z-index: 1;overflow: hidden;}
	.loop-Img image{width: 100%;border-radius: 4px;}
	.list-content{width: 100%;flex-wrap: wrap;}
	.list-content .cont-list{width: 48%;border-radius: 4px;overflow: hidden;box-shadow: 1px 1px 6px #E9E8E8;margin-bottom: 11px;}
	.list-content .cont-list image{width: 100%;height: 140px;}
</style>
