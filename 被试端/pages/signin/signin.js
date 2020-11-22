// pages/signIn2/signIn2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newdaibi:0,//本次签到的代币数
    show:false,
    newSignBtnState: false,  //按钮签到状态
    myToday: '',           //今天签到的天数
    newSignNum: 0,      //签到天数
    newSignIntegral:0,  //签到积分
    //签到数组
    newSignedArr: [
      {
        "day": "一",
        "isSigned": true
      },
      {
        "day": "二",
        "isSigned": true
      },
      {
        "day": "三",
        "isSigned": false
      },
      {
        "day": "四",
        "isSigned": false
      },
      {
        "day": "五",
        "isSigned": false
      },
      {
        "day": "六",
        "isSigned": false
      },
      {
        "day": "七",
        "isSigned": false
      }
    ],

  },
//好的按钮
popup(){
  this.setData({
    show:!this.data.show
  })
},
  //-------点击签到---------
  bindSignFn(e){
    var that = this,
        newSignNum = that.data.newSignNum,
        today = that.data.myToday;
    const arr = [],
          newSignArr = [...arr, ...that.data.newSignedArr];
    //today为0时表示为周日
    today = today - 1 >= 0 ? today - 1 : 6;
    newSignArr[today].isSigned = true;//签到状态改为true
  
    //当前积分
    newSignNum++;//签到天数数目加
    var curFen = that.data.newSignIntegral + this.data.newdaibi;

    that.setData({
      newSignBtnState: true,
      show:true,
      newSignNum: newSignNum,
      newSignIntegral: curFen,
      newSignedArr: newSignArr,
    })

    // that.signAddFen();
  },

  //签到积分函数 
    //连续 天数-积分： 周三+3：周一，周二，周三（1+1+3=5）； 周六+7：周日到周六（1+1+3+1+1+1+7=15）
  signAddFen(e) {
    console.log('调用了确定代币数目加多少')
    var that = this,
        oneIsSigned = that.data.newSignedArr[0].isSigned,
        twoIsSigned = that.data.newSignedArr[1].isSigned,
        threeIsSigned = that.data.newSignedArr[2].isSigned,
        fourIsSigned = that.data.newSignedArr[3].isSigned,
        fiveIsSigned = that.data.newSignedArr[4].isSigned,
        sixIsSigned = that.data.newSignedArr[5].isSigned
         

    // 另外加分-黄色小框显示 周三+3 , 周日+7
    if (oneIsSigned && twoIsSigned && that.data.myToday == 3) {
     that.setData({
       newdaibi:3
     });//今天第三次签到加三分
    } else if (oneIsSigned && twoIsSigned && threeIsSigned && fourIsSigned && fiveIsSigned && sixIsSigned && that.data.myToday == 0) {
      that.setData({
        newdaibi:7//第七次签到
    })}
    else{
      that.setData({
        newdaibi:1
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
        myDate = new Date(),
        myToday = 3  //本次签到的下标，由服务器返回
    that.setData({
      myToday: myToday
    })
    that.signAddFen();
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