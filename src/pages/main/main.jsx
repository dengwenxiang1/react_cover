//主界面路由租金
import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'//可以操作前端cookie的对象
import { getRedirectTo } from '../../utils/info'
import { getUser } from '../../redux/actions'
import BossInfo from '../boss-info/BossInfo'
import MaintoInfo from '../maintoInfo/MaintoInfo'
import Boss from '../boss/Boss'
import Dashen from '../dashen/dashen'
import Message from '../massage/massage'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import { NavBar } from 'antd-mobile'
import NavFooter from '../../components/nav-footer'
export default function Main(props) {
    //给组件对象添加属性
    const navList = [//包含所有导航组件的相关信息数据
        {
            path: '/laoban', // 路由路径
            component: Boss,
            title: '老板列表',
            icon: 'dashen',
            text: '老板',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '大神列表',
            icon: 'laoban',
            text: '大神',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息'
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    //读取cookie中的userid
    const userid = Cookies.get('userid')
    //如果有，读取redux中的user状态
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        //1)登录过（cookie中有userid）, 但没有登录(redux管理的user中没有_id) ，发请求获取对应的user, 暂时不做任何显示
        if (userid && !user._id) {
            //发送异步请求，获取user
            dispatch(getUser())
        }
    }, [userid, user._id, dispatch])
    //如果cookie中没有user._id，自动重定向到登录界面
    if (!userid) {
        return <Redirect to='/login' />
    }
    //如果user没有_id，返回null(不做任何显示)
    if (!user._id) {
        return null
    } else {//如果有_id，显示对应的界面
        // 根据user的type和header来计算出一个重定向的路由路径，并自动重定向
        const path = props.location.pathname
        if (path === '/') {
            // 得到一个重定向的路由路径
            const path = getRedirectTo(user.type, user.header)
            return <Redirect to={path} />
        }
    }
    //检查用户是否登录，如果没有，自动重定向到登录界面
    // const user = useSelector(state => state.user)
    // if (!user._id) {
    // return <Redirect to='/login' />
    // }
    const path = props.location.pathname//请求的路径
    const currentNav = navList.find(nav => nav.path === path)//得到当前的nav,可能没有
    if (currentNav) {
        //决定那个路由需要隐藏
        if (user.type === 'laoban') {
            //隐藏数组的第二个
            navList[1].hide = true

        } else {//隐藏数组的第一个
            navList[0].hide = true
        }
    }
    return (
        <div>
            {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
            <Switch>
                {
                    navList.map(nav => <Route path={nav.path} component={nav.component} key={nav.path}></Route>)
                }
                <Route path='/laobaninfo' component={BossInfo}></Route>
                <Route path='/dasheninfo' component={MaintoInfo}></Route>
                <Route component={NotFound}></Route>
            </Switch>
            {currentNav ? <NavFooter navList={navList}></NavFooter> : null}
        </div>
    )
}
/*
1.实现自动登录
  1)登录过（cookie中有userid）,但没有登录(redux管理的user中没有_id)，发请求获取对应的user,暂时不做任何显示
  2)如果cookie中没有userid,自动进入login界面
  3)判断redux管理的user中是否有_id，如果没有，暂时不做任何显示
  4)如果有，说明当前已经登录,显示对应的界面
  5)如果请求根路径：根据user的type和header来计算出一个重定向的路由路径，并自动重定向
*/