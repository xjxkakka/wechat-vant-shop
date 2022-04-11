// pages/search/search.js
import { goodsSearch } from '../../api/http'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        show:true,
        value:'',
        searchResult:[],
        searchHistory:[],
        again:false
    },
    //确定搜索时触发
    onSearch(event){
        console.log(event.detail)
        var title = event.detail
        //发送请求
        goodsSearch(title).then(res=>{
            console.log(res.goods.data)
            if (res.goods.data.length == 0){
                this.setData({
                    again:true,
                    show:false,
                    searchResult:res.goods.data,
                    searchHistory:[title,...this.data.searchHistory],
                })
            }else{
                this.setData({
                    show:false,
                    searchResult:res.goods.data,
                    searchHistory:[title,...this.data.searchHistory],
                })
            }

        })
    },
    //输入框聚焦时触发
    onFocus(){
        this.setData({

        })

    },
    //bind:blur 输入框失焦时触发
    onBlur(){

    },
    //取消搜索搜索时触发
    onCancel(){
      this.setData({
          again:false,
          show:true,
          value:''
      })
    },
    //点击搜索结果跳转详情页面
    handleDeatil(event){
      var id = event.currentTarget.dataset.id
        console.log(id)
        wx.navigateTo({
            url:`/pages/goodsdetail/goodsdetail?id=${id}`
        })
    },
    //点击搜索历史的文字触发
    handleText (event) {
        var title = event.currentTarget.dataset.text;
        goodsSearch(title).then(res=>{
            console.log(res.goods.data)
            this.setData({
                //搜索结果
                searchResult:res.goods.data,
                show:false
            })
        })
    },
    //点击垃圾桶清空历史搜索
    handleDel(){
        this.setData({
            searchHistory:[]
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
        //页面来回切换的时候显示搜索历史
        this.setData({
            show:true
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