<template>
	<view class="countryMain">
		<scroll-view  scroll-y="true" class="scroll-Y" >
				<view class="card">
					<span class='title'>{{title}}</span>
					<br>
					<br>
					<text class='content'>{{content}}</text>
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
	import {mapState} from 'vuex'
	export default{
		name:'countryTourContent',
		data(){
			return{
				title:'',
				content:'',
				imageSrc:[]
			}
		},
		computed:{
			...mapState('changeScenicSpot',['currentScenicSpot'])
		},
		methods:{
			getToIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},
		onLoad(option) {
			this.title = option.title;
			this.content = option.content;
		}
	}
</script>

<style lang="scss" scoped>
	.countryMain{
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
				.title{
					font-weight: 700;
					font-size: 50rpx;
					margin: 20rpx 0 0 50rpx;
				}
				.content{
					font-weight: 500;
					font-size: 32rpx;
				}
				image{
					width: 450rpx;
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