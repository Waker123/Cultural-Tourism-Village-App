export default {
	namespaced:true,
	mutations:{
		changeScenicSpot(state,value){
			state.currentScenicSpot = value;
		},
		changeScenicSpotShow(state,value){
			state.scenicSpotShow = value;
		}
	},
	state:{
		scenicSpot:spot(),
		currentScenicSpot:spot()[0],
		scenicSpotShow:false
	}
}

function spot(){
	return ['111','222','333','444'];
}