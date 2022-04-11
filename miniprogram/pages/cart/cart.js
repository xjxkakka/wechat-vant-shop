// pages/cart/cart.js

// const Dialog = require('../../miniprogram_npm/@vant/weapp/dialog/dialog')
// import Dialog from '/to/@vant/weapp/dist/dialog/dialog';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import { changeCartNum, changeGoodsChecked, getShopcarts, remGoods } from '../../api/http'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isToken: true,
        checked: false,//全选
        cartList: [],//购物车列表
        total: 0,//总金额

    },
    onClose (event) {
        console.log()
        Dialog.alert({
            title: '删除该商品！',
            message: '确定删除吗？',
            showCancelButton: true,
            showConfirmButton: true
        }).then(() => {
            remGoods(event.currentTarget.dataset.id).then(res=>{
                this.selectComponent("#swipe-cell").close()
                //重新获取购物车
                getShopcarts().then(res => {
                    this.setData({
                        cartList: res.data
                    })
                })

            })
        }).catch(() => {
            console.log("取消了")
        });


    },
    //勾选框
    onChange (event) {
        var id = event.currentTarget.dataset.id
        console.log(id)
        //小程序不支持patch这里用不了
        /* var idArr = []
         idArr.push(id)
         changeGoodsChecked({cart_ids:idArr}).then(res=>{
             console.log(res)
         })*/
        //只能手动修改购物车列表

        var newList = this.data.cartList.map(item => {
            if (item.id == id.id) {
                item.is_checked == 0 ? item.is_checked = 1 : item.is_checked = 0
            }
            return item;
        })
        // console.log(newList)
        this.setData({
            cartList: newList
        })



        //every判断下是否全部选上，选上就改变全选的值
        this.setData({
            checked: this.data.cartList.every(function(item){
                return item.is_checked==1
            })
        })

    },
    //步进器
    async onStepperChange (event) {
        //当前点击的数量
        var num = event.detail;
        //拿到商品的id修改数量
        var id = event.currentTarget.dataset.id.id
        //修改完后重新获取购物车列表
        var res = await changeCartNum(id, { num: num })
        if (res.status_code == 422) {
            console.log(res.errors["num"][0]);
            wx.showToast({
                title: '库存不足',
                icon: "error"
            })
            return false;
        }
        getShopcarts().then(res => {
            this.setData({
                cartList: res.data
            })
            console.log(this.data.cartList)
        })

    },
    //全选/全不选
    handleChange () {
        console.log(123)
        this.setData({
            checked: !this.data.checked
        })
        if (this.data.checked){
            this.setData({
                cartList:this.data.cartList.map(item=>{
                    item.is_checked=1
                    return item
                })
            })
        }else{
            this.setData({
                cartList:this.data.cartList.map(item=>{
                    item.is_checked=0
                    return item
                })
            })
        }

    },
    //每次点击都触发金额统计
    ChangeTotal () {
        var sum = 0;
        this.data.cartList.forEach(item => {
            if (item.is_checked==1){
                sum += (parseInt(item.num) * parseInt(item.goods.price))
            }
        })
        this.setData({
            total:sum*100
        })
    },
    //提交订单
    onClickButton(){
        //把勾选上的商品传递到结算页面
        var goods = []
        this.data.cartList.filter(item=>{
            if (item.is_checked==1){
                goods.push(item)
            }
        })
        wx.navigateTo({
            url:`/pages/pay/pay`,

        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 调用监听器，监听数据变化
        app.watch(this, {
            cartList: function (newVal) {
                this.ChangeTotal();
                console.log(newVal,"watch")
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        //判断用户是否登录
        if (wx.getStorageSync('token')) {
            this.setData({
                isToken: true
            })
        } else {
            this.setData({
                isToken: false
            })
        }

        //每次进来都获取下购物车列表
        getShopcarts().then(res => {
            console.log(res)
            this.setData({
                cartList: res.data
            })
            console.log(this.data.cartList)
        })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})