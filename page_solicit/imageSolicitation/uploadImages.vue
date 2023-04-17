<template>
	<!-- 实拍照片 -->
	<view>
		<view class="fileTitle">最多选择6张图片</view>
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
			<!-- <p v-show="uploadSuccessful" class="uploadSuccess">上传成功！即将返回</p> -->
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {baseUrl} from '../../untils/baseUrl.js'
	export default{
		name:"uploadImages",
		data(){
			return{
				photosSrc: [], //照片的路径
				pic_tempFilePath: [], //上转图片的数组
				file: '',
				w: '',
				h: '',
				mobile1_wx:1,
				imageLists:[],
				params:'',/* 钓场id */
				optionName:'',/*, 钓场name */
				// uploadSuccessful:false,
				successfulImages:0
			}
		},
		computed:{
			...mapState('changeScenicSpot',['currentScenicSpot']),
			...mapState('userData',['userIsLoadingId','userImages',"userIsLoading"]),
		},
		watch:{
			successfulImages(newValue){
				if(newValue ===this.pic_tempFilePath.length){
					this.storeImage();
					this.showToast({
								type: 'success',
								title: '发表成功',
								message: "发表成功，即将返回",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
					})
					setTimeout(()=>{
						let pages = getCurrentPages();
						let page =pages[pages.length-1];
						let prevPage = pages[pages.length-2];
						uni.navigateBack({
							delta:1,
							success:(event)=>{
								prevPage.$vm.reload();
							}
						})
					},2000)
				}
			}
		},
		onLoad(option) {
			this.params=option.id;
			this.optionName=option.name;
		},
		methods:{
			
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
						this.pic_tempFilePath = res.tempFilePaths;
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
				let date = "";//水印   
				// let date = "文旅乡村小程序";//水印   
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
								  			let data = res.data//获取上传的图片名称
								  			this.imageLists.push(data)
											this.successfulImages++;
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
			
			storeImage(){
				let list = this.userImages;
				let ms = +new Date();
				list.push({
					imageSrcs:this.imageLists,
					imageDate:ms.toString(),
					scenicSpot:this.currentScenicSpot
				})
				this.$store.commit('userData/changeUserState',[this.userIsLoadingId,'images',list])
			},
			// 消息提示
			showToast(params) {
					this.$refs.uToast.show({
						...params,
				})
			},
			getToLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
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