App({
  // 小程序初始化完成 全局只触发一次
  onLaunch: function () {
    // 
    const vm = this
    wx.getSystemInfo({
      success: function (res) {
        console.log('--------------获取系统信息，获取屏幕高度---------------')
       // console.log(res)
        let totalTopHeight = 68
        if (res.model.indexOf('iPhone X') !== -1) {
          totalTopHeight = 88
        } else if (res.model.indexOf('iPhone') !== -1) {
          totalTopHeight = 64
        }
        vm.globalData.statusBarHeight = res.statusBarHeight
        vm.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
        
      },
      failure() {
        vm.globalData.statusBarHeight = 0
        vm.globalData.titleBarHeight = 0
      }
    })
  },
  onShow:function(objects){
    // 小程序初始化完成后，监听小程序显示 从后台进去前台 触发
    // 
   
   // console.log(objects)
      

  },
  onHide:function(){
    // 小程序从前台进入后台 触发
  },
  globalData:{
    statusBarHeight: 0,
    titleBarHeight: 0,
    pushsettingsdata:{
      input1:'',
      input2:'',
      input3:'',
      input4:'',
      input5:'',
      input6:''
    }
  }
 
})

 