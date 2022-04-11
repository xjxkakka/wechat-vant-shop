// components/goodsList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        //声明一个变量接收父组件传过来的数据
        goods: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        //点击跳转商品详情
        handleDetail (event) {
            // console.log(event.currentTarget.dataset.id)
            var id = event.currentTarget.dataset.id
            wx.navigateTo({
                //这里是可以直接在地址上传递参数的
                url: `/pages/goodsdetail/goodsdetail?id=${id}`
            })

        },
    }
})
