// pages/signin/signin.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    peojextdeataildata: '',
    articleid:'',
    contenststr:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that= this;
    // 项目 id
    that.setData({
      articleid: options.articleid
    })
// //加载项目详情
  wx.request({
    data:{
      articleId: options.articleid, 
      userId: wx.getStorageSync("userId")
    },
    url: 'https://91jober.com/user/article3/findProjectById3',
    success:function(res){
      wx.hideLoading();
      if (res.data.data.article[0].files.length != 0){
        wx.setStorageSync("failurl", res.data.data.article[0].files[0].fileurl);
      }
      var contentstr = res.data.data.article[0].detailedRles[0].content;
      wx.setStorageSync("artical", res.data.data.article[0].href);
      that.setData({
        peojextdeataildata: res.data,
        contenststr: contentstr.replace(/\<br>/g, '\n')
      })
    },
    fail: function () {
      wx.showToast({
        title: '网络出错！',
        icon: 'none',
        duration: 2000
      })
    }
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    }),
      wx.navigateTo({
        url: '../viewpush/viewpush'　　
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

  },
  // 返回上一页
  goto:function(){
    // wx.switchTab({
    //   url: '../viewpush/viewpush'　　
    // })
    wx.navigateBack({});
  }
})