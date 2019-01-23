Page({
  data: {
    indicatorDots: false,
    duration: 1000,
    toView: 'red',
    scrollTop: 100,
    imgUrlsindex: '',
    swiperCurrent: 0,
  },
  // 监听页面加载
  onLoad: function() {
    var that = this;
    
  },
  // 监听页面显示
  onShow: function() {
    this.setData({
      btn_show: wx.getStorageSync("btn_show")
    })
     
  },
  // 监听页面初次渲染完成
  onReady: function() {},
  // 监听页面隐藏 
  onHide: function() {},
  // 监听页面卸载
  onUnload: function() {},
  // 监听页面下拉动作
  onPullDownRefresh: function() {},
  // 监听页面上拉触底事件处理函数
  onReachBottom: function() {},
  // 用户点击右上角分享 转发
  onShareAppMessage: function(res) {
    return {
      title: '链筑'
    }
  },
  // 页面滚动触发事件
  onPageScroll: function() {},
  // 页面尺寸改变时触发
  onResize: function() {},
  // 当前是tab页面点击tab时触发
  onTabItemTap: function(item) {
    console.log(item)
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },
  scroll(e) {
    console.log(e)
  },
  tap(e) {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  // 顶部 高度
  onReady: function() {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight,
    })

  },
  //获取焦点事件 
  bangfocusgoto: function() {
    wx.navigateTo({
      url: '../pages/projectsearch/projectsearch'
    })
  },
  gotosetting: function () {
    wx.navigateTo({
      url: '../pages/pushsettings/pushsettings',
    })
  },
})