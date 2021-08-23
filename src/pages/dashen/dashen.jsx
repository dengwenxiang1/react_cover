//大神主界面路由容器组件
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList } from '../../redux/actions'
import  UserList  from '../../components/user.list/UserList'
export default function Dashen() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserList('laoban'))
    }, [dispatch])
    const userList = useSelector(state => state.userList)
    return (
        <div>
            <UserList userList={userList}></UserList>
        </div>
    )
}