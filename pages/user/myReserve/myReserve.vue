<template>
	<view class="myReserve">
		<scroll-view  v-show="true"  scroll-y="true" class="scroll-Y">
			<view class="card"  v-for="(item, index) in scenicSpot" :key="index"  v-show="scenicSpot">
				<p>{{item}}</p>
				<!-- <img :src="item.imgSrc">
				<view class="homestayContent">
					<span class="title">{{item.name}}</span>
					<span class='grade'>{{item.grade}}</span>
					<span class="describe">--{{item.describe}}</span>
					<span class="distance">距离景区{{item.distance}}</span>
					<span class="position">{{item.position}}</span>
					<span class="price">{{item.price}}</span>
				</view> -->
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {getScenicSpotName} from '../../../api/scenicSpotApi.js'
	export default{
		name:'myReserve',
		data(){
			return{
				scenicSpot:[],
			}
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
			},
		},
		mounted() {
			this.getScenicName();
		}
	}
</script>

<style lang="scss" scoped>
	.myReserve{
		width: 100vw;
		/* #ifdef H5 */
		height: 100vh;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 120vh;
		/* #endif */
		background-image: linear-gradient(to bottom left, #fa709a 0%, #fee140 100%);
		z-index: -1;
		.scroll-Y{
			height: 1200rpx;
			padding: 50rpx 8rpx;
			.card{
				display: flex;
				width: 725rpx;
				height: 300rpx;
				background-color: #F0F0F0;
				border-radius: 10rpx;
				margin: 50rpx 0;
				box-shadow: 15rpx 15rpx 15rpx 15rpx rgba(0, 0, 0, .2);
			}
		}
	}
</style>