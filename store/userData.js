import {loginLocalStorage} from './../untils/useLocalstorage'
import useLocalStorage from './../untils/useLocalstorage'
export default {
	namespaced:true,
	actions:{
	},
	mutations:{
		// 添加新的user
		addUser(state,value){
			const userStorage = loginLocalStorage();
			// value[0]是userId，value[1]是对象
			userStorage.setItem("USERSDATA",value[0],value[1]);
			state.userData = getUserData();
		},
		// 修改user状态
		changeUserState(state,value){
			const userStorage = loginLocalStorage();
			// value[0]是userId，value[1]是要修改的属性名，value[2]是属性值
			let data = state.userData[value[0]];
			data[value[1]] = value[2];
			userStorage.setItem("USERSDATA",value[0],data);
			state.userData = getUserData();
			state.userIsLoading = getUserLoading();
			state.userIsLoadingId = getUserLoadingId();
			state.userReserveHomestay = getUserReserveHomestay();
			state.userReserveSpeciality = getUserReserveSpeciality();
			state.userImages = getUserImages();
		},
		// 取消所有用户的登录状态
		clearUserLoading(state,value){
			const userStorage = useLocalStorage();//用来存储整个data
		 	let data = userStorage.getItem("USERSDATA");
			Object.keys(data).forEach(item=>{
				data[item]['isLoading'] = 'false';
			})
			userStorage.setItem("USERSDATA",data);
			state.userData = getUserData();
			state.userIsLoading = getUserLoading();
			state.userIsLoadingId = getUserLoadingId();
		}
	},
	state:{
		userData:getUserData(),
		userIsLoading:getUserLoading(),
		userIsLoadingId:getUserLoadingId(),
		userReserveHomestay:getUserReserveHomestay(),
		userReserveSpeciality:getUserReserveSpeciality(),
		userImages:getUserImages(),
	}
}

function getUserData(){
	const userStorage = loginLocalStorage();
	const userData = userStorage.getItem("USERSDATA");
	return userData !== null ? userData:{};
}
// 是否有用户正在登录
function getUserLoading(){
	const userStorage = loginLocalStorage();
	const userData = userStorage.getItem("USERSDATA");
	let flag = false;
	if(userData){
		Object.keys(userData).forEach((item)=>{
			if(userData[item]['isLoading']==='true'){
				flag = true;
			}
		})
	}
	return flag;
}
// 目前登录的用户id
function getUserLoadingId(){
	const userStorage = loginLocalStorage();
	const userData = userStorage.getItem("USERSDATA");
	let str = 'NULL';
	if(userData){
		Object.keys(userData).forEach((item)=>{
			if(userData[item]['isLoading']==='true'){
				str = userData[item]['userId'];
			}
		})
	}
	return str;
}
//民宿
function getUserReserveHomestay(){
	const userStorage = loginLocalStorage();
	const userData = userStorage.getItem("USERSDATA");
	if(!getUserLoading()) return;//当没有用户登录时，直接退出
	if(userData[getUserLoadingId()]['reserveHomestay']){
		return userData[getUserLoadingId()]['reserveHomestay'];
	}else{
		return [];
	}
}
//特产
function getUserReserveSpeciality(){
	const userStorage = loginLocalStorage();
	const userData = userStorage.getItem("USERSDATA");
	if(!getUserLoading()) return;//当没有用户登录时，直接退出
	if(userData[getUserLoadingId()]['reserveSpeciality']){
		return userData[getUserLoadingId()]['reserveSpeciality'];
	}else{
		return [];
	}
}

// 照片
function getUserImages(){
	const userStorage = loginLocalStorage();
	const userData = userStorage.getItem("USERSDATA");
	if(!getUserLoading()) return;//当没有用户登录时，直接退出
	if(userData[getUserLoadingId()]['images']){
		return userData[getUserLoadingId()]['images'];
	}else{
		return [];
	}
}