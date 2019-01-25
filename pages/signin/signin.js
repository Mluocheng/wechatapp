// pages/signin/signin.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttonClicked:false,
    // 手机号输入框
    hiddenmodalput: true,
    ajxtrue: false,
    currentTime: 61,
    text: '获取验证码',
    disabled: false, //按钮是否禁用
    phone: '', //用户输入的手机号
    blurvercode: '', //验证码
    jscode: '', //jscode
    clearsession:false,
    // 用户个人信息
    userInfo: {
      avatarUrl: "",
      nickName: ""
    },
  },
  globalData: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this
    that.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight,
      btn_show: wx.getStorageSync("btn_show"),
      aurl: wx.getStorageSync('avatUrl'), 
      aname: wx.getStorageSync('niName')
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() { 
    this.setData({
      btn_show: wx.getStorageSync("btn_show"),
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

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  buttonclick:function(self){
    self.setData({
      buttonClicked:true,
    })
    setTimeout(function(){
      self.setData({
        buttonClicked: false,
      })
    },2000)
  },
  // 登录按钮 获取用户头像 昵称
  userinfoclick: function(detail) {
    var that = this;
    that.buttonclick(this);
    wx.showModal({
      title: '授权登录',
      content: '授权登录获取更多功能哦！',
      success: function(res) {
        // 用户头像昵称
        if (res.confirm) {
          wx.showLoading({});
          wx.login({
            success: function(res) {
              that.setData({
                jscode: res.code
              })
              console.log("code="+res.code)
              // wx.setStorageSync("rescode", res.code);
              wx.request({
                data: {
                  code: res.code
                },
                method: 'GET',
                url: 'https://91jober.com/user/wechat/login',
                success: function(res) {
                  wx.hideLoading()
                  console.log("userid=" + res.data.userId)
                  //缓存userId
                  wx.setStorageSync('userId', res.data.userId)
                  wx.setStorageSync('sessionId', res.data.sessionId)
                  // 判断是否是 首次登录
                  if (res.data.status == 0){
                    that.setData({
                      hiddenmodalput: false
                    })
                  } else {
                     console.log("已绑定登录")
                    wx.getUserInfo({
                      success: function(res) {
                        wx.setStorageSync('avatUrl', res.userInfo.avatarUrl)
                        wx.setStorageSync('niName', res.userInfo.nickName) 
                        wx.setStorageSync("btn_show", true);
                        var avatarUrl = 'userInfo.avatarUrl';
                        var nickName = 'userInfo.nickName'; 
                        that.setData({ 
                          btn_show: true,
                          [avatarUrl]: res.userInfo.avatarUrl,
                          [nickName]: res.userInfo.nickName,
                        })
                      }
                    })
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
            }
          })
        } else if (res.cancel) {
          that.setData({
            hiddenmodalput: true
          })
          console.log('用户点击取消')
        }
      }
    })
  },
  // 退出 登录
  signout: function() {
    var that = this;
    wx.showModal({
      title: '退出登录',
      content: '退出后将不能及时接受新资讯，确定退出吗？',
      success: function(res) {
        if (res.confirm) { //这里是点击了确定以后
          wx.setStorageSync("btn_show", false)
          // console.log('用户点击确定')
          wx.getUserInfo({
            success: function(res) {
              // console.log(res);
              var avatarUrl = 'userInfo.avatarUrl';
              var nickName = 'userInfo.nickName';
              that.setData({
                btn_show: false,
                [avatarUrl]: ' ',
                [nickName]: '游客',
              })
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
  //  clearstorage 清理缓存
  clearstor:function(){
    var that = this;
    this.setData({
      clearsession: true
    })
  },
  clearstorage: function() {
    var that =this;
    this.setData({
      clearsession:false
    })
    wx.showModal({
      title: '温馨提示',
      content: '可能需要一点时间，请耐心等待~',
      showCancel:'false',
      confirmText:'确定',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '正在清理',
            icon: 'loading',
            duration: 5000,
            mask: true,
            complete: function () {
              setTimeout(function () {
                wx.showToast({
                  title: '清理成功',
                  icon: 'success',
                  mask: true
                })
              }, 3000)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },
  outclearbox:function(){
    console.log('stop user scroll it!');
    return;
  },
  // 
  gotosetting: function() {
    if (wx.getStorageSync("btn_show") == true){
      wx.navigateTo({
        url: '../pushsettings/pushsettings',
      })
    }else{
      wx.showToast({
        title: '您还没有登录哦！',
        icon:'none',
        duration: 1000
      })
    } 
    
  },
  gotohelp: function() {
    wx.navigateTo({
      url: '../gotohelp/gotohelp',
    })
  },

  // 手机号验证
  blurPhone: function(e) {
    // var phone = e.detail.value;
    this.setData({
      phone: e.detail.value
    })
    // console.log(e.detail.value)
    let that = this
    if (!(/^1[34578]\d{9}$/.test(e.detail.value))) {
      this.setData({
        ajxtrue: false
      })
    } else {
      this.setData({
        ajxtrue: true
      })
    }
  },
  //验证码按钮
  bindButtonTap: function() {
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })
    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    // console.log(phone,currentTime)
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    if (phone == '') {
      warn = "号码不能为空";
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "手机号格式不正确";
    } else {
      wx.request({
        url: 'https://91jober.com/user/test/findCode',
        method: 'get',
        data: {
          phoneNum: that.data.phone 
        },
        success: function(res) {
          if (res.data.state == 1) {
            console.log("发送成功")
            //当手机号正确的时候提示用户短信验证码已经发送
            wx.showToast({
              title: '短信验证码已发送',
              icon: 'none',
              duration: 2000
            });
          } else {
            wx.showToast({
              title: '验证码发送失败',
              icon: 'none',
              mask: true
            })
          }
        },
        fail: function(res) {
          wx.showToast({
            title: '验证码发送失败',
            icon: 'none',
            mask: true
          })
        }
      })

      //设置一分钟的倒计时
      var interval = setInterval(function() {
        currentTime--; //每执行一次让倒计时秒数减一
        that.setData({
          text: currentTime + 's', //按钮文字变成倒计时对应秒数
        })
        if (currentTime <= 0) { 
          clearInterval(interval)
          that.setData({
            text: '重新发送',
            currentTime: 61,
            disabled: false,
            color: '#929fff'
          })
        }
      }, 1000);
    };
    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    if (warn != null) {
      wx.showToast({
        title: warn,
        icon: 'none',
        duration: 1000
      });
      that.setData({
        disabled: false,
        color: '#929fff'
      })
      return;
    };
  },
  //输入验证码
  blurVercode: function(e) {
    this.setData({
      blurvercode: e.detail.value
    })
  },
  //  open-type='getPhoneNumber' 获取手机号
  getPhoneNumber(e) {
    wx.login({
      success: function(res) {
        console.log(res.code)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  //modal 取消按钮  
  cancel: function() {
    var that = this;
    wx.setStorageSync("btn_show", false)
    var nickName = 'userInfo.nickName';
    that.setData({
      hiddenmodalput: true,
      btn_show: false,
      avatarUrl: ' ',
      [nickName]: '昵称'
    })

    // that.signout();
  },
  //确认  
  confirm: function(event) {
    let that = this
    //验证验证码
    wx.request({
      data: {
      //  code: that.data.jscode,
        phone: that.data.phone,
        sendCode: that.data.blurvercode
      },
      header: {
        "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
      },
      url: 'https://91jober.com/user/wechat/bindphone',
      success: function(res) {
        console.log("userid=" + res.data.userId)
        //缓存userId
        wx.setStorageSync('userId', res.data.userId)
        if (res.data.state == 1) {
          wx.showToast({
            title: '绑定成功',
            icon: 'none',
            mask: true
          })
          that.setData({
            hiddenmodalput: true
          })
          // 头像昵称
          wx.getUserInfo({
            success: function(res) {
              //  btn_show   
              wx.setStorageSync("btn_show", true);
              // console.log(res);
              var avatarUrl = 'userInfo.avatarUrl';
              var nickName = 'userInfo.nickName';
              that.setData({
                btn_show: true,
                [avatarUrl]: res.userInfo.avatarUrl,
                [nickName]: res.userInfo.nickName,
              })
            }
          })
        } else {
          wx.showToast({
            title: '验证出错',
            icon: 'none',
            mask: true
          })
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

  }
})