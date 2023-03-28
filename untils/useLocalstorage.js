
function parse(str) {
    let value
    if (str) {
        value = JSON.parse(str)
    } else {
        value = null
    }
    return value
}

function stringify(obj) {
    let value
    try {
        value = JSON.stringify(obj)
    } catch {
        value = null
    }
    return value
}

// 通过构造useLocalStorage工具类来存储拿出本地存储的数据
export default function useLocalStorage() {
    function setItem(key, value) {
        value = stringify(value)
        uni.setStorageSync(key, value);
    }
    function getItem(key) {
        let value = parse(uni.getStorageSync(key))
        return value
    }
    return {
        setItem,
        getItem
    }
}

// 专门用来存取用户名的 可以动态增加的localStorage来存储用户信息
export function loginLocalStorage() {
    function setItem(key, loginKey, loginValue) {
        let value = getItem(key);//先获取以前的值
        if (value === null) value = {};//防止之前localStorage中没有值报错
        value[loginKey] = loginValue;//属性为加密后的用户名，属性值为加密后的密码和isLoading组成的数组
        value = stringify(value);
         uni.setStorageSync(key, value);
    }
    function getItem(key) {
        let value = parse(uni.getStorageSync(key))
        return value
    }
    return {
        setItem,
        getItem
    }
}