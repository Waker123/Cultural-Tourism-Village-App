<template>
   <view class="imagesMain">
   	<scroll-view  v-show="true"  scroll-y="true" class="scroll-Y" >
  		<view class="card" v-for="(item,index) in albumData" :key="item.videoDate">
			<album-image :myVideoSrc="item.videoSrc" :myUserId="item.userId" :myVideoTime="item.videoDate"></album-image>
   		</view>
   	</scroll-view>
	<u-popup :show="!currentScenicSpot" mode="center">
		<view class="popBox" v-if="!currentScenicSpot">
			<span>请先选择景点</span>
			<button size="mini" @click="getToIndex">前往首页</button>
		</view>
	</u-popup>
	<view class="uploadVideos" @tap="gotoUploadVideos">
		<image src="../../static/image/videoUpload.png" class="uploadImg"></image>
		<span>上传短视频</span>
	</view>
   </view>
</template>

<script>
	import albumImage from './component/albumImages.vue'
	import {mapState} from 'vuex'
	export default{
		name:"shortVideoSolicitation",
		components:{
			albumImage
		},
		data(){
			return{
				albumData:[],
			}
		},
		computed:{
			...mapState('changeScenicSpot',['currentScenicSpot']),
			...mapState('userData',['userIsLoadingId','userData'])
		},
		methods:{
			getToIndex(){
				uni.switchTab({
					url:"../../pages/index/index"
				})
			},
			updateAlbumData(){
				this.albumData = [];//清空 防止重复导入该数组
				const data = this.userData;//user的总数据
				Object.keys(data).forEach(item1=>{
					if(data[item1]['videos']){
					data[item1]['videos'].forEach(item2=>{
						if(item2["scenicSpot"]===this.currentScenicSpot){
							this.albumData.push({
								userId:item1,
								videoSrc:item2['videoSrc'],
								videoDate:item2['videoDate']
							})
						}
					})
					}
				})
				// 按时间降序(根据毫秒值排序)
				this.albumData.sort((item1,item2)=>{
					return item2["videoDate"] - item1['videoDate']
				})
			},
			gotoUploadVideos(){
				uni.navigateTo({
					url:"./uploadShortVideo"
				})
			}

			

		},
		watch:{
			userData:{
				immediate:true,
				deep:true,
				handler(newValue){
					this.updateAlbumData();
				}
			}
		},
		
		
	}
</script>

<style lang="scss" scoped>
 .imagesMain{
	 position: relative;
	 width: 750rpx;
	 background-color: #F0F0F0;
	 .scroll-Y{
	 	height: 1200rpx;
	 	padding: 50rpx 8rpx;
		.card{
			width: 725rpx;
			// height: 300rpx;
			background-color: white;
			border-radius: 20rpx;
			padding: 50rpx 0;
			margin: 10rpx 0;
			box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(0, 0, 0, .2);
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
	}
	.uploadVideos{
		position: fixed;
		top: 100rpx;
		/*   #ifdef H5 */
		top:180rpx;
		/* #endif */
		right: 50rpx;
		border: 2rpx solid black;
		border-radius: 10rpx;
		.uploadImg{
			width: 50rpx;
			height: 50rpx;
			vertical-align: middle;
		}
		span{
			font-size: 32rpx;
		}
	}
 }	
</style>