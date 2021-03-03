Component({
  properties: {
    rate: {
      type: Number,
      value: 0,
      observer: function (val) { // 数据改变时调用的方法
        let percent = Math.round((val / 2) % 1 * 100)
        let fullCount = Math.floor(val / 2)
        this.setData({
          percent,
          fullCount
        })
      }
    },
    size: {
      type: String,
      value: 'mini'
    }
  },
  date: {
    percent: 0,
    fullCount: 0
  }
})