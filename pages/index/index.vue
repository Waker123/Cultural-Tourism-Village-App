<template>
	<view class="mainBody">
		<background class='background'></background>
		<!-- <background-two class='backgroundTwo'></background-two> -->
		<!-- <background-three class='backgroundThree'></background-three> -->
		<!-- <todo-list class='todoList'></todo-list> -->
		<!-- <week-todo class= 'weekTodo'></week-todo> -->
		<!-- <daily-task class = 'dailyTask'></daily-task> -->
		<!-- <time-line class='timeLine'></time-line> -->
		<content-box class='contentMain' v-show="currentScenicSpot"></content-box>
		<scenic-spot class='scenicSpot' v-show="currentScenicSpot"></scenic-spot>
		<choose-spot class='chooseSpot'></choose-spot>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import background from '../../components/background/background.vue' //背景组件
	// import backgroundTwo from '../../components/background/backgroundTwo.vue'
	// import backgroundThree from '../../components/background/backgroundThree.vue'
	// import todoList from '../../components/todo/todoList.vue'
	// import weekTodo from '../../components/weektodo/weekTodo.vue'
	// import dailyTask from '../../components/dailyTask/dailyTask.vue'
	// import timeLine from '../../components/timeLine/timeLine.vue'
	import contentBox from '../../components/contentBox/contentBox.vue' //显示主要功能选项的组件
	import scenicSpot from '../../components/scenicSpot/scenicSpot.vue' //显示选择景点的组件
	import chooseSpot from '../../components/scenicSpot/chooseSpot.vue' //显示选择背景的组件
	export default {
		name:'index',
		components:{
			background,
			// backgroundTwo,
			// backgroundThree,
			// todoList,
			// weekTodo,
			// dailyTask,
			// timeLine,
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