// pages/experimentTrip/experimentTrip.js
const app = getApp()
const regist = require("../../utils/regist.js").regist

const formatTime = require("../../utils/util").formatTime
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveexp: true, //是否有实验
    show_getuserinfo: false,
    show_regist: false,
    currentIndex: -1, //选中要删除或者编辑的实验
    touchactive: false,
    x: 318, //发布按钮的移动
    y: 350,
    notice: '欢迎加入广大被试招募平台主试端，在这里你可以发布招募实验！',
    show: false,
    actions: [{
      name: '编辑实验'
    }, {
      name: '删除实验'
    }],
    tab_index: 0,
    tabbars: [
      '全部', '待发布', '招募中', '已结束'
    ],
    experiments: []
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
      app.globalData.isauth = true
      wx.showToast({
        title: '授权成功！',
        icon: 'none'
      })
      app.globalData.userInfo = e.detail
      this.setData({
        show_getuserinfo: false
      })
      if (!app.globalData.isregist) {
        this.setData({
          show_regist: true
        })
      }

    }
  },
  //查看报名详情
  signup_detail(e) {
    var that = this
    var index = e.currentTarget.dataset.index; //获取删除实验index
    console.log(index)
    wx.navigateTo({
      url: '/pages/signup/signup?experimentId=' + that.data.experiments[index].id,
    })
  },
  touchactive() {
    this.setData({
      touchactive: true
    })
  },
  touchactiveend() {
    var time = setTimeout(() => {
      this.setData({
        touchactive: false
      })
      clearTimeout(time)
    }, 1000);
  },
  //跳转发布实验
  topublish() {
    wx.navigateTo({
      url: '/pages/publish/publish',
    })
  },
  //选择删除
  onSelect(event) {

    console.log(event.detail); //输出操作的对象{name:'删除实验'}
    //点击删除实验
    if (event.detail.name == '删除实验') {

      this.deleteExperiment();

    }
    //点击编辑实验
    else {
      var id = this.data.experiments[this.data.currentIndex].test_id;
      wx.navigateTo({
        url: '/pages/publish/publish?test_id=' + id,
      })
    }
    this.setData({
      show: false
    })
  },
  //关闭页面
  onClose() {
    this.setData({
      show: false
    });
  },
  //取消按钮
  onCancel(e) {
    this.setData({
      show: false
    })
  },
  //删除实验，修改状态为已删除
  deleteExperiment: function (e) {
    var that = this
    wx.request({
      url: app.globalData.serverUrl + '/updateExperiment', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: that.data.experiments[that.data.currentIndex].id,
        status: '已删除'
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          // console.log("删除实验成功")
          var index = that.data.currentIndex
          var arr = that.data.experiments
          arr.splice(index, 1)
          that.setData({
            experiments: arr
          })
          wx.$showtoast('删除成功！', 'success')
        } else {
          console.log("删除实验失败")
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

  //只是获取下标？
  delete: function (e) {
    var index = e.currentTarget.dataset.index; //获取删除实验index
    this.data.currentIndex = index
    this.setData({
      show: true
    })
    console.log(index)
  },

  //改变tabbar
  changetabbar: function (e) {
    var that = this
    var tabindex = e.detail.index; //获取当前tabbar的下标索引
    console.log(tabindex)
    var status
    if (tabindex == 1) {
      status = '待发布'
    } else if (tabindex == 2) {
      status = '招募中'
    } else if (tabindex == 3) {
      status = '已结束'
    }

    wx.showLoading({
      title: ''
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    that.getExperiments(wx.getStorageSync('id'), status)
  },

  //获取实验
  getExperiments(testerId, status) {
    var that = this
    wx.request({
      url: app.globalData.serverUrl + '/testerGetExpByExample', //仅为示例，并非真实的接口地址
      method: 'POST',

      data: {
        testerId: testerId,
        status: status
      },
      success(res) {
        console.log(res.data)
        var data = res.data.data
        if (data) {
          if (data.length === 0) {
            that.setData({
              haveexp: false
            })
          } else if (!that.data.haveexp) {
            that.setData({
              haveexp: true
            })
          }
          for (var i = 0; i < data.length; i++)
            data[i].sendTimestamp = formatTime(data[i].sendTimestamp * 1000)
          that.setData({
            experiments: data
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取实验
    that.getExperiments(wx.getStorageSync('id'), null)
    this.getOpenId()
    //检测用户是否已经授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log('用户信息：' + res.userInfo)
              app.globalData.userInfo = res.userInfo
            }
          })
          app.globalData.isauth = true //已经授权了
        } else {
          that.setData({
            show_getuserinfo: true
          })
        }
      }
    })
    //检测用户有没有注册
    try {
      var testerid = wx.getStorageSync('id')
      if (testerid) {
        //已经注册过了
        app.globalData.isregist = true
      } else {
        try {
          var identity = wx.getStorageSync('identity')
          if (identity) {
            regist(identity).then(res => {
              if (res.data.message == '已注册') {
                wx.setStorageSync('id', res.data.data) //已经注册过了则再存缓存
              } else {
                //还没注册
                that.setData({
                  show_regist: true
                })
              }
            })
          }
        } catch (e) {}
      }
    } catch (e) {}
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
    //判断是否已经授权和注册了
    if (!app.globalData.isauth) {
      this.setData({
        show_getuserinfo: true
      })
    } else if (!app.globalData.isregist) {
      this.setData({
        show_regist: true
      })
    }
  },

  //获取  微信小程序 中 用户的唯一标识符
  getOpenId() {
    var code = '';
    var that = this;
    wx.login({
      success(res) {
        console.log('参数：', res)
        console.log('wx.login code:', res.code)
        code = res.code;
        wx.request({
          url: app.globalData.serverUrl + '/wx/getOpenId',
          method: 'GET',
          data: {
            code: code,
            appId: 'wx58fee91d79985cee',
            secret: '032739ca3c5b90d4227318cdc8234ee5'
          },
          success(res) {
            console.log('success:', res)
            app.globalData.openId = res.data.data;
            console.log('app global openid:', app.globalData.openId)
          },
          fail(res) {
            console.log('fail:', res)
          }
        })
      },
      fail(res) {
        console.log(res)
      }
    })

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
    this.getExperiments(wx.getStorageSync('id'), null)
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