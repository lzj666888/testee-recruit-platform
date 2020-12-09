// pages/validation/validation.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SNO: '123',
    MIMA: '123',
    mima: '',
    sno: ''
  },
  //提交学号验证
  confirm() {
    var that=this
    if (this.data.sno == this.data.SNO && this.data.mima == this.data.MIMA) {
      //上传学号到个人信息
      var userinfo = wx.getStorageSync('userinfo')
      //修改个人信息
      wx.request({
        url: app.globalData.serverUrl + '/editUser', //仅为示例，并非真实的接口地址
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          openId: getApp().globalData.openId,
          id: wx.getStorageSync('id'),
          username: userinfo.username,
          faceUrl: getApp().globalData.userInfo.avatarUrl,
          college: userinfo.college,
          major: userinfo.major,
          grade: userinfo.grade,
          phone: userinfo.phone,
          wechat: userinfo.wechat,
          sex: userinfo.sex,
          sno:that.data.sno
        },
        success(res) {
          console.log(res.data)
          if (res.data.code == 1) {
            setTimeout(() => {
              wx.$showtoast('验证成功！', 'success')
            }, 1000);
            wx.setStorageSync('sno', that.data.sno)
            wx.setStorageSync('mima', that.data.mima)
            wx.navigateBack({
              delta: 1,
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
      wx.showToast({
        title: '账号或密码错误！',
        icon: 'none'
      })
    }
  },
  getsno(e) {
    console.log(e.detail.value)
    this.data.sno = e.detail.value
  },
  getmima(e) {
    console.log(e.detail.value)
    this.data.mima = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try{
      var sno=wx.getStorageSync('sno')
      var mima=wx.getStorageSync('mima')
      if(sno&&mima){
        this.setData({
          sno:sno,
          mima:mima
        })
      }
    }catch(e){}
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