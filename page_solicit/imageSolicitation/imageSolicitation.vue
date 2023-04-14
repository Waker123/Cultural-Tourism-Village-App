<template>
   <view class="imagesMain">
   	<scroll-view  v-show="true"  scroll-y="true" class="scroll-Y" >
  		<view class="card" v-for="(item,index) in albumData" :key="item.imageDate">
			<album-image :myImageSrcs="item.imageSrc" :myUserId="item.userId" :myPictureTime="item.imageDate"></album-image>
   		</view>
   	</scroll-view>
	<u-popup :show="!currentScenicSpot" mode="center">
		<view class="popBox" v-if="!currentScenicSpot">
			<span>请先选择景点</span>
			<button size="mini" @click="getToIndex">前往首页</button>
		</view>
	</u-popup>
	<view class="uploadImages" @tap="gotoUploadImages">
		<image src="../../static/image/imageUpload.png" class="uploadImg"></image>
		<span>上传图片</span>
	</view>
   </view>
</template>

<script>
	import albumImage from './component/albumImages.vue'
	import {mapState} from 'vuex'
	export default{
		name:"imageSolicitation",
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
					if(data[item1]['images']){
					data[item1]['images'].forEach(item2=>{
						if(item2["scenicSpot"]===this.currentScenicSpot){
							this.albumData.push({
								userId:item1,
								imageSrc:item2['imageSrcs'],
								imageDate:item2['imageDate']
							})
						}
					})
					}
				})
				// 按时间降序(根据毫秒值排序)
				this.albumData.sort((item1,item2)=>{
					return item2["imageDate"] - item1['imageDate']
				})
				console.log(this.albumData)
			},
			gotoUploadImages(){
				uni.navigateTo({
					url:"./uploadImages"
				})
			},
			    reload() {
			        // // 页面重载
			        // const pages = getCurrentPages()
			        // // 声明一个pages使用getCurrentPages方法
			        // const curPage = pages[pages.length - 1]
			        // // 声明一个当前页面
			        // curPage.onLoad(curPage.options) // 传入参数
			        // curPage.onShow()
			        // curPage.onReady()
			        // // 执行刷新
					this.updateAlbumData();
			    },
			

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
		mounted() {
			// const count = 86400000;
			// this.$store.commit('userData/changeUserState',[this.userIsLoadingId,'images',[
			// 	{
			// 			imageSrcs:['15.jpeg','16.jpeg','17.jpeg','18.jpeg'],
			// 			imageDate:(+new Date()-count*25).toString(),
			// 			scenicSpot:"指南村",
			// 		},
			// 		{
			// 			imageSrcs:['19.jpeg'],
			// 			imageDate:(+new Date()-count*45).toString(),
			// 			scenicSpot:"指南村",
			// 		},
			// 		{
			// 			imageSrcs:['20.jpeg','21.jpeg','22.jpeg'],
			// 			imageDate:(+new Date()-count*.6).toString(),
			// 			scenicSpot:"指南村",
			// 		},
			// 	]])
			
		}
		
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
	.uploadImages{
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