// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 60 * 1000, //获取验证码倒计时
    timeData: {},
    error: '',
    name: '',
    major: '',
    grade: '',
    college: '',
    phone: '',
    phonetrue:false,//为true才提交
    wx: '',
    sex: '男',//默认初始为男性
    send_sms: false //验证码是否已经发送
  },
  //用于自定义样式的
  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },
  //倒计时结束
  timefinish() {
    this.setData({
      send_sms: false
    })
    const countDown = this.selectComponent('.control-count-down');
    countDown.reset();
  },
  //点击提交
  confirm() {
    var getdata = this.data
    if (getdata.name && getdata.major && getdata.grade && getdata.college && getdata.phone && getdata.sex&&getdata.phonetrue) {
      wx.request({
        header: {'content-type': 'application/x-www-form-urlencoded'},
        url: 'http://localhost:8080/register', //仅为示例，并非真实的接口地址
        data: {
          openId: 90,
          username: getdata.name,
          college: getdata.college,
          major:getdata.major,
          grade:getdata.grade,
          phone:getdata.phone,
          sex:getdata.sex
        },
        method:'POST',
        success (res) {
          console.log(res.data)
        }
      })
      console.log('提交成功！')
    }
    else{

    }
  },
  //获取验证码
  getsms() {
    if (this.data.phone&&this.data.phonetrue) {
      wx.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 1500
      }).then(() => {
        this.setData({
          send_sms: true
        })
        const countDown = this.selectComponent('.control-count-down');
        countDown.start();
      })
    } else {
      wx.showToast({
        title: '请输入正确的手机号码！',
        icon: 'none',
      })
    }
  },
  //获取电话
  checkphone(e) {
    console.log(e.detail.value);
    if (!(/^1[3456789]\d{9}$/.test(e.detail.value))) {
      this.setData({
        error: '手机号码格式有误！'
      })
    } else {
      this.setData({
        error: ''
      })
      this.data.phone = e.detail.value
      this.data.phonetrue=true
    }
  },
  getphone(e){
    this.data.phone = e.detail
  },
  //获取姓名
  getname(e) {
    this.data.name = e.detail
  },
  //获取专业
  getmajor(e) {
    this.data.major = e.detail
  },
  //获取年级
  getgrade(e) {
    this.data.grade = e.detail
  },
  //获取学院
  getcollege(e) {
    this.data.college = e.detail
  },
  //获取微信
  getwx(e) {
    this.data.wx = e.detail
  },
  //选中性别
  radioChange(e) {
    this.data.sex = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.bei_testerid;
    console.log(id)
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