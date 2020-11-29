wx.$showloading=function (title='')
{
  wx.showLoading({
    title: title,
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 500)
}