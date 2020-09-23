<script>
	import update from "common/js/update.js"
	export default {
		onLaunch: function() {
			update.check();
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("common/css/base.css");
	@import url("common/css/iconfont.css");
	.tab-line{position: fixed;left: 0px;bottom: 0px;width: 100%;min-height: 1px;height: auto;z-index: 10;box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 1) !important;opacity: 0.6;}
	.plate-title{width: 100%;height: 16px;position: relative;padding-left: 10px;display: flex;align-items: center;}
	.plate-title::after{position: absolute;left: 0px;height: 16px;width: 4px;background-color: #1A2B5A;content: "";}
	uni-radio .uni-radio-input{width: 16px;height: 16px;}
	uni-radio .uni-radio-input.uni-radio-input-checked:before{font-size: 15px;}
	.winPopup{}
	.winPopup .payPass-content{width: 90%;border-radius: 5px;overflow: hidden;}
	.winPopup .payPass-content .pay-Input{width: 100%;height: 50px;border-bottom: 1px solid #CCCCCC;}
	.winPopup .payPass-content .pay-Input input{width: 100%;height: 100%;color: #333333;}
</style>