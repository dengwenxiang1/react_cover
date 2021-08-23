//老板主界面路由容器组件
import React from 'react'
import { useSelector } from 'react-redux'
import { List, Badge } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
export default function Massage(props) {
    const { user, chat } = useSelector(state => state)
    const { users, chatMsgs } = chat
    //对chatMsgs按chat_id进行分组,并得到每个组的lastMsg组成的数组
    const getLastMsgs = (chatMsgs, userid) => {
        // 1.找出每个聊天的lastMsg,并用一个对象容器来保存{chat_id:lastMsg}
        const lastMsgObjs = {}
        chatMsgs.forEach(msg => {
            //对msg进行个体的统计
            if (msg.to === userid && !msg.read) {
                msg.unReadCount = 1
            } else {
                msg.unReadCount = 0
            }
            //得到msg的聊天标识id
            const chatId = msg.chat_id
            //获取已保存的当前组的lastMsg
            const lastMsg = lastMsgObjs[chatId]
            //没有
            if (!lastMsg) {//当前msg就是所在组的lastMsg
                lastMsgObjs[chatId] = msg
            } else {//有
                //累加unReadCount=已经统计的+当前msg的
                const unReadCount = lastMsg.unReadCount + msg.unReadCount
                //如果msg比Lastmsg晚，就将msg保存为LastMsg
                if (msg.create_time > lastMsg.create_time) {
                    lastMsgObjs[chatId] = msg
                }
                //将unReadCount保存在最新的lastMsg上
                lastMsgObjs[chatId].unReadCount = unReadCount 
            }
        })
        //2.得到所有lastMsg的数组
        const lastMsgs = Object.values(lastMsgObjs)
        //3对数组进行排序(按create_time降序)
        lastMsgs.sort((m1, m2) => {//如果结果<0,那么将m1放在前面，如果结果为0,不变，如果结果>0,m2在前面
            return m2.create_time - m1.create_time
        })
        return lastMsgs
    }
    const lastMsgs = getLastMsgs(chatMsgs,user._id)
    return (
        <List style={{ marginTop: 50, marginBottom: 50 }}>
            {
                lastMsgs.map(msg => {
                    //得到目标用户的id
                    const targetUserId = msg.to === user._id ? msg.from : msg.to
                    //得到目标用户的id
                    const targetUser = users[targetUserId]
                    return (
                        <Item key={msg.chat_id}
                            extra={<Badge text={msg.unReadCount} />}
                            thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`).default : null}
                            arrow='horizontal'
                            onClick={() => props.history.push(`/chat/${targetUserId}`)}
                        >
                            {msg.content}
                            <Brief>{targetUser.username}</Brief>
                        </Item>
                    )
                })
            }
        </List>
    )
}