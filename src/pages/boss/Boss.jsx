//老板主界面路由容器组件
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserList } from '../../redux/actions'
import UserList from '../../components/user.list/UserList'
export default function Boss() {
    const dispatch = useDispatch()
    //获取userList
    useEffect(() => {
        dispatch(getUserList('dashen'))
    }, [dispatch])
    const  userList  = useSelector(state => state.userList)
    return (
        <div>
            <UserList userList={userList}/>
        </div>
    )
}