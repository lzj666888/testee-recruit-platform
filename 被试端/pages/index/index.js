const app = getApp()
const formatTime = require("../../utils/util").formatTime
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord:'',   //关键词
    type:'',          //实验类型
    descType: '',   //降序字段 performance_score主试评分 duration时长 reward薪酬
    pageNum:0,          //第几页
    pageSize:10,       //每一页的数据数量
    //实验
    experiments: [],
    //类型筛选
    typeSelect: [{
        option: [{
            text: '所有类型',
            value: ''
          },
          {
            text: '线上实验',
            value: '线上实验'
          },
          {
            text: '线下实验',
            value: '线下实验'
          },
          {
            text: '问卷调查',
            value: '问卷调查'
          },
        ],
        valued: ''
      }
    ],
    //降序筛选
    descTypeSelect: [{
      option: [{
        text: '综合排序',
        value: ''
      },
      {
        text: '酬费降序',
        value: 'reward'
      },
      {
        text: '时长降序',
        value: 'duration'
      },
      {
        text: '评分降序',
        value: 'performance_score'
      },
      ],
      valued: ''
    }],
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
      var tester_id=e.currentTarget.dataset.tester_id;//获取主试id
      wx.navigateTo({
        url: '/pages/experimentdetail/experimentdetail?test_id='+test_id+"&tester_id="+tester_id,
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
//上拉加载更多
  loadMore:function(e){
    var data = { keyWord: this.data.keyWord, pageNum: this.data.pageNum, pageSize: this.data.pageSize };
    this.selectExperimentsByExample(data, 0);
  },
  //下拉刷新
  refresh:function(e){
    
  },

  //改变筛选框
  typeChoose: function (e) {
    this.setData({
      type:e.detail
    })
    console.log('type',this.data.type)
    var data = { type: this.data.type, descType: this.data.descType, pageNum: this.data.pageNum, pageSize: this.data.pageSize };
    this.selectExperimentsByExample(data, 0)
  },
  descTypeChoose: function (e) {
    this.setData({
      descType: e.detail
    })
    console.log('descType',this.data.descType)
    var data = { type:this.data.type,descType:this.data.descType,pageNum: this.data.pageNum, pageSize: this.data.pageSize };
    this.selectExperimentsByExample(data, 0)
  },

  //删除关键词
  onChange:function(e){
    console.log(e)
    this.setData({
      keyWord:e.detail
    })
    console.log('cancel keyWord:',this.data.keyWord)
  },

  //根据关键词查询实验
  selectExperimentsByKeWord:function(e){
    console.log(e)
    //将筛选条件变为默认
    this.setData({
      type:'',
      descType:''
    })
    var data = {keyWord:this.data.keyWord,pageNum:this.data.pageNum,pageSize:this.data.pageSize};
    this.selectExperimentsByExample(data,0);
  },

//根据关键词查询实验并筛选
selectExperimentsByExample(dat,code){
  var that = this;
  wx.request({
    url: app.globalData.serverUrl + '/selectExperimentByExample',
    method:'POST',
    data:dat,
    success:res=>{
      console.log(res);
      that.handlerDataType(code,res.data.data);
    },
    fail:res=>{
      console.log(res)
    }
  })
},

//操作实验数据的方式 1追加 0清空设置
handlerDataType(code,data){
  var dataArr = this.data.experiments;
  for (var i = 0; i < data.length; i++) 
    data[i].sendTimestamp = formatTime(data[i].sendTimestamp)

  if(code == 1)
    {
      for(var i=0; i<data.length; i++)
        dataArr.push(data[i]);
    }
    else if(code == 0)
      dataArr = data;
    this.setData({
      experiments:dataArr
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //搜索所有实验
    var data = {pageNum: this.data.pageNum, pageSize: this.data.pageSize };
    this.selectExperimentsByExample(data,1)
    //分享页面先跳转到主页再到指定页面
    if(options.url){
      let url = decodeURIComponent(options.url);
      wx.navigateTo({
        url
      })
    }
  },

  
})