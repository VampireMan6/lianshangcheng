/** 上传
 */
const upload = function(data,success,error){
	uni.chooseImage({
		count: 1,
		success: function(res) {
			const tempFilePaths = res.tempFilePaths;
			const url='https://up-z'+data.region+'.qiniup.com';
			// const url = 'https://up-z0.qiniup.com';
			uni.showNavigationBarLoading();
			uni.uploadFile({
				url:url, //仅为示例，非真实的接口地址
				filePath: tempFilePaths[0],
				name: 'file',
				formData: {
					'token': data.token
				},
				success: (res) => {
					uni.hideNavigationBarLoading();
					if(res.statusCode == 200){
						let data = res.data;
						if (typeof data == "string") {
							data = JSON.parse(data);
							data.portrait=tempFilePaths[0]
							success(data);
						};
					}else{
						error("上传失败");
					};
				},
				fail: (err) => {
					uni.hideNavigationBarLoading();
					console.log(err)
				}
			});
		},
		error: function(e) {
			console.log(e);
		}
	});
}

export default {
	upload
}