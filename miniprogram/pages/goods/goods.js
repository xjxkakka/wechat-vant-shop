// pages/goods/goods.js
import { goodsClassify, goodsDetail, goodsSearch, HomePage } from '../../api/http'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeKey: 0,
        //需要使用分类下的children
        categories:[],
        category_List:[],
        value:'',
        again:true
    },
    //获取首页所有数据
    getHomePage () {
        HomePage().then(res => {
            //设置data中的值
            this.setData({
                categories:res.categories
            })
            // console.log(this.data.categories)
        })
    },
    //切换导航栏监听
    changeClassify(event){
        //拿到分类ID发请求
        var id = event.currentTarget.dataset.id
        console.log(id)
        goodsClassify(id).then(res => {
            //设置data中的值
            this.setData({
                category_List:res.recommend_goods,
                value:''
            })
            console.log(res)
        })
    },
    //搜索
    handleSearch(event){
        var title = event.detail
        goodsSearch(title).then(res=>{
            //获取数据，赋值给原来显示的并且把右边高亮导航设置为null
            console.log(res.goods.data)
            if (res.goods.data.length!==0){
                this.setData({
                    category_List:res.goods.data,
                    again:true,
                    activeKey:-1
                })
            }else{
                this.setData({
                    again:false,
                    activeKey:-1
                })

            }

        })
    },
    //点击书本跳转详情页
    goDetail(event){
        var id = event.currentTarget.dataset.id
        console.log(id)
        wx.navigateTo({
            url:`/pages/goodsdetail/goodsdetail?id=${id}`
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
        this.getHomePage();
        //分类列表右边详情页，默认显示区块链的推荐
        goodsClassify(2).then(res => {
            //设置data中的值
            this.setData({
                category_List:res.recommend_goods
            })
            console.log(res)
        })
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
        this.setData({
            value:''
        })
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