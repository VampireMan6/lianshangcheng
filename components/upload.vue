<template>
	<image @tap="_upload" v-bind:src="local" :style="{width:width+'px',height:height+'px'}"></image>
</template>

<script>
	import Page from "@/common/Page.js"
	import upload from "@/common/upload.js"
	export default {
		props: {
			default: {//默认图片
				type: String,
				default: ""
			},
			width:{//宽
				type: String,
				default: "100"
			},
			height:{//高
				type: String,
				default: "100"
			},
			img:{//返回的值   v-bind:img.sync = "img"
				type: String,
				default: "100"
			},
		},
		mounted:function  () {
			this.local = this.default;			
		},
		data() {
			return {
				local: "",
			};
		},
		methods: {
			_upload: function() {
				var self = this;
				upload.upload(function(key, url, domain) {
					self.local = key;
					//self.img = url;
					self.$emit("update:img",url);
				});
			}
		}
	}
</script>

<style>

</style>
