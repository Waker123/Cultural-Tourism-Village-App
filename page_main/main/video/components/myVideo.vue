<template>
	<view class="myVideo">
		<video class="video" :src="videoSrc"  :title="videoTitle" crossOrigin="Anonymous" :autoplay='false' :controls="true" :page-gesture='true' :enable-play-gesture="true"></video>
		<!-- 官方说明 https://uniapp.dcloud.net.cn/component/video.html -->
	</view>
</template>

<script>
	export default{
		name:'myVideo',
		data(){
			return{
				videoSrc:this.src,
				videoTitle:this.title
			}
		},
		props:{
			src:{
				type:String,
				required:true
			},
			title:{
				type:String,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myVideo{
		width: 600rpx;
		height: 450rpx;
		.video{
			width: 100%;
			height: 100%;
		}
	}
	/* #ifdef MP-WEIXIN */
	
	/* #endif */
</style>