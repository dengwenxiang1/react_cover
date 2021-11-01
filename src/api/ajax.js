/*
能发送ajax请求的函数模块
函数的返回值是promise对象
*/
import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
    //拼请求参数串
    //data:{username:tom,password:123}
    //paramStr:username=tom&password=123
    return new Promise((resolve, reject) => {
        let promise
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length - 1)
        }
        if (type === 'GET') {//发送GEI请求
            promise = axios.get(url + '?' + paramStr)
        } else {//否则发送POST请求
            promise = axios.post(url, data)
        }
        promise.then((response) => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}