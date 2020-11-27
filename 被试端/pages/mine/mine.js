// pages/mine/mine.js
const app = getApp()
const regist = require("../../utils/api").regist

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'), //小程序是否可被用
    show_getuserinfo: false, //是否显示授权面板
    // isauth: false, //用户是否已经授权了
    checking: true, //检测授权中
    modalName: null, //展示问号内容
    bei_tester: {
      name: '  ',
      image: null,
      tokens: 0, //代币数
      credit_score: 100, //信誉分
      performent_score: -1, //表现分
    }
  },
  //跳转到意见反馈页面123
  toadvice() {
    this.navto('advice')
  },
  //跳转到我的收藏中
  tomycollections() {
    this.navto('mycollection')
  },
  //跳转编辑个人信息
  edit: function () {
    this.navto('edit')
  },
  //封装跳转函数
  navto(url) {
    if (this.data.id) {
      wx.navigateTo({
        url: `/pages/${url}/${url}?id=` + this.data.id
      })
    } else {
      wx.showToast({
        title: '请先授权！',
        icon: 'none'
      })
      this.setData({
        show_getuserinfo: true
      })
    }
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
    // 检查用户是否已授权
    this.checkuserinfo()
  },
  // 判断是否需要进行授权
  checkuserinfo() {
    var that = this
    if (getApp().globalData.isauth) {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      var obj = getApp().globalData.userInfo
      that.setData({
        show_getuserinfo: false,
        ['bei_tester.name']: obj.nickName,
        ['bei_tester.image']: obj.avatarUrl
      })
      //将头像修改到用户信息里面
      //获取用户信息
      that.getuser()
    } else {
      this.setData({
        show_getuserinfo: true
      })
    }
    this.data.checking = false //检测完毕，确认授权情况了。
  },

  // 点击授权函数
  GetUserInfo(e) {
    var that = this
    console.log(e.detail)
    if (JSON.stringify(e.detail) != '{}') {
      getApp().globalData.isauth = true
      var obj = e.detail
      //注册然后获取信息
      regist().then(res => {
        console.log(res)
        that.getuser()
      })
      //用户已经授权
      this.setData({
        show_getuserinfo: false,
        ['bei_tester.name']: obj.nickName,
        ['bei_tester.image']: obj.avatarUrl
      })

      wx.showToast({
        title: '授权成功！',
      })
    } else {
      wx.showToast({
        title: '授权失败！',
        icon: 'none'
      })
    }
  },
  //获取用户信息函数
  getuser() {
    var that = this;
    //取缓存的id
    try {
      var id = wx.getStorageSync('id')
      if (id) {
        console.log('用户id' + id)
        this.data.id = id;
        //请求获取用户信息
        wx.request({
          url: app.globalData.serverUrl + '/getUser', //仅为示例，并非真实的接口地址
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            id: id
          },
          success(res) {
            console.log(res.data)
            var obj = res.data.data;
            that.setData({
              ['bei_tester.tokens']: obj.coins,
              ['bei_tester.credit_score']: obj.creditScore,
              ['bei_tester.performent_score']: obj.performanceScore
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
      } else {
        //调用注册接口重新获取id
        console.log('用户缓存id删除需要重新调用注册来获取')
        regist()
      }
    } catch (e) {
      console.log(e)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //如果没授权就再提醒
    if (!getApp().globalData.isauth && !this.data.checking) {
      this.checkuserinfo()
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