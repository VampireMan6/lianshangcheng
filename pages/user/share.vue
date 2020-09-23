<template>
	<view class="box">
		<view class="pt-10 pl-10 pr-10">
			<view class="pic-content">
				<view class="pic-cont" v-for="(item,index) in bgImgs" :key="index" @tap="previewImage(index)" :class="{'content':index==1}">
					<image  mode="widthFix" :src="item.image" @tap="previewImage(index)"></image>
					<radio color="#E52321" :checked="current==index" :value="index" @click="current=index"></radio>
					<view class="flex-center flex-j-center" :class="{'qrcode1':item.module==2,'qrcode2':item.module==1}">
						<tki-qrcode ref="qrcode"
							:val="address" :size="70" 
							background="#fff" foreground="#000" pdground="#000" 
							:onval="true" :loadMake="true" 
							:show="true" unit="px">
						</tki-qrcode>
					</view>
				</view>
			</view>
		</view>
		<view class="pt-20 pb-15 pl-15 pr-15">
			<view class="text-content">
				<view class="text font-gray newlines" v-text="text">这里后台配置的文字，固定的文字管理人自己写。（后台富文本编辑框）</view>
				<view class="btn-cont mt-20 flex-center flex-j-end">
					<view class="btn font-12 font-light-gray text-center" @click="app._copy(text)">复制文案</view>
				</view>
			</view>
		</view>
		<view class="bottom-cont flex-center flex-j-around bc-white">
			<view class="cont text-center" @click="set_share()">
				<image src="../../static/img/74d8fa6f6706ddb06c1ad7dd5a382a9.png"></image>
				<view class="font-12 pt-10">分享海报</view>
			</view>
			<view class="cont text-center" @click="saveImg()">
				<image src="../../static/img/3706ab14862f227af9fbd8458dc0608.png"></image>
				<view class="font-12 pt-10">保存图片</view>
			</view>
		</view>
		<!-- <tki-qrcode ref="qrcode" 
			:val="'https://registered.eashealth.com?InviteCode='+ userInfo.mobile" 
			:size="300" 
			background="#fff" 
			foreground="#000" 
			pdground="#000" 
			:onval="true" 
			:loadMake="true" 
			:showLoading="false" 
			:show="false" 
			unit="upx" 
		</tki-qrcode> -->
	</view>
</template>

