// pages/experimentTrip/experimentTrip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    actions:[{name:'删除'}],
    tab_index: 0,
    tabbars: [
      '全部', '待通过', '已通过', '未通过'
    ],
    experiments: [{
      test_id: 1,
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
      enrollment: 43,
      //新加属性
      state: 0, //0为待审核，1为已通过，-1为未通过
      finish: 0, //0为为完成，1为完成,
      date: '2020-11-12', //日期
      timeperiod: '13:10-14:20', //时段
      enrollment_time: '2020-11-02' //报名时间
    },
    {
      test_id: 2,
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
      enrollment: 43,
      //新加属性
      state: 1, //0为待审核，1为已通过，-1为未通过
      finish: 1, //0为为完成，1为完成,
      date: '2020-11-12', //日期
      enrollment_time: '2020-11-02', //报名时间
      timeperiod: '13:10-14:20' //时段
    },{
      test_id: 1,
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
      enrollment: 43,
      //新加属性
      state: -1, //0为待审核，1为已通过，-1为未通过
      finish: 0, //0为未完成，1为完成,
      date: '2020-11-12', //日期
      timeperiod: '13:10-14:20', //时段
      enrollment_time: '2020-11-02' //报名时间
    },{
      test_id: 1,
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
      enrollment: 43,
      //新加属性
      state: 1, //0为待审核，1为已通过，-1为未通过
      finish: 0, //0为未完成，1为完成,
      date: '2020-11-12', //日期
      timeperiod: '13:10-14:20', //时段
      enrollment_time: '2020-11-02' //报名时间
    },{
      test_id: 5,
      tester_id: {
        image: '/images/p1.jpg',
        name: '李同'
      },
      type: '线上实验',
      name: '按键实验，问卷填写',
      duration: 1,
      reward: 10,
      time: '30-35分钟',
      place: '文清123',
      send_time: '2020-09-12',
      page_view: 123,
      enrollment: 43,
      //新加属性
      state: 1, //0为待审核，1为已通过，-1为未通过
      finish: -1, //0为待完成，1为完成,-1为未完成
      date: '2020-11-12', //日期
      timeperiod: '13:10-14:20', //时段
      enrollment_time: '2020-11-02' //报名时间
    }
  ]
  },
//选择删除
  onSelect(event) {
    console.log(event.detail);
    this.setData({
      show:false
    })
  },
  //关闭页面
  onClose() {
    this.setData({ show: false });
  },
  //取消按钮
  onCancel(e){
    this.setData({
      show:false
    })
  },
//删除实验
delete:function(e){
  var index=e.currentTarget.dataset.index;//获取删除实验index
  this.setData({
    show:true
  })
  console.log(index)
},

  //改变tabbar
  changetabbar: function (e) {
    var tabindex = e.detail.index; //获取当前tabbar的下标索引
    console.log(tabindex)
    wx.showLoading({
      title: ''
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    switch (tabindex) {
      case 0:
        this.setData({
          experiments: [{
            test_id: 1,
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
            enrollment: 43,
            //新加属性
            state: 0, //0为待审核，1为已通过，-1为未通过
            finish: 0, //0为为完成，1为完成,
            date: '2020-11-12', //日期
            timeperiod: '13:10-14:20', //时段
            enrollment_time: '2020-11-02' //报名时间
          },
          {
            test_id: 2,
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
            enrollment: 43,
            //新加属性
            state: 1, //0为待审核，1为已通过，-1为未通过
            finish: 1, //0为为完成，1为完成,
            date: '2020-11-12', //日期
            enrollment_time: '2020-11-02', //报名时间
            timeperiod: '13:10-14:20' //时段
          },{
            test_id: 1,
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
            enrollment: 43,
            //新加属性
            state: -1, //0为待审核，1为已通过，-1为未通过
            finish: 0, //0为未完成，1为完成,
            date: '2020-11-12', //日期
            timeperiod: '13:10-14:20', //时段
            enrollment_time: '2020-11-02' //报名时间
          },{
            test_id: 1,
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
            enrollment: 43,
            //新加属性
            state: 1, //0为待审核，1为已通过，-1为未通过
            finish: 0, //0为未完成，1为完成,
            date: '2020-11-12', //日期
            timeperiod: '13:10-14:20', //时段
            enrollment_time: '2020-11-02' //报名时间
          }
        ]
        })
        break;
      default:
        this.setData({
          experiments: [{
            test_id: 1,
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
            enrollment: 43,
            //新加属性
            state: 0, //0为待审核，1为已通过，-1为未通过
            finish: 0, //0为为完成，1为完成,
            date: '2020-11-12', //日期
            timeperiod: '13:10-14:20', //时段
            enrollment_time: '2020-11-02' //报名时间
          }, ]
        })
        break;
    }
  },
  //点击实验跳转
  toexperiment:function(e){
    var index=e.currentTarget.dataset.index
    var experiment=this.data.experiments[index];//点击的实验
    console.log(experiment)
    wx.navigateTo({
      url: '/pages/experimentdetail/experimentdetail?experiment='+JSON.stringify(experiment),
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