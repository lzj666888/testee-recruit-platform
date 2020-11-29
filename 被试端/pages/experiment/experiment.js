// pages/experimentTrip/experimentTrip.js
const app = getApp()
const regist = require("../../utils/api").regist
const formatTime = require("../../utils/util").formatTime

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showend:false,//显示暂无更多
    pageNum: 1,
    pageSize: 20,
    show_getuserinfo: false, //是否显示授权面板
    show: false,//删除面板
    actions: [{
      name: '删除'
    }],
    tab_index: 0,
    tabbars: [
      '全部', '待审核', '已通过', '未通过'
    ],
    experiments: []
  },
  //授权
  GetUserInfo(e) {
    console.log(e.detail)
    if (JSON.stringify(e.detail) != '{}') {
      getApp().globalData.isauth = true
      getApp().globalData.userInfo = e.detail
      regist(this.selectComponent('#auth').data.radio)
      wx.showToast({
        title: '授权成功！',
        icon: 'none'
      })
      this.setData({
        show_getuserinfo: false
      })
    }
  },
  //选择删除
  onSelect(event) {
    console.log(event.detail);
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
    this.setData({
      show: true
    })
    console.log(index)
  },

  //改变tabbar
  changetabbar: function (e) {
    var tabindex = e.detail.index; //获取当前tabbar的下标索引
    console.log(tabindex)
    wx.$showloading();
    this.data.pageNum=1
    var data={
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      userId: wx.getStorageSync('id'),
    }
    switch (tabindex) {
      case 0:
        data.checkStatus= ""
        break;
      case 1:
        data.checkStatus= "待审核"
        break;
      case 2:
        data.checkStatus="已通过"
        break;
      case 3:
        data.checkStatus="未通过"
        break;
    }
    console.log(data)
    this.selectExperimentsByExample(data, 0)
  },
  //点击实验跳转
  toexperiment: function (e) {
    var index = e.currentTarget.dataset.index
    var experiment = this.data.experiments[index]; //点击的实验
    console.log(experiment)
    wx.navigateTo({
      url: '/pages/experimentdetail/experimentdetail?test_id=' + experiment.experimentId + '&tester_id=' + experiment.experiment.testerId + '&state=' + experiment.checkStatus+'&finish='+experiment.userSchedule+'&signid='+experiment.id,
    })
  },
  //根据关键词查询实验并筛选
  selectExperimentsByExample(dat, code) {
    var that = this;
    wx.request({
      url: app.globalData.serverUrl + '/userGetExpByExample',
      method: 'POST',
      data: dat,
      success: res => {
        console.log(res);
        that.handlerDataType(code, res.data.data);
        if(res.data.data.length<this.data.pageSize)
        {
          that.setData({
            showend:true
          })
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  //操作实验数据的方式 1追加 0清空设置
  handlerDataType(code, data) {
    var dataArr = this.data.experiments;
    for (var i = 0; i < data.length; i++)
      data[i].signTimestamp = formatTime(data[i].signTimestamp) //报名时间
    if (code == 1) {
      // dataArr=dataArr.concat(data)
      for(var i=0;i<data.length;i++)
      {
        dataArr.push(data[i])
      }
    } else if (code == 0)
      dataArr = data;
    this.setData({
      experiments: dataArr
    })
  },
  //初始化数据
  init(){
    this.data.pageNum=1
    var data = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      userId: wx.getStorageSync('id'),
      checkStatus: "",
    };
    this.selectExperimentsByExample(data, 0)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.$showloading()
    if (!getApp().globalData.isauth) {
      wx.showToast({
        title: '请先授权',
        icon: 'none'
      })
      this.setData({
        show_getuserinfo: true
      })
      return;
    }
    //获取用户所有报名记录
    this.init();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //如果没授权就再提醒
    if (!getApp().globalData.isauth) {
      this.setData({
        show_getuserinfo: true
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      tab_index:0
    })
    this.init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.pageNum++;
    var data = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      userId: wx.getStorageSync('id'),
      checkStatus: "",
    };
    this.selectExperimentsByExample(data, 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})