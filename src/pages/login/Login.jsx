import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, message, } from 'antd';
import './login.less'
import logo from './images/logo.png'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils'
// 登录的路由组件
class Login extends Component {
    handleSubmit = (e) => {
        //阻止事件的默认行为
        e.preventDefault()
        //对所有表单字段进行检验
        this.props.form.validateFields(async (err, values) => {
            //校验成功
            if (!err) {
                // console.log('提交登录的ajax请求 ', values);
                const { username, password } = values
                const result = await reqLogin(username, password)
                if (result.status === 0) {//登陆成功
                    //提示登录成功
                    message.success('登陆成功')

                    // 保存user
                    const user = result.data
                    memoryUtils.user = user// 保存在内存中
                    storageUtils.saveUser(user)//保存到local中
                    //跳转到管理界面(不需要再回退回来)
                    this.props.history.replace('/')
                } else {//登录失败
                    //提示错误信息
                    message.error(result.msg)
                }
            }
        })
    }

    //对密码进行自定义验证
    validatePwd = (rule, value, callback) => {
        if (!value) {
            callback('请入输入密码')
        } else if (value.length < 4) {
            callback('密码长度不能小于4位')
        } else if (value.length > 12) {
            callback('密码长度不能大于12位')
        }
        else {
            callback()//验证通过
        }
    }
    render() {
      //如果用户已经登录，自动跳转到管理页面
     const user =   memoryUtils.user
     if(user && user._id){
          return <Redirect to='/'/>
     }

        //得到具强大功能的form对象
        const form = this.props.form
        const { getFieldDecorator } = form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="" />
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                /*
                                  用户名/密码的合法性要求
                                  1必须输入
                                  2必须大于4位
                                  3必须小于12位
                                  4必须是英文，数字或下划线组成
                                */
                            }
                            {getFieldDecorator('username', {//配置对象，属性名是特定的一些名称
                                //生明式验证，直接使用别人定义好的验证规则进行验证
                                rules: [
                                    { required: true, message: '用户名必须输入' },
                                    { min: 4, message: '用户名至少4位' },
                                    { max: 12, message: '用户名最多12位' },
                                    { pattern: /^[a-zA-Z0-9]+$/, message: '用户名必须是英文，数字或下划线组成' }
                                ],
                                initialValue: 'admin'
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.validatePwd
                                    }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                    </Form>
                </section>
            </div>
        )
    }
}
// 1.前台表单验证
// 2收集表单验证


/*1.高阶函数
  1)一类特别的函数
  a.接收函数类型的参数
  b.返回值是函数
  2)常见
  a.定时器：setTimeout()/setInterval()
  b.Promise:Promise(()=>{}) .then(value =>{},reason=>{})
  c.数组遍历相关的方法：forEach()/filter()/map()/reduce()/find()/fidIndex()
  d.函数对象的bind()
  e.Form.create()()/getFieldDecorator()()
  3)高阶函数更新动态，更加具有扩展性
2.高阶组件
1)本质就是一个函数
2)接收一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会被包装组件传入特定属性
3)作用：扩展组件的功能
4）高阶组件也是高阶函数：接收一个组件函数，返回是一个新的组件函数

*/
// 包装From组件生产一个新的组件：From (Login)
// 新组件会向Form组件传递一个强大的对象属性：form
const WrapLogin = Form.create()(Login);
export default WrapLogin

/* async 和await
1.作用？
简化promise对象的使用：不用再使用then()来指定成功、失败的回调函数
以同步编码(没有回调函数了)方式实现异步流程
2哪里写await?
在返回promise的表达式左侧写await:不想要promise,想要promise异步执行的成功的value数据
3.哪里写async?
 await所在函数(最近的)定义的左侧写async

*/