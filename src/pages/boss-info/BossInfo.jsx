//老板信息完善的路由容器组件
import React,{useState} from 'react'
import{UdapteUser}from '../../redux/actions'
import {useDispatch,useSelector}from 'react-redux'
import {Redirect}from 'react-router-dom'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile'
import HeaderSeletor from '../../components/header-sletor'
export default function BossInfo(){
  const [BossInfo,setBossInfo] = useState({
    header:'',
    post:'',
    info:'',
    company:'',
    salary:''
  })
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const handleChange=(name,value)=>{
       setBossInfo({
         ...BossInfo,
         [name]:value
       })
  }
  //完善boss数据
  const save=()=>{
     dispatch(UdapteUser(BossInfo))
  }
  //更新header状态
  const setHeader=(header)=>{
    setBossInfo({
      ...BossInfo,
      header
    })
  }
  //判断header和type是否值，来确定完善bosss数据是否成功，成功了跳转主页面
  if(user.header){
    const path=user.type==='dashen' ?'/dashen':'/laoban'
    return <Redirect to={path}></Redirect>
  }
  return (
      <div>
       <NavBar>老板信息完善</NavBar>
       <HeaderSeletor setHeader={setHeader}/>
      <InputItem placeholder='请输入职位' onChange={val=>{handleChange('post',val)}}>招聘职位：</InputItem>
      <InputItem placeholder='请输入公司名称' onChange={val => { handleChange('company', val) }}>公司名称：</InputItem>
      <InputItem placeholder='请输入职位薪资' onChange={val => { handleChange('salary', val) }}>职位薪资：</InputItem>
      <TextareaItem title="职位要求:"
       rows={3} 
        onChange={val => { handleChange('info', val) }}
       ></TextareaItem>
      <Button type='primary' onClick={save}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
}