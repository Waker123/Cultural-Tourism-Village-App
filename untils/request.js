import {baseUrl} from './baseUrl.js'
//附上网络请求的封装
export default (options)=>{
	uni.showLoading({
		title:'加载中...'
	})
	return new Promise((resolve,reject) =>{
		uni.request({
			url:baseUrl + options.url,
			method:options.method || 'GET',
			data:options.data || {},
			success(res) {
				if(res){
					resolve(res.data)
				}
			},
			fail(err) {
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}