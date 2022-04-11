// pages/phone/phone.js
import { reqLogin } from '../../api/http'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        codeBtn:false,
        LoginBtn:false,
        Phone:'',
        Code:'',
    },
    //手机输入框
    changePhone(event){
        // console.log(event.detail.value)
        var phone = event.detail.value;
        console.log(phone.length)
        // if (phone.length===11){
            this.setData({
                Phone:phone,
                codeBtn:true
            })
        // }
    },
    //验证码输入框
    changeCode(event){
        var code = event.detail.value;
        if (code.length===6){
            this.setData({
                Code:code,
                LoginBtn:true
            })
        }
    },
    //登录按钮
    handleLogin(){
        console.log(this.data)
        reqLogin({email:this.data.Phone,password:this.data.Code}).then(res=>{
            console.log(res )
            if (res.access_token){
                //成功的话拿到token存储起来
                wx.setStorageSync("token",res.access_token)
                wx.setStorageSync("email",this.data.Phone)
                //跳转到首页
                wx.switchTab({
                    url:"/pages/index/index"
                })
            }else{
                //提示账号或者密码错误
                wx.showToast({
                    title:'账号或密码错误',
                    icon:"error"
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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