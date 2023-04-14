<template>
	<view class="box">
		<!-- 实拍视频 -->
		<view>
			<view class="fileTitle">实拍视频</view>
			<view v-if="videoSrc == ''" class="file videoFile" @tap="chooseVideo">
				<image style="width:112upx;height:98upx;" mode=""></image>
			</view>
			<view v-else class="file videoFile video_Box">
				<video :src="videoSrc" controls></video>
				<view class="closeA" @tap="deleteVideo">&times;</view>
			</view>
		</view>
		<!-- 实拍照片 -->
		<view>
			<view class="fileTitle">实拍照片</view>
			<view class="photoBox" name="photoBox">
				<canvas style="border: 1px solid green;position: absolute;left: -5000px;" :style="{'width':w,'height': h}" canvas-id="firstCanvas" ref="mycanvas"></canvas>
				<block v-for="(item, index) in photosSrc" :key="index">
					<view class="file imgFile">
						<image class="photo" :src="item"></image>
						<view class="close" @tap="deletePhoto(index)">&times;</view>
					</view>
				</block>
				<view v-if="photosSrc.length < 6" class="file imgFile" @tap="chooseImage">
					<image style="width: 112upx;height: 98upx;"  mode=""></image>
				</view>
			</view>
		</view>
		<!-- 提交按钮 -->
