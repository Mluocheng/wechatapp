Page({
  data: {
    indicatorDots: false,
    interval: 5000,
    duration: 1000,
    toView: 'red',
    scrollTop: 100,
    imgUrls: {
    },
    imgUrlsindex: '',
    swiperCurrent: 0,
    citydata: [{
        "projectRegion": "宜宾",
        "userid": "1",
        "pagecurrent": 1,
        "pagesize": 10
      },
      {
        "projectRegion": "泸州",
        "userid": "2",
        "pagecurrent": 1,
        "pagesize": 10
      },
      {
        "projectRegion": "乐山",
        "userid": "3",
        "pagecurrent": 1,
        "pagesize": 10
      },
      {
        "projectRegion": "自贡",
        "userid": "4",
        "pagecurrent": 1,
        "pagesize": 10
      },
      {
        "projectRegion": "内江",
        "userid": "5",
        "pagecurrent": 1,
        "pagesize": 10
      }
    ],
    // btn_show:false
  },
  // 监听页面加载
  onLoad: function() {
    var that = this;
    wx.request({
      data:{},
      url: 'https://91jober.com/user/banner/banners',
      success:function(res){
          // console.log(res.data)
          that.setData({
            imgUrls : res.data
          })
      }
    })
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
  // swiper 轮播切换事件
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
    // console.log(e.detail.current)
  },
  // swiper 轮播点击事件、
  swipclick: function(e) {
    console.log(this.data.swiperCurrent)
    wx.navigateTo({
      // url: '../pages/publicitypage/publicitypage?imgsrc=1'
      url:'https://91jober.com'
    })
  },
  //城市跳转详情页面
  cityclick: function(e) {
    console.log(e.currentTarget.dataset.projectregion)
    wx.navigateTo({
      url: '../pages/projectdetails/projectdetails?projectregion=' + e.currentTarget.dataset.projectregion
    })
  },
  //获取焦点事件 
  bangfocusgoto: function() {
    wx.navigateTo({
      url: '../pages/projectsearch/projectsearch'
    })
  }
})