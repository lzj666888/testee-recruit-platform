// pages/signup/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tested:{},//报名的被试信息
  },
    //对被试进行评分
    onChange(event) {
      this.setData({
        value: event.detail,
      });
    },
  // 拨打电话号码
  call: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.tested.phone,
      fail(error){
        console.log(error)
      }
    })
  },
  // 复制微信号
  copywx: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.tested.wx,
    });
  },
  //聊天室
  tochat(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.tested_id)
    //获取数据
    const res=[
      {
        tested_id:1,
        name:'李分',
        sex:'男',
        collage:'计算机学院',
        imagesrc:'/images/p1.jpg',
        state:0,//0待通过，1已通过，-1未通过
        finish:0,//0未完成，1已完成
        enrollment_time:'2020-11-20 11:30',
        major:'计算机科学',
        grade:'18级',
        wx:'12345jksl',
        phone:'1348945930',
        time_period:'2020-11-12 11:20~12:00',
        performance_score:90,
        credit_score:99
      },
      {
        tested_id:2,
        name:'李分',
        sex:'女',
        collage:'心理学院',
        imagesrc:'/images/p2.jpg',
        state:1,//0待通过，1已通过，-1未通过
        finish:1,//0未完成，1已完成
        enrollment_time:'2020-11-20 11:30',
        major:'计算机科学',
        grade:'18级',
        wx:'12345jksl',
        phone:'1348945930',
        time_period:'2020-11-12 11:20~12:00',
        performance_score:90,
        credit_score:99
      },
      {
        tested_id:3,
        name:'陈分',
        sex:'男',
        collage:'计算机学院',
        imagesrc:'/images/p1.jpg',
        state:-1,//0待通过，1已通过，-1未通过
        finish:0,//-1未完成，0待完成，1已完成
        enrollment_time:'2020-11-20 11:30',
        major:'计算机科学',
        grade:'18级',
        wx:'12345jksl',
        phone:'1348945930',
        time_period:'2020-11-12 11:20~12:00',
        performance_score:90,
        credit_score:99
      },
      {
        tested_id:4,
        name:'李分得',
        sex:'女',
        collage:'数学学院',
        imagesrc:'/images/p2.jpg',
        state:1,//0待通过，1已通过，-1未通过
        finish:0,//0未完成，1已完成
        enrollment_time:'2020-11-20 11:30',
        major:'计算机科学',
        grade:'18级',
        wx:'12345jksl',
        phone:'1348945930',
        time_period:'2020-11-12 11:20~12:00',
        performance_score:90,
        credit_score:99
      },
      {
        tested_id:5,
        name:'李分得',
        sex:'女',
        collage:'数学学院',
        imagesrc:'/images/p2.jpg',
        state:1,//0待通过，1已通过，-1未通过
        finish:-1,//0未完成，1已完成
        enrollment_time:'2020-11-20 11:30',
        major:'计算机科学',
        grade:'18级',
        wx:'12345jksl',
        phone:'1348945930',
        time_period:'2020-11-12 11:20~12:00',
        performance_score:90,
        credit_score:99
      }
    ]
    this.setData({
      tested:res[options.tested_id-1]
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