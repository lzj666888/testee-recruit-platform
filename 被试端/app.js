//app.js

App({
  onLaunch: function () {
    this.getOpenId()
    //检测用户是否已经授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                console.log('用户信息：' + res.userInfo)
                getApp().globalData.userInfo = res.userInfo
                getApp().globalData.isauth = true//已经授权了
              }
            })
          }
        }
      })
  },

  //获取  微信小程序 中 用户的唯一标识符
  getOpenId() {
    var code = '';
    var that = this;
    wx.login({
      success(res) {
        console.log('参数：', res)
        code = res.code,
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            data: {
              appid: that.globalData.APP_ID,
              secret: that.globalData.APP_SECRET,
              grant_type: 'authorization_code',
              js_code: code
            },
            success(res) {
              console.log('success:', res)
              that.globalData.openId = res.data.openid
              console.log('app global openid:', that.globalData.openId)
            },
            fail(res) {
              console.log('fail:', res)

            }
          })

      },
      fail(res){
        console.log(res)
      }
    })

  },
  globalData: {
    userInfo:{},//用户信息
    isauth:false,//用户是否已经授权了
    openId:'',   //用户唯一认证id
    APP_ID:'wxff5313f0e69e6e11',   //小程序appId
    APP_SECRET:'78bff6c654e62def2cff6e11dcfe0601'  //小程序密匙
  }
})