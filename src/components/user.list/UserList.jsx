//显示指定用户列表的UI组件
import React from 'react'
import { WingBlank, WhiteSpace, Card, } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim';
const Header = Card.Header
const Body = Card.Body
export default function UserList(props) {
    const { userList } = props
    const { push} = useHistory()
    return (
        <WingBlank style={{ marginTop: 50, marginBottom: 50 }}>
            <QueueAnim type='scale'>
                {
                    userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace />
                            <Card onClick={() => push(`/chat/${user._id}`)}>
                                {
                                    user.header ? <Header
                                        thumb={require(`../../assets/images/${user.header}.png`).default}
                                        extra={user.username}
                                    /> : null
                                }
                                <Body>
                                    <div>职位:{user.post}</div>
                                    {
                                        user.company ? <div>公司:{user.company}</div> : null
                                    }
                                    {
                                        user.salary ? <div>月薪:{user.salary}</div> : null
                                    }
                                    <div>描述:{user.info}</div>
                                </Body>
                            </Card>
                        </div>
                    ))
                }
            </QueueAnim>
        </WingBlank>
    )
}