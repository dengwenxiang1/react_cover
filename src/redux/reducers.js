//包含N个reducer函数：根据老的state和指定的action返回一个新的state
import { combineReducers } from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    RECEIVE_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST,
    MSG_READ
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
//产生userlist状态的reducer
const initUserList = []
function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST://data为userList
            return action.data
        default:
            return state
    }
}
//产生聊天状态的reducer
const initChat = {
    users: {},//所有用户信息的对象 属性名：userid,属性值是：{username,header}
    chatMsgs: [],//当前用户所有相关的msg数组
    unReadCount: 0//总的未读数量
}
function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const { users, chatMsgs, userid } = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((perTotal, msg) => perTotal + (!msg.read && msg.to === userid ? 1 : 0), 0)
            }
        case RECEIVE_MSG://data:chatMsg
            const { chatMsg } = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
            }
        case MSG_READ:
            const { from, to, count } = action.data
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) {//需要更新
                        return { ...msg, read: true }
                    } else {//不需要
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }

}
export default combineReducers({
    user,
    userList,
    chat
})
//向外暴露的状态的结构:{user:{}}