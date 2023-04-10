<template>
	<view class="myReserve">
		<scroll-view  v-show="true"  scroll-y="true" class="scroll-Y">
			<view class="card"  v-for="(item, index) in scenicSpot" :key="index"  v-show="getShow(item)">
				<p class='scenicSpot'>{{item}}</p>
				<view class="homestayMain"  v-show="myReserve[item]['homestay'].length !== 0">
					<p  class="homestay">预定的民宿👇</p>
					<view class="homestayBox" v-for="(item2,index) in myReserve[item]['homestay']" :key="index">
						<span class="title">{{item2.name}}</span>
						<span class='delete' @click="Delete(item2)">X</span>
						<span class="price">{{item2.price}}</span>
					</view>
				</view>
				<view class="specialityMain" v-show="myReserve[item]['speciality'].length !== 0">
					<p  class="speciality">预定的特产👇</p>
					<view class="specialityBox" v-for="(item2,index) in myReserve[item]['speciality']" :key="index">
						<span class="title">{{item2.name}}</span>
						<span class='delete'  @click="Delete(item2)">X</span>
						<span class="price">{{item2.price}}</span>
					</view>
				</view>
				<!-- <p class='none' v-show="!myReserve[item]['homestay'] && !myReserve[item]['speciality'] ">无</p> -->
			</view>
		</scroll-view>
		<u-popup :show="reserveConfirmShow" mode="center">
			<view class="popBox">
				<span class = 'notice'>确定要删除该商品吗</span>
				<button class='confirm' size="mini" @tap="$u.throttle(confirm, 500)">确认</button>
				<button class='cancel' size="mini" @tap="$u.throttle(cancel, 500)">取消</button>
			</view>
		</u-popup>
		<u-popup :show="!userIsLoading" mode="center">
			<view class="popBox" v-if="!userIsLoading">
				<span>请先登录</span>
				<button size="mini" @click="getToLogin">去登录</button>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {getScenicSpotName} from '../../../api/scenicSpotApi.js'
	export default{
		name:'myReserve',
		data(){
			return{
				scenicSpot:[],
				myReserve:{},
				reserveConfirmShow:false,
				deleteThing:{},
			}
		},
		computed:{
			...mapState('userData',['userIsLoading','userIsLoadingId','userReserveHomestay','userReserveSpeciality'])
		},
		watch:{
			userReserveHomestay:{
				deep:true,
				handler(newValue){
					this.setMyReserve();//更新myReserve
				}
			},
			userReserveSpeciality:{
				deep:true,
				handler(newValue){
					this.setMyReserve();//更新myReserve
				}
			}
		},
		methods:{
			getToLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			getShow(item){
				let flag1 = this.myReserve[item]['speciality'].length === 0;
				let flag2 = this.myReserve[item]['homestay'].length === 0;
				return !flag1 || !flag2
			},
			getScenicName(){
				uni.showLoading({
					title:"加载中",
				});
				 getScenicSpotName().then((res) => {
				  this.scenicSpot = res.data
				  uni.hideLoading(); // 关闭加载中弹框
				  this.setMyReserve();
				
				}).catch((err) => {
				  console.log(err); 
				});
			},
			setMyReserve(){
				this.scenicSpot.forEach(item=>{
					this.myReserve[item] = {
						homestay:[],
						speciality:[],
					};
				})
				if(this.userReserveHomestay){
					this.userReserveHomestay.forEach(item=>{
						this.myReserve[item.scenicSpot]["homestay"].push(item)
					})
				}
				if(this.userReserveSpeciality){
					this.userReserveSpeciality.forEach(item=>{
						this.myReserve[item.scenicSpot]["speciality"].push(item)
					})
				}
			},
			Delete(item2){
				this.reserveConfirmShow = true;
				this.deleteThing = item2;
				console.log(this.deleteThing)
			},
			confirm(){
				const obj = this.deleteThing;
				let homestayList = this.userReserveHomestay;
				let specialityList = this.userReserveSpeciality;
				if(!obj.grade){
					specialityList.forEach((item,index)=>{
						  if(obj.name == item.name){
						    specialityList.splice(index,1)
							return;
						  }
					})
					this.$store.commit('userData/changeUserState',[this.userIsLoadingId,'reserveSpeciality',specialityList])
				}else{
					homestayList.forEach((item,index)=>{
						  if(obj.name == item.name){
						    homestayList.splice(index,1)
							return;
						  }
					})
					this.$store.commit('userData/changeUserState',[this.userIsLoadingId,'reserveHomestay',homestayList])
				}
				this.reserveConfirmShow = false;
				this.showToast({
							type: 'success',
							title: '删除成功',
							message: "删除成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
				})
			},
			cancel(){
				this.deleteThing = {};
				this.reserveConfirmShow = false;
			},
			showToast(params) {
					this.$refs.uToast.show({
						...params,
				})
			},
		},
		mounted() {
			this.getScenicName();
		}
	}
</script>

<style lang="scss" scoped>
	.myReserve{
		width: 100vw;
		/* #ifdef H5 */
		height: 100vh;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 120vh;
		/* #endif */
		background-image: linear-gradient(to bottom left, #fa709a 0%, #fee140 100%);
		z-index: -1;
		.scroll-Y{
			height: 1250rpx;
			padding: 50rpx 8rpx;
			.card{
				width: 725rpx;
				// height: 300rpx;
				background-color: rgba(255, 255, 255, .7);
				border-radius: 10rpx;
				margin: 50rpx 0;
				padding:30rpx 0;
				box-shadow: 15rpx 15rpx 15rpx 15rpx rgba(0, 0, 0, .2);
				overflow: hidden;
				.scenicSpot{
					margin: 30rpx;
					font-weight: 700;
					font-size: 40rpx;
				}
				.homestayMain,.specialityMain{
					border: 5rpx solid rgba(0, 0, 0, .1);
					border-radius: 20rpx;
					padding: 20rpx 0;
					margin: 10rpx;
					.homestay,.speciality{
						margin-left: 50rpx;
						font-weight: 700;
						font-size: 35rpx;
					}
					.homestayBox,.specialityBox{
						width: 505rpx;
						height: 100rpx;
						line-height: 100rpx;
						font-weight: 500;
						font-size: 35rpx;
						background-color: rgba(255, 255, 255, .5);
						margin:30rpx 0 0 50rpx;
						padding: 0 50rpx;
						border-radius: 50rpx;
						.title{
							float: left;
							margin-left: 20rpx;
						}
						.price{
							float: right;
							color: red;
							margin-right: 20rpx;
						}
						.delete{
							width: 80rpx;
							height: 80rpx;
							line-height: 80rpx;
							text-align: center;
							float: right;
							// background-color:rgba(255, 255, 255, .5);
							border-radius: 50%;
							transform: translate(50%,10%);
						}
					}
				}
				.none{
					font-family: 'yuan';
					font-size: 60rpx;
					font-weight: 700;
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
	}
</style>