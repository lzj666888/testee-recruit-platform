// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),//小程序是否可被用
    show_getuserinfo:false,
    modalName:null,//展示问号内容
    bei_tester:{
      id:null,
      name:'',
      image:null,
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
  onClose() {
    this.setData({ show_getuserinfo: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查用户是否已授权
    this.checkuserinfo()
  },
  // 判断是否需要进行授权
  checkuserinfo(){
    var that=this
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
        else{
          that.setData({
            show_getuserinfo:true
          })
        }
      }
    })
  },
  // 点击授权函数
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
    if(e.detail.userInfo)
    {
      var obj=e.detail.userInfo
      //调用注册接口
      wx.request({
        url: 'http://localhost:8080/register', //仅为示例，并非真实的接口地址
        method:'POST',
        data:{
          openId:obj
        },
        success (res) {
          console.log(res.data)
        },
        fail(res){
          wx.showToast({
            title: '网络出现异常了~',
            icon:'none'
          })
        }
      })
      this.setData({
        show_getuserinfo:true,
        ['bei_tester.name']:obj.nickName,
        ['bei_tester.image']:obj.avatarUrl
      })
      wx.showToast({
        title: '授权成功！',
      })
    }
    else{
      wx.showToast({
        title: '授权失败！',
        icon:'none'
      })
    }
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