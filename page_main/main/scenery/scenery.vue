<template>
<!-- 乡村美景界面 -->
	<view class="sceneryMain">
		<scroll-view  v-show="true"  scroll-y="true" class="scroll-L" >
			<view class="card" v-for="(item,index) in sceneryLeft" :key="item.id">
				<image :src="item.imgSrc" mode="widthFix">
			</view>
		</scroll-view>
		<scroll-view  v-show="true"  scroll-y="true" class="scroll-R" >
			<view class="card">
				<view class="card" v-for="(item,index) in sceneryRight" :key="item.id">
					<image :src="item.imgSrc" mode="widthFix">
				</view>
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
	export default{
		name:"scenery",
		data(){
			return{
				sceneryLeft:[],
				sceneryRight:[],
			}
		},
		computed:{
			...mapState('changeScenicSpot',['currentScenicSpot','scenicSpotScenery']),
		},
		methods:{
			getToIndex(){
				uni.switchTab({
					url:"../../../pages/index/index"					
				})
			}
		},
		mounted() {
			this.sceneryLeft = this.scenicSpotScenery.slice(0,this.scenicSpotScenery.length/2);
			this.sceneryRight = this.scenicSpotScenery.slice(this.scenicSpotScenery.length/2);
		}
		
	}
</script>

<style lang="scss" scoped>
	.sceneryMain{
		position: relative;
		width: 750rpx;
		height: 1200rpx;
		 background-image: linear-gradient(to bottom right, #ebbba7 0%, #cfc7f8 100%);
		.scroll-L{
			position: absolute;
			left: 5%;
			top: 2%;
			width: 350rpx;
			height: 1150rpx;
			.card{
				display: inline-block;
				width: 300rpx;
				height: auto;
				text-align: center;
				background-color: rgba(255, 255, 255, .2);
				box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(0, 0, 0, .2);
				margin: 50rpx 0;
				image{
					width: 300rpx;
				}
				
			}
		}
		.scroll-R{
			position: absolute;
			left: 55%;
			top: 2%;
			width: 350rpx;
			height: 1150rpx;
			.card{
				display: inline-block;
				width: 300rpx;
				text-align: center;
				background-color: rgba(255, 255, 255, .2);
				box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(0, 0, 0, .2);
				margin: 50rpx 0;
				image{
					width: 300rpx;
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