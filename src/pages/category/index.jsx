import React, { Component } from 'react'
import {
    Card,
    Table,
    Button,
    Icon,
    message,
    Modal
} from 'antd';
import LinkButton from '../../components/link.button'
import { reqCategorys, reqUpdateCategorys, reqAddCategorys } from '../../api'
import AddForm from './add-form'
import UpdateForm from './Update-form'

//商品分类
export default class Category extends Component {
    state = {
        loading: false,//是否正在获取数据中
        Categorys: [],//一级分类列表
        subCategorys: [],//二级分类列表
        parentId: '0',//当前需要显示的分类列表的id
        parentName: '',//当前需要显示的分类列表的父类名称
        showStatus: '0',//标识添加/更新的确认框是否显示，0显示1显示添加，2：显示更新
    }

    //初始化Table所有列的数组
    initColumns = () => {
        this.a = 1
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',//显示数据对应的属性名
            },
            {
                title: '操作',
                width: 300,
                render: (Category) => (//返回需要显示的界面标签
                    <span>
                        <LinkButton onClick={() => this.showUpdate(Category)}>修改分类 </LinkButton>
                        {/* 如何向事件回调函数传递参数：先定义一个匿名函数，在函数调用处理的函数并传入数据 */}
                        {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(Category)} > 查看子分类</LinkButton> : null}
                    </span>
                )
            },
        ];
    }
    //异步获取一级/二级分类列表显示

    //parentId:如果没有指定根据状态中的parentId请求，如果指定了根据指定的发请求
    getCategorys = async (parentId) => {
        //在发请求前，显示Loading
        this.setState({ loading: true })
        //发异步ajax请求，获取数据
        parentId = parentId || this.state.parentId
        const result = await reqCategorys(parentId)
        //在请求完成之后，隐藏
        this.setState({ loading: false })
        if (result.status === 0) {
            //取出分类数组(可能是一级也可能是二级)
            const Categorys = result.data
            if (parentId === '0') {
                //更新一级状态
                this.setState({ Categorys })
            } else {
                //更新二级状态
                this.setState({ subCategorys: Categorys })
            }
        } else {
            message.error('获取分类列表失败')
        }
    }
    //显示指定一级分类对象的二子列表
    showSubCategorys = (Category) => {
        //更新状态
        this.setState({
            parentId: Category._id,
            parentName: Category.name
        }, () => {//在状态更新且重新render()后执行
            //获取二级分类列表
            this.getCategorys()
        })
        //setState()不能立即获取最新的状态：因为setState()是异步更新的状态的
    }
    //显示一级分类列表
    showFirstCategorys = () => {
        //更新为显示一级列表状态
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }
    //响应点击取消，隐藏确认框
    handleCancel = () => {
        //清除输入数据
        this.form.resetFields()
        //隐藏确认框
        this.setState({
            showStatus: 0
        })
    }
    //显示添加的确认框

    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }
    //添加分类

    addCategory = () => {
        //进行表单验证，只有通过了才处理
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //隐藏确认框
                this.setState({
                    showStatus: 0
                })
                //收集数据，并提交添加分类的请求
                const { parentId, categoryName } = values
                console.log(parentId);
                console.log(categoryName);
                //清除输入数据
                this.form.resetFields()
                const result = await reqAddCategorys({ parentId, categoryName })
                if (result.status === 0) {
                    //添加的分类就是当前分类列表的
                    if (parentId === this.state.parentId) {
                        //3重新显示列表
                        this.getCategorys()
                    } else if (parentId === '0') {//在二级分类列表下添加一级分类，重新获取一级分类列表，但不需要显示，一级列表
                        this.getCategorys('0')
                    }
                }
            }
        })
    }

    //显示更新的确认框
    showUpdate = (Category) => {
        //保存分类对象
        this.Category = Category
        //更新状态
        this.setState({
            showStatus: 2
        })
    }

    //更新分类
    updateCategory = () => {
        //进行表单验证，只有通过了才处理
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //1.隐藏确定框
                this.setState({
                    showStatus: 0
                })
                // 准备数据   
                const categoryId = this.Category._id
                console.log(categoryId);
                const  {categoryName}  = values
                //清除输入数据
                this.form.resetFields()
                //2.发请求更新分类
                const result = await reqUpdateCategorys({ categoryId, categoryName })
                if (result.status === 0) {
                    //3重新显示列表
                    this.getCategorys()
                }
            }
        })
    }

    //发异步ajax请求
    componentDidMount() {
        this.initColumns()
        //获取一级分类列表
        this.getCategorys()
    }
    render() {
        //读取状态数据
        const { Categorys, subCategorys, parentId, parentName, loading, showStatus } = this.state
        //读取指定的状态
        const Category = this.Category || {}//如果还没指定一个空对象
        //card的左侧
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showFirstCategorys}>一级分类列别</LinkButton>
                <Icon type='arrow-right' style={{ marginRight: 5 }}></Icon>
                <span>{parentName}</span>
            </span>
        )
        //card的右侧
        const extra = (
            <Button type='danger' onClick={this.showAdd}>
                <Icon type='plus' />
                添加
            </Button>
        )
        return (
            <Card title={title} extra={extra} >
                <Table
                    bordered
                    rowKey='id'
                    loading={loading}
                    dataSource={parentId === '0' ? Categorys : subCategorys} columns={this.columns}
                    pagination={{ defaultPageSize: 8 }}
                />;

                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm Categorys={Categorys}
                        parentId={parentId}
                        setForm={(form) => { this.form = form }}
                    />
                </Modal>
                <Modal
                    title="修改分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm categoryName={Category.name}
                        setForm={(form) => { this.form = form }} />
                </Modal>
            </Card>
        )
    }
}
