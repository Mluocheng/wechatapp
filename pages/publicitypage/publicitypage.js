// pages/signin/signin.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      imgsrc: option.imgsrc
    })
    console.log(this.data.imgsrc)
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
    wx.switchTab({
      url: '../../index/index'　　
    })
  
  },
    // 表单提交事件
formSubmit(e){
  console.log("发生submit事件，携带参数为：" + e.detail.value.input1 + e.detail.value.input2 + e.detail.value.input3)
   

},
//表单重置事件 
formReset(e){
console.log("发生表单重置事件")
}
})