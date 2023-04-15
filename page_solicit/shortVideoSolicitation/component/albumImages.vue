<template>
    <view class="u-page">
        <view class="u-demo-block">
            <view class="u-demo-block__content">
                <view class="album">
                    <view class="album__avatar">
                        <image
						src='https://cdn.uviewui.com/uview/album/1.jpg'
                                mode=""
                                style="width: 32px;height: 32px;"
                        ></image>
                    </view>
                    <view class="album__content">
                        <u--text
                                :text="`用户名:`+userId"
                                type="primary"
                                bold
                                size="17"
                        ></u--text>
                        <u--text
                                margin="0 0 8px 0"
                                :text="dateTime(videoTime)"
                        ></u--text>
                        <my-video :src="videoSrc"></my-video>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import {baseUrl} from '../../../untils/baseUrl.js'
	import {getDate} from '../../../untils/getDate.js'
	import myVideo from './myVideo.vue'
	export default{
		name:"albumImage",
		data(){
			return{
				 albumWidth: 0,
				userId:this.myUserId,
				videoSrc:'',//因为组件需要传入的是数组
				videoTime:this.myVideoTime
			}
		},
		components:{
			myVideo
		},
		props:{
			myUserId:{
				type:String,
				required:true
			},
			myVideoSrc:{
				type:String,
				required:true
			},
			myVideoTime:{
				type:String,
				required:true
			}
		},
		watch:{
			// 获取到的只是图片的名字，没有加上路径，在这边加上路径
			myVideoSrc:{
				immediate:true,
				deep:true,
				handler(newValue){
					this.videoSrc = baseUrl+'/static/videos/'+this.myVideoSrc;
				}
			}
		},
		methods:{
			// updateVideoSrc() {
			// 	this.videoSrc.push(baseUrl+'/static/videos/'+this.myVideoSrc);
			// 	this.videoSrc = this.unique(this.videoSrc)
			// },
			dateTime(ms){
				return "拍摄于"+getDate(ms)
			},
			// // 去重 防止页面刷新后，出现多次调用该组件，导致一张图片多次出现的bug
			// unique(arr) {
			//     const newArr = []
			//     const obj = {}
			//     arr.forEach(item => {
			//       if (!obj[item]) {
			//         newArr.push(item)
			//         obj[item] = true
			//       }
			//     })
			  
			//     return newArr
			//   }

		}

	}
</script>

<style lang="scss" scoped>
.album {
        @include flex;
        align-items: flex-start;

        &__avatar {
             background-color: $u-bg-color;
             padding: 5px;
             border-radius: 3px;
         }
    
        &__content {
             margin-left: 10px;
             flex: 1;
         }
    }
</style>