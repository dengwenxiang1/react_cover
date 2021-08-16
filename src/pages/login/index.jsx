//登录路由
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Redirect}from 'react-router-dom'
import { Login1 } from '../../redux/actions'
import {
    NavBar
    , WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import Logo from '../../components/logo'
import '../../assets/css/index.css'
export default function Login(props) {
    const [account, setAccount] = useState({
        username: '',//用户名,
        password: "",//密码
    })//用户名
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const Login = () => {
        dispatch(Login1(account))
    }
    //处理输入数据的改变，更新对应的状态
    const handleChang = (name, val) => {
        //更新状态
        setAccount({
            ...account,
            [name]: val//属性名不是name,而是name变量的值
        })

    }
    //
    const toRegister = () => {
        props.history.replace('/register')
    }
    //如果redirectTo有值，就需要要重定向到指定位置
    if (user.redirectTo) {
        return <Redirect to={user.redirectTo} />
    }
    return (
        <div>
            <NavBar>Boss直聘</NavBar>
            <Logo />
            <WingBlank>
                <List>
                    <WhiteSpace />
                    {user.msg ? <div className="error-msg">{user.msg}</div> : null}
                    <WhiteSpace />
                    <InputItem onChange={val => { handleChang('username', val) }}>用户名：</InputItem>
                    <WhiteSpace />
                    <InputItem type="password" onChange={val => { handleChang('password', val) }}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                    <WhiteSpace />
                    <Button type="primary" onClick={Login}>登录</Button>
                    <WhiteSpace />
                    <Button onClick={toRegister}>尚未注册账户</Button>
                </List>
            </WingBlank>
        </div>
    )
}