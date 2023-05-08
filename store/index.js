import Vue from 'vue'
import Vuex from 'vuex'
import backgroundShow from './backgroundShow'
import changeScenicSpot from './changeScenicSpot'
import userData from './userData'

Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		changeScenicSpot,
		backgroundShow,
		userData
	}
})
