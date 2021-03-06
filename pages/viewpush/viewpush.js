// pages/viewpush/viewpush.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    projectlistdata: '',
    pagecurrent:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      btn_show: wx.getStorageSync("btn_show"),
      showcontent: wx.getStorageSync("showcontent")
    })
    //请求
    that.requestfunction();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (options) {
    console.log(options)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    //请求
    // that.requestfunction();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // wx.showLoading({
    //   title: '加载中',
    //   mask:true
    // })
    // var that = this;
    // that.data.pagecurrent++;
    // wx.request({
    //   data: {
    //     userId: wx.getStorageSync("userId"),
    //   },
    //   url: 'https://91jober.com/user/push3/findPushTwo3',
    //   success: function (res) {
    //     if (res.data.resultcode == 1002) {
    //       //成功
    //       wx.hideLoading();
    //       // var arrpush = that.data.project.data.onlyRegion;
    //         wx.setStorageSync("nothing", false);
    //         var listpush = res.data.data.onlyRegion;
    //         for (var i = 0; i < listpush.length; i++) {
    //           that.data.projectlistdata.data.onlyRegion.push(listpush[i])
    //         }
    //         that.setData({
    //           projectlistdata: that.data.projectlistdata,
    //           nothing: wx.getStorageInfoSync("nothing")
    //         })
          
         
    //       //  console.log(that.data.project)
    //     } else {
    //       //失败
    //       wx.showToast({
    //         title: '加载失败',
    //         icon: 'none',
    //         duration: 1500
    //       });
    //     }
    //   }
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 项目详情
  projectlistclick: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../projectdetail/projectdetail?articleid=' + e.currentTarget.dataset.articleid
    })
  },
  //封装请求
  requestfunction:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      data: {
        userId: wx.getStorageSync("userId")
      },
      url: 'https://91jober.com/user/push3/findPushTwo3',
      success: function (res) {
        wx.hideLoading();
        if (res.data.resultcode == 1002) {
          //成功
          wx.hideLoading();
          that.setData({
            projectlistdata: res.data
          })
          // console.log(res.data.data.onlyRegion.length)
          // if (res.data.data.onlyRegion.length == 0){
          //   console.log("null")
          //   wx.setStorageSync("showcontent", true)
          // }
        }else{
          //失败
          wx.showLoading({
            title: '加载失败',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1500)
        }
        
      },
      fail:function(){
        wx.showToast({
          title: '网络出错！',
          icon: 'none',
          duration: 2000
        })
      }
      
    })
  }
})