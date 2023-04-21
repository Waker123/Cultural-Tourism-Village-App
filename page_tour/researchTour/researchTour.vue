<template>
	<view class="researchTour">
		<scroll-view  v-show="true"  scroll-y="true" class="scroll-Y" >
			<view class="card" v-for="(item,index) in scenicSpotResearchTour" :key="item.id" @tap="goToResearchContent(item)">
				<span class='researchCount'>研学游记{{item.id}}:</span>
				<br>
				<p class="title">{{item.title}}</p>
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
	import {mapState} from 'vuex';
	export default{
		name:'researchTour',
		data(){
			return{
				
			}
		},
		computed:{
			...mapState('changeScenicSpot',['currentScenicSpot','scenicSpotResearchTour'])
		},
		methods:{
			getToIndex(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			goToResearchContent(item){
				uni.navigateTo({
					url:`./researchTourContent?title=${item.title}&content=${item.content}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.researchTour{
		width: 750rpx;
		height: 1200rpx;
		 background-image: linear-gradient(to bottom right, #ebbba7 0%, #cfc7f8 100%);
		 padding: 0;
		 .scroll-Y{
		 	width: 700rpx;
		 	height: 1150rpx;
			margin-left: 25rpx;
		 	.card{
		 		display: inline-block;
				box-sizing: content-box;
		 		width: 500rpx;
		 		height: auto;
		 		background-color: rgba(255, 255, 255, .2);
		 		box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(0, 0, 0, .2);
				border-radius: 10rpx;
		 		margin: 50rpx;
				padding: 50rpx;
				overflow: hidden;//清除浮动
		 		.researchCount{
					font-weight: 700;
					font-size: 40rpx;
				}
				.title{
					font-weight: 500;
					font-size: 50rpx;
					margin: 20rpx 0 0 50rpx;
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
</style>