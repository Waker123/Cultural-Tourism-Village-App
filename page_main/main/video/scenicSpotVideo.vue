<template>
	<view class="videoMain">
		<scroll-view  v-show="true"  scroll-y="true" class="scroll-Y" >
				<view class="card"  v-for="(item, index) in scenicSpotVideos" :key="item.id">
					<span class="title">{{item.title}}</span>
					<my-video class="myVideo" :src='item.videoSrc' :title='item.title'></my-video>
				</view>
		</scroll-view>
		<u-popup :show="!currentScenicSpot" mode="center">
			<view class="popBox" v-if="!currentScenicSpot">
				<span>请先选择景点</span>
				<button size="mini" @click="getToIndex">前往首页</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import myVideo from './components/myVideo.vue'
	export default{
		name:"scenicSpotVideo",
		components:{myVideo},
		data(){
			return{
				
			}
		},
		computed:{
			...mapState('changeScenicSpot',['currentScenicSpot','scenicSpotVideos']),
		},
		methods:{
			getToIndex(){
				uni.switchTab({
					url:"../../../pages/index/index"					
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.videoMain{
		position: relative;
		width: 750rpx;
		height: 1200rpx;
		 background-image: linear-gradient(to bottom right, #ebbba7 0%, #cfc7f8 100%);
		 
		 .scroll-Y{
		 	height: 1200rpx;
		 	.card{
				position: relative;
		 		width: 700rpx;
		 		height: 700rpx;
		 		background-color: rgba(0, 0, 0, .2);
				border-radius: 10rpx;
		 		margin: 50rpx auto;
				.title,.myVideo{
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
				}
				.title{
					top:80%;
					width: 600rpx;
					font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
					font-size: 32rpx;
				}
				.myVideo{
					top: 10%;
				}
		 	}
		 }
		 
		 .popBox{
		 	position: relative;
		 	width: 400rpx;
		 	height: 250rpx;
		 	background-color: rgba(255, 255, 255, .8);
		 	border: 4rpx solid rgba(255, 255, 255, .8);
		 	border-radius: 20%;
		 	span{
		 		position: absolute;
		 		top: 10%;
		 		left: 50%;
		 		width: 350rpx;
		 		transform: translateX(-45%);
		 		font-size: 50rpx;
		 	}
		 	button{
		 		position: absolute;
		 		top: 60%;
		 		left: 50%;
		 		transform: translateX(-50%);
		 		padding: 10rpx 15rpx;
		 	}
		 }
		 
	}
	
	
	/* #ifdef MP-WEIXIN */
	.scroll-Y{
		height: 1200rpx;
	}
	.card{
		position: relative;
		width: 700rpx;
		height: 700rpx;
		background-color: rgba(0, 0, 0, .2);
		border-radius: 10rpx;
		margin: 50rpx auto;
		
	}
	.title,.myVideo{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	.title{
		top:80%;
		width: 600rpx;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
		font-size: 32rpx;
	}
	.myVideo{
		top: 10%;
	}
	/* #endif */
</style>