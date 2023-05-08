<template>
	<view class="myVideos">
		<scroll-view  v-show="true"  scroll-y="true" class="scroll-Y">
			<view class="card"  v-for="(item, index1) in scenicSpot" :key="index1"  v-show="getShow(item)">
				<p class='scenicSpot'>{{item}}</p>
				<view class="videosMain"  v-show="myVideos[item].length !== 0">
					<p  class="videos">发布的视频</p>
					<view class="videosBox" v-for="(item2,index2) in myVideos[item]" :key="item2.videoDate">
						<span class='delete' @click="DeleteVideos(index2)">X</span>
						<my-video class="videosContent" :src="getUrl(item2.videoSrc)"></my-video>
						<br>
						<span class="title">拍摄于{{dateTime(item2.videoDate)}}</span>
					</view>
				</view>
			</view>
		</scroll-view>
		<u-popup :show="reserveConfirmShow" mode="center">
			<view class="popBox">
				<span class = 'notice'>确定要删除该视频吗</span>
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
	import {getDate} from '../../../untils/getDate.js'
	import {baseUrl} from '../../../untils/baseUrl.js'
	import myVideo from './component/myVideo.vue'
	export default {
		name:"myVideos",
		data(){
			return{
				scenicSpot:[],
				myVideos:{},
				reserveConfirmShow:false,
				deleteThing:{},
			}
		},
		components:{
			myVideo
		},
		computed:{
			...mapState('userData',['userIsLoading','userIsLoadingId','userVideos'])
		},
		watch:{
			userVideos:{
				deep:true,
				handler(newValue){
					this.setmyVideos();//更新myVideos
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
				let flag = this.myVideos[item].length === 0;
				return !flag;
			},
			getScenicName(){
				uni.showLoading({
					title:"加载中",
				});
				 getScenicSpotName().then((res) => {
				  this.scenicSpot = res.data
				  uni.hideLoading(); // 关闭加载中弹框
				  this.setmyVideos();
				}).catch((err) => {
				  console.log(err); 
				});
			},
			setmyVideos(){
				this.scenicSpot.forEach(item=>{
					this.myVideos[item]=[];
					})
				if(this.userVideos){
					this.userVideos.forEach(item=>{
						this.myVideos[item.scenicSpot].push(item)
					})
				}
			},
			DeleteVideos(index){
				this.reserveConfirmShow = true;
				let videoList = this.userVideos;
				videoList.forEach((item,i)=>{
					if(index === i){
						this.deleteThing = item;
					}
				})
			},
			confirm(){
				const obj = this.deleteThing;
				let videoList = this.userVideos;
				videoList.forEach((item,index)=>{
					  if(obj.videoDate == item.videoDate){
					    videoList.splice(index,1)
						return;
					  }
				})
					this.$store.commit('userData/changeUserState',[this.userIsLoadingId,'videos',videoList])
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
			dateTime(ms){
				return getDate(ms);
			},
			showToast(params) {
					this.$refs.uToast.show({
						...params,
				})
			},
			getUrl(str){
				return baseUrl +"/static/videos/" +str;
			}
		},
		mounted() {
			this.getScenicName();
		}
	}
</script>

<style lang="scss" scoped>
	.myVideos{
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
				.videosMain{
					border: 5rpx solid rgba(0, 0, 0, .1);
					border-radius: 20rpx;
					padding: 20rpx 0;
					margin: 10rpx;
					.videos{
						margin-left: 50rpx;
						font-weight: 700;
						font-size: 35rpx;
					}
					.videosBox{
						width: 505rpx;
						line-height: 100rpx;
						font-weight: 500;
						font-size: 35rpx;
						background-color: rgba(255, 255, 255, .5);
						margin:30rpx 0 0 50rpx;
						padding: 0 50rpx;
						border-radius: 50rpx;
						.title{
							font-weight: 500;
							font-size: 24rpx;
							color: grey;
							margin-top: 80rpx;
						}
						.videosContent{
							width: 550rpx;
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
				transform: translateX(-45%);
				font-size: 50rpx;
			}
			button{
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