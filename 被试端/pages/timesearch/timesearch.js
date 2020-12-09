// pages/timesearch/timesearch.js
const regist = require("../../utils/api").regist
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_getuserinfo: false, //是否显示授权面板
    currentIndex:0,
    teams:['全部','大一','大二','大三','大四'],
    totaltime:'12.00',//总时长
    targettime:'72.00',//目标时长
    timerecords:[{
      timestamp:'2020.10.01 11:30',
      time:1.5,
      tester:'谢楚英',
      type:'A.心理学实验实践',
      isqualified:true
    },
    {
      timestamp:'2020.10.11 15:30',
      time:0.5,
      tester:'谢楚英',
      type:'A.心理学实验实践',
      isqualified:false
    },
    {
      timestamp:'2020.10.21 11:00',
      time:1.0,
      tester:'陈冠全',
      type:'B.心理学调查实践',
      isqualified:true
    },
    {
      timestamp:'2020.10.01 11:30',
      time:1.5,
      tester:'谢楚英',
      type:'A.心理学实验实践',
      isqualified:true
    },
    {
      timestamp:'2020.10.11 15:30',
      time:0.5,
      tester:'谢楚英',
      type:'A.心理学实验实践',
      isqualified:false
    },
    {
      timestamp:'2020.10.21 11:00',
      time:1.0,
      tester:'陈冠全',
      type:'B.心理学调查实践',
      isqualified:true
    },
  ]
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
  selectItem(e){
    var _index=e.currentTarget.dataset.index
    console.log(_index)
    if(_index==this.data.currentIndex)
    {return;}
    wx.$showloading()
    this.setData({
      currentIndex:_index
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
    let that = this;
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 500)
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