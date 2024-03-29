// pages/experimentdetail/experimentdetail.js
const formatTime = require("../../utils/util").formatTime
const regist = require("../../utils/api").regist
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rate_disable: false, //是否可以进行评分
    canselectdate: true, //是否可以选择报名表
    collected: false, //是否已经收藏
    currentdate: -1, //选择的日期
    currentindex: -1, //选择的时段
    show_getuserinfo: false, //是否显示授权面板
    value: 0, //对主试的评分
    //报名按钮的文本
    btn_text: '我要报名',
    btn_disable: false, //报名按钮是否可用
    //主试信息
    tester: {},
    //实验状态，本来应该是在被试报名的实验里面的
    state: null,
    //实验完成度，本来应该是在被试报名的实验里面的
    finish: null,
    //实验
    experiment: {},
    formdata: [], //报名表
    dates2: [], //表头
    Dates: [], //日期们
  },
  //取消报名实验或者举报主试取消实验
  cancel(e) {
    const type = e.currentTarget.dataset.type
    var that = this
    if (type == 'zhu') {
      wx.showModal({
        title: '主试取消实验',
        content: '主试主动取消实验或者取消您参加实验。点击确认提交，待审核后会进行反馈！',
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
        title: '被试取消报名',
        content: '取消报名后，将无法再次报名该实验。信誉分将会减20，当信誉不足60时将无法报名实验！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            //调用改变状态接口，被试取消报名，报名状态改为未完成
            wx.request({
              url: app.globalData.serverUrl + '/userCheck', //仅为示例，并非真实的接口地址
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                id: that.data.signid,
                userSchedule: '未完成'
              },
              success(res) {
                wx.$showtoast('取消报名成功！', 'success')
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
  //授权
  GetUserInfo(e) {
    console.log(e.detail)
    if (JSON.stringify(e.detail) != '{}') {
      getApp().globalData.isauth = true
      getApp().globalData.userInfo = e.detail
      regist(this.selectComponent('#auth').data.radio)
      wx.showToast({
        title: '授权成功！',
        icon: 'none'
      })
      this.setData({
        show_getuserinfo: false
      })
    }
  },
  //点击报名
  signin() {
    if (!getApp().globalData.isauth) {
      wx.showToast({
        title: '请先授权',
        icon: 'none'
      })
      this.setData({
        show_getuserinfo: true
      })
      return;
    } else {
      if (this.data.experiment.status != '招募中') {
        wx.showToast({
          title: '实验已结束，下次早点报名哦~',
          icon: 'none'
        })
        return;
      }
      if (this.data.currentdate === -1) {
        wx.showToast({
          title: '请选择时段后报名！',
          icon: 'none'
        })
        return;
      } else {
        //判断被试个人信息是否已经完整
        try {
          var info = wx.getStorageSync('userinfo')
          console.log(info)
          if (info.username && info.phone && info.major) {
            console.log(info)
          } else {
            setTimeout(() => {
              wx.$showtoast("请先完善信息！")
            }, 500);
            wx.navigateTo({
              url: '/pages/edit/edit',
            })
            return;
          }
        } catch (e) {}
        try {
          var sno = wx.getStorageSync('sno')
          if (!sno) {
            setTimeout(() => {
              wx.$showtoast("请先验证学号！")
            }, 500);
            wx.navigateTo({
              url: '/pages/validation/validation',
            })
            return;
          }
        } catch (e) {}
        var that = this;
        //判断被试是否已经报名过了
        wx.request({
          url: app.globalData.serverUrl + '/ifSigned', //仅为示例，并非真实的接口地址
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            userId: wx.getStorageSync('id'),
            experimentId: that.data.experiment.id
          },
          success(res) {
            console.log(res.data)
            if (res.data.message === '被试已报名') {
              wx.showToast({
                title: '你已经报名了哦~',
                icon: 'none'
              })
              return;
            } else {
              //确认报名
              wx.showModal({
                title: '确认报名',
                content: '你确认要报名：' + that.data.currentdate + that.data.formdata[that.data.currentindex].period + '该时段吗？',
                success(res) {
                  if (res.confirm) {
                    //进行报名
                    wx.request({
                      url: app.globalData.serverUrl + '/sign', //仅为示例，并非真实的接口地址
                      method: 'POST',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      data: {
                        experimentId: that.data.experiment.id,
                        userId: wx.getStorageSync('id'),
                        timePeriod: that.data.currentdate + ' ' + that.data.formdata[that.data.currentindex].period,
                        signTimestamp: Date.parse(new Date()) / 1000,
                      },
                      success(res) {
                        console.log(formatTime(Date.parse(new Date())))
                        console.log(res.data)
                        wx.showModal({
                          title: '提交报名成功',
                          content: '等待主试通过报名！可前往实验页面查看审核状态。',
                          success(res) {
                            if (res.confirm) {
                              console.log('用户点击确定')
                            } else if (res.cancel) {
                              console.log('用户点击取消')
                            }
                          }
                        })
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
  //选择日期进行报名
  selected(e) {
    if (!this.data.canselectdate) {
      return;
    }
    var date = e.currentTarget.dataset.date;
    var index = e.currentTarget.dataset.index;
    var _formdata = this.data.formdata;
    if (_formdata[index][date] === false) {
      wx.showToast({
        title: '该时段不可选，请重新选择！',
        icon: 'none'
      })
      return
    }
    if (date == this.data.currentdate && index == this.data.currentindex) {
      return;
    }
    _formdata[index][date] = 'selected'
    if (this.data.currentdate != -1) {
      _formdata[this.data.currentindex][this.data.currentdate] = true
    }
    this.data.currentdate = date
    this.data.currentindex = index
    this.setData({
      formdata: _formdata
    })
  },
  //对主试进行评分
  onChange(event) {
    this.setData({
      value: event.detail,
    });
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
      url: app.globalData.serverUrl + '/ifSigned', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        experimentId: that.data.experiment.id,
        userId: wx.getStorageSync('id')
      },
      success(res) {
        console.log(res.data)
        if (JSON.stringify(res.data.data) != "[]") {
          if (res.data.data[0].userSchedule != "待完成") {
            wx.showToast({
              title: '您已经评价过了~',
              icon: 'none'
            })
          } else {
            wx.request({
              url: app.globalData.serverUrl + '/mark', //仅为示例，并非真实的接口地址
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                experimentId: that.data.experiment.id,
                userId: wx.getStorageSync('id'),
                type: "tester",
                testerId: that.data.experiment.testerId,
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
                    url: app.globalData.serverUrl + '/userCheck', //仅为示例，并非真实的接口地址
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      id: that.data.signid,
                      userSchedule: '已完成'
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
  //点击防抖函数
  isDebounce(timeout = 2000) {
    let that = this
    if (this.data.debounce) {
      console.log("触发防抖")
      return true
    }
    this.data.debounce = true
    setTimeout(() => {
      that.data.debounce = false
    }, timeout)
    return false
  },
  // 收藏实验
  docollect: function () {
    if (this.isDebounce()) return
    var id = this.data.experiment.id
    var that = this
    //已经收藏了则取消收藏
    if (this.data.collected) {
      wx.request({
        url: app.globalData.serverUrl + '/cancelCollectExp', //仅为示例，并非真实的接口地址
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          experimentId: id,
          userId: wx.getStorageSync('id')
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
            that.setData({
              collected: false
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    } else {
      wx.request({
        url: app.globalData.serverUrl + '/collectExp', //仅为示例，并非真实的接口地址
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          experimentId: id,
          userId: wx.getStorageSync('id')
        },
        success(res) {
          console.log(res.data)
          if (res.data.code == 1) {
            //取消收藏
            wx.showToast({
              title: '收藏成功！',
              icon: 'none',
              duration: 1000
            })
            that.setData({
              collected: true
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
  },
  // 拨打电话号码
  call: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.tester.phone,
    })
  },
  // 复制微信号
  copywx: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.tester.wx,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取实验详情信息
    console.log('实验id' + options.test_id)
    console.log('主试id' + options.tester_id)
    //判断实验是否已经被收藏了
    wx.request({
      url: app.globalData.serverUrl + '/ifCollected', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        experimentId: options.test_id,
        userId: wx.getStorageSync('id')
      },
      success(res) {
        if (res.data.message == '已收藏') {
          that.setData({
            collected: true
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
    //获取主试个人信息
    wx.request({
      url: app.globalData.serverUrl + '/getTester', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: options.tester_id
      },
      success(res) {
        console.log(res.data)
        var obj = res.data.data;
        that.setData({
          tester: obj
        })
      },
      fail(res) {
        wx.showToast({
          title: '网络出现异常了~',
          icon: 'none'
        })
      }
    })
    //获取指定id的实验
    wx.request({
      url: app.globalData.serverUrl + '/selectByExpId', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: options.test_id
      },
      success(res) {
        if (res.data.code == 1) {
          //将字符串标签转化为数组
          res.data.data.labels = res.data.data.tag.split(',')
          var _formdata = JSON.parse(res.data.data.timePeriods)
          var keys = Object.keys(_formdata[0]);
          var _keys = Object.keys(_formdata[0]);
          _keys[0] = '时间段/日期'
          keys.shift() //获得日期
          console.log('keys:' + keys)
          // //遍历formdata如果时间在之前就置为flase
          // for(var i=0;i<_formdata.length;i++)
          // {

          // }
          that.setData({
            experiment: res.data.data,
            formdata: _formdata,
            Dates: keys
          })
          // keys.unshift('时间段/日期')
          that.setData({
            dates2: _keys
          })
        } else {
          wx.showToast({
            title: '实验已被删除！',
            icon: 'none'
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
    //如果是在报名实验进入详情页执行下面
    if (options.state && options.finish) {
      this.data.signid = options.signid
      //不可选择报名表
      this.setData({
        canselectdate: false
      })
      //获取实验状态,完成度
      this.setData({
        state: options.state,
        finish: options.finish,
        btn_disable: true
      })
      if (this.data.state == '待审核') //待审核
      {
        this.setData({
          btn_text: '等待审核'
        })
      } else if (this.data.state == '已通过') {
        this.setData({
          btn_text: '已成功报名'
        })
      } else {
        this.setData({
          btn_text: '报名失败'
        })
      }
      //已完成，禁用+获取分数
      if (options.finish == '已完成') {
        //获取评分记录
        this.setData({
          rate_disable: true
        })
        wx.request({
          url: app.globalData.serverUrl + '/ifMarked', //仅为示例，并非真实的接口地址
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            experimentId: options.test_id,
            testerId: options.tester_id,
            type: 'tester',
            userId: wx.getStorageSync('id')
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
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    let url = encodeURIComponent('/pages/experimentdetail/experimentdetail?test_id=' + this.data.experiment.test_id);
    return {
      title: "实验详情",
      path: `/pages/index/index?url=${url}`
    }
  }
})