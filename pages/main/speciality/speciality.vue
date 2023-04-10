<template>
	<!-- 乡村特产界面 -->
	<view class="mainSpeciality">
		<scroll-view  v-show="true"  scroll-y="true" class="scroll-Y" >
				<view class="card"  v-for="(item, index) in scenicSpotSpeciality" :key="item.id"  @click="reserve(item)">
					<img :src="item.imgSrc">
					<view class="specialityContent">
						<span class="title">{{item.name}}</span>
						<span class="describe">--{{item.describe}}</span>
						<span class="price">{{item.price}}</span>
					</view>
				</view>
		</scroll-view>
		<u-popup :show="reserveConfirmShow" mode="center">
			<view class="popBox">
				<span class = 'notice'>确定要预定该特产吗</span>
				<button class='confirm' size="mini" @tap="$u.throttle(confirm, 500)">确认</button>
				<button class='cancel' size="mini" @tap="$u.throttle(cancel, 500)">取消</button>
			</view>
		</u-popup>
		<u-popup :show="!currentScenicSpot || !userIsLoading" mode="center">
			<view class="popBox" v-if="!currentScenicSpot">
				<span>请先选择景点</span>
				<button size="mini" @click="getToIndex">前往首页</button>
			</view>
			<view class="popBox" v-if="!userIsLoading">
				<span>请先登录</span>
				<button size="mini" @click="getToLogin">去登录</button>
			</view>
		</u-popup>
		<view class="myReserve" @tap="$u.throttle(gotoMyReserve, 500)">
			我的预定👉
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:"speciality",
		data(){
			return{
				reserveConfirmShow:false,
				reserveSpeciality:[],
			}
		},
		computed:{
			...mapState("changeScenicSpot",['scenicSpotSpeciality','currentScenicSpot']),
			...mapState('userData',['userIsLoading',"userIsLoadingId","userReserveSpeciality"])
		},
		methods:{
			getToIndex(){
				uni.switchTab({
					url:'../../index/index'
				})
			},
			getToLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			reserve(item){
				this.reserveSpeciality.push(item);
				this.reserveConfirmShow = true;
			},
			confirm(){
				const speciality = this.reserveSpeciality;
				this.$store.commit('userData/changeUserState',[this.userIsLoadingId,'reserveSpeciality',speciality])
				this.reserveConfirmShow = false;
				this.showToast({
							type: 'success',
							title: '预定成功',
							message: "预定成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
				})
			},
			cancel(){
				this.reserveSpeciality.pop();
				this.reserveConfirmShow = false;
			},
			// 消息提示
			showToast(params) {
					this.$refs.uToast.show({
						...params,
				})
			},
			gotoMyReserve(){
				uni.navigateTo({
					url:"../../user/myReserve/myReserve"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainSpeciality{
		position: relative;
		width: 750rpx;
		background-color: #F0F0F0;
		.scroll-Y{
			height: 1200rpx;
			padding: 50rpx 8rpx;
			.card{
				display: flex;
				width: 725rpx;
				height: 300rpx;
				background-color: white;
				border-radius: 10rpx;
				margin: 10rpx 0;
				img{
					width: 250rpx;
					height: 280rpx;
					margin-top: 10rpx;
				}
				.specialityContent{
					position: relative;
					width: 500rpx;
					height: 280rpx;
					.title,.describe,.price{
						position: absolute;
					}
					.title{
						top: 5%;
						left: 5%;
						font-size: 40rpx;
						font-weight: 700;
						
					}
					.describe{
						top: 31%;
						left: 10%;
						color: gray;
					}
					.price{
						top: 80%;
						left: 75%;
						font-size: 40rpx;
						font-weight: 700;
						color: red;
					}
				}
			}
		}
		.popBox{
			position: relative;
			width: 400rpx;
			height: 250rpx;
			background-color: rgba(255, 255, 255, .8);
			border: 4rpx solid rgba(255, 255, 255, .8);
			border-radius: 20%;
			span{
				position: absolute;
				top: 10%;
				left: 50%;
				width: 350rpx;
				font-family: 'yuan';
				transform: translateX(-45%);
				font-size: 50rpx;
			}
			button{
				font-family: 'yuan';
				position: absolute;
				top: 60%;
				left: 50%;
				transform: translateX(-50%);
				padding: 10rpx 15rpx;
			}
			.notice{
				position: absolute;
				top: 20%;
				left: 50%;
				font-size: 38rpx;
				font-weight: 700;
			}
			.confirm{
				position: absolute;
				top: 60%;
				left: 33%;
			}
			.cancel{
				position: absolute;
				top: 60%;
				left: 66%;
			}
		}
		.myReserve{
			position: fixed;
			bottom: 100rpx;
			right: 50rpx;
			width: 200rpx;
			height: 50rpx;
			background-color: rgba(#FF7F50, .7);
			text-align: center;
			line-height: 50rpx;
			border:3rpx #FF7F50 solid;
			border-radius: 25rpx;
			box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(0, 0, 0, .2);
			font-weight: 500;
			font-size: 30rpx;
			color: #fff;
		}
	}
</style>