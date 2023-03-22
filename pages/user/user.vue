<template>
	<view class="mainUser">
		<user-card class="userCard"></user-card>
		<user-content class="userContent"></user-content>
	</view>
</template>

<script>
	import userCard from '../../components/userCard/userCard.vue'
	import userContent from '../../components/userContent/userContent.vue'
	export default{
		name:'user',
		components:{
			userCard,
			userContent
		}
	}
</script>

<style lang="scss" scoped>
	.mainUser{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
		/* #ifdef H5 */
		height: 100vh;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 120vh;
		/* #endif */
		background-image: linear-gradient(to bottom left, #fa709a 0%, #fee140 100%);
		z-index: -1;
		.userCard{
			margin-top: 10%;
		}
		.userContent{
			margin-top: 60rpx;
		}
	}
</style>