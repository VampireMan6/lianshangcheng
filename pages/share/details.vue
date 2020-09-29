<template>
	<view class="content1">
		<block>
			<scroll-view scroll-x="">
				<radio-group @change="onGroupChange">
					<view class="share-wrap">
						<view class="share-item" v-for="(item,index) in hbImgs" :key="index">
							<label class="check"><radio :value="index" :checked="index == current"/></label>
							<image :src="item" @tap="previewImage(index)"></image>
						</view>
					</view>
				</radio-group>
			</scroll-view>
			<view class="text-wrap">
				<textarea v-model="text"></textarea>
				<view class="copy-wrap" @tap.stop="copy">
					<text class="color_hoar">复制文案</text>
				</view>
			</view>			 
			<view class="footer">
				<view @tap="share">
					<view class="image-wrap"><image src="../../static/img/74d8fa6f6706ddb06c1ad7dd5a382a9.png"></image></view>
					<view>分享海报</view>
				</view>
				<view @tap="save">
					<view class="image-wrap save"><image src="../../static/img/3706ab14862f227af9fbd8458dc0608.png"></image></view>
					<view>保存图片</view>
				</view>
			</view>
		</block>
		<!-- <tki-qrcode ref="qrcode" :val="'https://h5.atbpt.com?InviteCode='+ userInfo.code" 
		:size="300" background="#fff" foreground="#000" pdground="#000" :onval="true"
		 :loadMake="true" :showLoading="false"  
		 :show="false" unit="upx" 
		 @result="resultQrCode"></tki-qrcode> -->
		<block v-for="(item,index) in bgImgs" :key="index">
			<canvas :canvas-id="'canvas' + index" class="canvas"></canvas>
		</block>
	</view>
</template>

<script>
	// import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import SimpleCanvas from '@/common/js/SimpleCanvas.js';
	import QR from "@/common/js/wxqrcode.js"
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			// tkiQrcode
		},
		computed:{
			...mapState(["hasLogin",'userInfo']),
		},
		data() {
			return {
				qrCodeImageSrc: '',
				bgImgs: [],
				text: '',
				hbImgs: [],
				current: 0,
			}
		},
		onLoad(){	
			let data = uni.getStorageSync('shareinfo');
			this.text = data.share_posters_copywriting;
			this.bgImgs = data.share_posters_background;
			uni.showNavigationBarLoading();
			// uni.showToast({
			// 	title: '海报生成中，请稍等...',
			// 	icon: 'none',
			// 	mask: true
			// })
		},
		onReady() {
			this.resultQrCode();
		},
		methods: {
			previewImage(index){
				uni.previewImage({
					current: index,
					urls: this.hbImgs
				});
			},
			onGroupChange(e) {
				this.current = e.target.value;
			},
			resultQrCode(qrcode) {
				// this.qrCodeImageSrc = qrcode;
				this.bgImgs.forEach((item,index) => {
					this.getImage(item,index);
				});
			},
			getImage(item,index){
				let phoneData = uni.getSystemInfoSync();
				let phoneH = phoneData.windowHeight;
				let phoneW = phoneData.windowWidth;
				let self = this;
				let canvas = new SimpleCanvas({
					scale: 1,
					canvasId: 'canvas' + index
				}); 
				let top = 0, left = 0;
				if(item.module == 1){
					top = (phoneH / 2 - 70);
					left = ((phoneW - 150) / 2);
				}else{
					// top = (phoneH - 150 - 60);
					// left = 20;
					top = (phoneH - 260);
					left = 60;
				}
				canvas.createArtboard({// 创建画板
					id: 'share',
					backgroundColor: '#ffffff',
					width: phoneW,
					height: phoneH
				}).drawImage({
				    id: 'bg',
				    path: item.image,
					top: 0,
				    left: 0,
				    width: phoneW,
					height: phoneH
				}).createCircleRectangle({
				    id: 'ercodeWrap',
				    backgroundColor: '#ffffff',
				    width: 140,
				    height: 140,
					borderRadius: 12,
					left: left,
					top: top
				})
				.drawImage({
				    id: 'ercode',
				    // path: self.qrCodeImageSrc,
				    path: QR.createQrCodeImg('https://h5.atbpt.com?InviteCode=' + self.userInfo.code, { size: parseInt(125) }),
				    width: 125,
					height: 125,
					referLayer: {
						id: 'ercodeWrap',
						top: -132,
						left: -132
					}
				})
				.createCircleRectangle({
				    id: 'textWrap',
				    backgroundColor: 'rgba(0,0,0,0.3)',
				    width: 170,
				    height: 25,
					borderRadius: 12,
					left: 10,
					top: (phoneH - 50)
				}).drawCircleImage({
					id: 'avatar',
					path: '/static/img/toux.png',
					left: 12,
					d: 20,
					referLayer: {
						id: 'textWrap',
						top: -23
					}
				}).drawWrapText({
					id: 'text',
					fontSize: 12,
					text: '来自'+ self.userInfo.username +'的推荐',
					lineHeight: 12,
					color: '#ffffff',
					// 位置参照
					referLayer: {
					  id: 'avatar',
					  left: 5,
					  top: -17
					}
				}).draw(() => {
					uni.canvasToTempFilePath({
						canvasId: 'canvas' + index,
						success: (success) => {
							self.hbImgs.push(success.tempFilePath);
							if(self.hbImgs.length == self.bgImgs.length){
								uni.hideNavigationBarLoading();
								// uni.hideLoading();
							}
						},
						fail() {}
					})
				});
			},
			copy(){
				uni.setClipboardData({
				    data: this.text,
				    success: () => {
						this.app._toastIcon('复制成功');
				    }
				});
			},
			share(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 2,
				    imageUrl: this.hbImgs[this.current],
				    success: function (res) {
				        // console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			save(){
				uni.saveImageToPhotosAlbum({  //保存图片
					filePath: this.hbImgs[this.current],  
					success: (suc) => {
						this.app._toastIcon('图片保存成功');
					},
					fail: () => {
						this.app._toastIcon('图片保存失败');
					}
				})
			}
		}
	}
