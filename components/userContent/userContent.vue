<!-- 用户的名片：包括用户的头像显示，资料的显示以及修改 -->
<template>
	<view class="mainUserCard">
	</view>
</template>

<script>
	export default{
		name:'userContent',
		data(){
			return{
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
	}
</style>