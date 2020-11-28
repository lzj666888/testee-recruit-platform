// components/getauth/getauth.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //用户授权面板是否显示
    show_getuserinfo: {
      type: Boolean,
      value: false
    },
    //用户注册面板是否显示
    show_regist:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    radio:'研究生'
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取身份码
    getcode(e){
      console.log(e.detail)
    },
    //切换身份选择
    onChange(event) {
      this.setData({
        radio: event.detail,
      });
    },
    //注册
    regist(){
      this.triggerEvent('registed')
    },
    //授权
    bindGetUserInfo(e) {
      console.log(e.detail.userInfo)
      var obj=e.detail.userInfo
      this.triggerEvent('getuser',{...obj});
    },
    onClose() {
      this.setData({
        show_getuserinfo: false,
        show_regist:false
      });
    },
  }
})