</script>

<style>
	page,.content1{height: 100%;}
	.content1{padding: 32upx 0 32upx 32upx;display: flex;flex-direction: column;}
	.share-wrap{white-space: nowrap;height: 660upx;}
	.share-item{display: inline-block;width: 360upx;height: 660upx;position: relative;border-radius: 16upx;overflow: hidden;margin-right: 32upx;}
	.share-item image{width: 100%;height: 100%;position: relative;z-index: 5;}
	.share-item .check{position: absolute;top: 10upx;right: 10upx;z-index: 9;width: 160upx;height: 160upx;text-align: right;}
	.qrcode{width: 160upx;height: 160upx;position: absolute;z-index: 9;bottom: 140upx;left: 50%;margin-left: -80upx;border: 10upx solid rgba(0,0,0,0.3);}
	.qrcode image{width: 100%;height: 100%;}
	.userinfo{position: absolute;z-index: 9;bottom: 20upx;left: 20upx;background:rgba(0,0,0,0.3);border-radius: 80upx;color: #FFFFFF;font-size: 22upx;padding: 4upx 12upx 4upx 2upx;}
	.userinfo image{width: 30upx;height: 30upx;}
	.footer{width: 100%;display: flex;justify-content: space-around;text-align: center;margin-top: 60upx;position: relative;z-index: 9;}
	/* .footer image{width: 64upx;height: 64upx;} */
	.footer image{width: 100%;height: 100%;}
	.footer .image-wrap{width: 96upx;height: 96upx;background:linear-gradient(360deg,rgba(234,63,72,0.9) 0%,rgba(234,63,72,1) 100%);border-radius: 50%;display: flex;justify-content: center;align-items: center;margin-bottom: 20upx;}
	.footer .save{background:linear-gradient(270deg,rgba(0,145,255,1) 0%,rgba(50,197,255,1) 100%);}
	.text-wrap{margin-right: 32upx;margin-top: 40upx;flex: 1;border-bottom: 2upx solid #F2F1F8;position: relative;z-index: 9;}
	.text-wrap textarea{width: 100%;font-size: 28upx;height: 100%;}
	.text-wrap .copy-wrap{position: absolute;bottom: -26upx;right: 0;background-color: #F2F1F8;border-radius: 50upx;padding: 10upx 16upx;}
	.text-wrap .copy-wrap image{width: 30upx;height: 30upx;margin-right: 6upx;}
	.canvas{position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 2;opacity: 0;}
</style>
