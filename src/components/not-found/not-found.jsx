import React from 'react'
import { Button } from 'antd-mobile'
export default function NotFound(porps) {
    return (
        <div>
            <h2>抱歉,找不到该页面！</h2>
            <Button
             type='primary' 
             onClick={()=>porps.history.replace('/')}
            >回到首页</Button>
        </div>
    )
}