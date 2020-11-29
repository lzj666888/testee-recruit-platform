// components/getauth/getauth.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show_getuserinfo: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    radio:'本科生'
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
      //切换身份选择
      onChange(event) {
        this.setData({
          radio: event.detail,
        });
      },
    bindGetUserInfo(e) {
      console.log(e.detail.userInfo)
      var obj=e.detail.userInfo
      this.triggerEvent('getuser',{...obj});
    },
    onClose() {
      this.setData({
        show_getuserinfo: false
      });
    },
  }
})