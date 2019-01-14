// pages/signin/signin.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    project: '',
    pagecurrent: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      projectregion: options.projectregion,
    })
    wx.request({
      data: {
        userId: wx.getStorageSync("userId"),
        projectRegion: options.projectregion,
        search: '四川',
        pagecurrent: 1
      },
      url: 'https://91jober.com/user/article3/findProjectTwo3',
      success: function(res) {
        that.setData({
          project: res.data,
        })
        //   console.log(that.data.project.data.onlyRegion)
      },
      fail: function () {
        wx.showToast({
          title: '网络出错啦！',
          icon: 'fail',
          duration: 1000
        })
      }
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
    //获取用户userId
    var that = this;
    that.setData({
      userId: wx.getStorageSync("userId"),
    })
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

    wx.stopPullDownRefresh()
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
        projectRegion: that.data.projectregion,
        search: '四川',
        pagecurrent: that.data.pagecurrent
      },
      url: 'https://91jober.com/user/article3/findProjectTwo3',
      success: function(res) {
        if (res.data.resultcode == 1002) {
          //成功
          wx.hideLoading();
          // var arrpush = that.data.project.data.onlyRegion;
          var listpush = res.data.data.onlyRegion;
          for (var i = 0; i < listpush.length; i++) {
            that.data.project.data.onlyRegion.push(listpush[i])
          }
          that.setData({
            project: that.data.project,
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
      },
      fail:function(){
        wx.hideLoading();
        wx.showToast({
          title: '网络出错啦！',
          icon: 'fail',
          duration: 1000
        })
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
  // 跳转项目详情页面
  gotoprojectdetail: function(e) {
    // console.log(e.currentTarget.dataset.articleid)
    wx.navigateTo({
      url: '../projectdetail/projectdetail?articleid=' + e.currentTarget.dataset.articleid
    })
  },

})