//app.js
require("./utils/wx.js")
App({
  onLaunch: function () {

  },

  globalData: {
    userInfo: {}, //用户信息
    isregist: false,
    isauth: false, //用户是否已经授权了
    serverUrl: 'http://localhost:8080', //服务器地址
    openId: '', //用户唯一认证id
    APP_ID: 'wx58fee91d79985cee', //小程序appId
    APP_SECRET: '032739ca3c5b90d4227318cdc8234ee5' //小程序密匙
  }
})