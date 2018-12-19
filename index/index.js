const order = ['red', 'yellow', 'blue', 'green', 'red'];
 

Page({
  
  data: {
    indicatorDots: false,
    
    interval: 5000,
    duration: 1000,
    toView: 'red',
    scrollTop: 100,
    imgUrls:[
      '../images/sign_in_topbg@2x.png',
      '../images/sign_in_topbg@2x.png'
    ]
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },
  scroll(e) {
    console.log(e)
  },
  tap(e) {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})