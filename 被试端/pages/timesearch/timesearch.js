// pages/timesearch/timesearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totaltime:12,//总时长
    targettime:72,//目标时长
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 500)
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