var service = true;
// https://api.atbds.com/api/documentation 接口地址

// var api_service="http://qsc-api.zgf.8kpay.com:10100";
var api_service="https://api.atbds.com";

import {
	mapState,
	mapMutations
} from 'vuex'
export default {
	computed: {
		...mapState(['userInfo']),
	},
	methods:{
		...mapMutations(['logout']),
		get_:function(){
			console.log("22")
		}
	},
	getToken:function() {
		let res=uni.getStorageSync("userToken");
		if(res && res.access_token){
			let str = res.token_type+" "+res.access_token;
			return str;
		}else{
			return "";
		};
	},
	api_status:function(res){
		var self=this;
		if(res.data.code==20009 || res.data.code==10004){
			uni.reLaunch({
				url:'/pages/login/login'
			});
		};
		// code为20099 用户未设置支付密码
	},
	api_service,
}
