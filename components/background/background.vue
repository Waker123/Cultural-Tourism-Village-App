<template>
	<view class="mainBackground">
		<u-transition :show="currentScenicSpot===scenicSpot[3]" mode="fade">
			<view class="transition background backgroundOne"></view>
		</u-transition>
		<u-transition :show="currentScenicSpot===scenicSpot[1]" mode="fade">
			<view class="transition background backgroundTwo"></view>
		</u-transition>
		<u-transition :show="currentScenicSpot===scenicSpot[2]" mode="fade">
			<view class="transition background backgroundThree"></view>
		</u-transition>
		<u-transition :show="currentScenicSpot===scenicSpot[0]" mode="fade">
			<view class="transition background backgroundFour"></view>
		</u-transition>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import {getScenicSpotName} from '../../api/scenicSpotApi.js'
	export default {
		name:'background',
		data(){
			return{
				scenicSpot:[],
			}
		},
		computed:{
			...mapState('changeScenicSpot',["currentScenicSpot"])
		},
		methods:{
			getScenicName(){
					uni.showLoading({
						title:"加载中",
					});
					 getScenicSpotName().then((res) => {
					  this.scenicSpot = res.data
					  uni.hideLoading(); // 关闭加载中弹框
					}).catch((err) => {
					  console.log(err); 
					});
				}
		},
		created() {
			this.getScenicName();
		}
	}
</script>

<style lang="scss" scoped>
	.mainBackground{
		width: 750rpx;
		height: 1200rpx;
		.background{
			width: 750rpx;
			height: 1200rpx;
		}
		.backgroundOne{
			background:url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F54993940%2F839692fa1f603320f4f3ad979b771222.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNTQ5OTM5NDAvODM5NjkyZmExZjYwMzMyMGY0ZjNhZDk3OWI3NzEyMjIuanBn%2Fsign%2Fa43cb61d45ece52434a3797c0406ba54.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683882634&t=02e3f7264fe7f5b808d98e2261fff5aa') no-repeat;
			background-size: 750rpx 1200rpx;
		}
		.backgroundTwo{
			background:url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F54993940%2F839692fa1f603320f4f3ad979b771222.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNTQ5OTM5NDAvODM5NjkyZmExZjYwMzMyMGY0ZjNhZDk3OWI3NzEyMjIuanBn%2Fsign%2Fa43cb61d45ece52434a3797c0406ba54.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683882634&t=02e3f7264fe7f5b808d98e2261fff5aa') no-repeat;
			background-size: 750rpx 1200rpx;
		}
		.backgroundThree{
			background:url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F54993940%2F839692fa1f603320f4f3ad979b771222.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNTQ5OTM5NDAvODM5NjkyZmExZjYwMzMyMGY0ZjNhZDk3OWI3NzEyMjIuanBn%2Fsign%2Fa43cb61d45ece52434a3797c0406ba54.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683882634&t=02e3f7264fe7f5b808d98e2261fff5aa') no-repeat;
			background-size:750rpx 1200rpx;
		}
		.backgroundFour{
			background:url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F54993940%2F839692fa1f603320f4f3ad979b771222.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNTQ5OTM5NDAvODM5NjkyZmExZjYwMzMyMGY0ZjNhZDk3OWI3NzEyMjIuanBn%2Fsign%2Fa43cb61d45ece52434a3797c0406ba54.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683882634&t=02e3f7264fe7f5b808d98e2261fff5aa') no-repeat;
			background-size:750rpx 1200rpx;
		}
		

		
	}
	
</style>