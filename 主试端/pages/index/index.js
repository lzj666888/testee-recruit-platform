// pages/experimentTrip/experimentTrip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:-1,//选中要删除或者编辑的实验
    touchactive:false,
    x: 318, //发布按钮的移动
    y: 350,
    notice: '欢迎加入广大被试招募平台主试端，在这里你可以发布招募实验！',
    show: false,
    actions: [{
      name: '编辑实验'
    }, {
      name: '删除实验'
    }],
    tab_index: 0,
    tabbars: [
      '全部', '待发布', '招募中', '已结束'
    ],
    experiments: []
  },
  //查看报名详情
  signup_detail(e){
    var index = e.currentTarget.dataset.index; //获取删除实验index
    console.log(index)
    wx.navigateTo({
      url: '/pages/signup/signup',
    })
  },
  touchactive(){
    this.setData({
      touchactive:true
    })
  },
  touchactiveend(){
    var time=setTimeout(() => {
      this.setData({
        touchactive:false
      })
      clearTimeout(time)
    }, 1000);
  },
  //跳转发布实验
  topublish(){
    wx.navigateTo({
      url: '/pages/publish/publish',
    })
  },
  //选择删除
  onSelect(event) {
    console.log(event.detail); //输出操作的对象{name:'删除'}
    //点击删除实验
    if(event.detail.name=='删除')
    {

    }
    //点击编辑实验
    else{
      var id=this.data.experiments[this.data.currentIndex].test_id;
      wx.navigateTo({
        url: '/pages/publish/publish?test_id='+id,
      })
    }
    this.setData({
      show: false
    })
  },
  //关闭页面
  onClose() {
    this.setData({
      show: false
    });
  },
  //取消按钮
  onCancel(e) {
    this.setData({
      show: false
    })
  },
  //删除实验
  delete: function (e) {
    var index = e.currentTarget.dataset.index; //获取删除实验index
    this.data.currentIndex=index
    this.setData({
      show: true
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
            }, {
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
            }, {
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

  //获取实验
  getExperiments(e){
    var that = this
    wx.request({
      url: 'http://localhost:8080/getTesterExp', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        testerId: 2,
      },
      success(res) {
        console.log(res.data)
        that.setData({
          experiments:res.data.data
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getExperiments()
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