// pages/experimentdetail/experimentdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 0, //对主试的评分
    //报名按钮的文本
    btn_text: '我要报名',
    btn_disable: false, //报名按钮是否可用
    //主试信息
    tester: {
      sex: 1,
      phone: '12345123451',
      credit_score: 100, //信誉分
      feedback_score: 99, //反馈分
      wx: '12eor1',
      major: '应用心理',
      college: '教育学院',
      grade: '研三'
    },
    //实验状态，本来应该是在被试报名的实验里面的
    state: null,
    //实验完成度，本来应该是在被试报名的实验里面的
    finish: null,
    //实验
    experiment: {
      test_id: 1,
      tester_id: {
        image: '/images/p1.jpg',
        name: '李同'
      },
      type: '线下实验',
      lables: ['行为实验', '简单有趣', '有小礼物'],
      name: '简单按键实验，问卷填写',
      duration: 1,
      reward: 10,
      time: '30-35分钟',
      place: '文清123',
      send_time: '2020-09-12',
      page_view: 123,
      enrollment: 43,
      need: `
        1、认真完成实验
        2、视力正常。
        3、男生
        1、认真完成实验
        2、视力正常。
        3、男生
        `,
      content: `
        对电脑的信息提示做出本能反应，并在键盘输入相应的键，实验完后填写一份问卷。对电脑的信息提示做出本能反应，并在键盘输入相应的键，实验完后填写一份问卷。
        `,
      date_start: '2020-12-09',
      date_end: '2020-12-14',
      time_periods: [{
          time_start: '8:30',
          time_end: '9:30'
        },
        {
          time_start: '8:30',
          time_end: '9:30'
        },
        {
          time_start: '8:30',
          time_end: '9:30'
        },
        {
          time_start: '8:30',
          time_end: '9:30'
        },
        {
          time_start: '8:30',
          time_end: '9:30'
        },
        {
          time_start: '8:30',
          time_end: '9:30'
        }
      ]
    },
    //实验们
    experiments: [{
        test_id: 1,
        tester_id: {
          image: '/images/p1.jpg',
          name: '李同'
        },
        type: '线下实验',
        lables: ['行为实验', '简单有趣', '有小礼物'],
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
        test_id: 2,
        tester_id: {
          image: '/images/p2.jpg',
          name: '安然'
        },
        type: '线上实验',
        lables: ['行为实验', '简单有趣', '有小礼物'],
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
        test_id: 3,
        tester_id: {
          image: '/images/p2.jpg',
          name: '安然'
        },
        type: '线上实验',
        lables: ['行为实验', '简单有趣', '有小礼物'],
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
        test_id: 4,
        tester_id: {
          image: '/images/p2.jpg',
          name: '安然'
        },
        type: '线上实验',
        lables: ['行为实验', '简单有趣', '有小礼物'],
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
        test_id: 6,
        tester_id: {
          image: '/images/p2.jpg',
          name: '安然'
        },
        type: '线上实验',
        lables: ['行为实验', '简单有趣', '有小礼物'],
        name: '近红外绿实验',
        duration: 1,
        reward: 10,
        time: '30-35分钟',
        place: '文清123',
        send_time: '2020-09-12',
        page_view: 123,
        enrollment: 43
      }
    ]
  },
  //对主试进行评分
  onChange(event) {
    this.setData({
      value: event.detail,
    });
  },
  // 收藏实验
  collection: function () {

  },

  // 拨打电话号码
  call: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.tester.phone,
    })
  },
  // 复制微信号
  copywx: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.tester.wx,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取实验详情信息
    // for(var item of this.data.experiments){
    //   if(item.test_id==options.test_id)
    //   {
    //     this.setData({
    //       experiment:item
    //     })
    //     break;
    //   }
    // }
    // console.log(options.state)
    try {
      var experiment = JSON.parse(options.experiment);
    } 
    catch(err)
    {
      console.log(err)
    }
    finally {
      //被试个人页面实验跳转才会执行
      if (experiment != undefined) {
        //获取实验状态,完成度
        this.setData({
          state: JSON.parse(options.experiment).state,
          finish: JSON.parse(options.experiment).finish,
          btn_disable: true
        })
        if (this.data.state == 0) //待审核
        {
          this.setData({
            btn_text: '等待审核'
          })
        } else if (this.data.state == 1) {
          this.setData({
            btn_text: '已成功报名'
          })
        } else {
          this.setData({
            btn_text: '报名失败'
          })
        }
      }
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
    let url = encodeURIComponent('/pages/experimentdetail/experimentdetail?test_id=' + this.data.experiment.test_id);
    return {
      title: "实验详情",
      path: `/pages/index/index?url=${url}`
    }
  }
})