<!-- 		<view class="surereply" @tap='tiJIao'>
			提交
		</view> -->
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {baseUrl} from '../../untils/baseUrl.js'
	export default {
		data() {
			return {
				// app: getApp().globalData.peiImg,//图片
				videoFile: '',
				videoSrc: '', // 视频资源路径
				photosSrc: [], //照片的路径
				pic_tempFilePath: [], //上转图片的数组
				video_tempFilePath: '', //上传视频的地址
				file: '',
				thumbTempFilePath: '', // 视频缩略图临时地址
				tempFilePath: [], // 视频资源临时地址
				shuiyinpath: '', // 带水印的视频缩略图
				w: '',
				h: '',
				mobile1_wx:1,
				imageLists:[],
				params:'',/* 钓场id */
				optionName:''/* 钓场name */
			};
		},
		onLoad(option) {
				console.log('235446554464',option)
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
						console.log(res);
						console.log(res.tempFilePath);
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
								console.log('上',res.data)
								// let data = JSON.parse(res.data)
								// that.video_tempFilePath=data.data.file_url
								// 可以返回视频或图片名字后，存储在对应的user localStorage里
							 }
						})		
						
						
						
						this.pic_tempFilePath = res.tempFilePath;
						if (res.duration > '300') {
							uni.showToast({
								title: '视频不得超过5分钟,请重新选择',
								icon: 'none',
								duration: 1500
							});
						} else if (res.size > '10485760') {
							uni.showToast({
								title: '视频时长不得超过10MB,请重新选择',
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
			
			
			
			// 选择照片
			chooseImage() {
				let that = this;
				uni.chooseImage({
					count: 6, //从相册中都可选择的图片个数
					sizeType: ['original', 'compressed'], //选择图片的大小
					sourceType: ['album', 'camera'], //选择图片的来源
					success: res => {
						//图片数组
						let tempFilePath = res.tempFilePaths; 
						let num = 0;
						let inter = setInterval(()=>{
							that.setimg(tempFilePath[num]);
							num++;
							if(num==tempFilePath.length){
								num= 0 ;
								clearInterval(inter);
							}
						},500)
					}
				});
			},
			
			//获取图片信息
			setimg(e){

				let date = "文旅乡村小程序";//水印   
				let that = this;
				let ctx = uni.createCanvasContext('firstCanvas',this);
				uni.getImageInfo({
					src:e,
					success: (res) => {
						that.w = res.width/2+'px';
						that.h = res.height/2+'px';
						//初始化画布
						
						ctx.fillRect(0, 0, that.w, that.h);
						
						// //将图片src放到cancas内，宽高为图片大小
						ctx.drawImage(res.path,0,0,res.width/2,res.height/2);
						
						ctx.rotate(45 * Math.PI / 180); 
									
						//对斜对角线以左部分进行文字的填充
						for (let j = 1; j < 10; j++) { //用for循环达到重复输出文字的效果，这个for循环代表纵向循环
							ctx.beginPath();
							ctx.setFontSize(20);
							ctx.setFillStyle("rgba(169,169,169,.6)");
							
							ctx.fillText(date, 0, 50 * j);
							for (let i = 1; i < 10; i++) { //这个for循环代表横向循环，
								ctx.beginPath();
								ctx.setFontSize(20);
								ctx.setFillStyle("rgba(169,169,169,.6)");
								ctx.fillText(date, 80 * i, 50 * j);
								
							}
						} //两个for循环的配合，使得文字充满斜对角线的左下部分
									
						// 对斜对角线以右部分进行文字的填充逻辑同上
						for (let j = 0; j < 10; j++) {
							ctx.beginPath();
							ctx.setFontSize(20);
							ctx.setFillStyle("rgba(169,169,169,.6)");
									
							ctx.fillText(date, 0, -50 * j);
							for (let i = 1; i < 10; i++) {
								ctx.beginPath();
								ctx.setFontSize(20);
								ctx.setFillStyle("rgba(169,169,169,.6)");
								ctx.fillText(date, 80 * i, -50 * j);
							
							}
						}
						ctx.rotate(-45 * Math.PI / 180);
						ctx.draw(false, () => {
							uni.canvasToTempFilePath({	//将画布中内容转成图片，即水印与图片合成
							  canvasId: 'firstCanvas',
							  success: (res) => {
								  	that.photosSrc.push(res.tempFilePath);
									
								  /* 把所有的图片给了后台  重点*/
								  	 uni.uploadFile({
								  		 url:baseUrl+'/uploadImages',
								  		 filePath:res.tempFilePath,
								  		 name:'file',
								  		 // formData:{
								  			//  // token:uni.getStorageSync('userInfo').token,
								  			//  type:1,
								  			//  file:res.tempFilePath
								  		 // },
								  		 header:{"Content-Type":"multipart/form-data"},
								  		 success:res=>{
								  			// let data = JSON.parse(res.data)
											console.log(res,111)
								  			// that.imageLists.push(data.data.file_url)
								  		 }
								  	 })			 
	
								  
								  if (that.photosSrc.length > 6) {
								  	that.photosSrc = that.photosSrc.slice(0, 6);
								  	uni.showToast({
								  		title: '照片最多上传6张',
								  		icon: 'none',
								  		duration: 1500
								  	});
								  } else {
								  	
								  }
								  
							  }
							})
						})
						
						
						
					}
				})
			},
			
			
			
			//删除照片
			deletePhoto(index) {
				this.photosSrc.splice(index, 1);
				this.thumbTempFilePath = '';
			},
			/* 删除视频 */
			deleteVideo(){
				this.videoSrc=''
			},
			tiJIao(){
				if(this.videoSrc==''){
					uni.showToast({
						icon: 'none',
						title: '请上传视频',
						duration: 1500
					});
				}else if (this.photosSrc.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '实拍照片最少上传一张',
						duration: 1500
					});
				} else {
					/* 调接口 */
					let url = '/api/place/placeAddVedio';
					let data = {
						// token:uni.getStorageSync('userInfo').token,
						pid:this.params,
						title:this.optionName,
						vedioUrl: this.video_tempFilePath,//视频路径
						imgUrl:this.imageLists.join(","),//	多图片
					};
					this.$request.post(url, data).then(res => {
						if(res.code==1){
							uni.showToast({
							    title: '提交成功',
								icon:'none'
							});
							setTimeout(function () {
							    // uni.redirectTo({
							    // 	url:'./fishingPlaceDetail'
							    // })
								uni.navigateBack({
								    delta: 1
								})
							}, 2000);
						}else if(res.code==100){
								uni.showToast({
								    title: '请购买上传次数',
									icon:'none'
								});
							}
						
					});
				}
			}
		}
	}
</script>

<style lang="scss">
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
	video {
		width: 220upx;
		height: 220upx;
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
</style>

