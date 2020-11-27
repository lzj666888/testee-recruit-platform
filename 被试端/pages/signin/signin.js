// pages/signIn2/signIn2.js
const app = getApp()
const regist = require("../../utils/api").regist

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_getuserinfo: false, //是否显示授权面板
    newdaibi: 0, //本次签到的代币数
    show: false,
    newSignBtnState: false, //按钮签到状态
    myToday: 0, //之前连续签到的天数
    newSignNum: 0, //签到天数
    newSignIntegral: 0, //签到积分
    timestamp: 0, //时间戳
    //签到数组
    newSignedArr: [{
        "day": "一",
        "isSigned": false
      },
      {
        "day": "二",
        "isSigned": false
      },
      {
        "day": "三",
        "isSigned": false
      },
      {
        "day": "四",
        "isSigned": false
      },
      {
        "day": "五",
        "isSigned": false
      },
      {
        "day": "六",
        "isSigned": false
      },
      {
        "day": "七",
        "isSigned": false
      }
    ],

  },
  //授权
  GetUserInfo(e) {
    console.log(e.detail)
    if (JSON.stringify(e.detail) != '{}') {
      getApp().globalData.isauth = true
      //授权直接注册
      regist()
      wx.showToast({
        title: '授权成功！',
        icon: 'none'
      })
      this.setData({
        show_getuserinfo: false
      })
    }
  },
  //好的按钮
  popup() {
    this.setData({
      show: !this.data.show
    })
  },
  //-------点击签到---------
  bindSignFn(e) {
    if (!getApp().globalData.isauth) {
      wx.showToast({
        title: '请先授权',
        icon: 'none'
      })
      this.setData({
        show_getuserinfo: true
      })
      return;
    }
    var that = this
    //     newSignNum = that.data.newSignNum,
    //     today = that.data.myToday;
    // const arr = [],
    //       newSignArr = [...arr, ...that.data.newSignedArr];
    // //today为0时表示为周日
    // today = today - 1 >= 0 ? today - 1 : 6;
    // newSignArr[today].isSigned = true;//签到状态改为true

    // //当前积分
    // newSignNum++;//签到天数数目加
    // var curFen = that.data.newSignIntegral + this.data.newdaibi;
    var today
    that.signAddFen()
    wx.request({
      url: app.globalData.serverUrl + '/checkIn', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: wx.getStorageSync('id'),
        timestamp: that.data.timestamp
      },
      success(res) {
        console.log(res.data)
        wx.request({
          url: app.globalData.serverUrl + '/coinsIncrease', //仅为示例，并非真实的接口地址
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            userId: wx.getStorageSync('id'),
            increase: that.data.newdaibi
          },
          success(res) {
            that.setData({
              newSignIntegral: res.data.data,
            })
            //设置代币缓存
            wx.setStorageSync('coins', res.data.data)
          }
        })
        that.setData({
          newSignNum: res.data.data
        })
        const arr = []
        var newSignArr = [...arr, ...that.data.newSignedArr];
        today = res.data.data;
        //today为0时表示为周日
        today = today - 1 >= 0 ? today - 1 : 6;
        newSignArr[today].isSigned = true; //签到状态改为true
        that.setData({
          newSignBtnState: true,
          show: true,
          newSignedArr: newSignArr,
        })
      },
      fail(res) {
        wx.showToast({
          title: '网络出现异常了~',
          icon: 'none'
        })
      }
    })


    // that.signAddFen();
  },

  //签到积分函数 
  //连续 天数-积分： 周三+3：周一，周二，周三（1+1+3=5）； 周六+7：周日到周六（1+1+3+1+1+1+7=15）
  signAddFen(e) {
    console.log('调用了确定代币数目加多少')

    var that = this,
      myToday = that.data.myToday + 1,
      oneIsSigned = that.data.newSignedArr[0].isSigned,
      twoIsSigned = that.data.newSignedArr[1].isSigned,
      threeIsSigned = that.data.newSignedArr[2].isSigned,
      fourIsSigned = that.data.newSignedArr[3].isSigned,
      fiveIsSigned = that.data.newSignedArr[4].isSigned,
      sixIsSigned = that.data.newSignedArr[5].isSigned



    // 另外加分-黄色小框显示 周三+3 , 周日+7
    if (oneIsSigned && twoIsSigned && myToday == 3) {
      that.setData({
        newdaibi: 3
      }); //今天第三次签到加三分
    } else if (oneIsSigned && twoIsSigned && threeIsSigned && fourIsSigned && fiveIsSigned && sixIsSigned && myToday == 7) {
      that.setData({
        newdaibi: 7 //第七次签到
      })
    } else {
      that.setData({
        newdaibi: 1
      })
    }
  },
  ifSameDay(timestamp1, timestamp2) {
    var n1 = timestamp1 * 1000;
    var n2 = timestamp2 * 1000;
    var date1 = new Date(n1);
    var date2 = new Date(n2);
    //年  
    var Y1 = date1.getFullYear();
    var Y2 = date2.getFullYear();
    //月  
    var M1 = date1.getMonth();
    var M2 = date2.getMonth();
    //日  
    var D1 = date1.getDate();
    var D2 = date2.getDate();
    console.log(D1)
    console.log(D2)
    console.log(M1)
    console.log(M2)
    console.log(Y1)
    console.log(Y2)
    if (Y1 == Y2 && M1 == M2 && D1 == D2)
      return true;
    return false;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!getApp().globalData.isauth) {
      wx.showToast({
        title: '请先授权',
        icon: 'none'
      })
      this.setData({
        show_getuserinfo: true
      })
      return;
    }
    var that = this
    try {
      var coins = wx.getStorageSync('coins')
      if (coins) {
        this.setData({
          newSignIntegral: coins
        })
      }
    } catch (e) {

    }
    // myDate = new Date(),

    // myToday = 6  //本次签到的下标，由服务器返回
    // that.setData({
    //   myToday: myToday
    // })
    // that.signAddFen();
    that.getMyToday();
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    that.setData({
      timestamp: timestamp
    })

  },

  getMyToday() {
    var that = this
    wx.request({
      url: app.globalData.serverUrl + '/getCheckInDay', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: wx.getStorageSync('id')
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 0) {
          that.setData({
            myToday: 0
          })
        } else {
          if (that.ifSameDay(that.data.timestamp, res.data.data.timestamp)) {
            that.setData({
              newSignBtnState: true
            })
          }
          that.setData({
            myToday: res.data.data.days
          })
          var arr = that.data.newSignedArr
          for (var i = 0, len = res.data.data.days; i < len; i++) {
            arr[i].isSigned = true; //赋结新值
          }
          that.setData({
            newSignedArr: arr
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