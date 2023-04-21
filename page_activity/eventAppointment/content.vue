<template>
	<view class="campingMain">
		<scroll-view  scroll-y="true" class="scroll-Y" >
				<view class="card">
					<span class='title'>{{title}}</span>
					<br>
					<br>
					<text class='content'>{{content}}</text>
					<br>
					<br>
					<span class="dateTime">{{dateTime}}</span>
					<button class="btn" @click="reserve" :disabled="btnDisable">预约</button>
					<br>
					<br>
				</view>	
		</scroll-view>
		<u-popup :show="!currentScenicSpot" mode="center">
			<view class="popBox">
				<span>请先选择景点</span>
				<button size="mini" @click="getToIndex">前往首页</button>
			</view>
		</u-popup>
		<u-popup :show="reserveConfirmShow" mode="center">
			<view class="popBox">
				<span class = 'notice'>确定要预约该活动吗</span>
				<button class='confirm' size="mini" @tap="$u.throttle(confirm, 500)">确认</button>
				<button class='cancel' size="mini" @tap="$u.throttle(cancel, 500)">取消</button>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:'campingTourContent',
		data(){
			return{
				title:'',
				content:'',
				scenicSpot:'',
				dateTime:'',
				reserveConfirmShow:false,
				reserveActivity:[],
				btnDisable:false
			}
		},
		computed:{
			...mapState('changeScenicSpot',['currentScenicSpot']),
			...mapState('userData',['userIsLoading',"userIsLoadingId","userActivity"])
		},
		watch:{
			userActivity:{
				immediate:true,
				deep:true,
				handler(newValue){
					this.updateRserveActivity();//防止刷新后订阅酒店，之前的订阅消失的问题
					this.reserveFlag();//预约按钮是否可用
				}
			}
		},
		methods:{
			getToIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			reserve(){
				this.reserveActivity.push({
					title:this.title,
					scenicSpot:this.scenicSpot,
					dateTime:this.dateTime,
				})
				this.reserveConfirmShow = true;
			},
			reserveFlag(){
				let flag = false;
				if(this.userActivity){
					this.userActivity.forEach(item=>{
						if(item.title == this.title && item.dateTime == this.dateTime){
							flag = true;
						}
					})
				}
				this.btnDisable = flag;
			},
			updateRserveActivity(){
				this.reserveActivity = this.userActivity;
			},
			confirm(){
				const activity = this.reserveActivity;
				this.$store.commit('userData/changeUserState',[this.userIsLoadingId,'activity',activity])
				this.reserveConfirmShow = false;
				this.showToast({
							type: 'success',
							title: '预定成功',
							message: "预定成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
				})
			},
			cancel(){
				this.reserveActivity.pop();
				this.reserveConfirmShow = false;
			},
			// 消息提示
			showToast(params) {
					this.$refs.uToast.show({
						...params,
				})
			},
		},
		onLoad(option) {
			this.title = option.title;
			this.content = option.content;
			this.scenicSpot = option.scenicSpot;
			this.dateTime = option.dateTime;
		},
		mounted() {
			this.reserveFlag();
		}
	}
</script>

<style lang="scss" scoped>
	.campingMain{
		width: 750rpx;
		height: 1200rpx;
		background-image: linear-gradient(to bottom right, #ebbba7 0%, #cfc7f8 100%);
		padding: 0;
		.scroll-Y{
			width: 700rpx;
			height: 1150rpx;
			margin-left: 25rpx;
			.card{
				display: inline-block;
				box-sizing: content-box;
				width: 500rpx;
				height: auto;
				background-color: rgba(255, 255, 255, .2);
				box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(0, 0, 0, .2);
				border-radius: 10rpx;
				margin: 50rpx;
				padding: 50rpx;
				overflow: hidden;//清除浮动
				.title{
					font-weight: 700;
					font-size: 50rpx;
					margin: 20rpx 0 0 50rpx;
				}
				.content{
					font-weight: 500;
					font-size: 32rpx;
				}
				.dateTime{
					float: left;
					font-size: 24rpx;
					color: gray;
				}
				.btn{
					float: right;
					width: 150rpx;
					height: 100rpx;
					text-align: center;
					line-height: 100rpx;
					background-color: skyblue;
					color: white;
					margin: 0;
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