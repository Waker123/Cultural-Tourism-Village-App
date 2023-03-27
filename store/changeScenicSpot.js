import {getScenicSpotData} from '../api/scenicSpotApi.js';

export default {
	namespaced:true,
	actions:{
		getScenicData(context,value){
			console.log("action被调用了",value)
			uni.showLoading({
				title:"加载中",
			});
			// 把目前选中的景点传递给接口，返回该景点的有关数据
			 getScenicSpotData({
				 currentScenicSpot:value
				 }).then((res) => {
					 console.log(res);
					 context.commit('changeScenicSpotData',res.data);
			  uni.hideLoading(); // 关闭加载中弹框
			}).catch((err) => {
			  console.log(err); 
			});
		}
	},
	mutations:{
		changeScenicSpot(state,value){
			state.currentScenicSpot = value;
		},
		changeScenicSpotShow(state,value){
			state.scenicSpotShow = value;
		},
		// action中做完异步操作后，将数据返回给mutations来修改state
		changeScenicSpotData(state,value){
			state.scenicSpotData = value;
		}
	},
	state:{
		currentScenicSpot:'',
		scenicSpotShow:true,//默认开启，打开主页时选择景点
		scenicSpotData:{}
	}
}
