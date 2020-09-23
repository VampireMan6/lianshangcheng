import Vue from 'vue'
import App from './App'
import $app from './common/js/base.js'
import store from './store'
import config from "@/common/js/config.js"
import user from "@/common/js/user.js"
import coin from "@/common/js/coin.js"

Vue.prototype.app = $app;
Vue.prototype.$store = store;
Vue.config.productionTip = false

import {
	mapState,
	mapMutations
} from 'vuex'
App.mpType = 'app'

const app = new Vue({
	store,
    ...App,
	data() {
		return {
			
		}
	},
	created() {
		var self=this;
		let userToken = uni.getStorageSync('userToken') || '';
		let userInfo = uni.getStorageSync('userInfo') || '';
		self.SetUserInfo(userInfo);
		if(userToken.access_token){
			uni.getStorage({
				key: 'userToken',
				success: (res) => {
					this.login(res.data);
				}
			});
			self.SetCoin();
		}else{
			// uni.reLaunch({
			// 	url:'/pages/login/login'
			// });
		}
	},
	computed:{
		...mapState(["hasLogin",'userInfo']),
	},
	mounted:function() {
		var self = this;
		self.get_qiniu();
	},
	computed:{
		
	},
	methods: {
		...mapMutations(["SetUserInfo","SetQiniu","login","SetCoin"]),
		get_qiniu:function(){
			var self=this;
			// uni.showNavigationBarLoading();
			uni.request({
				url: config.api_service + "/get.qiniu.token",
				data: {},
				method: "get",
				success: res => {
					// uni.hideNavigationBarLoading();
					if (res.data.code == 200) {
						self.SetQiniu(res.data.data);
					}else{
						console.log(JSON.stringify(res));
					};
				},
				fail: (res) => {
					// uni.hideNavigationBarLoading();
					if(res.errMsg == 'request:fail timeout'){
						console.log("请求超时了");
					};
					console.log(JSON.stringify(res));
				},
				complete: (res) => {}
			});
		}
	},
})
app.$mount()
