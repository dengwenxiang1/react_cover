/*
包含N个日期事件处理的工具函数模块
*/
/*
格式化时间
*/
export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        + '-' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}