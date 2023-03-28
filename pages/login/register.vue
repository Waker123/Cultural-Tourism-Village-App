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
			    v-model="registerId"
			  ></input>
			</view>
			<p class='remindBoxOne' v-show="!inputRuleJudge(registerId)">请输入8-16位的数字、字母组合</p>
			<view class="userPasswordOne">
			<span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
			  <input
			   type='password'
			    placeholder="请输入密码"
			    v-model="registerPassword"
			  ></input>
			</view>
			<p class='remindBoxTwo' v-show="!inputRuleJudge(registerPassword)">请输入8-16位的数字、字母组合</p>
			<view class="userPasswordTwo">
			<span>确认密码：</span>
			  <input
			   type='password'
			    placeholder="请再次输入密码"
			    v-model="registerPasswordAgain"
			  ></input>
			</view>
			<p class='remindBoxThree' v-show="registerPassword!==registerPasswordAgain">两次输入的密码不同</p>
			<view class="loginBox">
				<button size="mini" class="register" @click="registerUser" :disabled="!inputRuleJudge(registerId)||!inputRuleJudge(registerPassword)||(registerPassword!==registerPasswordAgain)">注册</button>
			</view>
		</view>
		<!-- 注册提示 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {inputRule} from '../../untils/inputRules.js'
	import {loginLocalStorage} from '../../untils/useLocalstorage.js'
	import md5 from '../../untils/md5.js'
	export default {
		name:"register",
		data(){
			return{
				registerId: '',
				registerPassword:'',
				registerPasswordAgain:''
			}
		},
		methods:{
			gotoIndex(){
				uni.switchTab({
					url: '../index/index'
				});
			},
			inputRuleJudge(str){
				return inputRule(str);
			},
			registerUser(){
				const userStorage = loginLocalStorage();
				let userId = this.registerId;
				let passWord = md5.hex_md5(this.registerPassword); //加密后的密码
				// 查看是否重复注册
				let userData = userStorage.getItem("USERSDATA");
				let flag = true;
				if (userData !== null) {
				     //如果userData不为空
				     Object.keys(userData).forEach((item) => {
				       if (item === userId) {
				         flag = false;
				         this.showToast({
							type: 'error',
							icon: false,
							title: '失败主题',
							message: "该用户名已被注册",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
						})
				       }
				    });
				}
				if (flag) {
				  const user = {
					  userId,
					  passWord,
					  isLoading:false//是否正在登录
				  }
				  userStorage.setItem("USERSDATA", userId,user);
				  this.showToast({
				  			type: 'success',
				  			title: '注册成功',
				  			message: "注册成功",
				  			iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
					// 清空之前的输入
					this.registerId='';
					this.registerPassword='';
					this.registerPasswordAgain='';
					// 两秒后跳转到登录页面
					setTimeout(()=>{
						uni.navigateTo({
							url:"./login"
						})
					},1500)
				}
				
			},
			// 消息提示
			showToast(params) {
					this.$refs.uToast.show({
						...params,
				})
			}

		},
		onLoad() {
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
			height: 800rpx;
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
				top: 15%;
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
			.userPasswordOne{
				position: absolute;
				width: 600rpx;
				top: 35%;
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
			.userPasswordTwo{
				position: absolute;
				width: 600rpx;
				top: 55%;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				justify-content: center;
				span{
					width: 250rpx;
					font-size: 36rpx;
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
				.register{
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
			}
			.remindBoxOne,.remindBoxTwo,.remindBoxThree{
				position: absolute;
				left: 35%;
				color: red;
			}
			.remindBoxOne{
				top: 23%;
			}
			.remindBoxTwo{
				top: 43%;
			}
			.remindBoxThree{
				top: 63%;
			}
		}
	}
</style>