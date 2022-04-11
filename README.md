#####使用WeUi 微信小程序的UI框架需要
```
在 app.json 中增加

"useExtendedLib": {
  "weui": true
}
```
####微信小程序链接跳转带数组或者对象传递数据！！！
[文档](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)
```
主页面
 wx.navigateTo({
            url:`/pages/pay/pay`,
            success (res) {
                res.eventChannel.emit('goodsDetail',goods)
            }
        })
子页面
 onLoad: function (options) {
        console.log(options)

        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('goodsDetail',function(data){
            console.log(data)
        })
    },
```
######小程序起步
1.使用了Vant ui库，安装看文档，
2.写底部导航栏
```
"tabBar": {
    "color":"#000000",
    "selectedColor":"#fc4327",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "images/page.png",
        "selectedIconPath": "images/pageA.png"
      },
      {
        "pagePath": "pages/goods/goods",
        "text": "商品",
        "iconPath": "images/goods.png",
        "selectedIconPath": "images/goodsA.png"
      },
      {
        "pagePath": "pages/cart/cart",
        "text": "购物车",
        "iconPath": "images/shop.png",
        "selectedIconPath": "images/shopA.png"
      },
      {
        "pagePath": "pages/center/center",
        "text": "我的",
        "iconPath": "images/m.png",
        "selectedIconPath": "images/mA.png"
      }
    ]
  }
```
3.首页轮播图 使用 小程序自带组件 swiper  不需要安装

####获取用户授权使用 wx.getUserProfile(Object object)

##### 商品详情后台传回来的是div 所以使用了个插件 wxParse
使用步骤
1.下载 https://github.com/icindy/wxParse   拿到里面的wxParse那个到导进来
2.在goodsdetail.js文件中导入
```
var WxParse = require('../../wxParse/wxParse.js');
```
3.css文件中导入
```
@import "/wxParse/wxParse.wxss";
```
4.然后在发送请求那里 请求回来后的数据写进来
```
WxParse.wxParse('article', 'html', this.data.details, this );
```
(1).bindName绑定的数据名(必填)
(2).type可以为html或者md(必填)
(3).data为传入的具体数据(必填)
(4).target为Page对象,一般为this(必填)
(5).imagePadding为当图片自适应是左右的单一padding(默认为0,可选)

5.在wxml中引入
```
<import src="../../wxParse/wxParse"/>
```
6.在显示的位置写上代码
```
 <van-tab title="商品详情">
            <!-- {{details}} -->
            <template is="wxParse" data="{{wxParseData:article.nodes}}"/>
            </van-tab>
```

####使用组件 在page同级目录下创建一个components文件夹
1.index页面中有使用到组件，组件写完后，在index.json中注册
```
"usingComponents": {
    "goodsList": "../../components/goodsList/goodsList"
  }
```
2.然后使用
```
<goodsList goods="{{goods}}"></goodsList>
```
3.获取父组件传过来的数据
子组件 js文件中声明一个变量
```
properties: {
        //声明一个变量接收父组件传过来的数据
        goods: {
            type: Array,
            value: []
        }
    },
```
4.父组件中  这样子传过来
```
<goodsList goods="{{goods}}"></goodsList>
```


####图片放大
```
 wx.previewImage({
      current: event.currentTarget.dataset.current, // 当前显示图片的http链接
      //上下要对其上面写的http+路径这里也要
      urls: this.data.info.slides.map(item=> `http://localhost:3000${item}`) // 需要预览的图片http链接列表
    })
```

#####微信小程序多层嵌套for循环
注意：
第一层：newCategoryList
第二层：goodsList
注意看wx:for 和 wx:key
第二层多了一个 wx:for-item="goodsList"
```
<view wx:for="{{newCategoryList}}" wx:key="id">
      <view>{{item.name}}</view>
      <view  wx:for="{{item.goodsList}}" wx:for-item="goodsList" wx:key="id">
        <image src="{{goodsList.list_pic_url}}"></image>
        <view>{{goodsList.name}}</view>
        <view>￥{{goodsList.retail_price}}</view>
      </view>
  </view>
```

#####微信小程序watch监听
[网址](https://www.cnblogs.com/jane2160/p/11551286.html)
1.这里假定有多个页面需要监听需求，把监听方法写在app.js中，以便全局调用
```
onLaunch: function () {},
// 设置监听器
watch: function (ctx, obj) {
  Object.keys(obj).forEach(key => {
    this.observer(ctx.data, key, ctx.data[key], function (value) {
      obj[key].call(ctx, value)
    })
  })
},
// 监听属性，并执行监听函数
observer: function (data, key, val, fn) {
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      fn && fn(newVal)
      val = newVal
    },
  })
}
```
2.然后，在需要监听的页面onLoad中，调用watch方法（其中test是要监听的数据，当test在其他方法中通过this.setData赋值后，watch就能监听到test的变化了）
```
const app = getApp()
Page({
  data: {
    test: 0
  },
  onLoad: function () {
    // 调用监听器，监听数据变化
    app.watch(this, {
      test: function (newVal) {
        console.log(newVal)
      }
    })
  }    
```

####获取用户授权
```
  //获取授权
    handleAuth(e){
        wx.getUserProfile({
          desc: '用于完善用户信息',
          success:(res)=>{
              //这里只获取到头像之类的信息
            wx.setStorageSync('userInfo', res.userInfo)
          console.log(res.userInfo);
          }
        })
    }, 
```