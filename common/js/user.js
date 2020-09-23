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
 * 用户登录
 * @param {String} 手机号 
 * @param {String} 密码
 * @param {Function} 成功
 * @param {Function} 失败
 */
const user_login=function(mobile,pass,success,error){
	if(!(mobile)){
		return error(0, "请输入正确的用户名！");
	};
	if(pass.trim().length<6 || pass.trim().length>20){
		return error(0, "请输入6-20位的密码！");
	};
	let url=config.api_service + "/post.login";
	let send={
		mobile:mobile,
		password:pass,
	};
	// console.log(JSON.stringify(send));
	uni.showLoading({title: '登录中'});
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
			// uni.hideLoading();
			console.log(JSON.stringify(res));
		},
		complete: (res) => {}
	});
}
/**
 * 用户注册
 * @param {String} 手机号 
 * @param {String} 短信码
 * @param {String} 密码1
 * @param {String} 密码2
 * @param {String} 邀请码
 * @param {Function} 成功
 * @param {Function} 失败
 */
const user_register=function(mobile,code,pass1,pass2,invite,name,success,error){
	if(!(name)){
		return error(0, "请输入正确的用户名！");
	};
	if(!(mobile)){
		return error(0, "请输入正确的手机号！");
	};
	if(code.trim().length!=6){
		return error(0, "请输入正确的验证码！");
	};
	if(pass1.trim().length<6 || pass1.trim().length>20){
		return error(0, "请输入6-20位的密码！");
	};
	if(pass2!=pass1){
		return error(0, "两次密码输入不一致！");
	};
	if(invite.trim().length==0){
		return error(0, "请输入正确的邀请码！");
	};
	let url=config.api_service + "/post.register";
	let send={
		username:name,
		mobile:mobile,
		vcode:code,
		password:pass1,
		password2:pass2,
		invite_code:invite,
	};
	uni.showLoading({title: '注册中'});
	uni.request({
		url: url,
		data: send,
		method: "post",
		success: res => {
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
/**
 * 设置支付密码
 * @param {String} 手机号 
 * @param {String} 密码
 * @param {Function} 成功
 * @param {Function} 失败
 */
const user_setPass=function(mobile,code,pass1,pass2,name,success,error){
	if(!(name)){
		return error(0, "请输入正确的用户名！");
	};
	if(!(mobile)){
		return error(0, "请输入正确的手机号！");
	};
	if(code.trim().length!=6){
		return error(0, "请输入正确的验证码！");
	};
	if(pass1.trim().length!=6){
		return error(0, "请输入6位数的密码！");
	};
	if(pass2!=pass1){
		return error(0, "两次密码输入不一致！");
	};
	let url=config.api_service + "/post.set.pay.password";
	let send={
		username:name,
		mobile:mobile,
		vcode:code,
		pay_password:pass1,
		pay_password1:pass2,
	};
	// console.log(send);
	uni.showLoading({title: '设置支付密码中'});
	uni.request({
		url: url,
		data: send,
		method: "post",
		header: {Authorization: config.getToken()},
		success: res => {
			// console.log(res)
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
/**
 * 忘记登录密码
 * @param {String} 手机号 
 * @param {String} 短信码 
 * @param {String} 密码1
 * @param {String} 密码2
 * @param {Function} 成功
 * @param {Function} 失败
 */
const user_forget_pass=function(mobile,code,pass1,pass2,name,success,error){
	if(!(name)){
		return error(0, "请输入正确的用户名！");
	};
	if(!(mobile)){
		return error(0, "请输入正确的手机号！");
	};
	if(code.trim().length!=6){
		return error(0, "请输入正确的验证码！");
	};
	if(pass1.trim().length<6 || pass1.trim().length>20){
		return error(0, "请输入6-20位的密码！");
	};
	if(pass2!=pass1){
		return error(0, "两次密码输入不一致！");
	};
	let url=config.api_service + "/post.forget.password";
	let send={
		username:name,
		mobile:mobile,
		vcode:code,
		password:pass1,
		password2:pass2,
	};
	// console.log(send)
	uni.showLoading({title: '重置密码中'});
	uni.request({
		url: url,
		data: send,
		method: "post",
		success: res => {
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
/**
 * 忘记支付密码
 * @param {String} 手机号 
 * @param {String} 密码
 * @param {Function} 成功
 * @param {Function} 失败
 */
const user_forget_pay_pass=function(mobile,pass,success,error){
	if(!(mobile)){
		return error(0, "请输入正确的手机号！");
	};
	if(pass.trim().length<6 || pass.trim().length>20){
		return error(0, "请输入6-20位的密码！");
	};
	let url=config.api_service.membe_api2 + "/Member/Login";
	let send={
		mobile:mobile,
		password:pass,
	};
	uni.showLoading({title: '重置密码中'});
	uni.request({
		url: url,
		data: send,
		method: "post",
		success: res => {
			uni.hideLoading();
			if (res.data.status == 1) {
				if(success){
					success(res);
				};
			}else{
				if(error){
					error(res.status, res.msg);
				};
			};
		},
		fail: (res) => { console.log(JSON.stringify(res)) },
		complete: (res) => {}
	});
}
/**
 * 修改登录密码
 * @param {String} 旧密码 
 * @param {String} 密码1
 * @param {String} 密码2
 * @param {Function} 成功
 * @param {Function} 失败
 */
const user_modify_pass=function(pass,pass1,pass2,success,error){
	if(pass.trim().length==0){
		return error(0, "请输入正确的旧密码！");
	};
	if(pass1.trim().length<6 || pass1.trim().length>20){
		return error(0, "请输入6-20位的新密码！");
	};
	if(pass2!=pass1){
		return error(0, "两次输入的新密码不一致！");
	};
	let url=config.api_service + "/post.update.password";
	let send={
		old_password:pass,
		new_password:pass1,
		new_password2:pass2,
	};
	uni.showLoading({title: '修改密码中'});
	uni.request({
		url: url,
		data: send,
		method: "post",
		header: {Authorization: config.getToken()},
		success: res => {
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
/**
 * 修改支付密码
 * @param {String} 手机号 
 * @param {String} 密码
 * @param {Function} 成功
 * @param {Function} 失败
 */
const user_modify_pay_pass=function(pass,pass1,pass2,success,error){
	if(pass.trim().length==0){
		return error(0, "请输入正确的旧密码！");
	};
	if(pass1.trim().length<6 || pass1.trim().length>20){
		return error(0, "请输入6-20位的新密码！");
	};
	if(pass2!=pass1){
		return error(0, "两次输入的新密码不一致！");
	};
	let url=config.api_service + "/post.update.pay.password";
	let send={
		old_pay_password:pass,
		new_pay_password:pass1,
		new_pay_password1:pass2,
	};
	console.log(send)
	uni.showLoading({title: '修改密码中'});
	uni.request({
		url: url,
		data: send,
		method: "post",
		header: {Authorization: config.getToken()},
		success: res => {
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
/**
 * 获取用户信息
 * @param {Function} 成功
 * @param {Function} 失败
 */
const user_Info=function(success,error){
	let url=config.api_service + "/get.user.info";
	// uni.showLoading({title: '加载中'});
	uni.request({
		url: url,
		data: {},
		method: "get",
		header: {Authorization: config.getToken()},
		success: res => {
			// uni.hideLoading();
			if (res.data.code == 200) {
				if(!res.data.data.relation.level_name){
					res.data.data.relation.level_name = '注册用户';
				};
				if(!res.data.data.avatar){
					res.data.data.avatar="../../static/img/ffa5e294541bd80ca4f122b1bca701e.png";
				};
				uni.setStorageSync("userInfo",res.data.data);
				if(success){
					success(res);
				};
			}else{
				if(error){
					error("获取用户信息失败");
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
	check_mobile,
	user_login,
	user_register,
	user_setPass,
	user_forget_pass,
	user_forget_pay_pass,
	user_modify_pass,
	user_modify_pay_pass,
	user_Info,
}
