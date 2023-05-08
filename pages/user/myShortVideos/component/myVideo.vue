<template>
	<view class="myVideo">
		<video id="myVideo" class="video" :src="videoSrc"   crossOrigin="Anonymous" :autoplay='false' :controls="true" :page-gesture='true' :enable-play-gesture="true"></video>
		<!-- 官方说明 https://uniapp.dcloud.net.cn/component/video.html -->
	</view>
</template>

<script>
	export default{
		name:'myVideo',
		data(){
			return{
				videoSrc:this.src,
			}
		},
		props:{
			src:{
				type:String,
				required:true
			},
		},
		// onShow() {
		// 	this.videoContext = uni.createVideoContext('myVideo');
		// 	this.videoContext.play()
		// },
		// onHide() {
		// 			this.videoContext.pause()
		// 	},
	}
</script>

<style lang="scss" scoped>
	.myVideo{
		width: 400rpx;
		height: 250rpx;
		.video{
			width: 100%;
			height: 100%;
		}
	}
	/* #ifdef MP-WEIXIN */
	
	/* #endif */
</style>