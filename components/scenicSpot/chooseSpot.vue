<template>
	<view class="choosePot">
		<!-- 见uview选择器 https://www.uviewui.com/components/picker.html -->
		<u-picker :show="scenicSpotShow" :columns="[scenicSpot]" title="请选择景点" @confirm="changeScenicSpot" @cancel ="show=false"></u-picker>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:"chooseSpot",
		data(){
			return{
			}
		},
		computed:{
			...mapState("changeScenicSpot",["scenicSpot","scenicSpotShow"]),
		},
		methods:{
			changeScenicSpot(e){
				const {value} = e;//value是一个数组
				this.$store.commit('changeScenicSpot/changeScenicSpot',value[0]);
				this.$store.commit('changeScenicSpot/changeScenicSpotShow',false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.choosePot{
		width: 750rpx;
	}
</style>