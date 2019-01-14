// pages/signin/signin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectlistdata: '',
    detailvalue: '', //搜索内容
    pagecurrent: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({

    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const vm = this
    vm.setData({
        statusBarHeight: getApp().globalData.statusBarHeight,
        titleBarHeight: getApp().globalData.titleBarHeight
      }),
      wx.navigateTo({
        url: '../../index/index'　　 // 页面 A
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    that.requestsearch(that.detailvalue);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    that.data.pagecurrent++;
    wx.request({
      data: {
        userId: wx.getStorageSync("userId"),
        search: that.data.detailvalue,
        pagecurrent: that.data.pagecurrent,
      },
      url: 'https://91jober.com/user/article3/findProjectTwo3',
      success: function(res) {
        if (res.data.resultcode == 1002) {
          //成功
          wx.hideLoading();
          // var arrpush = that.data.project.data.onlyRegion;
          var listpush = res.data.data.onlyRegion;
          for (var i = 0; i < listpush.length; i++) {
            that.data.projectlistdata.data.onlyRegion.push(listpush[i])
          }
          that.setData({
            projectlistdata: that.data.projectlistdata,
          })
          //  console.log(that.data.project)
        } else {
          //失败
          wx.showLoading({
            title: '加载失败',
          })
          setTimeout(function() {
            wx.hideLoading()
          }, 1500)
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 
  goto: function() {
    wx.switchTab({
      url: '../../index/index'　　
    })

  },
  // 表单提交事件
  formSubmit(e) {
    console.log("发生submit事件，携带参数为：" + e.detail.value.input1 + e.detail.value.input2 + e.detail.value.input3)

  },
  //表单重置事件 
  formReset(e) {
    console.log("发生表单重置事件")
  },
  //搜索 离开焦点 及 点击用户点击确认时
  blurvalue: function(event) {
    var that = this;
    that.setData({
      detailvalue: event.detail.value
    })
    that.requestsearch(event.detail.value, 1);
  },
  // confirmvalue:function(event){
  //   var that = this;
  //   that.setData({
  //     detailvalue: event.detail.value
  //   })
  //   that.requestsearch(event.detail.value);
  // },
  //封装请求
  requestsearch: function(search, pagecurrent) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      data: {
        userId: wx.getStorageSync("userId"),
        search: search,
        pagecurrent: pagecurrent,
        // pagesize: 10,
        // projectRegion: null,
      },
      url: 'https://91jober.com/user/article3/findProjectTwo3',
      success: function(res) {
        if (res.data.resultcode == 1002) {
          //成功
          wx.hideLoading();
          that.setData({
            projectlistdata: res.data
          })
        } else {
          //失败
          wx.showLoading({
            title: '加载失败',
          })
          setTimeout(function() {
            wx.hideLoading()
          }, 1500)
        }

        console.log(res)
      }
    })
  },
  // 跳转项目详情页面
  gotoprojectdetail: function(e) {
    console.log(e.currentTarget.dataset.articleid)
    wx.navigateTo({
      url: '../projectdetail/projectdetail?articleid=' + e.currentTarget.dataset.articleid
    })
  },
})