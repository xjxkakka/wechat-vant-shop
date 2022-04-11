// pages/pay/pay.js
import { addAddressList, orderPreview, submitOrder } from '../../api/http'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList: [],
        address: {},
        total: 0,
    },
    //点击跳转地址列表
    handleSetAddress () {
        wx.navigateTo({
            url: '/pages/address/address?type=pay'
        })
    },

    //提交订单
    onSubmit () {
        console.log(this.data.address)
        submitOrder({ address_id: this.data.address.id }).then(res => {
            console.log(res)
            if (res.order_no) {
                wx.showToast({
                    title: '已提交'
                })
                wx.switchTab({
                    url:'/pages/index/index'
                })
            } else {
                if (res.status_code == 400) {
                    wx.showToast({
                        title: '库存不足',
                        icon: 'error'
                    })
                }else{
                    wx.showToast({
                        title:'提交失败',
                        icon:'error'
                    })
                }

            }
        })

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)

        orderPreview().then(res=>{
            this.setData({
                goodsList: res.carts
            })
        }).then(()=>{
            //计算总金额
            var sum = 0
            this.data.goodsList.forEach(item => {
                sum += item.num * item.goods.price
            })
            this.setData({
                total: sum
            })
        })

        const eventChannel = this.getOpenerEventChannel()

        //从地址列表返回过来
        if (options.type == "address") {
            eventChannel.on('address', (data) => {
                console.log(data)
                this.setData({
                    address: data
                })
                console.log("执行了")
            })
        } else {
            addAddressList().then(res => {
                res.data.filter(item => {
                    if (item.is_default == 1) {
                        this.setData({
                            address: item
                        })
                    }
                    console.log(this.data.address)

                })

            })
        }

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