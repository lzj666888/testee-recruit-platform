  const app = getApp()
  //注册函数
 function regist(identity) {
   return new Promise(function(resolve,reject){
    wx.request({
      url: app.globalData.serverUrl + '/registerUser', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId: getApp().globalData.openId,
        identity: identity
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == -1) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        } else if (res.data.code == 1) {
          //缓存用户的id
          var id = res.data.data
          console.log('用户id：' + id)
          wx.setStorageSync('id', id) //注册完后直接缓存id
          resolve(id)
        }
      },
      fail(res) {
        wx.showToast({
          title: '网络出现异常了~',
          icon: 'none'
        })
      }
    })
   })
  }
  module.exports = {
    regist: regist
  }