import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon, } from 'antd';
import logo from '../../assets/images/logo.png'
import './index.less'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
const { SubMenu } = Menu;


//左侧导航组件
class LeftNav extends Component {
     //判断当前登录用户对item是否有权限
    haAuth=(item)=>{
        const {key,isPublic}= item
        const menus = memoryUtils.user.role.menus
        const username =memoryUtils.user.username
        //1.如果当前用户是admin
        //2如果当前item是公开的
        //2当前用户有此item的权限：看key有没有menus中
        if (username ==='wenxiang '||isPublic ||menus.indexOf(key)!==-1){
            return true
        }else if(item.children){//4.如果当前用户有此item的某个子item的权限
          return  !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }
          return false
        }

    //根据menu的数据数组生成对应的标签数组
    //使用map+递归调用
    getMenuNodes = (menuList) => {
        //得到当前请求的路径
        let path = this.props.location.pathname
        return menuList.map(item => {
            /*
              {
                  title:"首页"//菜单标题名称
                  key:'/home'//对应的path
                  icon:"home",//图标名称
                  children:[],//可能有，也可能没有
              }
            */
           //如果当前用户有item对应的权限，才需要显示对应的菜单项
           if(this.haAuth(item)){}
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                //查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem =>path.indexOf(cItem.key)===0)
                //如果存在，说明当前item的子列表需要打开
                if (cItem) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
        })
    }

    // getMenuNodes_reduce = (menuList) =>{
    // return menuList.reduce((pre,item)=>{
    //    向pre中添加<Menu.Item>
    //    向pre添加<subMenu>
    //    if(!item.children){
    //    向pre中添加<Menu.Item>
    //    }else{
    //   向pre添加<subMenu>
    //    }
    //    return pre
    // },[])
    // }
    //在第一次render()之前执行一次
    // 为第一个render()准备数据(必须同步的)
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        //得到当前请求的路径
        let path = this.props.location.pathname
        if (path.indexOf('/product') === 0) {//当前请求的是商品或子路由界面
            path = '/product'
        }
        //得到需要打开菜单项的key
        const openKey = this.openKey
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="" />
                    <h1>React后台</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

/*withRouter高阶组件:
包装非路由组件，返回一个新的组件
新的组件向非路由组件传递3哥属性：history/Location/match
*/
export default withRouter(LeftNav)
