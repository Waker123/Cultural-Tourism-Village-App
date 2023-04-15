<template>
		<!-- 实拍视频 -->
		<view>
			<view class="fileTitle">实拍视频(最长为5分钟,不超过20mb)</view>
			<view v-if="videoSrc == ''" class="file videoFile" @tap="chooseVideo">
				<image style="width:112upx;height:98upx;" mode=""></image>
			</view>
			<view v-else class="file videoFile video_Box">
				<video :src="videoSrc" controls></video>
				<view class="closeA" @tap="deleteVideo">&times;</view>
			</view>
			<p v-show="uploadSuccessful" class="uploadSuccess">上传成功！即将返回</p>
			<u-toast ref="uToast"></u-toast>
		</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {baseUrl} from '../../untils/baseUrl.js'
	export default{
		name:"uploadShortVideo",
		data(){
			return{
				videoFile: '',
				videoSrc: '', // 视频资源路径
				video_tempFilePath: '', //上传视频的地址
				file: '',
				thumbTempFilePath: '', // 视频缩略图临时地址
				tempFilePath: [], // 视频资源临时地址
				shuiyinpath: '', // 带水印的视频缩略图
				w: '',
				h: '',
				mobile1_wx:1,
				params:'',/* 钓场id */
				optionName:'',/* 钓场name */
				uploadSuccessful:false,
				videoPath:''
			}
		},
		computed:{
			...mapState('changeScenicSpot',['currentScenicSpot']),
			...mapState('userData',['userIsLoadingId','userVideos']),
		},
		// watch:{
		// 	successfulImages(newValue){
		// 		if(newValue ===this.pic_tempFilePath.length){
		// 			this.uploadSuccessful = true;
		// 			this.storeImage();
		// 			setTimeout(()=>{
		// 				let pages = getCurrentPages();
		// 				let page =pages[pages.length-1];
		// 				let prevPage = pages[pages.length-2];
		// 				uni.navigateBack({
		// 					delta:1,
		// 					success:(event)=>{
		// 						prevPage.$vm.reload();
		// 					}
		// 				})
		// 			},2000)
		// 		}
		// 	}
		// },
		onLoad(option) {
			this.params=option.id;
			this.optionName=option.name;
		},
		methods:{
			
			// 选择视频   并上传
			chooseVideo() {
				var that = this;
				uni.chooseVideo({
					count: 1, //选择多少个视频
					sourceType: ['album', 'camera'], //视频来源相册和相机都可以
					maxDuration: 30, //相机拍摄最大时长为30S
					camera: 'back', //默认摄像头是后置摄像头
					success: res => {
						console.log('打印视频');
						this.videoSrc=res.tempFilePath;
						this.video_tempFilePath = res.tempFilePath;
						
						uni.uploadFile({
							 url:baseUrl+'/uploadVideos',
							 filePath:res.tempFilePath,
							 name:'file',
							 formData:{
								 // token:uni.getStorageSync('userInfo').token,
								 type:1,
								 file:res.tempFilePath,
							 },
							 header:{"Content-Type":"multipart/form-data"},
							 success:res=>{
								// console.log('上',res.data)
								let data = res.data;
								this.videoPath=data;
								// console.log(this.videoPath,111);
								// 可以返回视频或图片名字后，存储在对应的user localStorage里
								// this.uploadSuccessful = true;
								this.showToast({
											type: 'success',
											title: '发表成功',
											message: "发表成功，即将返回",
											iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
								})
								this.storeVideos();
								setTimeout(()=>{
									uni.navigateTo({
										url:'./shortVideoSolicitation'
									})
								},2000)
							 }
						})		
						
						
						
						this.pic_tempFilePath = res.tempFilePath;
						if (res.duration > '300') {
							uni.showToast({
								title: '视频不得超过5分钟,请重新选择',
								icon: 'none',
								duration: 1500
							});
						} else if (res.size > '24657920') {
							uni.showToast({
								title: '视频时长不得超过20MB,请重新选择',
								icon: 'none',
								duration: 1500
							});
						}
					},
					fail: res => {
						uni.showModal({
							content: '视频格式不正确，请重新选择',
							showCancel: false
						});
					}
				});
			},
			/* 删除视频 */
			deleteVideo(){
				this.videoSrc=''
			},
		
			storeVideos(){
				let list = this.userVideos;
				let ms = +new Date();
				list.push({
					videoSrc:this.videoPath,
					videoDate:ms.toString(),
					scenicSpot:this.currentScenicSpot
				})
				this.$store.commit('userData/changeUserState',[this.userIsLoadingId,'videos',list])
			},
			// 消息提示
			showToast(params) {
					this.$refs.uToast.show({
						...params,
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		width: 95vw;
		margin: 0 auto;
	}
	/* 按钮 */
	.surereply {
		background: #fd1441;
		box-shadow: 8upx 13upx 20upx 0px rgba(0, 0, 0, 0.1);
		line-height: 75upx;
		border-radius: 10upx;
		color: #fff;
		text-align: center;
		font-size: 34upx;
		margin: 40upx auto;
	}
	
	.photoBox {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.photo {
		width: 300upx;
		height: 300upx;
	}
	.video_Box{
		position: relative;
	}
	.closeA{
		width: 45upx;
		height: 45upx;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 50%;
		font-size: 36upx;
		text-align: center;
		line-height: 50upx;
		color: #fff;
		position: absolute;
		top: -17rpx;
		right: -8rpx;
		z-index: 666;
	}
	
	.fileTitle {
		height: 90upx;
		line-height: 90upx;
		font-size: 32upx;
	}
	.file {
		width: 220upx;
		height: 220upx;
		border: solid 1px #ccc;
		border-radius: 10upx;
		display: flex;
		font-size: 50px;
		align-items: center;
		justify-content: center;
		color: #ccc;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.imgFile {
		width: 220upx;
		height: 220upx;
		margin-bottom: 30upx;
		position: relative;
	}
	.close {
		width: 45upx;
		height: 45upx;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 50%;
		font-size: 36upx;
		text-align: center;
		line-height: 50upx;
		color: #fff;
		position: absolute;
		top: 0upx;
		right: 5upx;
		z-index: 66;
	}
	.uploadSuccess{
		position: fixed;
		bottom: 200rpx;
		left: 50%;
		transform: translateX(-50%);
		color: green;
		font-size: 50rpx;
		font-weight: 700;
	}
</style>