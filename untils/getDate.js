export function getDate(ms) {
	const dateTime = new Date(Number(ms));
    const Year = dateTime.getFullYear();
    const Month = dateTime.getMonth() + 1;
    const DateY = dateTime.getDate();
    const Hours = dateTime.getHours();
    const Minutes = dateTime.getMinutes();
    const Seconds = dateTime.getSeconds();
    const arry = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    const day = arry[dateTime.getDay()];
	return Year + '年' + Month + '月' + DateY + '日' + Hours + '时' +Minutes+"分" +Seconds + '秒\n' + day;
}
