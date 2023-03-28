<template>
	<view class="mainLogin">
		<view class="loginCard">
			<view class="gotoIndex" @tap="$u.throttle(gotoIndex, 500)">
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
			<p class='remindBoxOne' v-show="!inputRuleJudge(userId)">请输入8-16位的数字、字母组合</p>
			<view class="userPassword">
			<span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
			  <input
			   type='password'
			    placeholder="请输入密码"
			    v-model="userPassword"
			  ></input>
			</view>
			<p class='remindBoxTwo' v-show="!inputRuleJudge(userPassword)">请输入8-16位的数字、字母组合</p>
			<view class="loginBox">
				<button size="mini" class="login" :disabled="!inputRuleJudge(userId)||!inputRuleJudge(userPassword)">登录</button>
				<!-- @tap uview的节流 -->
				<button size="mini" class="register"  @tap="$u.throttle(gotoRegister, 500)">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {inputRule} from '../../untils/inputRules.js'
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
			},
			gotoRegister(){
				uni.navigateTo({
					url:"./register"
				})
			},
			inputRuleJudge(str){
				return inputRule(str);
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
				top: 25%;
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
				top: 50%;
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
			.loginBox{
				position: absolute;
				display: flex;
				top: 75%;
				left: 50%;
				transform: translateX(-50%);
				.login,.register{
					width: 200rpx;
					height: 100rpx;
					text-align: center;
					line-height: 100rpx;
					border: 3rpx solid black;
					border-radius: 30rpx;
					font-weight: 700;
					font-size: 40rpx;
					background-color: rgba(255, 255, 255, .4);
				}
				.login{
					margin-right: 30rpx;
				}
			}
			.remindBoxOne,.remindBoxTwo{
				position: absolute;
				left: 35%;
				color: red;	
			}
			.remindBoxOne{
				top: 35%;
			}
			.remindBoxTwo{
				top: 60%;
			}
		}
	}
</style>