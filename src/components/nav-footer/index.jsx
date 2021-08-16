//当前组件
import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import '../../assets/css/index.css'
const Item = TabBar.Item
export default function NavFooter(props) {
    let { navList } = props//接收父组件传递的navList
    //过滤掉hide为true的nav
    navList = navList.filter(nav => !nav.hide)
    const { pathname } = useLocation()//希望在非路由组件中使用路由库的api
    const { replace } = useHistory()//使用replace跳转路由
    return (
        <TabBar>
            {
                navList.map((nav) => (
                    <Item
                        key={nav.path}
                        title={nav.text}
                        icon={{ uri: require(`./images/${nav.icon}.png`).default }}
                        selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`).default }}
                        selected={pathname === nav.path}
                        onPress={() => replace(nav.path)}
                    />
                ))
            }
        </TabBar>
    )
}