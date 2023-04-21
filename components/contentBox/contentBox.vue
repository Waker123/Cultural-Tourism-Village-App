<template>
	<view class="contentMain">
		<ul>
			<li class='box'>
				<!--
				 @tap="$u.throttle(scenicSpotIntroduce, 500)" ：使用了uview的节流组件
				https://www.uviewui.com/js/debounce.html
				 -->
				<a class="hrefBox" @tap="$u.throttle(scenicSpotIntroduce, 500)">
					<img class="icon" src="../../static/image/fengjing2.png">
					<span class='boxTitle'>景点介绍</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @tap="$u.throttle(scenicSpotHomestay, 500)">
					<img class="icon" src="../../static/image/mingsu.png">
					<span class='boxTitle'>乡村民宿</span>
				</a>
			</li>
			 <li class='box'>
				<a class="hrefBox" @tap="$u.throttle(scenicSpotSpeciality, 500)">
					<img class="icon" src="../../static/image/speciality.png">
					<span class='boxTitle'>乡村特产</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @tap="$u.throttle(scenicSpotScenery, 500)">
					<img class="icon" src="../../static/image/meijing.png">
					<span class='boxTitle'>乡村美景</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @tap="$u.throttle(scenicSpotVideo, 500)">
					<img class="icon" src="../../static/image/video.png">
					<span class='boxTitle'>乡村视频</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox">
					<scenic-spot-map class='icon'></scenic-spot-map>
					<span class='boxTitle'>地图导航</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox"  @tap="$u.throttle(scenicSpotImageSolicitation, 500)">
					<img class="icon" src="../../static/image/picture.png">
					<span class='boxTitle'>图片征稿</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @tap="$u.throttle(scenicSpotShortVideosSolicitation, 500)">
					<img class="icon" src="../../static/image/shortVideo.png">
					<span class='boxTitle'>视频征稿</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @tap="$u.throttle(scenicSpotArticleSolicitation, 500)">
					<img class="icon" src="../../static/image/article.png">
					<span class='boxTitle'>文章征稿</span>
				</a>
			</li>
			<li class='box' @tap="$u.throttle(scenicSpotCountryTour, 500)">
				<a class="hrefBox">
					<img class="icon" src="../../static/image/ruralTourism.png">
					<span class='boxTitle'>乡村游</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @tap="$u.throttle(scenicSpotCampingTour, 500)">
					<img class="icon" src="../../static/image/campingTour.png">
					<span class='boxTitle'>露营游</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @tap="$u.throttle(scenicSpotResearchTour, 500)">
					<img class="icon" src="../../static/image/researchTour.png">
					<span class='boxTitle'>研学游</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @tap="$u.throttle(scenicSpotLiveStreaming, 500)">
					<img class="icon" src="../../static/image/live.png">
					<span class='boxTitle'>活动直播</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @tap="$u.throttle(scenicSpotCulturalResources, 500)">
					<img class="icon" src="../../static/image/culturalResources.png">
					<span class='boxTitle'>文化资源</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @tap="$u.throttle(scenicSpotEventAppointment, 500)">
					<img class="icon" src="../../static/image/activity.png">
					<span class='boxTitle'>预约活动</span>
				</a>
			</li>
		</ul>
	</view>
</template>

<script>
	import scenicSpotMap from '../scenicSpotMap/scenicSpotMap.vue'
	export default{
		name:'contentBox',
		data(){
			return{
			}
		},
		components:{
			scenicSpotMap
		},
		methods:{
			scenicSpotIntroduce(){
				uni.navigateTo({
					url: '../../page_main/main/introduce/introduce'
				})
			},
			scenicSpotHomestay(){
				uni.navigateTo({
					url: '../../page_main/main/homestay/homestay'
				})
			},
			scenicSpotSpeciality(){
				uni.navigateTo({
					url: '../../page_main/main/speciality/speciality'
				})
			},
			scenicSpotScenery(){
				uni.navigateTo({
					url:'../../page_main/main/scenery/scenery'
				})
			},
			scenicSpotVideo(){
				uni.navigateTo({
					url:'/page_main/main/video/scenicSpotVideo'
				})
			},
			scenicSpotImageSolicitation(){
				uni.navigateTo({
					url:"/page_solicit/imageSolicitation/imageSolicitation"
				})
			},
			scenicSpotShortVideosSolicitation(){
				uni.navigateTo({
					url:"/page_solicit/shortVideoSolicitation/shortVideoSolicitation"
				})
			},
			scenicSpotArticleSolicitation(){
				uni.navigateTo({
					url:"/page_solicit/articleSolicitation/articleSolicitation"
				})
			},
			scenicSpotCountryTour(){
				uni.navigateTo({
					url:"/page_tour/countryTour/countryTour"
				})
			},
			scenicSpotCampingTour(){
				uni.navigateTo({
					url:"/page_tour/campingTour/campingTour"
				})
			},
			scenicSpotResearchTour(){
				uni.navigateTo({
					url:"/page_tour/researchTour/researchTour"
				})
			},
			scenicSpotLiveStreaming(){
				uni.navigateTo({
					url:"/page_activity/liveStreaming/liveStreaming"
				})
			},
			scenicSpotCulturalResources(){
				uni.navigateTo({
					url:"/page_activity/culturalResources/culturalResources"
				})
			},
			scenicSpotEventAppointment(){
				uni.navigateTo({
					url:"/page_activity/eventAppointment/eventAppointment"
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.contentMain{
		width: 700rpx;
		// height: 500rpx;
		background-color: rgba(255, 255, 255, .8);
		border: 4rpx solid rgba(255, 255, 255, .8);
		border-radius: 50rpx;
		padding: 10rpx;
		text-align: center;
		ul{
			padding: 10rpx;
			.box{
				width: 120rpx;
				height: 120rpx;
				display: inline-block;
				margin: 20rpx;
				// border: 2rpx solid grey;
				box-shadow: 3rpx 3rpx 3rpx 3rpx rgba(0, 0, 0, .2);
				border-radius: 15rpx;
				padding: 15rpx;
				.hrefBox{
					display: flex;
					flex-direction: column;
					align-items: center;
					.icon{
						width: 90rpx;
						height: 90rpx;
					}
					.boxTitle{
						font-weight: 500;
					}
				}
			}
		}
	}
</style>