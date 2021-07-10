import React, { Component } from 'react'
import {
    Card,
    Icon,
    List,
} from 'antd'
import LinkButton from '../../components/link.button'
import { reqCategoryById } from '../../api'
import { BASE_IMG_URL } from '../../utils/constant'
const Item = List.Item
// ProductDetail
export default class ProductDetail extends Component {
    state = {
        cName1: '',//一级分类名称
        cName2: '',//二级分类名称
    }
    async componentDidMount() {
        //得到当前商品的分类id
        const { pcategoryId, categoryId, } = this.props.location.state.product
        if (pcategoryId === '0') {//一级分类下面的商品
            const result = await reqCategoryById(categoryId)
            const cName1 = result.name
            this.setState({ cName1 })
        } else {//二级分类下的商品
            /*
            //通过多个await方式发多个请求：后面一个请求是在前一个请求成功返回之后才发送
            const result1 = await reqCategoryById(pcategoryId)//获取一级分类列表
            const result2 = await reqCategoryById(categoryId)//获取二级分类列表
            const cName1 = result1.name
            const cName2 = result2.name
            */
            //只一次性发送多个请求，只有都成功了，才正常处理
            const results = await Promise.all([reqCategoryById(pcategoryId), reqCategoryById(categoryId)])
            const cName1 = results[0].name
            const cName2 = results[1].name
            this.setState({
                cName1,
                cName2
            })
        }
    }
    render() {
        //读取携带过来的state数据
        const { name, desc, price, detail, images } = this.props.location.state.product
        const { cName1, cName2 } = this.state
        const imageList = images?.split(',') ?? [];
        const title = (
            <span>
                <LinkButton>
                    <Icon type='arrow-left' style={{ margin: 10, fontSize: 20 }}
                        onClick={() => this.props.history.goBack()}
                    ></Icon>
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className="left" >商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span >{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span >{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类：</span>
                        <span >{cName1} {cName2 ? '-->' + cName2 : ''}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片：</span>
                        {
                            imageList.map((img) => {
                                return (
                                    <img key={img} className="product-img" src={BASE_IMG_URL + img} alt="img"></img>
                                );
                            })
                        }
                    </Item>
                    <Item>
                        <span className="left">商品详情：</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
