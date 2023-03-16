let BASE_URL = 'http://localhost:5000';    //不是h5默认这个地址
// #ifdef H5
BASE_URL = '/api';    //H5下将地址修改为/dpc
// #endif
 
//附上网络请求的封装
export default (options)=>{
	uni.showLoading({
		title:'加载中...'
	})
	return new Promise((resolve,reject) =>{
		uni.request({
			url:BASE_URL + options.url,
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