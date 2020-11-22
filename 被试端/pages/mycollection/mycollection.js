// pages/mycollection/mycollection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    //实验
    experiments: [{
      collected:true,
      test_id: 1,
      status:1,//1为招募中，0位结束
      tester_id: {
        image: '/images/p1.jpg',
        name: '李同'
      },
      type: '线下实验',
      name: '简单按键实验，问卷填写',
      duration: 1,
      reward: 10,
      time: '30-35分钟',
      place: '文清123',
      send_time: '2020-09-12',
      page_view: 123,
      enrollment: 43
    },
    {
      collected:true,
      test_id: 2,
      status:1,//1为招募中，0位结束
      tester_id: {
        image: '/images/p2.jpg',
        name: '安然'
      },
      type: '线上实验',
      name: '近红外绿实验',
      duration: 1,
      reward: 10,
      time: '30-35分钟',
      place: '文清123',
      send_time: '2020-09-12',
      page_view: 123,
      enrollment: 43
    },
    {
      collected:true,
      status:0,//1为招募中，0位结束
      test_id: 3,
      tester_id: {
        image: '/images/p2.jpg',
        name: '安然'
      },
      type: '线上实验',
      name: '近红外绿实验',
      duration: 1,
      reward: 10,
      time: '30-35分钟',
      place: '文清123',
      send_time: '2020-09-12',
      page_view: 123,
      enrollment: 43
    },
    {
      collected:true,
      status:0,//1为招募中，0位结束
      test_id: 4,
      tester_id: {
        image: '/images/p2.jpg',
        name: '安然'
      },
      type: '线上实验',
      name: '近红外绿实验',
      duration: 1,
      reward: 10,
      time: '30-35分钟',
      place: '文清123',
      send_time: '2020-09-12',
      page_view: 123,
      enrollment: 43
    },
    {
      collected:true,
      status:1,//1为招募中，0位结束
      test_id: 6,
      tester_id: {
        image: '/images/p2.jpg',
        name: '安然'
      },
      type: '线上实验',
      name: '近红外绿实验',
      duration: 1,
      reward: 10,
      time: '30-35分钟',
      place: '文清123',
      send_time: '2020-09-12',
      page_view: 123,
      enrollment: 43
    }
  ],
  },
  //收藏和取消收藏
  collect(e){
    var index=e.currentTarget.dataset.index;
    var _experiments=this.data.experiments;
    if(_experiments[index].collected==true){
      //取消收藏
      wx.showToast({
        title: '取消收藏成功！',
        icon:'none',
        duration:1000
      })
    }
    else{
       //收藏
       wx.showToast({
        title: '收藏成功！',
        icon:'none',
        duration:1000
      })
    }
    _experiments[index].collected=!_experiments[index].collected;
    this.setData({
      experiments:_experiments
    })

  },
    //跳转到实验详情页面
    toexperiment: function (e) {
      var test_id=e.currentTarget.dataset.test_id;//获取实验id
      wx.navigateTo({
        url: '/pages/experimentdetail/experimentdetail?test_id='+test_id,
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