<script>
	import config from "@/common/js/config.js"
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import SimpleCanvas from '@/common/js/SimpleCanvas.js';
	// import html2canvas from "@/common/js/html2canvas.min.js";
	// import canvas2image from "@/common/js/canvas2image.js";
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				bgImgs: [],
				text:"加油加油",
				current:0,
				address:"",
			}
		},
		onLoad() {
			var self=this;
			self.address=self.userInfo.mobile;
			self.getInfo();
		},
		computed:{
			...mapState(["hasLogin",'userInfo']),
		},
		methods: {
			getInfo:function(){
				var self=this;
				uni.showNavigationBarLoading();
				uni.request({
					url: config.api_service + "/get.share.info",
					data: {},
					method: "get",
					header: {Authorization: config.getToken()},
					success: res => {
						// console.log(JSON.stringify(res));
						uni.hideNavigationBarLoading();
						if (res.data.code == 200) {
							self.bgImgs=res.data.data.share_posters_background;
							self.text=res.data.data.share_posters_copywriting;
						}else{
							console.log(JSON.stringify(res));
							self.app._toast(res.data.message);
						};
					},
					fail: (res) => {
						uni.hideNavigationBarLoading();
						if(res.errMsg == 'request:fail timeout'){
							console.log("请求超时了");
						};
						console.log(JSON.stringify(res));
					},
					complete: (res) => {}
				});
			},
			saveImg:function(){
				var self=this;
				return;
					var pages = getCurrentPages();  
					var page = pages[pages.length - 1];  
					var bitmap=null;  
					var currentWebview = page.$getAppWebview();    
					bitmap = new plus.nativeObj.Bitmap('text-content');  
					console.log(bitmap);
					// 将webview内容绘制到Bitmap对象中  
					currentWebview.draw(bitmap,function(){  
					    console.log('截屏绘制图片成功');  
					    bitmap.save( "_doc/a.jpg"  
					    ,{}  
					    ,function(i){  
					        console.log('保存图片成功：'+JSON.stringify(i));  	
					        uni.saveImageToPhotosAlbum({  
					            filePath: i.target,  
					            success: function () {  
					                bitmap.clear(); //销毁Bitmap图片  
					                uni.showToast({  
					                    title: '保存图片成功',  
					                    mask: false,  
					                    duration: 1500  
					                });  
					            }  
					        });
							// //分享
							// uni.share({
							//     // provider: "weixin",
							//     // scene: "WXSceneSession",
							// 	provider: name,
							// 	scene: type,
							//     type: 2,
							//     imageUrl: i.target,
							//     success: function (res) {
							//         console.log("success:" + JSON.stringify(res));
							//     },
							//     fail: function (err) {
							//         console.log("fail:" + JSON.stringify(err));
							//     }
							// });
					    }  
					    ,function(e){  
					        console.log('保存图片失败：'+JSON.stringify(e));
					    });  
					},function(e){  
					    console.log('截屏绘制图片失败：'+JSON.stringify(e));
					});  
				
				// uni.saveImageToPhotosAlbum({
				// 	filePath: this.bgImgs[this.current],  
				// 	success: (suc) => {
				// 		self.app._toast("图片保存成功");
				// 	},
				// 	fail: () => {
				// 		self.app._toast("图片保存失败");
				// 	}
				// })
			},
			saveImg2:function(){
				var self=this;
				// save(name,type){
				// 	let self = this;
				// 	var pages = getCurrentPages();  
				// 	var page = pages[pages.length - 1];  
				// 	var bitmap=null;  
				// 	var currentWebview = page.$getAppWebview();    
				// 	bitmap = new plus.nativeObj.Bitmap('amway_img');  
				// 	// 将webview内容绘制到Bitmap对象中  
				// 	currentWebview.draw(bitmap,function(){  
				// 	    console.log('截屏绘制图片成功');  
				// 	    bitmap.save( "_doc/a.jpg"  
				// 	    ,{}  
				// 	    ,function(i){  
				// 	        console.log('保存图片成功：'+JSON.stringify(i));  	
				// 	        uni.saveImageToPhotosAlbum({  
				// 	            filePath: i.target,  
				// 	            success: function () {  
				// 	                bitmap.clear(); //销毁Bitmap图片  
				// 	                uni.showToast({  
				// 	                    title: '保存图片成功',  
				// 	                    mask: false,  
				// 	                    duration: 1500  
				// 	                });  
				// 	            }  
				// 	        });
				// 			// //分享
				// 			// uni.share({
				// 			//     // provider: "weixin",
				// 			//     // scene: "WXSceneSession",
				// 			// 	provider: name,
				// 			// 	scene: type,
				// 			//     type: 2,
				// 			//     imageUrl: i.target,
				// 			//     success: function (res) {
				// 			//         console.log("success:" + JSON.stringify(res));
				// 			//     },
				// 			//     fail: function (err) {
				// 			//         console.log("fail:" + JSON.stringify(err));
				// 			//     }
				// 			// });
				// 	    }  
				// 	    ,function(e){  
				// 	        console.log('保存图片失败：'+JSON.stringify(e));
				// 	    });  
				// 	},function(e){  
				// 	    console.log('截屏绘制图片失败：'+JSON.stringify(e));
				// 	});  
				// }
				// uni.saveImageToPhotosAlbum({
				// 	filePath: this.bgImgs[this.current],  
				// 	success: (suc) => {
				// 		self.app._toast("图片保存成功");
				// 	},
				// 	fail: () => {
				// 		self.app._toast("图片保存失败");
				// 	}
				// })
			},
			set_share:function(){
				var self=this;
			}
		}
	}
</script>

<style>
	.box{padding-bottom: 120px;}
	/* .pic-content{width: 100%;height: 320px;position: relative;z-index: 3;white-space: nowrap;overflow-y: auto;} */
	.pic-content{width: 100%;position: relative;z-index: 3;white-space: nowrap;overflow-y: auto;}
	.pic-content .pic-cont{width: 65%;height: 100%;position: relative;overflow: hidden;border-radius: 8px;display: inline-block;margin: 0px 10px;}
	/* .pic-content .pic-cont image{width: 100%;height: 100%;} */
	.pic-content .pic-cont image{width: 100%;}
	.pic-content .pic-cont radio{position: absolute;bottom: 30px;right: 20px;z-index: 1;}
	.qrcode1{position: absolute;left: 15px;bottom: 30px;z-index: 3;width: 80px;height: 80px;border-radius: 5px;background-color: #FFFFFF;}
	.qrcode2{position: absolute;left: calc(50% - 40px);bottom: calc(50% - 40px);z-index: 3;width: 80px;height: 80px;border-radius: 5px;background-color: #FFFFFF;}
	
	
	.text-content{width: 100%;box-shadow: 1px 1px 6px #E9E8E8;padding: 16px;position: relative;}
	.text-content .btn-cont{width: 100%;position: relative;}
	.text-content .btn-cont::after{position: absolute;top: 11px;left: 0px;height: 1px;width: calc(100% - 80px);background-color: #FBF9FC;content: "";}
	.text-content .btn-cont .btn{width: 70px;height: 22px;line-height: 22px;background-color: #F7F4F8;border-radius: 3px;}
	.bottom-cont{width: 100%;height: 120px;position: fixed;bottom: 0px;left: 0px;z-index: 20;}
	.bottom-cont .cont{}
	.bottom-cont .cont image{width: 40px;height: 40px;}
	uni-radio .uni-radio-input{width: 20px;height: 20px;}
	uni-radio .uni-radio-input.uni-radio-input-checked:before{font-size: 18px;}
</style>
