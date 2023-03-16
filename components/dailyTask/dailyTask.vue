<template>
	<view class="daily-main">
		<button class="dailyBtn" @click="changeTimeLineState">今日打卡</button>
		<view class='dailyProgress'>
			<p>本月打卡进度:</p>
			<u-line-progress  :percentage="completePercentage" activeColor="#9370DB" height="24"></u-line-progress>
		</view>
		<view class="dailyTarget">
			<view class='title'>距离:</view>
			<view class='target'>{{target}}</view>
			<view class='time'>还有{{timeOut}}天</view>
			<button class="setBtn" @click="show=true">设定目标</button>
		</view>
		<u-popup :show="show" mode='center'>
		    <view class="setBox">
				<view class="set_target">
					<span>目标：</span>
					<input type="text" v-model="target"  placeholder="请设定目标">
				</view>
				<view class="set_time">
					<span class='set_time_title'>时间：</span>
					<input type="text" v-model="timeTarget" placeholder="格式:xxxx/xx/xx">
				</view>
					
		    </view>
			<button class="closeBtn" @click="show=false">确定</button>
		</u-popup>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import useLocalStorage from '../../untils/useLocalstorage.js'
	export default{
		name:'dailyTask',
		data(){
			return{
				target:'',
				timeOut:0,
				timeTarget:'',
				show:false,
			}
		},
		computed:{
			...mapState('timeLine',['timeLineState','timeList']),
			completePercentage(){
				let count=0;
				this.timeList.forEach(item=>{
					if(item.commitInfo==='已完成🦆🦆')count++;
				})
				return parseInt(count*3.34)
			}
		},
		watch:{
			target(newValue){
				const targetStore = useLocalStorage();
				targetStore.setItem('TARGET',{
					target:newValue,
					timeTarget:this.timeTarget
				})
			},
			timeTarget(newValue){
				const targetStore = useLocalStorage();
				targetStore.setItem('TARGET',{
					target:this.target,
					timeTarget:newValue,
				})
				this.timeOut=this.timeFormat(newValue)
			}
		},
		methods:{
			changeTimeLineState(){
				this.$store.commit('timeLine/changeTimeLineState',true)
			},
			timeFormat(time){
				return parseInt((+new Date(time)-(+new Date()))/1000/86400)
			}
		},
		mounted() {
			const targetStore = useLocalStorage();
			if(!targetStore.getItem("TARGET")){
				targetStore.setItem("TARGET",{
					target:'考研',
					timeTarget:'2022/12/25'
				})
			}
			this.target = targetStore.getItem("TARGET").target;
			this.timeTarget = targetStore.getItem("TARGET").timeTarget;
		}
	}
</script>

<style lang="scss" scoped>
	.daily-main{
		position: relative;
		width: 680rpx;
		height: 1100rpx;
		background-color: rgba(255, 255, 255, .7);
		border-radius: 50rpx;
		.dailyBtn{
			position: absolute;
			left: 6%;
			top: 6%;
			font-size: 60rpx;
			font-family: 'yuan';
			font-weight: 700;
			width: 350rpx;
			height: 120rpx;
			line-height: 100rpx;
			border: 10rpx solid black;
			border-radius: 50rpx;
			cursor: pointer;
			background-color: #87CEFF;
		}
		.dailyProgress{
			position: absolute;
			left: 5%;
			top: 25%;
			width: 600rpx;
			height: 60rpx;
			
			p{
				font-family: 'yuan';
				font-size: 45rpx;
				font-weight: 700;
				margin-bottom: 20rpx;
			}
		}
		.dailyTarget{
			position: absolute;
			left: 50%;
			top: 45%;
			transform: translateX(-50%);
			width: 580rpx;
			height: 400rpx;
			background-color: rgba(99, 184, 255, .8);
			border-radius: 30rpx;
			border: 10rpx solid black;
			.title{
				font-family: 'yuan';
				font-weight: 700;
				font-size: 80rpx;
				text-align: center;
			}
			.target{
				font-family: 'yuan';
				font-weight: 700;
				font-size: 120rpx;
				color: #EE4000;
				text-align: center;
				margin: 20rpx 0;
			}
			.time{
				font-family: 'yuan';
				font-weight: 700;
				font-size: 80rpx;
				text-align: center;
			}
			.setBtn{
				width: 250rpx;
				height: 100rpx;
				line-height: 90rpx;
				font-family: 'yuan';
				font-weight: 700;
				font-size: 40rpx;
				transform: translateY(65%);
				background-color: rgba(99, 184, 255, .8);
				border-radius: 30rpx;
				border: 10rpx solid black;
			}
		}
		.setBox{
			display: flex;
			flex-direction: column;
			font-family: 'yuan';
			font-size: 36rpx;
			font-weight: 550;
			.set_target{
				display: flex;
				padding: 70rpx 0 10rpx 50rpx;
			}
			.set_time{
				display: flex;
				padding: 10rpx 0 10rpx 50rpx;
			}
			
		}
		.closeBtn{
			font-family: 'yuan';
			font-size: 36rpx;
			font-weight: 700;
			margin-bottom: 10rpx;
		}
		
	}
</style>