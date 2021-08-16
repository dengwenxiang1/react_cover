//包含n个action creator
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser
} from '../api'
import {
    AUTH_SUCCESS
    , ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from './atcion-type'
//授权成功的异步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
//错误提示信息的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
//接收用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
//重置用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
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
        const respone = await reqLogin(user)
        const result = respone.data
        if (result.code === 0) {
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
        if(result.code===0){//成功
              dispatch(receiveUser(result.data))
        }else{//失败
          dispatch(resetUser(result.msg))
        }
    }
}