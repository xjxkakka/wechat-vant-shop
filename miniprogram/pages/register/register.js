// pages/register/register.js
import { reqRegister } from '../../api/http'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        email: '',
        password: '',
        password2: '',

    },
    //跳转到手机号码页面登录
    handlePhone () {
        wx.navigateTo({
            url: "/pages/phone/phone"
        })
    },
    //注册
    handleRegister () {
        console.log(this.data)
        var params = {
            name: this.data.username,
            email: this.data.email,
            password: this.data.password,
            password_confirmation: this.data.password2,
        }
        reqRegister({ ...params }).then(res=>{
            console.log(res)
            if (res.status_code==422){
                wx.showToast({
                    title:'注册失败，请重新注册',
                    icon:"error"
                })
            }else{
                wx.navigateTo({
                    url:'/pages/phone/phone'
                })
            }
        })

    },
    //输入赋值
    handleFinish (event) {
        //进来先获取类型
        var type = event.currentTarget.dataset.type;
        var content = event.detail.value
        console.log(content)
        if (type == 0) {
            this.setData({
                username: content
            })
        } else if (type == 1) {
            this.setData({
                email: content
            })
        } else if (type == 2) {
            this.setData({
                password: content
            })
        } else if (type == 3) {
            this.setData({
                password2: content
            })
        }


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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