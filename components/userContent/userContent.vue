<!-- 用户的名片：包括用户的头像显示，资料的显示以及修改 -->
<template>
	<view class="mainUserCard">
		<button class="exitBtn" v-if="userIsLoading" @click="exit">退出登录</button>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default{
		name:'userContent',
		data(){
			return{
			}
		},
		computed:{
			...mapState('userData',['userData','userIsLoading']),
		},
		watch:{
		},
		methods:{
			exit(){
				this.$store.commit('userData/clearUserLoading','');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainUserCard{
		position: relative;
		width: 700rpx;
		height: 600rpx;
		background-color: rgba(255, 255, 255, .8);
		border-radius: 50rpx;
		box-shadow: 10rpx 10rpx 10rpx 10rpx rgba(0, 0, 0, .2);
		overflow: hidden;
		.exitBtn{
			position: absolute;
			top: 85%;
			width: 100%;
			font-size: 40rpx;
			font-weight: 700;
			background-color: rgba(#FF0000, .8);
		}
	}
</style>