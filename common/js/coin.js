import config from "@/common/js/config.js"
/*获取全部币种列表*/
const get_All=function(success,error){
	let url=config.api_service + "/get.coin";
	uni.request({
		url: url,
		data: {},
		method: "get",
		header: {Authorization: config.getToken()},
		success: res => {
			// console.log(JSON.stringify(res));
			config.api_status(res);
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
			console.log(JSON.stringify(res));
		},
		complete: (res) => {}
	});
}
/*获取币种余额*/
const get_coinPrice=function(success,error){
	let url=config.api_service + "/get.coin.balance";
	uni.request({
		url: url,
		data: {},
		method: "get",
		header: {Authorization: config.getToken()},
		success: res => {
			// console.log(JSON.stringify(res));
			config.api_status(res);
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
			console.log(JSON.stringify(res));
		},
		complete: (res) => {}
	});
}
/*获取币种USDT价格*/
const getUsdt = function(name) {
	if (!name) return 0;
	if (name.toUpperCase() == "USDT") {
		return 1;
	} else {
		let list =uni.getStorageSync("allCoin")||"[]" ;
		let result = list.filter(function(a) {
			return a.en_name.toUpperCase() == name.toUpperCase();
		});
		if (result.length > 0) {
			return result[0].price;
		};
		return 0;
	};
}
/*获取币种的人民币价格*/
const getCny = function(name) {
	if (!name) {
		return 0.00;
	} 
	if (name.toUpperCase() == "USDT") {
		let list =uni.getStorageSync("allCoin")||"[]" ;
		let result= list.filter(item =>{  
		    return item.en_name== 'USDT';  
		})
		if (result.length > 0) {
			return result[0].price;
		}
		return 7.00;
	} else {		
		return (getUsdt(name) * getCny("USDT"));
	}
}
/*获取单个币种的余额*/
const getMoney = function(name){
	if (!name) {
		return 0.00;
	};
	let list =uni.getStorageSync("allCoin")||"[]" ;
	let data=list.filter(function(item){
		return item.en_name.toLowerCase() == name.toLowerCase()
	});
	if(data.length!=0){
		if(data[0].other){
			return data[0].other.Money;
		}else{
			return 0.00;
		};
	}else{
		return 0.00;
	};
}
/*乘法*/
const _accMul=function(arg1, arg2) { //乘法
	
	if(arg1 == 0 || !arg1){
		return "0";
	};
	if(arg2 == 0 || !arg2){
		return "0";
	};
	arg1=Number(arg1);
	arg2=Number(arg2);
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch(e) {}
	try {
		m += s2.split(".")[1].length
	} catch(e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
export default {
	get_All,
	get_coinPrice,
	getUsdt,
	getCny,
	getMoney,
	_accMul
}
