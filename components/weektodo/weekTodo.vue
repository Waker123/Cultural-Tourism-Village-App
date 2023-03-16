<template>
	<view class="weekTodo-Main">
	<view class="week-todo">
		<view class="title">今天星期{{ today }}</view>
		<view class="todo-wrapper">
		  <view
		    class="todo-item"
		    v-for="(item, index) in todoList[curDay]"
		    :key="index"
		  >
		    {{ item }}
		  </view>
		</view>
		<button class="planButton" @click="dialogVisible = true">
		      重新制定本周计划
		</button>
		</view>
		<u-popup class='popList' :show="dialogVisible" mode="center" round='15' :overlay="!dialogVisible" >
			<span>请使用","隔开</span>
			<view class="listPlan" v-for="(item, index) in todoList"  :key="index">
				<label>周{{ WeekDate[index] }}:</label
			><input type="text" v-model="todoList[index]">
			</view>
			<button @click="storePlan" class="dialogBtn">确定</button>
		</u-popup>
			<u-notify ref="uNotify" message="修改成功"></u-notify>
	</view>
</template>

<script>
	import {DAY_TO_CHINESE} from '../../untils/constant.js' 
	import useLocalStorage from '../../untils/useLocalstorage.js'
	export default{
		name:'weekTodo',
		data(){
			return{
				curDay:(new Date().getDay()+6)%7,
				todoList:[],
				dialogVisible:false,
				WeekDate:DAY_TO_CHINESE,
			}
		},
		computed:{
			today(){
				return DAY_TO_CHINESE[this.curDay]
			}
		},
		watch:{
			todoList:{
				deep:true,
				handler(){
					 this.todoList.forEach((item) => {
					    let index = this.todoList.indexOf(item);
					    if (typeof item === "string") {
					      this.todoList[index] = item.split(",");
					    }
					  });
				}
			}
		},
		methods:{
			storePlan(){
			  const weekStore = useLocalStorage();
			  this.dialogVisible= false;
			  let storeList = {};
			  this.todoList.forEach((item) => {
			    let index = this.todoList.indexOf(item); //对象的属性(索引号)
			    storeList[index] = item;
			  });
			  weekStore.setItem("WEEKTODO", storeList);
			  this.$refs.uNotify.show({
			            top: 10,
			            type: 'success',
			            color: '#e8e8e8',
			            bgColor: '#76EE00',
			            message: '修改成功',
			            duration: 1000 * 3,
			            fontSize: 20,
			            safeAreaInsetTop:true
			  })
			},
		},
		mounted(){
			const weekStore = useLocalStorage();
			// 如果localStore中没有存储，则新增数据
			if (weekStore.getItem("WEEKTODO") === null) {
			  weekStore.setItem("WEEKTODO", {
			    0: ["一道leetcode", "学习uniapp","背面试题","实习","周一总结"],
			    1: ["一道leetcode", "学习uniapp","背面试题","实习","周二总结"],
			    2: ["一道leetcode", "学习uniapp","背面试题","实习","周三总结"],
			    3: ["一道leetcode", "学习uniapp","背面试题","实习","周四总结"],
			    4: ["一道leetcode", "学习uniapp","背面试题","实习","周五总结"],
			    5: ["一道leetcode", "学习uniapp","背面试题","实习","周六放假"],
			    6: ["一道leetcode", "学习uniapp","背面试题","实习","周日放假"],
			  });
			}
			let storeList = weekStore.getItem("WEEKTODO");
			Object.keys(storeList).forEach((item) => {
			  this.todoList.push(storeList[item]); //给todoList赋初值
			});
			

		}
	}
</script>

<style lang="scss" scoped>
	.weekTodo-Main{
		width: 500rpx;
		margin: auto;
		background-color: rgba(255, 255, 255, .7);
		font-size: 34rpx;
		font-family: 'yuan';
		border-radius: 30rpx;
		padding: 20rpx 60rpx 60rpx 60rpx;
		.week-todo{
			position: relative;
			margin: 40rpx auto;
			width: 400rpx;
			padding: 20rpx;						
			.planButton {
			/* #ifdef H5 */	
			width: 350rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */	
			width: 400rpx;
			/* #endif */
			height: 80rpx;
			position: absolute;
			left: 50%;
			bottom:-15% ;
			transform: translateX(-50%);
			margin-top: 40rpx;
			padding: 10rpx;
			line-height: 60rpx;
			background-color: rgba(166, 166, 166,.6);
			border-radius: 20rpx;
			border: 4rpx solid #fff;
			font-weight: 700;
			font-family: 'yuan';
			cursor: pointer;
			opacity: .8;
			
			}
			.title {
			padding: 0 10rpx 20rpx;
			text-align: center;
			font-size: 60rpx;
			font-weight: 550;
			}
			.todo-wrapper {
				margin-top: 30rpx;
			padding: 0 60rpx 20rpx;
			.todo-item {
				line-height: 40rpx;
				text-align: center;
				border-bottom: 4rpx solid rgb(255, 255, 255);
				padding: 8rpx 0;
			}
			}
		}
			.popList{
				span{
					font-weight: 500;
					margin: 10rpx;
					font-size: 50rpx;
				}
				.listPlan {
				  font-weight: 500;
				  font-size: 30rpx;
				  margin: 10rpx 40rpx;
				  
				  label {
					font-size: 30rpx;
							  font-weight: 700;
					margin-right: 30rpx;
				  }
				  
				  input {
					width: 550rpx;
					font-size: 24rpx;
					outline: none;
					border-radius: 10rpx;
					padding-left: 10rpx;
					border: 5rpx solid #ccc;
				  }
				}	
				.dialogBtn{
					margin-bottom: 10rpx;
					height: 80rpx;
					background-color: #eee;
				}
		}
	}
	/* #ifdef MP-WEIXIN */
	.listPlan {
	  font-weight: 500;
	  font-size: 30rpx;
	  margin: 10rpx 80rpx;
	  input{
		  width: 550rpx;
	  }
	  }
	/* #endif */
</style>