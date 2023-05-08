<template>
	<view class="mainBody">
		<background class='background'></background>
		<content-box class='contentMain' v-show="currentScenicSpot"></content-box>
		<scenic-spot class='scenicSpot' v-show="currentScenicSpot"></scenic-spot>
		<choose-spot class='chooseSpot'></choose-spot>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import background from '../../components/background/background.vue' //背景组件
	import contentBox from '../../components/contentBox/contentBox.vue' //显示主要功能选项的组件
	import scenicSpot from '../../components/scenicSpot/scenicSpot.vue' //显示选择景点的组件
	import chooseSpot from '../../components/scenicSpot/chooseSpot.vue' //显示选择背景的组件
	export default {
		name:'index',
		components:{
			background,
			contentBox,
			scenicSpot,
			chooseSpot
		},
		computed:{
			...mapState("changeScenicSpot",['currentScenicSpot'])
		}
	}
</script>

<style lang="scss" scoped>
	.mainBody{
		position: relative;
		width: 750rpx;
		// height: 4864rpx;
		height: 1200rpx;
		.background{
			position: absolute;
			z-index: -99;
		}
		.background{
			top: 0;
		}

		.contentMain,.scenicSpot{
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
		.contentMain{
			// z-index: 1;
			top: 15%;
		}
		.scenicSpot{
			top: 3%;
		}
		
	}
</style>