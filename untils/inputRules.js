// 用来规范用户名以及密码

export function inputRule(str){
	let count = 0;
	let strArr = [...str];
	if(strArr.length <8 || strArr.length>16)return false;
	strArr.forEach(item=>{
		if((item>=0&&item<=9)||(item>="a"&&item<="z")||(item>='A'&&item<="Z")){
			count++
		}
	})
	return count===strArr.length;
}