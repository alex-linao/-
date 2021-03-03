Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    actions: {
      type: Array,
      value: []
    }
  },

  methods: {
    onSelect(e) {
      const { index } = e.currentTarget.dataset
      const item = this.data.actions[index]
      if (item && !item.disabled && !item.loading) {
        this.triggerEvent('onSelect', item)
      }
    },

    onCancel() {
      this.setData({
        show: false
      })
    }
  }
})
