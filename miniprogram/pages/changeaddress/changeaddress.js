// pages/changeaddress/changeaddress.js
import { areaList } from '@vant/area-data';
import { addAddress, AddressDetail, changeAddress } from '../../api/http'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pay:false,
        addressId:null,
        isChange:false,
        checked:false,
        areaList:areaList,
        show: false,
        username:'',
        phone:'',
        provincial:'',//省市区
        _provincial:'', //传递数据的省份
        _city:'',//市
        _district:'',//区
        detailAddress:'',//详细地址，不含省市区
    },

    //点击省市区是否显示
    showPopup() {
        this.setData({ show: true });
    },

    onClose() {
        this.setData({ show: false });
    },
    //选完省市区 点确认
    changeProvincial(event){
        console.log(event.detail)
        var text = '';
        //这个code目前还没用到
        var code = '';
        event.detail.values.forEach((item,index)=>{
            text+=item.name
            if (index == 0 ){
                code+=item.code.substr(0,2)
                this.setData({
                    _provincial:item.name
                })
            }else if (index==1){
                code+=item.code.substr(2,2)
                this.setData({
                    _city:item.name
                })
            }else if (index==2){
                code+=item.code.substr(4,2)
                this.setData({
                    _district:item.name
                })
            }
        })
        console.log(code)
        console.log(text)
        this.setData({
            provincial:text
        })
        console.log(this.data)
        //关闭弹窗
        this.onClose();
    },
    handleResult(event){
        var type = event.currentTarget.dataset.type;

        if (type==0){
            this.setData({
                username:event.detail
            })
            console.log(this.data)
        }else if (type==1){
            this.setData({
                phone:event.detail
            })
        }else if (type==2){
            this.setData({
                detailAddress:event.detail
            })
        }
    },
    //保存
    handleSave(){
        var params = {
            name:this.data.username,
            address:this.data.detailAddress,
            phone:this.data.phone,
            province:this.data._provincial,
            city:this.data._city,
            county:this.data._district,
            is_default:1
        }
        console.log(params)
        if (this.data.isChange){
            //如果为true代表点了修改地址
            changeAddress(this.data.addressId,{...params}).then(res=>{
                console.log(res)
                if (res.statusCode==204){
                    if (this.data.pay){
                        wx.reLaunch({
                            url:'/pages/address/address?type=pay'
                        })
                        wx.showToast({
                            title:'修改成功！'
                        })
                    }else{
                        wx.reLaunch({
                            url:'/pages/address/address'
                        })
                        wx.showToast({
                            title:'修改成功！'
                        })
                    }

                }else{
                    wx.showToast({
                        title:'修改失败',
                        icon:'error'
                    })
                }
            })
            return
        }
        //默认地址单独修改不了这里全部默认1设置默认
        addAddress({...params}).then(res=>{
            console.log(res)
            if (res.statusCode){
                wx.showToast({
                    title:'保存成功!',
                    success (res) {
                        wx.reLaunch({
                            url:'/pages/address/address'
                        })
                    }
                })
            }else{
                wx.showToast({
                    title:'保存失败!',
                    icon:"error"
                })
            }

        })
    },

    //是否选中默认地址
    onChange(){
      this.setData({
          checked:!this.data.checked
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.type=="pay"){
            this.setData({
                pay:true
            })
        }
        if (options.id){
            AddressDetail(options.id).then(res=>{
                console.log(res)
                this.setData({
                    addressId:options.id,
                    isChange:true,
                    provincial:res.province+res.city+res.county,
                    username:res.name,
                    phone:res.phone,
                    _provincial:res.province,
                    _city:res.city,
                    _district:res.county,
                    detailAddress:res.address
                })
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