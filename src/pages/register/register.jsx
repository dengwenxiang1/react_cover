//注册路由
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions'
import {Redirect} from 'react-router-dom'
import {
  NavBar
  , WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
import Logo from '../../components/logo'
import '../../assets/css/index.css'
const ListItem = List.Item
export default function Register(props) {
  const [account, setAccount] = useState({
    username: '',//用户名,
    password: "",//密码
    password2: '',//确认密码
    type: 'laoban'//用户名类型
  })//用户名
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const Register = () => {
    dispatch(register(account))
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
  const toLogin = () => {
    props.history.replace('/login')
  }
  //如果redirectTo有值，就需要要重定向到指定位置
  if(user.redirectTo){
    return <Redirect to={user.redirectTo} />
  }
  return (
    <div>
      <NavBar>Boss直聘</NavBar>
      <Logo />
      <WingBlank>
        <List>
          {user.msg? <div className="error-msg">{user.msg}</div>:null}
          <WhiteSpace />
          <InputItem placeholder="请输入用户名" onChange={val => { handleChang('username', val) }}>用户名：</InputItem>
          <WhiteSpace />
          <InputItem placeholder="请输入密码" type="password" onChange={val => { handleChang('password', val) }}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
          <WhiteSpace />
          <InputItem placeholder="请输入确认密码" type="password" onChange={val => { handleChang('password2', val) }}>确认密码：</InputItem>
          <WhiteSpace />
          <ListItem >
            <span>用户类型：</span>
            &nbsp;&nbsp;&nbsp;
            <Radio checked={account.type === 'dashen'} onChange={() => handleChang('type', 'dashen')}>大佬</Radio>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio checked={account.type === 'laoban'} onChange={() => handleChang('type', 'laoban')}>老板</Radio>
          </ListItem >
          <WhiteSpace />
          <Button type="primary" onClick={Register}>注册</Button>
          <WhiteSpace />
          <Button onClick={toLogin}>已有账户</Button>
        </List>
      </WingBlank>
    </div>
  )
}