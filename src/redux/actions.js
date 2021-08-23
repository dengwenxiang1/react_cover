//包含n个action creator
// 引入客户端 io
import io from 'socket.io-client'
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsg,
    reqRedMsg
} from '../api'
import {
    AUTH_SUCCESS
    , ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './atcion-type'


//授权成功的异步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
//错误提示信息的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
//接收用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
//重置用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
//接收用户列表的同步action
const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })
//接收消息列表的同步action
const receiveMsgList = ( users, chatMsgs, userid ) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs, userid } })
//接收一个消息的同步action
const receiveMsg = ( chatMsg, userid ) => ({ type: RECEIVE_MSG, data: { chatMsg, userid } })
//读取了某个聊天消息的同步action
const msgRead = ( count, from, to ) => ({ type: MSG_READ, data: { count, from, to } })


//注册异步action
export const register = (user) => {
    const { username, password, password2, type } = user
    //做表单的前台检查，如果不通过，分发一个errorMsg的同步action
    if (!username) {
        return errorMsg('必须输入用户名')
    } else if (password !== password2) {
        return errorMsg('两次密码要一致')
    }
    //表单数据合法，返回一个发ajax请求的异步action函数
    return async dispatch => {
        //发送注册的异步请求
        const response = await reqRegister({ username, password, type })
        const result = response.data
        /* const promise = reqRegister(user)
         promise.then(response=>{
             const result = response.data
         })
         */
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)//获取消息列表
            //成功:分发成功的action
            dispatch(authSuccess(result.data))

        } else {
            //失败:分发失败的action
            dispatch(errorMsg(result.msg))
        }
    }
}
//登录action
export const Login1 = (user) => {
    const { username, password } = user
    if (!username) {
        return errorMsg('必须输入用户名')
    } else if (!password) {
        return errorMsg('请输入密码')
    }
    return async dispatch => {
        //发送注册的异步请求
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)//获取消息列表
            //成功
            dispatch(authSuccess(result.data))
        } else {
            //失败
            dispatch(errorMsg(result.msg))
        }
    }
}
//完善个人信息action
export const UdapteUser = (user) => {
    return async dispatch => {
        //
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {//更新成功data
            dispatch(receiveUser(result.data))
        } else {//更新失败:msg
            dispatch(resetUser(result.msg))
        }
    }
}
//获取用户异步action
export const getUser = () => {
    return async dispatch => {
        //执行异步ajax请求
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) {//成功
            getMsgList(dispatch, result.data._id)//获取消息列表
            dispatch(receiveUser(result.data))
        } else {//失败
            dispatch(resetUser(result.msg))
        }
    }
}
//获取用户列表的异步action
export const getUserList = (type) => {
    return async dispatch => {
        //执行异步ajax请求
        const response = await reqUserList(type)
        //得到结果后，分发一个同步的action
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }

    }
}
//发送消息的异步action
export const sendMsg = ({ from, to, content }) => {
    return dispatch => {
        //发消息
        io.socket.emit('sendMsg', { from, to, content })
        //console.log('客户端向服务器发送消息', { from, to, content })
    }

}

//读取消息的异步action
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqRedMsg(from, to)
        const result = response.data
        if (result.code === 0) {
            const count = result.data
            dispatch(msgRead(count, from, to ))
        }
    }
}





//异步获取消息列表数据
async function getMsgList(dispatch, userid) {
    initIo(dispatch, userid)//连接服务端
    const response = await reqChatMsg()
    const result = response.data
    if (result.code === 0) {
        const { users, chatMsgs } = result.data
        //分发同步action
        dispatch(receiveMsgList( users, chatMsgs, userid ))

    }
}
/*单例对象
1.创建对象之前：判断对象是否已经存在,只有不存在才去创建
2创建对象之后：保存对象
*/
function initIo(dispatch, userid) {
    if (!io.socket) {
        // 连接服务器, 得到代表连接的 socket 对象
        io.socket = io('ws://localhost:4000')
    }
    //绑定监听，接收服务器发送的消息
    io.socket.on('receiveMsg', function (chatMsg) {
       // console.log('客户端接收到服务器发送的消息', chatMsg)
        //只有当chatMsg是与当前用户相关的消息，才去分发同步action保存消息
        if (userid === chatMsg.from || userid === chatMsg.to) {
            dispatch(receiveMsg(chatMsg, userid))
        }
    })
}