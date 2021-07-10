import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option
//添加/修改用户的form组件
class UserForm extends PureComponent {
    static propTypes = {
        setForm: PropTypes.func.isRequired,//用来传递form对象的函数
        roles: PropTypes.array.isRequired,//
        user: PropTypes.object//
    }

    componentDidMount() {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }
    render() {
        const {roles} = this.props
        const user = this.props.user
        //指定item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 },//左侧布局lobel的宽度
            wrapperCol: { span: 15 }//指定右侧包裹的宽度
        }
        const { getFieldDecorator } = this.props.form
        return (
            <Form {...formItemLayout}>

                <Item label='用户名'>
                    {
                        getFieldDecorator(
                            'username', {
                                rules: [
                                    { required: true, message: '用户名必须输入' },
                                    { min: 4, message: '用户名至少4位' },
                                    { max: 12, message: '用户名最多12位' },
                                    { pattern: /^[a-zA-Z0-9]+$/, message: '用户名必须是英文，数字或下划线组成' }
                                ],
                            initialValue: user.username,
                        })(
                            <Input placeholder='请输入用户名' />
                        )
                    }
                </Item>
                {
                    user._id ? null : <Item label='密码'>
                        {
                            getFieldDecorator(
                                'password', {
                                rules: [
                                    { required: true, message: '密码必须输入' },
                                    { min: 4, message: '密码至少4位' },
                                    { max: 12, message: '密码最多12位' },
                                ],
                                initialValue: user.password,
                            })(
                                <Input type='password' placeholder='请输入密码' />
                            )
                        }
                    </Item>
                }
                <Item label='手机号'>
                    {
                        getFieldDecorator(
                            'phone', {
                                rules:[
                                    { required: true, message: '请输入手机号码',},
                                    { pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/, message: '请输入正确手机号码'}
                                ],
                            initialValue: user.phone,
                        })(
                            <Input placeholder='请输入手机号' />
                        )
                    }
                </Item>
                <Item label='邮箱'>
                    {
                        getFieldDecorator(
                            'email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: '请求输入正确邮箱',
                                    },
                                    {
                                        required: true,
                                        message: '请求输入正确邮箱',
                                    }
                                ],
                            initialValue: user.email,
                        })(
                            <Input placeholder='请输入邮箱' />
                        )
                    }
                </Item>
                <Item label='角色'>
                    {
                        getFieldDecorator(
                            'role_id', {
                            initialValue: user.role_id,
                        })(
                           <Select >
                             {
                                 roles.map(role=><Option key={role._id} value={role._id}>{role.name}</Option>)
                             }
                           </Select>
                        )
                    }
                </Item>
            </Form >
        )
    }
}
export default Form.create()(UserForm)