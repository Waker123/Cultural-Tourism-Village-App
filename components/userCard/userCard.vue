<!-- 用户的名片：包括用户的头像显示，资料的显示以及修改 -->
<template>
	<view class="mainUserCard">
		<!-- uview头像组件 -->
		<view class="userHead">
			<u-avatar  size="60" ></u-avatar>	
		</view>
		<p class='userName'>用户名称</p>
		<!-- uview单元格组件 -->
		<view class="userCell">
		<u-cell-group  :customStyle="{
			'fontSize':'40rpx',
			'fontWeight':'400'
		}">
			<u-cell
			    title="查看个人资料"
			    :isLink='true'
				size='large'
			></u-cell>
			<u-cell
			    title="修改个人资料"
			    :isLink='true'
				size='large'
			></u-cell>
		</u-cell-group>
		</view>

	</view>
</template>

<script>
	export default{
		name:'userCard',
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
		height: 500rpx;
		background-color: rgba(255, 255, 255, .8);
		border-radius: 50rpx;
		box-shadow: 10rpx 10rpx 10rpx 10rpx rgba(0, 0, 0, .2);
		.userHead,.userName,.userCell{
			position: absolute;
		}
		.userHead{
			top: 13%;
			left: 10%;
		}
		.userName{
			font-size: 60rpx;
			font-weight: 700;
			left: 35%;
			top: 16%;
		}
		.userCell{
			width: 600rpx;
			left: 8%;
			top: 50%;
		}
	}
</style>