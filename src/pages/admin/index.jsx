import React, { Component } from 'react'
import { Route, Switch, Redirect,} from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
const { Footer, Sider, Content } = Layout;
// 后台管理的路由组件
export default class index extends Component {
    render() {
      const user =  memoryUtils.user
      //如果内存没有存储user ==>当前没有登录
      if(!user || !user.id){
         //自动跳转到登录(render()中)
        //  return <Redirect to='/login'/>
        console.log(user);
      }
        return (
          <Layout style={{minHeight:'100%'}}>
            <Sider>
              <LeftNav />
            </Sider>
            <Layout>
              <Header>Header</Header>
              <Content style={{margin:'20px',backgroundColor:'#fff'}}>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path='/role' component={Role}/>
                    <Route path='/user' component={User}/>
                    <Route path='/product' component={Product}/>
                    <Route path='/category' component={Category} />
                    <Route path='/bar' component={Bar}/>
                    <Route path='/pie' component={Pie} />
                    <Route path='/line' component={Line} />
                  <Redirect to='/home' />
                </Switch>
              </Content>
              <Footer style={{textAlign:'center',color:'#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
          </Layout>
        )
    }
}
