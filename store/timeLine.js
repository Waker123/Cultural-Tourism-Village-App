import useLocalStorage from '../untils/useLocalstorage.js'
import { DAY_TO_31, getMonth, getYear } from '../untils/constant.js'
export default {
	namespaced: true,
	mutations: {
		changeTimeLineState(state, value) {
			state.timeLineState = value;
		},
		changeTimeLine(state,newValue){
			const timeStore = useLocalStorage();
			state.timeList=newValue;
			timeStore.setItem("TIMELIST",newValue)
		}
	},
	state: {
		timeList: getDailyData(),
		timeLineState: false,
	},
}

function getDailyData() {
	let timeList = [];
	const timeStore = useLocalStorage();
	if (!timeStore.getItem("TIMELIST")) {
		let count = 0;
		DAY_TO_31.includes(getMonth) ? count = 31 : count = 30;
		setDailyStore(count);
	}
	const storeList = timeStore.getItem("TIMELIST");
	Object.keys(storeList).forEach((item) => {
		timeList.push(storeList[item]);
	});
	return timeList;
}

function setDailyStore(count) {
	const timeStore = useLocalStorage();
	let storeList = {};
	for (let i = 1; i <= count; i++) {
		storeList[i] = {
			id: i,
			timestamp: `${getYear}-${getMonth}-${i}`,
			title: "今日份打卡",
			commitInfo: "未完成😢😢",
		};
	}
	timeStore.setItem("TIMELIST", storeList);
}