//显示加载
wx.$showloading=function (title='')
{
  wx.showLoading({
    title: title,
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 500)
}
//显示提示框
wx.$showtoast=function(title,icon='')
{
  wx.showToast({
    title: title,
    icon:icon
  })
}