<!-- 用户的名片：包括用户的头像显示，资料的显示以及修改 -->
<template>
	<view class="mainUserCard">
		<!-- uview头像组件 -->
		<view class="userHead" v-if="!userIsLoading" @click="gotoLogin">
			<u-avatar  size="60" ></u-avatar>	
		</view>
		<view class="userHead" v-if="userIsLoading" >
			<u-avatar :src=src size="60" ></u-avatar>	
		</view>
		<p class='userName' v-if="!userIsLoading" @click="gotoLogin">点击登录</p>	
		<p class='userName' v-if="userIsLoading" >{{userIsLoadingId}}</p>	
		<!-- uview单元格组件 -->
		<view class="userCell">
		<u-cell-group  :customStyle="{
			'fontSize':'40rpx',
			'fontWeight':'400'
		}">
			<u-cell
			    title="修改个人资料"
			    :isLink='true'
				size='large'
				@click="changeUserData"
			></u-cell>
		</u-cell-group>
		</view>
		<!-- 查看资料 -->
		<u-popup :show="showUserData" mode="center">
			<view class="lookInformation">
				<view class="lookInformationId">
					<span>用户名:</span>{{userIsLoadingId}}
				</view>
				<view class="lookInformationPassword">
					<span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</span><input type="password" v-model="password"  placeholder="请输入密码">
				</view>
				<p class='remindBoxOne' v-show="!inputRuleJudge(password)">请输入8-16位的数字、字母组合</p>
				<view class="lookInformationPasswordConfirm">
					<span>确认密码:</span><input type="password" v-model="passwordAgain"  placeholder="确认密码">
				</view>
				<p class='remindBoxTwo' v-show="password !==passwordAgain">两次输入的密码不同</p>
				<view class='lookInformationBtn'>
					<button class='confirm'  @click='confirm':disabled="!inputRuleJudge(password)||(password!==passwordAgain)" >确认修改</button>
					<button class='cancel'  @click='cancel'>取消</button>
				</view>
		    </view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {inputRule} from '../../untils/inputRules.js'
	import md5 from '../../untils/md5.js'
	export default{
		name:'userCard',
		data(){
			return{
				src:'https://cdn.uviewui.com/uview/album/1.jpg',
				showUserData:false,
				password:'',
				passwordAgain:'',
			}
		},
		computed:{
			...mapState("userData",["userData","userIsLoading","userIsLoadingId"]),
		},
		watch:{
			// 用户的数据改变后，就要检查是否有用户处于登录状态
		},
		methods: {
			gotoLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			inputRuleJudge(str){
				return inputRule(str)
			},
			changeUserData(){
				if(!this.userIsLoading){
					this.showToast({
						type: 'error',
						icon: false,
						title: '失败主题',
						message: "请先登录",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:"/pages/login/login"
						})
					},1000)
				}else{
					this.showUserData = true;
				}
			},
			confirm(){
				const changePassword =  md5.hex_md5(this.password);
				// 修改密码
				this.$store.commit('userData/changeUserState',[this.userIsLoadingId,"password",changePassword]);
				
				// 清空之前的输入
				this.password='';
				this.passwordAgain='';
				// 1秒后跳转到登录页面
				setTimeout(()=>{
					this.showUserData = false;
					this.showToast({
								type: 'success',
								title: '修改成功',
								message: "修改成功",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
								})
				},500)
			},
			cancel(){
				this.password='';
				this.passwordAgain='';
				this.showUserData = false;
			},
			// 消息提示
			showToast(params) {
					this.$refs.uToast.show({
						...params,
				})
			}
		},
		mounted() {
			// this.$store.commit('userData/clearUserLoading','');
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
			top: 60%;
		}
		.lookInformation{
			width: 700rpx;
			height: 600rpx;
			.lookInformationId,.lookInformationPassword,.lookInformationPasswordConfirm,.lookInformationBtn{
				display: flex;
				margin-left: 40rpx;
			}
			.lookInformationId{
				margin-top: 60rpx;
			}
			.lookInformationPassword{
				margin-top: 50rpx;
			}
			.lookInformationPasswordConfirm{
				margin-top: 60rpx;
			}
			span{
				width: 200rpx;
				font-size: 35rpx;
				font-weight: 700;
			}
			input{
				width: 400rpx;
				border: 5rpx solid rgba(0, 0, 0, .1);
				border-radius: 10rpx;
				padding: 0 10rpx 0 10rpx;
				font-family: 'none';
			}
			.lookInformationBtn{
				margin-top: 40rpx;
				.confirm,.cancel{
					width: 200rpx;
					height: 100rpx;
					text-align: center;
					line-height: 100rpx;
					border: 1rpx solid black;
					border-radius: 30rpx;
					font-weight: 700;
					font-size: 32rpx;
					background-color: rgba(255, 255, 255, .1);
				}
				.cancel{
					margin-right: 100rpx;
				}
			}
			.remindBoxOne,.remindBoxTwo{
				color: red;
				margin-left: 240rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>