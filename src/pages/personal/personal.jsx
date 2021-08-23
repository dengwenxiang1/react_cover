//老板主界面路由容器组件
import React from 'react'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import { useSelector } from 'react-redux'
import { useDispatch} from 'react-redux'
import {resetUser}from '../../redux/actions'
import Cookies from 'js-cookie'
const Item = List.Item
const Brief = Item.Brief
export default function Personal() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { username, header, compary, post, salary, info } = user
    const logout = () => {
        Modal.alert('退出', '确认退出登录吗?', [
            { text: '取消' },
            {
                text: '确定',
                onPress: () => {
                    //干掉cookie中userid
                    Cookies.remove('userid')
                    //干掉redux管理user
                    dispatch(resetUser())
                    console.log(user);
                }
            }
        ])
    }
    return (
        <div style={{ marginTop: 50, marginBottom: 50 }}>
            <Result
                img={
                    <img src={require(`../../assets/images/${header}.png`).default} style={{ width: 50 }} alt='header'></img>
                }
                title={username}
                message={compary}
            />
            <List renderHeader={() => '相关信息'}>
                <Item multipleLine>
                    <Brief>职位: {post}</Brief>
                    <Brief>简介: {info}</Brief>
                    {
                        salary ? <Brief>薪资: {salary}</Brief> : null
                    }
                </Item>
            </List>
            <WhiteSpace />
            <List>
                <Button type='warning' onClick={logout}>退出登录</Button>
            </List>
        </div>
    )
}