<template>
	<view class="recordMain">
		<view class="title">
			<span @click='changeBackgroundStateOne'>vue2记录</span>|
			<span @click='changeBackgroundStateTwo'>vue3记录</span>
		</view>
		<view class="article">
			<vue2-record v-if='backgroundShow'></vue2-record>
			<vue3-record v-if='!backgroundShow'></vue3-record>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import vue2Record from '../vueRecord/vue2Record.vue'
	import vue3Record from '../vueRecord/vue3Record.vue'
	export default {
		name:'blogRecord',
		components:{
			vue2Record,
			vue3Record
		},
		computed:{
			...mapState('backgroundShow',['backgroundShow']),
		},
		methods:{
			changeBackgroundStateOne(){
				this.$store.commit('backgroundShow/changeBackgroundShow',true);
			},
			changeBackgroundStateTwo(){
				this.$store.commit('backgroundShow/changeBackgroundShow',false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recordMain{
		position: relative;
		width: 650rpx;
		height: 1300rpx;
		background-color: rgba(255, 255, 255, .7);
		border-radius: 40rpx;
		// overflow: hidden;
		.title{
			position: absolute;
			display: flex;
			top:-10%;
			left: 50%;
			transform: translateX(-50%);
			font-size: 52rpx;
			font-weight: 700;
			font-family: 'yuan';
			color: #fff;
			opacity: .8;
			span{
				width: 230rpx;
				margin: 0 30rpx;
			}
		}
		.article{
			display: flex;
			flex-direction: column;
			align-items: center;
			/* #ifdef H5 */
			margin-top: 80rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			transform: translateY(5%);
			/* #endif */
			border-radius: 50rpx;
		}
	}

</style>