// pages/mycollection/mycollection.js
const app = getApp()

const formatTime = require("../../utils/util").formatTime
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //实验
    experiments: [],
  },
  //收藏和取消收藏
  collect(e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var _experiments = this.data.experiments;
    if (_experiments[index].collected == true) {
      wx.request({
        url: app.globalData.serverUrl+'/cancelCollectExp', //仅为示例，并非真实的接口地址
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          experimentId: _experiments[index].id,
          userId: that.data.id
        },
        success(res) {
          console.log(res.data)
          if (res.data.code == 1) {
            //取消收藏
            wx.showToast({
              title: '取消收藏成功！',
              icon: 'none',
              duration: 1000
            })
            _experiments[index].collected = !_experiments[index].collected;
            that.setData({
              experiments: _experiments
            })
          }
          else{
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '网络出现异常了~',
            icon: 'none'
          })
        }
      })
    } else {
      //收藏
      wx.request({
        url: app.globalData.serverUrl+'/collectExp', //仅为示例，并非真实的接口地址
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          experimentId: _experiments[index].id,
          userId: that.data.id
        },
        success(res) {
          console.log(res.data)
          if (res.data.code == 1) {
            //收藏
            wx.showToast({
              title: '收藏成功！',
              icon: 'none',
              duration: 1000
            })
            _experiments[index].collected = !_experiments[index].collected;
            that.setData({
              experiments: _experiments
            })
          }
          else{
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
          }
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
  //跳转到实验详情页面
  toexperiment: function (e) {
    var test_id = e.currentTarget.dataset.test_id; //获取实验id
    var tester_id = e.currentTarget.dataset.tester_id; //获取主试id
    wx.navigateTo({
      url: '/pages/experimentdetail/experimentdetail?test_id=' + test_id+"&tester_id="+tester_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.data.id = options.id
    this.getcollections()
  },
  getcollections(){
    var that = this
    wx.request({
      url: app.globalData.serverUrl+'/findCollections', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: this.data.id
      },
      success(res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 1) {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].send_time = formatTime(res.data.data[i].sendTimestamp)
            res.data.data[i].collected = true
          }
          that.setData({
            experiments: res.data.data
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '网络出现异常了~',
          icon: 'none'
        })
      }
    })
    wx.showLoading({
      title: '加载中...',
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getcollections()
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