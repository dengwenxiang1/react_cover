//选择用户头像的ui组件
import React, { useState } from 'react'
import { List, Grid } from 'antd-mobile'
export default function HeaderSeletor(porps) {
  const [icon, setIcon] = useState(null)//图片对象，默认是没有值的
  const listHeader = !icon ? '请选择头像' :(
    <div>
      已选择头像:<img src={icon} alt=''></img>
    </div>
  )
  const headerList = []//需要显示的列表数据
  for (let i = 0; i < 20; i++) {
    headerList.push({
      text: '头像' + (i + 1),
      icon: require(`../../assets/images/头像${i + 1}.png`).default//不能使用import
    })
  }
  const handleClick = ({text,icon}) => {
    //更新当前组件状态
      setIcon(icon)
    //调用函数更新父组件状态
    porps.setHeader(text)
  }
  return (
    <List renderHeader={() => listHeader}>
      <Grid
        data={headerList}
        columnNum={5}
        onClick={handleClick}
      >

      </Grid>
    </List>
  )
}