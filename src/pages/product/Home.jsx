import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
} from 'antd'
import LinkButton from '../../components/link.button'
import { reqProducts } from '../../api/'
import { PAGF_SIZE } from '../../utils/constant'
import { reqSearchProducts, reqUpdateStatus } from '../../api'
const Option = Select.Option

// ProductHome 默认子路由组件
export default class ProductHome extends Component {
    state = {
        total: 0,//商品的总数量
        products: [],//商品的数组
        loading: false,//是否正在加载中
        searchName : '',//搜索的关键字
        searchType: 'productName'//根据那个字段搜索
    }
    //初始化table的列的数组
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price//当前指定了对应的属性，传入的是对应的属性值
            },
            {
                width: 100,
                title: '状态',
                render: (product) => {
                    const { status,_id } = product
                    const newStatus = status === 1 ? 2 : 1
                    return (
                        <span>
                            <Button
                                type='danger'
                                onClick={() => this.updateStatus(_id , newStatus)} >
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            {/* 将product对象使用state传递给目标路由组件 */}
                            <LinkButton onClick={() => this.props.history.push('/product/detail', { product })}>详情</LinkButton>
                            <LinkButton onClick={() => this.props.history.push('/product/addupdate', product )}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }
    //获取指定页码数据显示
    getProducts = async (pageNum) => {
        this.pageNum = pageNum//保存pageNum
        this.setState({ loading: true })//显示loding
        const { searchName, searchType } = this.state
        //如果搜索关键字有值，说明我们要做搜索分页
        let result
        if (searchName) {
            result = await reqSearchProducts({ pageNum, pageSize: PAGF_SIZE, searchName, searchType })
        } else {//一般分页

            result = await reqProducts(pageNum, PAGF_SIZE)
        }
        this.setState({ loading: false })//隐藏loading
        const { total, list } = result.data
        this.setState({
            total,
            products: list,
        })
    }
    //更新指定商品的状态
    updateStatus = async (productId, status) => {
        const result = await reqUpdateStatus(productId,status)
        if (result.status ===0) {
            message.success('更新商品成功')
            this.getProducts(this.pageNum)
        }
    }
    //发异步ajax请求
    componentDidMount() {
        //获取一级分类列表
        this.getProducts(1)
        this.initColumns()
    }
    render() {
        //取出商品的数组
        const { products, total, loading, searchName, searchType } = this.state
        const title = (
            <span>
                <Select value={searchType} style={{ width: 130 }}
                    onChange={value => this.setState({ searchType: value })}>
                    < Option value='productName'>按名称搜索</Option>
                    < Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder="关键字" style={{ width: 150, margin: '0 15px' }} value={searchName}
                    onChange={event => this.setState({ searchName : event.target.value })}
                />
                <Button type='danger' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='danger' onClick={() => this.props.history.push('/product/addupdate')}>
                <Icon type='plus' />
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='id'
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        current:this.pageNum,
                        total,
                        defaultPageSize: PAGF_SIZE,
                        showQuickJumper:true,
                        onChange: this.getProducts
                    }}
                    loading={loading}
                />;
            </Card>
        )
    }
}
