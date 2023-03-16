<template>
	<view class="mask_main" @click="goToIndex">
		<u-transition :show="show" mode="fade-right" duration=1500>
		    <view class="transition titleOne">
				<P>Welcome to</P>
			</view>
			<view class="transition titleTwo">
				<p>Waker's Blog</p>
			</view>
		</u-transition>
		<u-transition :show="show" mode="fade" duration=1500>
		    <view class="transition ">
				<image class="maskImageOne" src="../../static/image/cloud.gif" lazy-load='true'></image>
			</view>
			<view class="transition maskText">
				<p>Click to pass</p>
			</view>
			<view class="transition maskImageTwo">
				<image  src="../../static/image/win.gif" lazy-load="true"></image>
			</view>
		</u-transition>
	</view>
</template>

<script>
	export default{
		name:'myMask',
		data(){
			return{
				show:false,
			}
		},
		methods:{
			goToIndex(){
				this.show = false;
				setTimeout(()=>{
					uni.switchTab({
						url: '../index/index'
					});
				},1300)
				
			}
		},
		onReady() {
			this.show= true;
		}
	}
</script>

<style lang="scss" scoped>

	.mask_main{
		width: 100vw;
		height: 100vh;

		.maskImageOne{
			margin-left: 50rpx;
		}
		.titleOne,.titleTwo,.maskText{
			font-family: 'yuan';
			font-size: 45rpx;
			font-weight: 700;
			opacity: .7;
		}
		.titleOne{
			margin:10rpx 0 0 60rpx;
		}
		.titleTwo{
			margin:10rpx 0 0 200rpx;
		}
		.maskText{
			font-size: 40rpx;
			margin: 10rpx 0 0 400rpx;
			
		}
	}
	
</style>