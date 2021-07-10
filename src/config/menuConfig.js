 const menuList= [
     {
         title: '首页',
         key: '/home',
         icon: 'home',
         isPublic: true,//公开的界面
     },
     {
         title: '商品',
         key: '/products',
         icon: 'appstore',
         children: [
             {
                 title: '品类管理',
                 key: '/category',
                 icon: 'bars',
             },
             {
                 title: '商品管理',
                 key: '/product',
                 icon: 'shopping-cart',
             },
         ],
     },
     {
         title: '用户管理',
         key: '/user',
         icon: 'user',
     },
     {
         title: '角色管理',
         key: '/role',
         icon: 'smile',
     },
     {
         title: '图形图表',
         key: '/charts',
         icon: 'line-chart',
         children: [
             {
                 title: '柱形图',
                 key: '/bar',
                 icon: 'bar-chart',
             },
             {
                 title: '折线图',
                 key: '/line',
                 icon: 'line-chart',
             },
             {
                 title: '饼图',
                 key: '/pie',
                 icon: 'pie-chart',
             },
         ],
     },
 ]
 export default menuList