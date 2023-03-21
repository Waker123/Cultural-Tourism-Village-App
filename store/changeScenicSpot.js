export default {
	namespaced:true,
	mutations:{
		changeScenicSpot(state,value){
			state.currentScenicSpot = value;
		}
	},
	state:{
		scenicSpot:spot(),
		currentScenicSpot:spot()[0]
	}
}

function spot(){
	return ['111','222','333','444'];
}