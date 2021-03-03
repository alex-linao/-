Component({
  properties: {
    rate: {
      type: Number,
      value: 0
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    rateList: ['极差', '较差', '一般', '不错','很棒'],
    actived: -1
  },

  methods: {
    handleClick(e) {
      if(this.data.disabled) return

      let rate = e.currentTarget.dataset.index
      this.setData({
        actived: -1
      })

      setTimeout(() => {
        this.setData({
          rate,
          actived: Math.floor((rate -1)/2)
        })
      }, 20)

      this.triggerEvent('change', {
        rate
      })
    },
  }
})