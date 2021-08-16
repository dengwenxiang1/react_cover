//大神信息完善的路由容器组件
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UdapteUser } from '../../redux/actions'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
import HeaderSeletor from '../../components/header-sletor'
import { Redirect } from 'react-router-dom'
export default function MaintoInfo() {
    const [maintoinfo, setMaintoinfo] = useState({
        header: '',
        post: '',
        info: '',
    })
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleChange = (name, value) => {
        setMaintoinfo({
            ...maintoinfo,
            [name]: value
        })
    }
    //更新header状态
    const setHeader = (header) => {
        setMaintoinfo({
            ...maintoinfo,
            header
        })
    }
    const save = () => {
        dispatch(UdapteUser(maintoinfo))
    }
    //如果信息已经完善，自动重定向到对应主界面
    if(user.header){//说明信息已经完善
     const path=user.type==='dashen'?'dashen':'/laoban'
     return<Redirect to={path}/>
    }
    return (
        <div>
            <NavBar>大神信息完善</NavBar>
            <HeaderSeletor setHeader={setHeader} />
            <InputItem placeholder='请求输入求职岗位' onChange={val => { handleChange('post', val) }}>求职职位：</InputItem>
            <TextareaItem title="个人介绍:" rows={3} onChange={val => { handleChange('info', val) }} ></TextareaItem>
            <Button type='primary' onClick={save}>保&nbsp;&nbsp;&nbsp;存</Button>
        </div>
    )
}