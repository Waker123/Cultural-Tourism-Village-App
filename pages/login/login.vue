<template>
	<view class="mainLogin">
		<view class="loginCard">
			<view class="gotoIndex" @click="gotoIndex">
				<span>返回首页</span>
				<img src="../../static/image/首页1.png" alt="前往首页"></img>
			</view>
			<view class="userId">
			<span>用户名：</span>
			  <input
			   type='text'
			    placeholder="请输入ID"
			    v-model="userId"
			  ></input>
			</view>
			<view class="userPassword">
			<span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
			  <input
			   type='password'
			    placeholder="请输入密码"
			    v-model="userPassword"
			  ></input>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"login",
		data(){
			return{
				userId: '',
				userPassword:''
			}
		},
		methods:{
			gotoIndex(){
				uni.switchTab({
					url: '../index/index'
				});
			}
		},
		onLoad() {
			console.log(111)
		}
		
	}
</script>

<style lang="scss" scoped>
	.mainLogin{
		width: 100vw;
		height: 100vh;
		background: linear-gradient(to bottom right, #f6d365 0%, #fda085 100%);
		padding-top: 70rpx;
		.loginCard{
			position: relative;
			width: 700rpx;
			height: 600rpx;
			margin: auto;
			background-color: rgba(255, 255, 255, .8);
			border-radius: 50rpx;
			box-shadow: 10rpx 10rpx 10rpx 10rpx rgba(0, 0, 0, .2);
			font-family:"yuan";
			.gotoIndex{
				position: absolute;
				top: 5%;
				left: 7%;
				text-decoration: underline;
				img{
					width: 35rpx;
					height: 35rpx;
					transform: translateY(15%);
				}
			}
			.userId{
				position: absolute;
				width: 600rpx;
				top: 20%;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				justify-content: center;
				span{
					width: 250rpx;
					font-size: 45rpx;
					font-weight: 700;
				}
				input{
					width: 500rpx;
					border: 5rpx solid rgba(0, 0, 0, .8);
					border-radius: 10rpx;
					padding: 0 10rpx 0 10rpx;
					font-family: 'none';
				}
			}
			.userPassword{
				position: absolute;
				width: 600rpx;
				top: 40%;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				justify-content: center;
				span{
					width: 250rpx;
					font-size: 45rpx;
					font-weight: 700;
				}
				input{
					width: 500rpx;
					border: 5rpx solid rgba(0, 0, 0, .8);
					border-radius: 10rpx;
					padding: 0 10rpx 0 10rpx;
					font-family: 'none';
				}
			}
		}
	}
</style>