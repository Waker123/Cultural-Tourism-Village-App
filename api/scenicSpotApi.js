//引入request.js文件
import myRequest from "../untils/request";

// 封装的轮播方法
// 获取景点的名称
export function getScenicSpotName() {
    return myRequest({
        url: "/scenicSpotName", 
        method: "GET", 
    });
}

// 根据发送的景点名称来获取对应的数据
export function getScenicSpotData(params){
	return myRequest({
			url:'/scenicSpotData',
			method:'POST',
			data:params
		})
}