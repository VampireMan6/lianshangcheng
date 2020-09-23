import config from "@/common/js/config.js"
/**
 * 判断手机号码的正则表达式
 * @param {String} 手机号
 */
const check_mobile=function(mobile) {
	if(!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile))) {
		return false;
	} else {
		return true;
	};
}
/**
 * 发送验证码
 * @param {String} 手机号 
 * @param {String} 1注册；2登录；3重置登录密码；4设置支付密码
 * @param {Function} 成功
 * @param {Function} 失败
 */
const send_sms=function(mobile,mold,success,error){
	if(!check_mobile(mobile)){
		return error(0, "请输入正确的手机号！");
	};
	let url=config.api_service + "/post.send.code";
	let send={
		mobile:mobile,
		scene:mold,//1注册；2登录；3重置登录密码；4设置支付密码
	};
	// console.log(JSON.stringify(send));
	uni.showLoading({title: '发送中'});
	uni.request({
		url: url,
		data: send,
		method: "post",
		success: res => {
			// console.log(JSON.stringify(res));
			uni.hideLoading();
			if (res.data.code == 200) {
				if(success){
					success(res);
				};
			}else{
				if(error){
					error(res.data.code, res.data.message);
				};
			};
		},
		fail: (res) => { 
			uni.hideLoading();
			console.log(JSON.stringify(res));
		},
		complete: (res) => {}
	});
}

export default {
	check_mobile,
	send_sms,
}
