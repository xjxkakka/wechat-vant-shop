//这个方法主要查看是否有登录如果没用登录统一导航到登录页面
function checkAuth(callback){
    //判断wx中有没toklen
    if (wx.getStorageSync("token")){
        callback();
    }else{
        wx.navigateTo({
            url:'/pages/login/login'
        })
    }
}
export default checkAuth;