// pages/mine/mine.js
const appdata = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_getuserinfo: false,
    show_regist: false,
    modalName: null, //展示问号内容
    tester:{}
  },
  //注册
  registed() {
    var that = this;
    var identity = this.selectComponent('#regist').data.radio
    regist(identity).then(res => {
      that.setData({
        show_regist: false
      })
      wx.$showtoast('注册成功！')
    })
  },
  //授权
  GetUserInfo(e) {
    console.log(e.detail)
    if (JSON.stringify(e.detail) != '{}') {
      appdata.isauth = true
      wx.showToast({
        title: '授权成功！',
        icon: 'none'
      })
      appdata.userInfo = e.detail
      this.setData({
        show_getuserinfo: false
      })
    }
  },
  //跳转到被试招募小程序
  tobeishi: function () {
    wx.navigateToMiniProgram({
      appId: 'wx91d27dbf599dff74',
      path: 'pages/cate/cate',
      envVersion: 'release',
      success(res) {
        console.log("跳转成功");
      }
    })
  },
  //跳转到意见反馈页面
  toadvice() {
    wx.navigateTo({
      url: '/pages/advice/advice',
    })
  },
  //跳转到我的收藏中
  tomycollections() {
    wx.navigateTo({
      url: '/pages/mycollection/mycollection'
    })
  },
  //跳转编辑个人信息
  edit: function () {
    wx.navigateTo({
      url: '/pages/edit/edit?zhu_testerid=' + this.data.zhu_tester.id,
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    //判断是否已经授权和注册了
    if (!appdata.isregist) {
      this.setData({
        show_regist: true
      })
    }
    else{
      this.setData({
        tester:appdata.userInfo
      })
      console.log(wx.getStorageSync('identity'))
      //获取并缓存用户信息
      wx.request({
        url: appdata.serverUrl + '/getTester', //仅为示例，并非真实的接口地址
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          id: wx.getStorageSync('id')
        },
        success(res) {
          console.log(res.data)
          var obj = res.data.data;
          that.setData({

          })
          //缓存以及更新用户信息缓存
          wx.setStorageSync('userinfo', obj)
        },
        fail(res) {
          wx.showToast({
            title: '网络出现异常了~',
            icon: 'none'
          })
        }
      })
    }
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