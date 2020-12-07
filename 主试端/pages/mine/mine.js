// pages/mine/mine.js

const appdata = getApp().globalData
const regist = require("../../utils/regist.js").regist

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback_score: -1, //反馈分
    credit_score: 100,
    coins: 0,
    show_getuserinfo: false,
    show_regist: false,
    modalName: null, //展示问号内容
    name: null,
    faceurl: null,
    showcoins: false //是否展示代币数目
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
      if (!appdata.isregist) {
        this.setData({
          show_regist: true
        })
      }
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
    this.navto('advice')
  },
  //跳转编辑个人信息
  edit: function () {
    this.navto('edit')
  },
  //封装跳转函数
  navto(url) {
    try {
      var id=wx.getStorageSync('id')
      if (id) {
        wx.navigateTo({
          url: `/pages/${url}/${url}?id=` + id
        })
      } else {
        if (!appdata.isauth) {
          wx.$showtoast('请先授权！')
          this.setData({
            show_getuserinfo: true
          })
        } else if (!appdata.isregist) {
          wx.$showtoast('请先注册！')
          this.setData({
            show_regist: true
          })
        } 
      }
    }catch(e){
      wx.$showtoast(e)
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
    var that = this;
    //判断是否已经授权和注册了
    if (!appdata.isauth) {
      this.setData({
        show_getuserinfo: true
      })
    } else if (!appdata.isregist) {
      this.setData({
        show_regist: true
      })
    } else {
      this.setData({
        name: appdata.userInfo.nickName,
        faceurl: appdata.userInfo.avatarUrl
      })
      if (wx.getStorageSync('identity') === '本科生') {
        this.setData({
          showcoins: true
        })
      }
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
            coins: obj.coins,
            credit_score: obj.creditScore,
            feedback_score: obj.performanceScore
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