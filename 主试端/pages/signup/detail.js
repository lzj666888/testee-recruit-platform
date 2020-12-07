// pages/signup/detail.js
const appdata=getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    finish:null,
    time_period:null,
    state:null,
    enrollment_time:null,
    tested:{},//报名的被试信息
  },
    //对被试进行评分
    onChange(event) {
      this.setData({
        value: event.detail,
      });
    },
  // 拨打电话号码
  call: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.tested.phone,
      fail(error){
        console.log(error)
      }
    })
  },
  // 复制微信号
  copywx: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.tested.wx,
    });
  },
  //聊天室
  tochat(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('该用户id是'+options.tested_id)
    var that=this
    this.setData({
      state:options.state,
      time_period:options.time_period,
      enrollment_time:options.enrollment_time,
      finish:options.finish
    })
    //获取被试数据
    wx.request({
      url: appdata.serverUrl + '/getUser', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id:options.tested_id
      },
      success(res) {
        console.log(res.data)
        that.setData({
          tested:res.data.data
        })
      },
      fail(res) {
        wx.showToast({
          title: '网络出现异常了~',
          icon: 'none'
        })
      }
    })
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