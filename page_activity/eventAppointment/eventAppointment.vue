<template>
	<!-- 活动预约 -->
	<view class="mainActivity">
		<scroll-view  v-show="true"  scroll-y="true" class="scroll-Y" >
				<view class="card"  v-for="(item, index) in scenicSpotActivity" :key="item.id" @tap="goToContent(item)">
					<span class="count">活动{{item.id}}</span>
					<br>
					<p class='title'>{{item.title}}</p>
					<br>
					<span class='dateTime'>{{item.dateTime}}</span>
				</view>
		</scroll-view>
		<u-popup :show="!currentScenicSpot || !userIsLoading" mode="center">
			<view class="popBox" v-if="!currentScenicSpot">
				<span>请先选择景点</span>
				<button size="mini" @click="getToIndex">前往首页</button>
			</view>
			<view class="popBox" v-if="!userIsLoading">
				<span>请先登录</span>
				<button size="mini" @click="getToLogin">去登录</button>
			</view>
		</u-popup>
<!-- 		<u-popup :show="reserveConfirmShow" mode="center">7tf
			<view class="popBox">
				<span class = 'notice'>确定要预定该民宿吗</span>
				<button class='confirm' size="mini" @tap="$u.throttle(confirm, 500)">确认</button>
				<button class='cancel' size="mini" @tap="$u.throttle(cancel, 500)">取消</button>
			</view>
		</u-popup> -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:"eventAppoinment",
		data(){
			return{
				
			}
		},
		computed:{
			...mapState("changeScenicSpot",['scenicSpotActivity','currentScenicSpot']),
			...mapState('userData',['userIsLoading',"userActivity"])
		},
		methods:{
			getToIndex(){
				uni.switchTab({
					url:'../../pages/index/index'
				})
			},
			getToLogin(){
				uni.navigateTo({
					url:'../../pages/login/login'
				})
			},
			goToContent(item){
				uni.navigateTo({
					url:`./content?title=${item.title}&content=${item.content}&scenicSpot=${item.scenicSpot}&dateTime=${item.dateTime}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainActivity{
		position: relative;
		width: 750rpx;
		height: 1200rpx;
		background-image: linear-gradient(to bottom right, #ebbba7 0%, #cfc7f8 100%);
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
				.count{
					font-weight: 700;
					font-size: 45rpx;
				}
				.title{
					font-weight: 500;
					font-size: 40rpx;
					margin: 30rpx 0 10rpx 0;
				}
				.dateTime{
					font-size: 32rpx;
					color: gray;
					float: right;
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