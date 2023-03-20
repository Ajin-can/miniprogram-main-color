Page({
  onReady() {
    this.mainColor = this.selectComponent('#mainColor')
    this.mainColor.get('../../images/205164915.jpg').then(rgb => {
      console.log(rgb)
      this.setData({
        rgb
      })
    })
  }
})