<template>
	<view class="go-login flex-center flex-j-between pl-15 pr-15" v-if="show">
		<text class="font-14">如果你不登录，我就霸占这里不离开</text>
		<button class="font-14" @click="app.showOpen('login/login')">登录</button>
	</view>
</template>

<script>
	export default {
		name:"go-login",
		props:{
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.go-login{position: fixed;left: 0px;bottom: 0px;width: 100%;height: 50px;background-color: #FFF1E1;color: #EBA354;}
	.go-login button{color: #EBA354;border: 1px solid #EBA354;border-radius: 32px;line-height: 32px;width: 80px;background-color: transparent;margin: 0px;}
</style>
