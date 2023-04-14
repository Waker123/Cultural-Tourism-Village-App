let BASE_URL = 'http://localhost:7000';    //不是h5默认这个地址
// #ifdef H5
BASE_URL = '/api';    //H5下将地址修改为/dpc
// #endif
export const baseUrl = BASE_URL;