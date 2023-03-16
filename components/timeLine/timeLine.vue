<template>
	<view class="time-main">
		<u-popup :show="timeLineState" mode='top'>
		    <u-scroll-list class='scrollList' :indicator="indicator" indicatorColor="#fff0f0" indicatorActiveColor="#8470FF">
		        <view class="listPlan" v-for="(item, index) in timeList" :key="index">
					<span class='title'>{{item.title}}</span>
					<span class='time'>时间：{{item.timestamp}}</span>
					<span class='state'>状态：{{item.commitInfo}}</span>
				</view>
				<br/>
		    </u-scroll-list>
			<button class="listBtn" @click="dailyComplete">打卡</button>
		</u-popup>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {getDate} from '../../untils/constant.js' 
	export default {
		name:'timeLine',
		data(){
			return{
				indicator: true,
			}
		},
		computed:{
			...mapState('timeLine',['timeLineState','timeList']),
		},
		watch:{
			timeList:{
				deep:true,
				handler(newValue){
					this.$store.commit('timeLine/changeTimeLine',newValue);
				}
			}
		},
		methods:{
			dailyComplete(){
				
				if(this.timeList[getDate-1].commitInfo === '未完成😢😢'){
					this.timeList[getDate-1].commitInfo = "已完成🦆🦆";
					this.$refs.uNotify.show({
					    top: 10,
					    type: 'success',
					    color: '#000',
					    bgColor: '#76EE00',
					    message: '打卡成功~',
					    duration: 1000 * 2,
					    fontSize: 20,
					    safeAreaInsetTop:true
					})
				}else{
					this.$refs.uNotify.show({
					    top: 10,
					    type: 'success',
					    color: '#000',
					    bgColor: '#EEEE00',
					    message: '今天已经打过卡了~',
					    duration: 1000 * 2,
					    fontSize: 20,
					    safeAreaInsetTop:true
					})
				}
				setTimeout(()=>{
					this.$store.commit('timeLine/changeTimeLineState',false);
				},1500)
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	/* #ifdef H5 */
	.time-main{
		width: 750rpx;
		.scrollList{
			// display: flex;
			.listPlan{
				display: flex;
				flex-direction: column;
				width: 200rpx;
				align-items: center;
				margin:0 60rpx;
				span{
					width: 250rpx;
					font-family: 'yuan';
				}
				.title{
					font-size: 36rpx;
					font-weight: 700;
				}
				.time,.state{
					font-weight: 500;
					font-size: 28rpx;
				}
			}
		}
		.listBtn{
		font-size: 40rpx;
		font-family: 'yuan';
		font-weight: 700;
		width: 150rpx;
		height: 80rpx;
		line-height: 70rpx;
		border: 6rpx solid black;
		border-radius: 40rpx;
		cursor: pointer;
		background-color: #87CEFF;
		margin-bottom: 10rpx;
		}
	}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.time-main{
		width: 750rpx;
	}
	.listPlan{
		display: flex;
		flex-direction: column;
		width: 200rpx;
		align-items: center;
		margin:0 60rpx;
	}
	span{
		width: 250rpx;
		font-family: 'yuan';
	}
	.title{
		font-size: 36rpx;
		font-weight: 700;
	}
	.time,.state{
		font-weight: 500;
		font-size: 28rpx;
	}
	.listBtn{
	font-size: 40rpx;
	font-family: 'yuan';
	font-weight: 700;
	width: 200rpx;
	height: 80rpx;
	line-height: 70rpx;
	border: 6rpx solid black;
	border-radius: 40rpx;
	cursor: pointer;
	background-color: #87CEFF;
	margin-bottom: 10rpx;
	}
	/* #endif */
</style>