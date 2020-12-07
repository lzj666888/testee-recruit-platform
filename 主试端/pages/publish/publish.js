// pages/publish/publish.js
const appdata=getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_vancale:false,//使页面加载完后再去渲染这个组件
    createformshow:false,//生成表格
    Dates: [],
    dates2: ['时间段\\日期'],
    formdata: [], //表单数据
    result: [], //选择要删除的项
    endtime: '09:00', //结束时间
    starttime: '08:30', //开始时间
    addperiod_show: false,//添加时间段
    periods: [], //时间段
    dates: [], //保存日期
    caletext: '', //日期
    showcale: false, //展示可选日期
    addlabel: null,
    common_labels: ['简单按键', '问卷填写', '脑电实验', '眼动实验', '皮肤电实验', 'FMRI/MRI', '有小礼品', '有趣好玩'],
    show: false, //展示添加标签的面板
    need: '',//实验要求
    showneedarea:true,
    content: '',//实验内容
    showcontentarea:true,
    money: null,
    test_time: null, //实验时
    name: null,
    place: null,
    time: null, //时长
    duration:null,//耗时
    textarea_height: {
      maxHeight: 70,
      minHeight: 70
    },
    my_labels: [],
    index: null,//选择的实验类型
    picker: ['线上实验', '线下实验', '问卷调查'],
  },
  //解决第三方的textarea层级问题
  getneed:function(e){
    this.setData({
      need:e.detail.value
    })
  },
  getneed1:function(){
    this.setData({
      showneedarea: true
    })
    if(this.data.need=="不超过100字"){
      this.setData({ need:''})
    }
  },
  ifshowneedArea(e){
    var show = e.currentTarget.dataset.show=="yes"?true:false;
    if(show){
      this.setData({ showneedarea: false})
    }else{ this.setData({showneedarea:true})}
    if(this.data.need==''){
      this.setData({need:'不超过100字'})
    }
  },
  getcontent:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  getcontent1:function(){
    this.setData({
      showcontentarea: true
    })
    if(this.data.content=="不超过100字"){
      this.setData({ content:''})
    }
  },
  ifshowcontentArea(e){
    var show = e.currentTarget.dataset.show=="yes"?true:false;
    if(show){
      this.setData({ showcontentarea: false})
    }else{ this.setData({showcontentarea:true})}
    if(this.data.content==''){
      this.setData({content:'不超过100字'})
    }
  },


  //发布实验
  confirm(e) {
    //要完善信息才能发布实验
    var that =this
    if(this.data.name&&this.data.place&&this.data.time&&this.data.duration&&this.data.money&&this.data.index&&this.data.need&&this.data.content&&this.data.string_formdata&&this.data.periods.length!=0&&this.data.dates.length!=0)
    {
      //发布实验
      wx.request({
      url: appdata.serverUrl+'/insertExperiment', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        testerId: wx.getStorageSync('id'),
        type:that.data.picker[that.data.index],
        name:that.data.name,
        content:that.data.content,
        duration:that.data.duration,
        reward:that.data.money,
        place:that.data.place,
        requirement:that.data.need,
        time:that.data.time,
        sendTimestamp:parseInt(new Date().getTime() / 1000),
        pageView:0,
        enrollment:0,
        totalLikes:0,
        tag:that.data.my_labels.join(','),
        status:'招募中',
        faceUrl:appdata.userInfo.avatarUrl,
        username:'暂定',
        timePeriods:JSON.stringify(that.data.formdata)
      },
      success(res) {
        console.log(res.data)
        if(res.data.code==1)
        {
          wx.$showtoast('发布成功！','success')
        }
        else{
          wx.$showtoast('发布失败，请检查网络！')
        }
      },
      fail(res) {
        wx.showToast({
          title: '网络出现异常了~',
          icon: 'none'
        })
      }
    })
    }
    else{
      wx.$showtoast('请完善相关信息')
    }
  },
  //上传报名表
  uploadform(){
    this.data.string_formdata=JSON.stringify(this.data.formdata)
    console.log(JSON.stringify(this.data.formdata))
    wx.showToast({
      title: '上传成功！',
    })
  },
  //选择删除时间
  selected(e) {
    var date = e.currentTarget.dataset.date;
    var index = e.currentTarget.dataset.index;
    var _formdata = this.data.formdata;
    _formdata[index][date] = !_formdata[index][date]
    this.setData({
      formdata: _formdata
    })
  },
  //关闭生成框
  onclosecreate(){
    this.setData({
      createformshow:false
    })
  },
  //生成时间表格
  createform() {
    if (this.data.periods.length === 0) {
      wx.showToast({
        title: '请先添加时间段~',
        icon: 'none'
      })
      return;
    }
    if(this.data.dates.length===0)
    {
      wx.showToast({
        title: '请先选择日期~',
        icon: 'none'
      })
      return;
    }
    var D=[]
    var _dates2=['时间段\\日期']
    //格式化日期
    for (var i = 0; i < this.data.dates.length; i++) {
      date = new Date(this.data.dates[i]);
      var d=`${date.getMonth() + 1}月${date.getDate()}日`
      D.push(d)
      _dates2.push(d)
    }
    var _formdata = []; //表单数据
    for (var j = 0; j < this.data.periods.length; j++) {
      let obj = {};
      for (var i = 0; i < _dates2.length; i++) {
        if (i == 0) {
          obj.period = this.data.periods[j]
        } else {
          var date = _dates2[i]
          obj[date] = true
        }
      }
      _formdata.push(obj)
    }
    this.setData({
      formdata: _formdata,
      Dates:D,
      dates2:_dates2,
      createformshow:true
    })
  },
  //删除选中的时间段
  deletetime() {
    if (this.data.result.length === 0) {
      wx.showToast({
        title: '请选择要删除的时段！',
        icon: 'none'
      })
      return;
    }
    var _periods = this.data.periods
    this.data.result.forEach(
      (item) => {
        console.log(item)
        var _index = _periods.indexOf(item)
        console.log(_index)
        _periods.splice(_index, 1)
      }
    )
    this.setData({
      periods: _periods,
      result: []
    })
    wx.showToast({
      title: '删除成功！',
    })
  },
  //点击选择时间时间段
  onChange(event) {
    this.setData({
      result: event.detail
    });
  },
  toggle(event) {
    const {
      index
    } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  noop() {},
  //添加时间段
  addperiod() {
    var hour1 = Number(this.data.starttime.substr(0, 2))
    var hour2 = Number(this.data.endtime.substr(0, 2))
    if (hour1 > hour2) {
      wx.showToast({
        title: '起始时间要小于结束时间哦~',
        icon: 'none'
      })
      return;
    } else if (hour1 === hour2) {
      var minute1 = Number(this.data.starttime.substr(-2, 2))
      var minute2 = Number(this.data.endtime.substr(-2, 2))
      if (minute1 >= minute2) {
        wx.showToast({
          title: '起始时间要小于结束时间哦~',
          icon: 'none'
        })
        return;
      }
    }
    var _periods = this.data.periods;
    var str = this.data.starttime + ' ~ ' + this.data.endtime //时间段字符串
    if (this.data.periods.indexOf(str) != -1) {
      wx.showToast({
        title: '已存在改时间段，请重新选择！',
        icon: 'none'
      })
      return;
    }
    _periods.push(str)
    this.setData({
      periods: _periods
    })
    wx.showToast({
      title: '添加成功！',
    })
  },
  //选择结束时间
  endTimeChange(e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  //选择起始时间
  startTimeChange(e) {
    this.setData({
      starttime: e.detail.value
    })
  },
  //关闭添加时段的面板
  on_close() {
    this.setData({
      addperiod_show: false
    })
  },
  //添加时段
  addtime() {
    this.setData({
      addperiod_show: true
    })
  },
  ondisplay() {
    this.setData({
      showcale: true
    });
  },
  //关闭日历
  onclose() {
    this.setData({
      showcale: false
    });
  },
  //确认选择日历
  onConfirm(event) {
    console.log(event.detail)
    this.data.dates = event.detail
    var str = ''
    for (var i = 0; i < event.detail.length; i++) {
      str += this.formatDate(event.detail[i]) + ' '
    }
    this.setData({
      showcale: false,
      caletext: str,
    });
  },
  //格式化日期
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  //添加标签
  addlabel() {
    if (!this.data.addlabel) {
      wx.showToast({
        title: '标签不能为空哦~',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    else if(this.data.my_labels.indexOf(this.data.addlabel)!=-1)
    {
      wx.showToast({
        title: '已经添加了该标签哦~',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    else if (this.data.my_labels.length >= 6) {
      wx.showToast({
        title: '最多能添加6个标签哦~',
        icon: 'none',
        duration: 1000
      })
    } else {
      var _my_labels = this.data.my_labels;
      _my_labels.push(this.data.addlabel);
      this.setData({
        my_labels: _my_labels,
        addlabel: null
      })
      wx.showToast({
        title: '添加成功！',
        duration: 1000
      })
    }

  },
  //点击常见标签
  getcm_label(e) {
    console.log(e)
    this.setData({
      addlabel: e.target.dataset.label
    })
  },
  //获取输入的标签
  getlabel(e) {
    this.data.addlabel = e.detail
  },
  //添加标签
  addmore() {
    this.setData({
      show: true
    })
  },
  //关闭添加标签的面板
  onClose() {
    this.setData({
      show: false
    })
  },
  //删除标签
  delete(e) {
    var index = e.target.dataset.index
    var _my_labels = this.data.my_labels;
    _my_labels.splice(index, 1);
    this.setData({
      my_labels: _my_labels
    })
    wx.showToast({
      title: '删除成功！',
    })
  },
  //耗时
  gettime(e) {
    this.data.time = e.detail
  },
  //实验时
  gettest_time(e) {
    this.data.duration = e.detail.value
  },
  //报酬
  getmoney(e) {
    this.data.money = e.detail.value
  },
  //实验地点
  getplace(e) {
    this.data.place = e.detail
  },

  //获取实验名称
  getname(e) {
    this.data.name = e.detail;
  },
  //选择类型
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(JSON.stringify(options)!='{}')
    {
      var id=options.test_id//获取编辑实验的id
      console.log('编辑实验id为'+id)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //让其他组件先渲染完再去加载日历组件
    this.setData({
      show_vancale:true
    })
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