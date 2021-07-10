import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LinkButton from '../link.button'
import { Modal } from 'antd'
import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import { reqWeather } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './index.less'

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),//
        city: '',//所在城市
        weather: '',//天气的文本
    }
    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {//如果当前item对象的key与path一样，item的title就是需要显示的title
                title = item.title
            } else if (item.children) {
                //在所有的子item中查找匹配的
                const cItem = item.children.find(cItem => cItem.key === path)
                //如果有值才说明匹配的
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    //退出登录
    logout = () => {
        //显示确认框
        Modal.confirm({
            content: '确定退出吗',
            onOk: () => {
                //删除保存的user数据

                storageUtils.removeUser()
                memoryUtils.user = {}
                //跳转到登录界面
                this.props.history.replace('/login')
            },
        })
    }
    /*
   第一次render()之后执行一次
   一般在此执行异步操作：发ajax请求/启动定时器
    */

    getTime = () => {
        //每隔1S获取当前时间，并更新状态数据currentTime
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }
    getWeather = async () => {
        //调用接口请求异步获取数据
        const result = await reqWeather('872b2e58977cfc99e4c31b5790825dbc', '440100')
        const { city, weather } = result.lives[0]
        this.setState({ city, weather })
    }
    componentDidMount() {
        //获取当前的时间
        this.getTime()
        //获取当前天气请求
        this.getWeather()
    }
    //当前组件卸载之前调用
    componentWillUnmount() {
        //清除定时器
        clearInterval(this.intervalId)
    }
    render() {
        const { currentTime, city, weather } = this.state
        //得到当前显示的title
        const title = this.getTitle()
        const username = memoryUtils.user.username
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <span>{city}</span>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)