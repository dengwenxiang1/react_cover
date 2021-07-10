import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
//添加分类的组件
class AddForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,//父分类的ID
    }

    componentDidMount() {
        //将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }
    render() {
        //指定item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 },//左侧布局lobel的宽度
            wrapperCol: { span: 15 }//指定右侧包裹的宽度
        }
        const { getFieldDecorator } = this.props.form
        return (
            <Form {...formItemLayout }>
            
                <Item label='角色名称'>
                    {
                        getFieldDecorator(
                            'roleName', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '角色名称必须输入'
                                }
                            ]
                        })(
                            <Input placeholder='请输入角色名称' />
                        )
                    }
                </Item>
            </Form >
        )
    }
}
export default Form.create()(AddForm)