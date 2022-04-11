import { HomePage } from '../../api/http'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        finished: false,
        slides: [],
        goods: [],
        active: 0,
        page: 1
    },
    //获取首页所有数据
    getHomePage () {
        HomePage().then(res => {
            //设置data中的值
            this.setData({
                slides: res.slides,
                goods: res.goods.data
            })
        })
    },

    //把需要传递的参数全局化
    params: {},
    //封装请求
    getGoodsData () {
        //实现思路page不用管每次点击的时候都会重置，
        // params每次点击的时候也会重置，如果点击到销量之类的会赋值上去连带一起发请求
        HomePage({ page:this.data.page,...this.params }).then(res => {
            //如果 res.goods.data.length的长度为0代表已经取完了
            if (res.goods.data === 0) {
                this.setData({
                    //设置为true后到底就不会在发请求
                    finished: true
                })
            }
            //设置data中的值
            this.setData({
                goods: [...this.data.goods, ...res.goods.data]
            })
        })
    },
    //更改高亮和列表数据
    handleActive (event) {
        //获取当前点击的索引
        var index = event.currentTarget.dataset.index;

        //点击进来先初始化数据
        this.params = {} //这里主要区别点击的哪个按钮
        this.setData({
            page: 1,
            goods: [],
            active: index
        })

        if (index == 1) this.params.sales = 1;
        if (index == 2) this.params.recommend = 1;
        if (index == 3) this.params.new = 1;
        console.log(this.params)
        //发送请求
        this.getGoodsData();

    },

    //点击了搜索跳转搜索页面
    handleSearch(){
      wx.navigateTo({
          url:'/pages/search/search'
      })
    },

    /**
     * 生命周期函数--监听页面加载    //这里options可以接收地址上的query参数
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        //发请求
        this.getHomePage();
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
        //如果到底了不在执行
        if (!this.data.finished) {
            //到底后 page+1;
            this.data.page++;
            //发送请求
            this.getGoodsData();

        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})