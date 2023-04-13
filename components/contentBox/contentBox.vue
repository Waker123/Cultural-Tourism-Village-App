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
			<!--
			<li class='box'>
				<a class="hrefBox" @click="aaa">
					<img class="icon" src="../../static/image/fengjing2.png">
					<span class='boxTitle'>景点介绍</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @click="aaa">
					<img class="icon" src="../../static/image/fengjing2.png">
					<span class='boxTitle'>景点介绍</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @click="aaa">
					<img class="icon" src="../../static/image/fengjing2.png">
					<span class='boxTitle'>景点介绍</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @click="aaa">
					<img class="icon" src="../../static/image/fengjing2.png">
					<span class='boxTitle'>景点介绍</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @click="aaa">
					<img class="icon" src="../../static/image/fengjing2.png">
					<span class='boxTitle'>景点介绍</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @click="aaa">
					<img class="icon" src="../../static/image/fengjing2.png">
					<span class='boxTitle'>景点介绍</span>
				</a>
			</li>
			<li class='box'>
				<a class="hrefBox" @click="aaa">
					<img class="icon" src="../../static/image/fengjing2.png">
					<span class='boxTitle'>景点介绍</span>
				</a>
			</li> -->
		</ul>
	</view>
</template>

<script>
	export default{
		name:'contentBox',
		data(){
			return{
			}
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
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.contentMain{
		width: 700rpx;
		height: 500rpx;
		background-color: rgba(255, 255, 255, .8);
		border: 4rpx solid rgba(255, 255, 255, .8);
		border-radius: 50rpx;
		padding: 10rpx;
		text-align: center;
		ul{
			padding: 10rpx;
			.box{
				display: inline-block;
				margin: 20rpx;
				// border: 2rpx solid grey;
				box-shadow: 3rpx 3rpx 3rpx 3rpx rgba(0, 0, 0, .2);
				border-radius: 15rpx;
				padding: 20rpx;
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