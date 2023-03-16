//引入request.js文件
import myRequest from "../untils/request";

// 封装的轮播方法
export function getVue2Record() {
    return myRequest({
        url: "/vue2Summary", // 这个地址是去掉公共地址剩下的地址
        method: "GET", // 请求方式 支持多种方式  get post put delete 等等
    });
}
export function getVue3Record() {
    return myRequest({
        url: "/vue3Summary", // 这个地址是去掉公共地址剩下的地址
        method: "GET", // 请求方式 支持多种方式  get post put delete 等等
    });
}
