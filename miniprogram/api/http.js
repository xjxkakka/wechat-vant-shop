
import request from './request'
//API全部写到这里来
//获取首页所有数据
export function HomePage(data){
    return request({
        url:'/api/index',
        method:'get',
        data
    })
}

//商品闲情
export function goodsDetail(id){
    return request({
        url:`/api/goods/${id}`,
        method:'get'
    })
}
//收藏
export function goodsCollect(id){
    return request({
        url:`/api/collects/goods/${id}`,
        method:'post'
    })
}
//收藏列表
export function goodsCollectList(){
    return request({
        url:`/api/collects/goods`,
        method:'get'
    })
}
//商品分类
export function goodsClassify(id){
    return request({
        url:`/api/goods?category_id=${id}`,
        method:'get'
    })
}

//模糊搜索
export function goodsSearch(title){
    return request({
        url:`/api/goods?title=${title}`,
        method:'get',

    })
}

//购物车列表
export function getShopcarts(){
    return request({
        url:`/api/carts?include=goods`,
        method:'get',

    })
}

//加入购物车
export function addShopcart(data){
    return request({
        url:`/api/carts`,
        method:'post',
        data
    },false)
}

//购物车数量改变
export function changeCartNum(id,data){
    return request({
        url:`/api/carts/${id}`,
        method:'put',
        data
    })
}

//移出购物车
export function remGoods(id){
    return request({
        url:`/api/carts/${id}`,
        method:'delete'
    })
}
//购物车改变选中
export function changeGoodsChecked(params){
    return request({
        url:`/api/carts/checked`,
        method:'patch',
        params
    })
}

//登录
export function reqLogin(data){
    return request({
        url:`/api/auth/login`,
        method:'post',
        data
    })
}
//注册
export function reqRegister(data){
    return request({
        url:`/api/auth/register`,
        method:'post',
        data

    })
}

//获取地址列表
export function addAddressList(){
    return request({
        url:`/api/address`,
        method:'get',
    })
}

//添加地址
export function addAddress(data){
    return request({
        url:`/api/address`,
        method:'post',
        data
    })
}

//地址详情
export function AddressDetail(address){
    return request({
        url:`/api/address/${address}`,
        method:'get',
    })
}
//更新地址
export function changeAddress(address,data){
    return request({
        url:`/api/address/${address}`,
        method:'put',
        data
    })
}
//删除地址
export function delAddress(address){
    return request({
        url:`/api/address/${address}`,
        method:'delete',
    })
}
//设置默认地址
export function setAddressDefault(address){
    return request({
        url:`/api/address/${address}/default`,
        method:'PATCH',
    })
}

//订单预览
export function orderPreview(){
    return request({
        url: '/api/orders/preview',
        method:'get'
    })
}
//提交订单
export function submitOrder(data){
    return request({
        url: '/api/orders',
        method:'post',
        data
    })
}

//订单详情
export function orderDetail(order){
    return request({
        url:`/api/orders/${order}`,
        method:'get',
    })
}

//订单列表
export function orderList(){
    return request({
        url:`/api/orders?include=orderDetails.goods`,
        method:'get',
    })
}