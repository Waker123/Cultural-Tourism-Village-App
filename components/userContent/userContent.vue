<!-- 用户的名片：包括用户的头像显示，资料的显示以及修改 -->
<template>
	<view class="mainUserCard">
		<view class="userCell">
		<u-cell-group  :customStyle="{
			'fontSize':'40rpx',
			'fontWeight':'400'
		}">
			<u-cell
			    title="我的预定"
			    :isLink='true'
				size='large'
				@click="goToMyReserve"
			></u-cell>
			<u-cell
			    title="我的文章"
			    :isLink='true'
				size='large'
				@click="goToMyArticles"
			></u-cell>
			<u-cell
			    title="我的图片"
			    :isLink='true'
				size='large'
				@click="goToMyImages"
			></u-cell>
			<u-cell
			    title="我的短视频"
			    :isLink='true'
				size='large'
				@click="goToMyShortVideos"
			></u-cell>
			<u-cell
			    title="活动预约"
			    :isLink='true'
				size='large'
				@click="goToMyActivity"
			></u-cell>
		</u-cell-group>
		</view>
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
			},
			goToMyReserve(){
				uni.navigateTo({
					url:"/pages/user/myReserve/myReserve"
				})
			},
			goToMyArticles(){
				uni.navigateTo({
					url:"/pages/user/myArticles/myArticles"
				})
			},
			goToMyImages(){
				uni.navigateTo({
					url:"/pages/user/myImages/myImages"
				})
			},
			goToMyShortVideos(){
				uni.navigateTo({
					url:"/pages/user/myShortVideos/myShortVideos"
				})
			},
			goToMyActivity(){
				uni.navigateTo({
					url:"/pages/user/activity/activity"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainUserCard{
		position: relative;
		width: 700rpx;
		height: 700rpx;
		background-color: rgba(255, 255, 255, .8);
		border-radius: 50rpx;
		box-shadow: 10rpx 10rpx 10rpx 10rpx rgba(0, 0, 0, .2);
		overflow: hidden;
		.exitBtn{
			position: absolute;
			top: 87%;
			width: 100%;
			font-size: 40rpx;
			font-weight: 700;
			background-color: rgba(#FF0000, .8);
		}
		.userCell{
			position: absolute;
			width: 600rpx;
			left: 8%;
			top: 5%;
		}
	}
</style>