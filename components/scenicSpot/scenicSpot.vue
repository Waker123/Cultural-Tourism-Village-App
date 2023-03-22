<template>
	<view class="chooseBox">
		<p @click="changeScenicSpotShow">点击切换当前所选景点：<span>{{currentScenicSpot}}</span></p>
		<!-- 选择器 -->
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default{
		name:'scenicSpot',
		data(){
			return{
			}
		},
		computed:{
			...mapState("changeScenicSpot",['currentScenicSpot','scenicSpotShow']),
		},
		methods:{
			changeScenicSpotShow(){
				this.$store.commit('changeScenicSpot/changeScenicSpotShow',true);
			}
		}
	}
</script>

<style lang="scss" scoped>
		.chooseBox{
			width: 700rpx;
			height: 100rpx;
			background-color: rgba(255, 255, 255, .8);
			border: 4rpx solid rgba(255, 255, 255, .8);
			border-radius: 30rpx;
			line-height: 100rpx;
			font-family: "yuan";
			font-size: 40rpx;
			p{
				margin-left: 70rpx;
				font-weight: 500;
				span{
					display: inline-block;
					// text-decoration: underline;
					font-size: 60rpx;
					font-weight: 700;
				}
			}
		}
</style>