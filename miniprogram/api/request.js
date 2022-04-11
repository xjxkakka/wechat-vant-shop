//封装微信的请求 wx.request

function request (params,flag=true) {
    //添加loading效果 微信自带的
    return new Promise((resolve, reject) => {
        //进来判断是否有token
        var token = wx.getStorageSync("token")

        if (flag){
            wx.showLoading({
                title: '正在加载中'
            })
        }

        wx.request({
            //进来后展开传过来的值
            ...params,
            //这里上面扩展后，这里会覆盖掉
            url: 'https://api.shop.eduwork.cn' + params.url,
            //如果有token 带上token 发请求  有些地方需要token才能使用
            header: {
                'Authorization':'Bearer ' + token // 默认值
            },
            //成功的回调
            success: (res) => {
                //这里可以拿到数据的长度
                // console.log(res.header["X-Total-Count"])
                resolve(res.data||res)
            },
            fail: (res) => {
                reject(res)
            },
            //请求完成后不论成功失败
            complete :(res)=> {
                if (flag){
                    wx.hideLoading({
                        success: (res) => {

                        },
                    })
                }

            }
        })
    })

}

export default request;