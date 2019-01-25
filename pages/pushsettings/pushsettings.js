// pages/signin/signin.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        url: '../../index/index'　　// 页面 A
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
  // 
  goto:function(){
    // wx.switchTab({
    //   url: '../signin/signin'　　
    // })
    wx.navigateBack();
  },
    // 表单提交事件
formSubmit(e){
  wx.showLoading({
    title: '正在设置',
    mask: true
  })
  // console.log("发生submit事件，携带参数为：" + e.detail.value.input1 + e.detail.value.input2 + e.detail.value.input3)
  // getApp().globalData.pushsettingsdata.input1 = e.detail.value.input1;
  // getApp().globalData.pushsettingsdata.input2 = e.detail.value.input2;
  // getApp().globalData.pushsettingsdata.input3 = e.detail.value.input3;
  // getApp().globalData.pushsettingsdata.input4 = e.detail.value.input4;
  // getApp().globalData.pushsettingsdata.input5 = e.detail.value.input5;
  // getApp().globalData.pushsettingsdata.input6 = e.detail.value.input6;
  wx.request({
    data: {
      userId: wx.getStorageSync("userId"),
      search1: e.detail.value.input1,
      search2: e.detail.value.input2,
      search3: e.detail.value.input3,
      search4: e.detail.value.input4,
      search5: e.detail.value.input5,
      search6: e.detail.value.input6
    },
    url: 'https://91jober.com/user/push3/findPushTwo3',
    success: function (res) {
      wx.hideLoading()
      if (res.data.resultcode == 1002) {
        //成功
        wx.showLoading({
          title: '设置成功',
        })
        setTimeout(function () {
          wx.hideLoading()
          wx.switchTab({
            url: '../signin/signin'
          })
        }, 1500)
      } else {
        //失败
        wx.showLoading({
          title: '推送失败',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1500)
      }

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
//表单重置事件 
formReset(e){
console.log("发生表单重置事件")
}
})