<template>
	<view class="vue3Main">
		<!-- 利用v-show来解决异步获取数据的问题，等到有数据的时候才把数据显示出来 -->
		<scroll-view  scroll-y="true" class="scroll-Y" >
				<view class="card" v-for="(item, index) in vueRecordList"
						:key="index"
					>
					<h2 class='title'>{{item.title}}</h2>
					<p>{{item.content}}</p>
				</view>
		</scroll-view>
	</view>
</template>

<script>
	import {getVue3Record} from '../../api/vueRecord.js'
	export default{
		name:"vue3Record",
		data(){
			return{
				vueRecordList:[],
			}
		},
		methods:{
			 getVue3Summary(){
				 uni.showLoading({
					title:"加载中",
				});
				 getVue3Record().then((res) => {
				  this.vueRecordList = res.data
				  uni.hideLoading(); // 关闭加载中弹框
				}).catch((err) => {
				  console.log(err); 
				});
			}
		},
		mounted() {
			this.getVue3Summary();
		}
	}
</script>

<style lang="scss" scoped>
/* #ifdef H5*/
.vue3Main{
	.scroll-Y{
		height: 1150rpx;
		.card{
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 500rpx;
			padding: 30rpx;
			margin: 30rpx 0;
			background-color: rgba(255, 255, 255, .5);
			border-radius: 50rpx;
			h2{
				font-family: 'yuan';
				margin-bottom: 10rpx;
			}
		}
	}
}
/* #endif */
/* #ifdef MP-WEIXIN*/
.vue3Main{
	.scroll-Y{
		height: 1150rpx;
		.card{
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 500rpx;
			padding: 30rpx;
			margin: 30rpx 0;
			background-color: rgba(255, 255, 255, .5);
			border-radius: 50rpx;
		}
	}
}
.title{
	font-size: 40rpx;
	font-weight: 700;
	font-family: 'yuan';
	margin-bottom: 10rpx;
}
/* #endif */
</style>