let timer = null

Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    duration: {
      type: Number,
      value: 1200
    }
  },

  data: {
    isShow: false,
  },

  methods: {
    hideToast() {
      this.setData({
        isShow: false
      })
    },

    showToast(title) {
      this.setData({
        isShow: true,
        title
      })

      clearTimeout(timer)
      timer = setTimeout(() => {
        this.hideToast()
      }, this.data.duration)
    },
  }
})
