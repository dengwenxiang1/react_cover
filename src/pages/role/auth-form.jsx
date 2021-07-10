import React, {PureComponent} from 'react'
import { PropTypes } from 'prop-types'
import {
    Form,
    Input,
    Tree
} from 'antd'
import menuList from '../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree;
//添加分类的组件
export default  class AuthForm extends PureComponent {
    static propTypes = {
        role: PropTypes.object,//父分类的ID
    }
    constructor(props){
        super(props)
        //根据传入角色的menus生产初始状态
        const menus = this.props.role.menus || {}
        this.state ={
            checkedKeys:menus
        }
    }
    //为组件提供menus方法
    getMenus = () => this.state.checkedKeys
    getTreeNodes = (menuList)=>{
      return menuList.reduce((pre,item)=>{
          pre.push(<TreeNode title={item.title} key={item.key} >
              {item.children? this.getTreeNodes(item.children):null}
              </TreeNode>
              )
              return pre
      },[])
    }
    onCheck = checkedKeys => {
        this.setState({
            checkedKeys
        })
    }
    componentDidMount(){
        this.treeNodes =this.getTreeNodes(menuList)
    }
    //根据新传入的role来更新checkedKeys状态,当组件接收到新的属性时自动调用
    // UNSAFE_componentWillReceiveProps(nextProps){
        // console.log(nextProps);
    //   const menus=  nextProps.role.menus ||{}
    //   this.setState({
        //   checkedKeys:menus
    //   })
    // }
    render() {
        const {role} =this.props
        const { checkedKeys}=this.state
        //指定item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 },//左侧布局lobel的宽度
            wrapperCol: { span: 15 }//指定右侧包裹的宽度
        }
        return (
            <Form {...formItemLayout }>
            
                <Item label='角色名称'>
                            <Input value={role.name}disabled />
                </Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="0-0">
                      {
                            this.treeNodes
                      }
                    </TreeNode>
                </Tree>
            </Form >
        )
    }
}