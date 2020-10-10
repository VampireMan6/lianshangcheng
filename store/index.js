import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import cart from "@/common/js/cart.js"
import coin from "@/common/js/coin.js"
import user from "@/common/js/user.js"

const store = new Vuex.Store({
    state: {
        hasLogin: false,
		token:"",//用户token
		userInfo:"",//用户信息
		// cartNumber:"",//购物车信息
		cartInfo:"",//购物车信息
		coinInfo:"",//币种信息
		qiniu:{
			token:"",
			domain:"",
			region:"",
		},
		allCoin:[],
		allMoney:0,
		allCny:0,
    },
    mutations: {
        login(state,provider) {
            state.hasLogin = true;
			console.log(provider);
			state.token = provider;
			uni.setStorageSync("userToken",provider);
			user.user_Info(function(res){
				state.userInfo=res.data.data;
				uni.setStorageSync("userInfo",res.data.data);
			});
        },
        logout(state) {
			state.hasLogin = false;
			state.userInfo = "";
			state.token = "";
			state.allCoin=[];
			state.allMoney=0;
			state.allCny=0;
			uni.removeStorageSync("userToken");
			uni.removeStorageSync("userInfo");
			uni.removeStorageSync("allCoin");
        },		
		SetUserInfo(state,info){//设置用户信息
			state.hasLogin = true;
			state.userInfo=info;
			uni.setStorageSync("userInfo",info);
		},
		SetQiniu(state,info){//七牛云
			uni.setStorageSync("qiniu",info);
			state.qiniu=info;
		},
		SetCoin(state){//设置币种
			state.allCoin=uni.getStorageSync("allCoin");
			var usdt=0;
			var cny=0;
			coin.get_All(function(res){//获取全部币种
				uni.setStorageSync("allCoin",res.data.data.list);
				coin.get_coinPrice(function(data){//获取币种价格
					var allCoin=uni.getStorageSync("allCoin");
					allCoin.forEach(function(item){
						data.data.data.forEach(function(jtem){
							if(jtem.CoinId == item.id){
								item.other=jtem;
								usdt +=Number(jtem.Money);
								cny +=Number(jtem.Money*0.25);
							};
						});
					});
					state.allCoin=allCoin;
					state.allMoney=usdt;
					state.allCny=cny;
					uni.setStorageSync("allCoin",allCoin);
				});
			});
		},
		SetCart(state,info){//购物车
			// cart.get_cart(function(res){
			// 	state.cartInfo=res.data.data;
			// });
			state.cartInfo=uni.getStorageSync("cartInfo");
			state.cartInfo=info;
			uni.setStorageSync("cartInfo",info);
			return;
			// uni.showNavigationBarLoading();
			// uni.request({
			// 	url: config.api_service + "/get.cart",
			// 	data: {},
			// 	method: "get",
			// 	header: {Authorization: config.getToken()},
			// 	success: res => {
			// 		console.log(JSON.stringify(res));
			// 		uni.hideNavigationBarLoading();
			// 		config.api_status(res);
			// 		if (res.data.code == 200) {
			// 			state.cartInfo=res.data.data;
			// 		}else{
			// 			console.log(res.data.message);
			// 		};
			// 	},
			// 	fail: (res) => {
			// 		uni.hideNavigationBarLoading();
			// 		if(res.errMsg == 'request:fail timeout'){
			// 			console.log("请求超时了");
			// 		};
			// 		console.log(JSON.stringify(res));
			// 	},
			// 	complete: (res) => {}
			// });
		}
    }
})

export default store
