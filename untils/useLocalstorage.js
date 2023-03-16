
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

