<template>
		<!-- 实拍视频 -->
		<view class="uploadMain">
			<u--textarea v-model="articleContent" placeholder="请输入内容" count autoHeight maxlength='1000'></u--textarea>
			<button class="btn" @click="uploadArticle">发表</button>
			<!-- <p v-show="uploadSuccessful" class="uploadSuccess">发表成功！即将返回</p> -->
			<u-toast ref="uToast"></u-toast>
			<u-popup :show="!userIsLoading" mode="center">
				<view class="popBox" v-if="!userIsLoading">
					<span>请先登录</span>
					<button size="mini" @click="getToLogin">去登录</button>
				</view>
			</u-popup>			
		</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:"uploadArticles",
		data(){
			return{
				articleContent: '',
				
			}
		},
		computed:{
			...mapState('changeScenicSpot',['currentScenicSpot']),
			...mapState('userData',['userIsLoadingId','userArticles','userIsLoading']),
		},

		methods:{

			storeVideos(){
				let list = this.userArticles;
				let ms = +new Date();
				list.push({
					articleContent:this.articleContent,
					articleDate:ms.toString(),
					scenicSpot:this.currentScenicSpot
				})
				this.$store.commit('userData/changeUserState',[this.userIsLoadingId,'articles',list])
			},
			uploadArticle(){
				this.storeVideos();
				this.showToast({
							type: 'success',
							title: '发表成功',
							message: "发表成功，即将返回",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
				})
				setTimeout(()=>{
					uni.navigateTo({
						url:'./articleSolicitation'
					})
				},2000)
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
	.uploadMain{
		width: 750rpx;
		height: 1200rpx;
		background-color: #fff;
		padding: 50rpx 0;
		.btn{
			font-weight: 700;
			background-color: royalblue;
			color: #fff;
			margin-top: 20rpx;
		}
	}
</style>