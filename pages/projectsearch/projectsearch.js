// pages/signin/signin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plVlue:'项目名称模糊搜索',
    projectlistdata: '',
    detailvalue: '', //搜索内容
    pagecurrent: 1,
    usid:0,
    projectRegionCity:'宜宾',
    projectRegionLogo:'yibing_icon_2.png',
    citydata: [{
      "projectRegion": "宜宾",
      "userid": "0",
      "pagecurrent": 1,
      "pagesize": 10,
      "logo": "yibing_icon_2.png",
      "logoshow":"yibing_icon_1.png"
    },
    {
      "projectRegion": "内江",
      "userid": "1",
      "pagecurrent": 1,
      "pagesize": 10,
      "logo": "neijiang_icon_2.png",
      "logoshow": "neijiang_icon_1.png"
    },
    {
      "projectRegion": "自贡",
      "userid": "2",
      "pagecurrent": 1,
      "pagesize": 10,
      "logo": "zigong_icon_2.png",
      "logoshow": "zigong_icon_1.png"
    },
    {
      "projectRegion": "泸州",
      "userid": "3",
      "pagecurrent": 1,
      "pagesize": 10,
      "logo": "luzhou_icon_2.png",
      "logoshow": "luzhou_icon_1.png"
    },
    {
      "projectRegion": "乐山",
      "userid": "4",
      "pagecurrent": 1,
      "pagesize": 10,
      "logo":"leshan_icon_2.png",
      "logoshow": "leshan_icon_1.png"
    }
    ]
  },
  onFocus: function (e) {
    this.setData({
      plVlue: " "
    })
  },
  onBlur: function (e) {
    this.setData({
      plVlue: "项目名称模糊搜索"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      data: {
        userId: wx.getStorageSync("userId"),
        projectRegion: '宜宾',
        search: '四川',
        pagecurrent: 1
      },
      url: 'https://91jober.com/user/article3/findProjectTwo3',
      success: function (res) {
        wx.hideLoading();
        that.setData({
          projectlistdata: res.data,
          projectRegionCity: '宜宾',
          detailvalue: '',
        })
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
    // that.requestsearch(that.detailvalue);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    that.data.pagecurrent++;
    console.log(that.data.detailvalue,wx.getStorageSync("userId"))
    if (that.data.detailvalue.length != 0){
      wx.request({
        data: {
          userId: wx.getStorageSync("userId"),
         search: that.data.detailvalue,
          pagecurrent: that.data.pagecurrent,
          // projectRegion: that.data.projectRegionCity
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
    } else if (that.data.projectRegionCity.length != 0){
      wx.request({
        data: {
          userId: wx.getStorageSync("userId"),
          // search: that.data.detailvalue,
          pagecurrent: that.data.pagecurrent,
          projectRegion: that.data.projectRegionCity
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
    }
    
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
    console.log(event.detail.value.length)
    var that = this;
    if (event.detail.value.length != 0){
      that.setData({
        detailvalue: event.detail.value,
        projectRegionCity:''
      })
      that.requestsearch(event.detail.value, 1);
    }
  },
  //封装请求
  requestsearch: function(search, pagecurrent) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      data: {
        userId: wx.getStorageSync("userId"),
        search: search,
        pagecurrent: pagecurrent,
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
//点击城市请求
  cityclick: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that =this;
    // console.log(e.currentTarget.dataset.uid)
    wx.request({
      data: {
        userId: wx.getStorageSync("userId"),
        projectRegion: e.currentTarget.dataset.projectregion,
        search: '四川',
        pagecurrent: 1
      },
      url: 'https://91jober.com/user/article3/findProjectTwo3',
      success: function (res) {
        wx.hideLoading();
        that.setData({
          projectlistdata: res.data,
          projectRegionCity: e.currentTarget.dataset.projectregion,
          detailvalue: '',
          usid: e.currentTarget.dataset.uid
        })
      },
      fail: function () {
        wx.showToast({
          title: '网络出错啦！',
          icon: 'none',
          duration: 1000
        })
      }
    })
  }
})