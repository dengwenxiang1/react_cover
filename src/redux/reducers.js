//包含N个reducer函数：根据老的state和指定的action返回一个新的state
import { combineReducers } from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    RECEIVE_USER
} from './atcion-type'
import { getRedirectTo } from '../utils/info'
//产生user状态的reducer
const initUser = {
    username: '',//用户名
    type: '',//用户类型dashen/laoban
    msg: '',//错误提示信息
    redirectTo: ''//需要自动重定向的路由路径
}
function user(state = initUser, action) {
    const { type, data } = action
    switch (type) {
        case AUTH_SUCCESS://data是user
            const { type, header } = data
            return { ...data, redirectTo: getRedirectTo(type, header) }
        case ERROR_MSG:
            return { ...state, msg: data }
        case RECEIVE_USER://data是user
            return data
        case RESET_USER://data是msg
            return { ...initUser, msg: data }
        default:
            return state
    }
}



export default combineReducers({
    user
})
//向外暴露的状态的结构:{user:{}}