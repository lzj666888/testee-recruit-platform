//app.js

App({
  onLaunch: function () {
    this.getOpenId()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
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
    userInfo: 123,
    openId:'',   //用户唯一认证id
    APP_ID:'wx3d0c29a20a305f28',   //小程序appId
    APP_SECRET:'685ef10637631ae8e3db77e000f22f9e'  //小程序密匙
  }
})