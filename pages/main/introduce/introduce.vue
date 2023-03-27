<template>
	<view class="mainIntroduce">
		<background class='background'></background>
	</view>
</template>

<script>
	import background from '../../../components/background/background.vue'
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
			
		}
	}
</script>

<style lang="scss" scoped>
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
	}
	
</style>