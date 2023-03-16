<template>
	<view class="mainBlog">
		<u-transition :show="backgroundShow" mode="fade" duration='500'>
			<background-four class='transition bg'></background-four>
		</u-transition>
		<u-transition :show="!backgroundShow" mode="fade" duration='500'>
		    <background-five class='transition bg'></background-five>
		</u-transition>
		<blog-record class='blogRecord'></blog-record>
	</view>
</template>

<script>
import backgroundFour from '../../components/background/backgroundFour.vue'
import backgroundFive from '../../components/background/backgroundFive.vue'
import blogRecord from '../../components/blogRecord/blogRecord.vue'
import {mapState} from 'vuex'
export default {
	name:'myBlog',
	components:{
		backgroundFour,
		backgroundFive,
		blogRecord,
	},
	computed:{
		...mapState('backgroundShow',['backgroundShow']),
	},
	data(){
		return{
			show:true,
		}
	},
};
</script>

<style lang="scss" scoped>
	.mainBlog{
		position: relative;
		width: 750rpx;
		height: 1626rpx;
		.bg{
			position: absolute;
			top: 0;
			z-index: -99;
		}
		.blogRecord{
			position: absolute;
			top: 13%;
			left: 50%;
			transform: translateX(-50%);
			
		}
	}
</style>