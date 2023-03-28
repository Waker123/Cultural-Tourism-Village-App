<template>
	<view class="mainIntroduce">
		<background class='background'></background>
		<scroll-view  v-show="scenicSpotIntroduce"  scroll-y="true" class="scroll-Y" >
				<view class="card" v-for="(item, index) in scenicSpotIntroduce"
						:key="index"
					>
					<h2 class='title'>{{item.title}}</h2>
					<p>{{item.content}}</p>
				</view>
		</scroll-view>
		<u-popup :show="!currentScenicSpot" mode="center">
			<view class="popBox">
				<span>请先选择景点</span>
				<button size="mini" @click="getToIndex">前往首页</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import background from '../../../components/background/background.vue'
	import {mapState} from 'vuex'
	export default{
		name:'scenicSpotIntroduce',
		components:{
			background
		},
		data(){
			return{
			}
		},
		computed:{
			...mapState('changeScenicSpot',['scenicSpotIntroduce','currentScenicSpot'])
		},
		methods:{
			getToIndex(){
				uni.switchTab({
					url:'../../index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	/* #ifdef H5*/
	.mainIntroduce{
		position: relative;
		width: 750rpx;
		height: 1200rpx;
		.background{
			position: absolute;
			z-index: -99;
		}
		.background{
			top: 0;
		}
		.scroll-Y{
			height: 1150rpx;
			.card{
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 500rpx;
				padding: 30rpx;
				margin: 30rpx auto;
				background-color: rgba(255, 255, 255, .5);
				border-radius: 50rpx;
				h2{
					font-family: 'yuan';
					margin-bottom: 10rpx;
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
				font-family: 'yuan';
				transform: translateX(-45%);
				font-size: 50rpx;
			}
			button{
				font-family: 'yuan';
				position: absolute;
				top: 60%;
				left: 50%;
				transform: translateX(-50%);
				padding: 10rpx 15rpx;
			}
		}
	}
	/* #endif */
	
	/* #ifdef MP-WEIXIN*/
	.mainIntroduce{
		position: relative;
		width: 750rpx;
		height: 1200rpx;
		.background{
			position: absolute;
			z-index: -99;
		}
		.background{
			top: 0;
		}
		.scroll-Y{
			height: 1150rpx;
			.card{
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 500rpx;
				padding: 30rpx;
				margin: 30rpx auto;
				background-color: rgba(255, 255, 255, .5);
				border-radius: 50rpx;
			}
		}
	}
	.title{
		font-size: 40rpx;
		font-weight: 700;
		font-family: 'yuan';
		margin-bottom: 10rpx;
	}
	/* #endif */
</style>