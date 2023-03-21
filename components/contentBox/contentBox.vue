<template>
	<view class="contentMain">
		<ul>
			<li class='box' v-for="(item,index) in boxNumber" :key="index">
				<a class="hrefBox" @click="aaa">
					<img class="icon" src="../../static/image/fengjing2.png">
					<span class='boxTitle'>{{index+1}}</span>
				</a>
			</li>
		</ul>
	</view>
</template>

<script>
	export default{
		name:'contentBox',
		data(){
			return{
				boxNumber:15
			}
		},
		methods:{
			aaa(){
				window.alert('111');
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.contentMain{
		width: 700rpx;
		height: 500rpx;
		background-color: rgba(255, 255, 255, .6);
		border: 4rpx solid rgba(255, 255, 255, .5);
		border-radius: 50rpx;
		padding: 10rpx;
		text-align: center;
		ul{
			padding: 10rpx;
			.box{
				display: inline-block;
				margin: 20rpx;
				// border: 2rpx solid grey;
				box-shadow: 3rpx 3rpx 3rpx 3rpx rgba(0, 0, 0, .2);
				border-radius: 15rpx;
				.hrefBox{
					display: flex;
					flex-direction: column;
					align-items: center;
					.icon{
						width: 90rpx;
						height: 90rpx;
					}
				}
			}
		}
	}
</style>