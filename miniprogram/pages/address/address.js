// pages/address/address.js
import { addAddressList, changeAddress } from '../../api/http'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList:[],
        pay:false
    },
    //修改地址
    changeAddressFn(event){
        var id = event.currentTarget.dataset.id
        if (this.data.pay){
            wx.navigateTo({
                url:`/pages/changeaddress/changeaddress?id=${id}&type=pay`
            })
        }else{
            wx.navigateTo({
                url:`/pages/changeaddress/changeaddress?id=${id}`
            })
        }

    },
    //创建新的地址
    newAddress(){
        if (this.data.pay){
            wx.navigateTo({
                url:`/pages/changeaddress/changeaddress?type=pay`
            })
        }else{
            wx.navigateTo({
                url:`/pages/changeaddress/changeaddress`
            })
        }

    },

    //handlePay执行这个方法代表是支付页面过来修改地址的
    handlePay(event){
        if (this.data.pay===false) return
        //如果pay为true才执行
        console.log(event.currentTarget.dataset.item)
        var address = event.currentTarget.dataset.item
            wx.navigateTo({
                url:`/pages/pay/pay?type=address`,
                success (res) {
                    res.eventChannel.emit('address',address)
                }
            })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.type)
        if (options.type=='pay'){
            this.setData({
                pay:true
            })
        }
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
        addAddressList().then(res=>{
            console.log(res)
            this.setData({
                addressList:res.data
            })
            console.log("重新渲染了")
        })
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