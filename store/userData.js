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
		},
		// 取消所有用户的登录状态
		clearUserLoading(state,value){
			const userStorage = useLocalStorage();//用来存储整个data
		 	let data = userStorage.getItem("USERSDATA");
			Object.keys(data).forEach(item=>{
				data[item]['isLoading'] = 'false';
			})
			console.log(data,'clear');
			userStorage.setItem("USERSDATA",data);
			state.userData = getUserData();
			state.userIsLoading = getUserLoading();
			state.userIsLoadingId = getUserLoadingId();
		}
	},
	state:{
		userData:getUserData(),
		userIsLoading:getUserLoading(),
		userIsLoadingId:getUserLoadingId()
	}
}

function getUserData(){
	const userStorage = loginLocalStorage();
	const userData = userStorage.getItem("USERSDATA");
	return userData !== null ? userData:{};
}

function getUserLoading(){
	const userStorage = loginLocalStorage();
	const userData = userStorage.getItem("USERSDATA");
	let flag = false;
	Object.keys(userData).forEach((item)=>{
		if(userData[item]['isLoading']==='true'){
			flag = true;
		}
	})
	return flag;
}

function getUserLoadingId(){
	const userStorage = loginLocalStorage();
	const userData = userStorage.getItem("USERSDATA");
	let str = 'NULL';
	Object.keys(userData).forEach((item)=>{
		if(userData[item]['isLoading']==='true'){
			str = userData[item]['userId'];
		}
	})
	return str;
}