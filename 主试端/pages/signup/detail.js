// pages/signup/detail.js
const appdata = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rate_disable: false,
    finish: null,
    time_period: null,
    state: null,
    enrollment_time: null,
    tested: {}, //报名的被试信息
  },
  //确认评分
  markexp() {
    //进行评分
    if (!this.data.value) {
      wx.showToast({
        title: '请选择评分！',
        icon: 'none'
      })
      return;
    }
    var that = this
    //判断是否已经评分过了
    wx.request({
      url: appdata.serverUrl + '/ifSigned', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        experimentId: that.data.exp_id,
        userId: that.data.tested_id
      },
      success(res) {
        console.log(res.data)
        if (JSON.stringify(res.data.data) != "[]") {
          if (res.data.data[0].testerSchedule != "待完成") {
            wx.showToast({
              title: '您已经评价过了~',
              icon: 'none'
            })
          } else {
            wx.request({
              url: appdata.serverUrl + '/mark', //仅为示例，并非真实的接口地址
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                experimentId: that.data.exp_id,
                userId: that.data.tested_id,
                type: "user",
                testerId:wx.getStorageSync('id'),
                score: that.data.value * 20,
                timestamp: parseInt(new Date().getTime() / 1000),
              },
              success(res) {
                console.log(res.data)
                if (res.data.code == 1) {
                  wx.showToast({
                    title: '评分成功',
                  })
                  //调用改变状态接口
                  wx.request({
                    url: appdata.serverUrl + '/testerCheck', //仅为示例，并非真实的接口地址
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      id: that.data.sign_id,
                      testerSchedule: '已完成'
                    },
                    success(res) {

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
              fail(res) {
                wx.showToast({
                  title: '网络出现异常了~',
                  icon: 'none'
                })
              }
            })
          }
        }
      },
      fail(res) {
        wx.showToast({
          title: '网络出现异常了~',
          icon: 'none'
        })
      }
    })
  },
  //取消报名实验或者举报主试取消实验
  cancel(e) {
    const type = e.currentTarget.dataset.type
    var that = this
    if (type == 'bei') {
      wx.showModal({
        title: '被试未能完成',
        content: '被试主动取消实验获取未在约定时间完成实验。点击确认提交，待审核后会进行反馈！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.$showtoast('提交成功！', 'success')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '取消被试资格',
        content: '取消被试资格后，您的信誉分将会减10，这可能会影响到你之后实验招募。',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            //调用改变状态接口，被试取消报名，报名状态改为未完成
            wx.request({
              url: appdata.serverUrl + '/testerCheck', //仅为示例，并非真实的接口地址
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                id: that.data.sign_id,
                testerSchedule: '未完成'
              },
              success(res) {
                wx.$showtoast('取消成功！', 'success')
              },
              fail(res) {
                wx.showToast({
                  title: '网络出现异常了~',
                  icon: 'none'
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  //主试通过报名
  action(e) {
    var type = e.currentTarget.dataset.type
    console.log(type)
    this.act(type)
  },
  //操作函数
  act(type) {
    var that = this
    var content = ''
    var state = ''
    var toast = ''
    if (type == '通过') {
      content = '你确定要通过改被试的报名吗？'
      state = '已通过'
      toast = '通过成功！'
    } else {
      content = '你确定要拒绝改被试的报名吗？'
      state = '未通过'
      toast = '拒绝成功！'
    }
    wx.showModal({
      title: '提示',
      content: content,
      success(res) {
        if (res.confirm) {
          wx.request({
            url: appdata.serverUrl + '/testerPass', //仅为示例，并非真实的接口地址
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              id: that.data.sign_id,
              checkStatus: state
            },
            success(res) {
              if (res.data.code == 1) {
                wx.$showtoast(toast, 'success')
              } else {
                wx.$showtoast('操作失败！网络错误')
              }
            },
            fail(res) {
              wx.showToast({
                title: '网络出现异常了~',
                icon: 'none'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
      fail(error) {
        console.log(error)
      }
    })
  },
  // 复制微信号
  copywx: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.tested.wechat,
    });
  },
  //聊天室
  tochat() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('该用户id是' + options.tested_id)
    this.data.sign_id = options.sign_id
    this.data.tested_id=options.tested_id
    this.data.exp_id=options.exp_id
    var that = this
    this.setData({
      state: options.state,
      time_period: options.time_period,
      enrollment_time: options.enrollment_time,
      finish: options.finish
    })
       //已完成，禁用+获取分数
       if (options.finish == '已完成') {
        //获取评分记录
        this.setData({
          rate_disable: true
        })
        wx.request({
          url: appdata.serverUrl + '/ifMarked', //仅为示例，并非真实的接口地址
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            experimentId: options.exp_id,
            testerId: wx.getStorageSync('id'),
            type: 'user',
            userId: options.tested_id,
          },
          success(res) {
            console.log(res.data)
            if (res.data.code == 1) {
              that.setData({
                value: res.data.data[0].score / 20
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
    //获取被试数据
    wx.request({
      url: appdata.serverUrl + '/getUser', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: options.tested_id
      },
      success(res) {
        console.log(res.data)
        that.setData({
          tested: res.data.data
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