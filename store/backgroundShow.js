export default {
	namespaced: true,
	mutations: {
		changeBackgroundShow(state,value){
			state.backgroundShow = value;
		}
	},
	state: {
		backgroundShow:true,
	},
}
