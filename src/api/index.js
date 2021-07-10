/*
要求：能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

*/
//登录
import ajax from './ajax'
const BASE = ''
export const reqLogin = (username, password) => ajax(BASE + '/login/', { username, password }, 'POST')

//获取一级/二级分类的例表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId })
//添加分类
export const reqAddCategorys = ({ parentId, categoryName }) => ajax(BASE + '/manage/category/add', { parentId, categoryName }, 'POST')
//更新分类
export const reqUpdateCategorys = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')
//天气请求函数
export const reqWeather = (key, city,) => ajax('https://restapi.amap.com/v3/weather/weatherInfo?parameters', { key, city })
//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + 'manage/product/list', { pageNum, pageSize },)
//根据商品名称搜索
//searchType:搜素的类型，productName/productDesc
export const reqSearchProducts = ({  pageNum, pageSize ,searchName,searchType}) => ajax(BASE + '/manage/product/search?', { pageNum, pageSize,[searchType]:searchName },)

//获取一个分类
export const reqCategoryById = (categoryId) => ajax(BASE + '/manage/category/info', { categoryId })
//更新商品1的状态(上架和下架的操作)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')
//删除指定名称的图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', { name }, 'POST')
//添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')
//获取所有角色列表
export const reqRoles = () => ajax(BASE +'/manage/role/list')
//添加角色
export const reqAddRoles = (roleName) => ajax(BASE + '/manage/role/add', { roleName},'POST')
//更新角色权限
export const reqUpdateRoles = (role) => ajax(BASE + '/manage/role/update',  role, 'POST')
//获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')
//删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete',{userId},'POST')
//添加用户
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/'+(user._id?'update':'add'),user,'POST')