Page({

  /**
   * 页面的初始数据
   */
  data: {
    //实验
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
        enrollment: 43
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
        enrollment: 43
      },
      {
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
    //筛选
    choose: [{
        option: [{
            text: '所有类型',
            value: 0
          },
          {
            text: '线上实验',
            value: 1
          },
          {
            text: '线下实验',
            value: 2
          },
          {
            text: '问卷调查',
            value: 3
          },
        ],
        valued: 0
      },
      {
        option: [{
            text: '综合排序',
            value: 0
          },
          {
            text: '酬费降序',
            value: 1
          },
          {
            text: '时长降序',
            value: 2
          },
        ],
        valued: 0
      },
      {
        option: [{
            text: '综合排序',
            value: 0
          },
          {
            text: '酬费降序',
            value: 1
          },
          {
            text: '时长降序',
            value: 2
          },
        ],
        valued: 0
      }
    ],
    notice: '加入广大被试招募平台获取更多优质实验信息！',
    searchvalue: '',
    //小功能
    functiondata: [{
        url: '/images/timesearch.png',
        txt: '实验时查询',
        page:'timesearch'
      },
      {
        url: '/images/noticeitem.png',
        txt: '注意事项',
        page:'notices'
      },
      {
        url: '/images/sign.png',
        txt: '每日签到',
        page:'signin'
      },
      {
        url: '/images/remind.png',
        txt: '实验提醒',
        page:'remind'
      }
    ]
  },
    //跳转到实验详情页面
    toexperiment: function (e) {
      var test_id=e.currentTarget.dataset.test_id;//获取实验id
      wx.navigateTo({
        url: '/pages/experimentdetail/experimentdetail?test_id='+test_id,
      })
    },
  //点击跳转到功能页面
  tofunc_page: function (e) {
    var itemindex = e.currentTarget.dataset.index; //选中功能的index
    var page=this.data.functiondata[itemindex].page
    wx.navigateTo({
      url: '/pages/'+page+'/'+page,
    })
  },
  //改变筛选框
  changechoose: function (e) {
    console.log(e)
    var itemindex = e.currentTarget.dataset.index; //选中分类的index
    var itemvalue = e.detail; //选中分类中的item的index
    console.log(itemindex, itemvalue)
  },
  //搜索事件
  onSearch: function (e) {
    console.log(e.detail)
    this.data.searchvalue = e.detail
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://localhost:8080/findAllExperiment', //仅为示例，并非真实的接口地址
      method:'POST',
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

    //分享页面先跳转到主页再到指定页面
    if(options.url){
      let url = decodeURIComponent(options.url);
      wx.navigateTo({
        url
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