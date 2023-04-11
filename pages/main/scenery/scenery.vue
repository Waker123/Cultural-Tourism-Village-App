<template>
<!-- 乡村美景界面 -->
	<view class="sceneryMain">
		<scroll-view  v-show="true"  scroll-y="true" class="scroll-L" >
				
		</scroll-view>
		<scroll-view  v-show="true"  scroll-y="true" class="scroll-R" >
			
		</scroll-view>
	</view>

</template>

<script>
	export default{
		name:"scenery",
		data(){
			return{
				
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.sceneryMain{
		position: relative;
		width: 750rpx;
		height: 1200rpx;
		background-color: #FDF5E6;
		.scroll-L{
			position: absolute;
			left: 5%;
			top: 10%;
			height: 1100rpx;
		}
		.scroll-R{
			position: absolute;
			left: 5%;
			top: 10%;
			height: 1100rpx;
		}
	}
</style>