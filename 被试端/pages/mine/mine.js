// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName:null,//展示问号内容
    bei_tester:{
      id:1,
      name:'李宗介',
      image:'/images/p2.jpg',
      tokens:98,//代币数
      credit_score:100,//信誉分
      performent_score:100,//表现分
    }
  },
  //跳转到意见反馈页面
  toadvice(){
    wx.navigateTo({
      url: '/pages/advice/advice',
    })
  },
//跳转到我的收藏中
tomycollections(){
  wx.navigateTo({
    url:'/pages/mycollection/mycollection'
  })
},
  //跳转编辑个人信息
  edit:function(){
    wx.navigateTo({
      url: '/pages/edit/edit?bei_testerid='+this.data.bei_tester.id,
    })
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