import React, { useState, useEffect } from "react"
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { useSelector, useDispatch } from 'react-redux'
import { sendMsg, readMsg } from '../../redux/actions'
const Item = List.Item
export default function Chat(props) {
    const [isShow, seIsShow] = useState(false)//是否显示表情列表
    useEffect(() => {
        if (isShow) {
            //异步手动派发resize事件，解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }, [isShow])
    //初始化表情包列表数据
    const emojis = [
        '😃', '🐻', '🍔', '⚽', '🌇', '🥺', '🤡',
        '😂', '😊', '🥰 ', '💨', '📅', '😇',
        '😍', '😘', '😋', '🤨', '👊', '🤲', '🙏'
    ]
    const emojis1 = emojis.map(emoji => ({
        text: emoji
    }))
    //开关表情列表
    const toggleShow = () => {
        seIsShow(!isShow)
    }

    //发送消息
    const { user, chat } = useSelector(state => state)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    useEffect(() => {
        //初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
        return () => {
            //发请求更新消息的未读状态
            const from = props.match.params.userid
            const to = user._id
            dispatch(readMsg(from, to))
        }
        //更新显示列表
    }, [dispatch, props.match.params.userid, user._id])

    const handleSend = () => {
        //收集数据发送请求
        const from = user._id
        const to = props.match.params.userid
        //发送请求(发消息)
        if (content) {
            dispatch(sendMsg({ from, to, content }))
        }
        //显示列表更新消息
        window.scrollTo(0, document.body.scrollHeight)
        //清楚输入数据
        setContent('')
        seIsShow(false)
    }
    //读取聊天列表数据
    const { users, chatMsgs } = chat
    //计算当前聊天的chatId
    const meId = user._id
    if (!users[meId]) { // 如果还没有获取数据, 直接不做任何显示
        return null
    }
    const targetId = props.match.params.userid
    const chatId = [meId, targetId].sort().join('_')
    //chatMsgs进行过滤
    let msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
    let obj = {}
    msgs.reduce((cur, next) => {
        obj[next._id] ? "" : obj[next._id] = true && cur.push(next)
        return cur
    }, [])
    //得到目标用户的header图片对象
    const targetHeader = users[targetId].header
    const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`).default : null
    return (
        <div id='chat-page'>
            <NavBar
                icon={<Icon type='left' />}
                className="sticky-header"
                onLeftClick={() => props.history.goBack()}
            >
                {users[targetId].username}
            </NavBar>
            <List style={{ marginTop: 50, marginBottom: 50 }} >
                {
                    msgs.map(msg => {

                        if (meId === msg.to) {//对方发给我的
                            return (
                                <Item
                                    key={msg._id}
                                    thumb={targetIcon}
                                >
                                    {msg.content}
                                </Item>
                            )

                        } else {//我发给对方的消息
                            return (
                                <Item
                                    key={msg._id}
                                    className='chat-me'
                                    extra='我'
                                >
                                    {msg.content}
                                </Item>
                            )
                        }
                    })
                }
            </List>
            <div className='am-tab-bar'>
                <InputItem
                    placeholder="请输入"
                    value={content}
                    onChange={val => setContent(val)}
                    onFocus={() => seIsShow(false)}
                    extra={
                        <span >
                            <span onClick={toggleShow} style={{ marginRight: 5 }}>😃</span>
                            <span onClick={handleSend} >发送</span>
                        </span>
                    }
                />
                {
                    isShow ? (
                        <Grid
                            data={emojis1}
                            columnNum={5}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                setContent(content + item.text)
                            }}
                        />
                    ) : null
                }
            </div>
        </div>
    )
}