Component({
  properties: {
    loading: {
      type: Boolean,
      value: false
    },
    show: {
      type: Boolean,
      value: false
    },
    confirmDisabled: {
      type: Boolean,
      value: false
    },
    confirmButtonLoading: {
      type: Boolean,
      value: false
    },
    title: String,
    message: String,
    showCancelButton: {
      type: Boolean,
      value: false
    },
    showConfirmButton: {
      type: Boolean,
      value: true
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    confirmButtonText: {
      type: String,
      value: '确认'
    }
  },

  methods: {
    onCancel() {
      this.setData({
        show: false
      })

      this.triggerEvent('onClose', '')
    },
    onSubmit(e) {
      this.triggerEvent('onSubmit', '')
    }
  }
})