import config from "@/common/js/config.js"

const check = function(change,type) {
	change =change||function(){};
	plus.runtime.getProperty(plus.runtime.appid, function(info) {
		uni.request({
			url: config.api_service + "/get.latest.version?version=" + info.version,
			data: {},
			method: "get",
			success: res => {
				// console.log(JSON.stringify(res));
				// must_update 是否强制更新
				// need_install 是否需要更新
				// re_install 重新下载安装
				if (res.data.code == 200) {
					if(res.data.data.re_install==1){
						var buttons = ["确定"];
						let url=res.data.data.download_url_android;
						if(plus.os.name.toLowerCase() == "ios") {
							url=res.data.data.download_url_ios;
						}
						plus.nativeUI.confirm(res.data.data.update_tip, function(ev) {
							if (ev.index == 0) {
								plus.runtime.openURL(url);
							};
						}, "发现新版马上重新安装更新", buttons);
						return;
					}
					if(res.data.data.need_install==1){
						var buttons = ["更新", "取消"];
						if (res.data.data.must_update==1) {
							buttons = ["更新"];
						};
						plus.nativeUI.confirm(res.data.data.update_tip, function(ev) {
							if (ev.index == 0) {
								install(res.data, change);
							};
						}, "发现新版,是否立即更新", buttons);
					}else{
						if(type){
							uni.showToast({
								icon: 'none',
								title: "你已是最新版本，无需更新",
								duration: 2000
							});
						}
					}
				}else{
					console.log(JSON.stringify(res));
				};
			},
			fail: (res) => {
				if(res.errMsg == 'request:fail timeout'){
					console.log("请求超时了");
				};
				console.log(JSON.stringify(res));
			},
			complete: (res) => {}
		});
	});
}
const install = function(item, change) {
	plus.nativeUI.showWaiting("更新中...");
	let url = item.data.download_url_android;
	if(plus.os.name.toLowerCase() == "ios") {
		url = item.data.download_url_ios;
		if(item.data.NeedInstall) {
			plus.runtime.openURL(url, function() {
				uni.showToast({
					icon: 'none',
					title: "启动外部浏览器错误",
					duration: time?time:2000
				});
			});
			return;
		}
	}
	var dtask = plus.downloader.createDownload(url, {},function(d, status) {
		if(status == 200) {
			plus.nativeUI.closeWaiting();
			// Page.toast("正在准备环境，请稍后！");
			setTimeout(function() {
				var path = d.filename; //下载apk
				plus.runtime.install(path, {
					force: true
				}, function() {
					plus.nativeUI.alert("更新成功,将重启", function() {
						plus.runtime.restart();
					});
				}, function(ttt) {
					uni.showToast({
						icon: 'none',
						title: "更新失败",
						duration: time?time:2000
					});
				});
			}, 100);
		} else {
			plus.nativeUI.alert('资源包下载失败:' + status);
		}
	});

	dtask.addEventListener("statechanged", function(download, status) {
		if(change) {
			if(download.downloadedSize < download.totalSize) {
				let perfect = (download.downloadedSize * 100) / download.totalSize;
				change(perfect);
			} else {
				change(100);
			}
		}
	});
	dtask.start();
};

export default{
	check
}