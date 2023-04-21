<template>
	<view class="liveMain">
		<view class="card">
			<span class="title">{{currentScenicSpot}}的活动直播间</span>
			<view class="liveBox">
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:"liveStreaming",
		data(){
			return{
				
			}
		},
		computed:{
			...mapState('changeScenicSpot',['currentScenicSpot'])
		}
		
	}
</script>

<style lang="scss" scoped>
	.liveMain{
		position: relative;
		width: 750rpx;
		height: 1200rpx;
		background: linear-gradient(to right bottom, #f6d365 0%, #fda085 100%);
		.card{
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;
			top: 15%;
			left: 50%;
			transform: translateX(-50%);
			width: 550rpx;
			height: 700rpx;
			background-color: rgba(255, 255, 255, .6);
			border-radius: 50rpx;
			.title{
				font-weight: 700;
				font-size: 40rpx;
				margin: 50rpx 0 80rpx 0;
			}
			.liveBox{
				width: 350rpx;
				height: 400rpx;
				background-color: black;
			}
		}
	}
</style>