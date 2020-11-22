// pages/signup/signup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signup_peoples:[
      {
        tested_id:1,
        name:'李分',
        sex:'男',
        collage:'计算机学院',
        imagesrc:'/images/p1.jpg',
        state:0,//0待通过，1已通过，-1未通过
        finish:0,//0未完成，1已完成
        enrollment_time:'2020-11-20 11:30'
      },
      {
        tested_id:2,
        name:'李分',
        sex:'女',
        collage:'心理学院',
        imagesrc:'/images/p2.jpg',
        state:1,//0待通过，1已通过，-1未通过
        finish:1,//0未完成，1已完成
        enrollment_time:'2020-11-20 11:30'
      },
      {
        tested_id:3,
        name:'陈分',
        sex:'男',
        collage:'计算机学院',
        imagesrc:'/images/p1.jpg',
        state:-1,//0待通过，1已通过，-1未通过
        finish:0,//0未完成，1已完成
        enrollment_time:'2020-11-20 11:30'
      },
      {
        tested_id:4,
        name:'李分得',
        sex:'女',
        collage:'数学学院',
        imagesrc:'/images/p2.jpg',
        state:1,//0待通过，1已通过，-1未通过
        finish:0,//0未完成，1已完成
        enrollment_time:'2020-11-20 11:30'
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
    ],
    tab_index: 0,
    tabbars: [
      '全部', '待通过', '已通过', '未通过'
    ],
  },
  //跳转到详情页面
  todetail(e){
    var index=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: './detail?tested_id='+this.data.signup_peoples[index].tested_id
    })
  },
//改变tabbar
changetabbar(e){
  var tabindex = e.detail.index; //获取当前tabbar的下标索引
  console.log(tabindex)
  wx.showLoading({
    title: ''
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 500)
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