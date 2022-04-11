// pages/goodsdetail/goodsdetail.js
import { addShopcart, goodsCollect, goodsDetail } from '../../api/http'
var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods:[],
        active:0,
        like_goods:[],
        details:null,
    },
    //相似书本点击跳转详情
    handleDetail(event){
        // console.log(event.currentTarget.dataset.id)
        var id = event.currentTarget.dataset.id
        wx.navigateTo({
            //这里是可以直接在地址上传递参数的
            url: `/pages/goodsdetail/goodsdetail?id=${id}`
        })
    },
    //点击收藏或者购物车
    onClickIcon(event){
        console.log(event.currentTarget.dataset.index)
        var index = event.currentTarget.dataset.index;
        if (index == 0){
            goodsCollect(this.data.goods.id).then(res=>{
                //手机上测试需要先登录哈
                console.log(res)
                //点击后还要在发送一次请求刷新页面
                goodsDetail(this.data.goods.id).then(res=>{
                    this.setData({
                        goods:res.goods,
                    })
                })
            })
        }else if (index == 1){
            //跳转至购物车
            wx.switchTab({
                url:'/pages/cart/cart'
            })
        }

    },
    //点击加入购物车或者立即购买
    onClickButton(event){
        var index = event.currentTarget.dataset.index;
        //加入购物车
        if (index == 0){
            wx.showLoading({
                title: '正在加入购物车'
            })
            addShopcart({goods_id:this.data.goods.id}).then(res=>{
                console.log(res)
                wx.hideLoading({
                    success: (res) => {
                    },
                })
                wx.showToast({
                    title:'已加入购物车!'
                })

            })

        }else if (index == 1){
            //立即购买
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //这里可以接收query参数
        // console.log(options.id)
        var id = options.id
        //获取详情信息
        goodsDetail(id).then(res=>{
            console.log(res)
            this.setData({
                goods:res.goods,
                details:res.goods.details,
                like_goods:res.like_goods
            })
            WxParse.wxParse('article', 'html', this.data.details, this );
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})