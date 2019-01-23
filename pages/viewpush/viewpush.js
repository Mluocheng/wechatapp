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
    that.requestfunction();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    that.data.pagecurrent++;
    wx.request({
      data: {
        userId: wx.getStorageSync("userId"),
      },
      url: 'https://91jober.com/user/article3/findProjectTwo3',
      success: function (res) {
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
          setTimeout(function () {
            wx.hideLoading()
          }, 1500)
        }
      }
    })
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
    var that = this;
    wx.request({
      data: {
        userId: wx.getStorageSync("userId")
      },
      url: 'https://91jober.com/user/push3/findPushTwo3',
      success: function (res) {
        res.data = {
          "resultType": true,
          "resultcode": 1002,
          "data": {
            "onlyRegion": [
              {
                "pushTime": "2018-07-11",
                "pushList": [
                  {
                    "id": "e6b45500-348d-41d2-be88-fe48f8dba52d",
                    "title": "雅安市名山区永兴镇名山河防洪治理工程",
                    "name": null,
                    "description": null,
                    "keywords": null,
                    "digest": null,
                    "thumbnail": null,
                    "pcContent": null,
                    "type": null,
                    "state": null,
                    "author": null,
                    "createTime": null,
                    "updateTime": null,
                    "href": null,
                    "url": null,
                    "regionLable": null,
                    "projectFunds": "200",
                    "quaRequirement": "水利水电工程施工总承包,三级资质标准",
                    "projectRegion": null,
                    "applyStartDate": null,
                    "applyEndDate": "2018-08-02",
                    "isPush": 0,
                    "accessory": null,
                    "quaType": null,
                    "pushTime": "2018-07-11",
                    "detailedRles": null,
                    "documents": null,
                    "isCollect": 1016,
                    "isCorrect": false
                  }]
              }, {
                "pushTime": "2018-07-11",
                "pushList": [
                  {
                    "id": "e6b45500-348d-41d2-be88-fe48f8dba52d",
                    "title": "雅安市名山区永兴镇名山河防洪治理工程",
                    "name": null,
                    "description": null,
                    "keywords": null,
                    "digest": null,
                    "thumbnail": null,
                    "pcContent": null,
                    "type": null,
                    "state": null,
                    "author": null,
                    "createTime": null,
                    "updateTime": null,
                    "href": null,
                    "url": null,
                    "regionLable": null,
                    "projectFunds": "200",
                    "quaRequirement": "水利水电工程施工总承包,三级资质标准",
                    "projectRegion": null,
                    "applyStartDate": null,
                    "applyEndDate": "2018-08-02",
                    "isPush": 0,
                    "accessory": null,
                    "quaType": null,
                    "pushTime": "2018-07-11",
                    "detailedRles": null,
                    "documents": null,
                    "isCollect": 1016,
                    "isCorrect": false
                  }, {
                    "id": "e6b45500-348d-41d2-be88-fe48f8dba52d",
                    "title": "雅安市名山区永兴镇名山河防洪治理工程",
                    "name": null,
                    "description": null,
                    "keywords": null,
                    "digest": null,
                    "thumbnail": null,
                    "pcContent": null,
                    "type": null,
                    "state": null,
                    "author": null,
                    "createTime": null,
                    "updateTime": null,
                    "href": null,
                    "url": null,
                    "regionLable": null,
                    "projectFunds": "200",
                    "quaRequirement": "水利水电工程施工总承包,三级资质标准",
                    "projectRegion": null,
                    "applyStartDate": null,
                    "applyEndDate": "2018-08-02",
                    "isPush": 0,
                    "accessory": null,
                    "quaType": null,
                    "pushTime": "2018-07-11",
                    "detailedRles": null,
                    "documents": null,
                    "isCollect": 1016,
                    "isCorrect": true
                  }]
              }],
            "msg": "请求成功"
          }
        }

        if (res.data.resultcode == 1002) {
          //成功
          wx.hideLoading();
          that.setData({
            projectlistdata: res.data
          })
          console.log(res.data.data.onlyRegion == null)
          if (res.data.data.onlyRegion == null){
            wx.setStorageSync("showcontent", true)
          }
        }else{
          //失败
          wx.showLoading({
            title: '加载失败',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1500)
        }
        
      }
    })
  }
})