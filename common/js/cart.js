import config from "@/common/js/config.js"
/**
 * 获取购物车
 * @param {Function} 成功
 * @param {Function} 失败
 */
const get_cart=function(success,error){
	let url=config.api_service + "/get.cart";
	// uni.showLoading({title: '加载中'});
	uni.request({
		url: url,
		data: {},
		method: "get",
		header: {Authorization: config.getToken()},
		success: res => {
			// uni.hideLoading();
			config.api_status(res);
			if (res.data.code == 200) {
				if(success){
					success(res);
				};
			}else{
				if(error){
					error(res);
				};
			};
		},
		fail: (res) => {
			// uni.hideLoading();
			console.log(JSON.stringify(res));
		},
		complete: (res) => {}
	});
}
export default {
	get_cart,
}
