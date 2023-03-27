<template>
	<view class="choosePot">
		<!-- 见uview选择器 https://www.uviewui.com/components/picker.html -->
		<u-picker :show="scenicSpotShow" :columns="[scenicSpot]" title="请选择景点" @confirm="changeScenicSpot" @cancel ="show=false"></u-picker>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {getScenicSpotName} from '../../api/scenicSpotApi.js'
	export default{
		name:"chooseSpot",
		data(){
			return{
				scenicSpot:[],
			}
		},
		computed:{
			...mapState("changeScenicSpot",["scenicSpotShow"]),
		},
		methods:{
			changeScenicSpot(e){
				const {value} = e;//value是一个数组
				this.$store.commit('changeScenicSpot/changeScenicSpot',value[0]);
				this.$store.commit('changeScenicSpot/changeScenicSpotShow',false);
				// 将当前选择的景点传给actions，返回相应的数据到state中进行数据管理
				this.$store.dispatch('changeScenicSpot/getScenicData',value[0]);
			},
			// 获取景点名称
			getScenicName(){
				uni.showLoading({
					title:"加载中",
				});
				 getScenicSpotName().then((res) => {
				  this.scenicSpot = res.data
				  uni.hideLoading(); // 关闭加载中弹框
				}).catch((err) => {
				  console.log(err); 
				});
			},
			
		},
		created() {
			this.getScenicName();
		}
	}
</script>

<style lang="scss" scoped>
	.choosePot{
		width: 750rpx;
	}
</style>