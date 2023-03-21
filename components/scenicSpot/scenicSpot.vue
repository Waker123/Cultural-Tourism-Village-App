<template>
	<view class="mainScenicSpot">
		<view class="chooseBox">
			<p @click="show = true">点击切换当前所选景点：<span>{{currentScenicSpot}}</span></p>
			<!-- 选择器 -->
	
		</view>
		<view>
			<!-- 见uview选择器 https://www.uviewui.com/components/picker.html -->
			<u-picker :show="show" :columns="[scenicSpot]" title="请选择景点" @confirm="changeScenicSpot" @cancel ="show=false"></u-picker>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default{
		name:'scenicSpot',
		data(){
			return{
				show: false,
			}
		},
		computed:{
			...mapState("changeScenicSpot",["scenicSpot",'currentScenicSpot']),
		},
		methods:{
			changeScenicSpot(e){
				const {value} = e;//value是一个数组
				this.$store.commit('changeScenicSpot/changeScenicSpot',value[0]);
				this.show = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainScenicSpot{
		width: 100vw;
		height: 90vh;
		padding-left: 40rpx;
		.chooseBox{
			width: 700rpx;
			height: 100rpx;
			background-color: rgba(255, 255, 255, .6);
			border: 4rpx solid rgba(255, 255, 255, .5);
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
	}
</style>