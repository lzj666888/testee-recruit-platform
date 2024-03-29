// pages/signup/signup.js
const app =getApp()
const formatTime = require("../../utils/util").formatTime

Page({

  /**
   * 页面的初始数据
   */
  data: {
    experimentId:0,
    signup_peoples:[],
    pageNum:1,          //第几页
    pageSize:20,       //每一页的数据数量
    tab_index: 0,
    tabbars: [
      '全部', '待审核', '已通过', '未通过'
    ],
  },
  //跳转到详情页面
  todetail(e){
    var index=e.currentTarget.dataset.index;
    var obj=this.data.signup_peoples[index]
    wx.navigateTo({
      url: './detail?tested_id='+obj.userId+'&state='
      +obj.checkStatus+'&time_period='+obj.timePeriod+'&finish='
      +obj.testerSchedule+'&enrollment_time='+obj.enrollment_time
      +'&sign_id='+obj.id+'&exp_id='+this.data.experimentId
    })
  },
  //删除关键词
  onCancel:function(e){
    console.log(e)
    this.setData({
      keyWord:e.detail
    })
    console.log('cancel keyWord:',this.data.keyWord)
  },
  onSearch(e){
    var that = this
    console.log(e.detail)
    var data =
     {pageNum: that.data.pageNum, 
      experimentId:that.data.experimentId,
      keyWord:e.detail,
      pageSize: that.data.pageSize };
    that.getUsers(data)
  },
//改变tabbar
changetabbar(e){
  var that = this
  var checkStatus
  var tabindex = e.detail.index; //获取当前tabbar的下标索引
  console.log(tabindex)
  if(tabindex==1)
  {
    checkStatus = '待审核'
  }else if(tabindex==2)
  {
    checkStatus = '已通过'
  }else if(tabindex==3)
  {
    checkStatus = '未通过'
  }
  wx.showLoading({
    title: ''
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 500)
  var data =
     {pageNum: that.data.pageNum, 
      experimentId:that.data.experimentId,
      checkStatus:checkStatus,
      pageSize: that.data.pageSize };
  that.getUsers(data)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    this.data.experimentId=options.experimentId
    var data =
     {pageNum: that.data.pageNum, 
      experimentId:that.data.experimentId,
      pageSize: that.data.pageSize };
    that.getUsers(data)
  },
  getUsers(data)
  {
    var that = this
    wx.request({
      url: app.globalData.serverUrl+'/testerGetUserByExample', //仅为示例，并非真实的接口地址
      method: 'POST',
      
      data: data,
      success(res) {
        console.log(res.data)
        var dataArr =[]
        for(var i=0; i<res.data.data.length; i++)
        {
            res.data.data[i].enrollment_time=formatTime(res.data.data[i].signTimestamp*1000)
            dataArr.push(res.data.data[i]);
        }
        that.setData({
          signup_peoples:dataArr
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
    this.data.pageNum=1
    var data =
     {pageNum: this.data.pageNum, 
      experimentId:this.data.experimentId,
      pageSize: this.data.pageSize };
    this.getUsers(data)
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