import {
  report
} from '../../../api/api'

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    showCancelButton: {
      type: Boolean,
      value: true
    },
    id: Number, // 被举报的ID
    type: String // 举报的类型（评论、视频等）
  },

  data: {
    loading: false,
    reason: 0, // 举报原因
    confirmDisabled: true,
    reasons: [{
      name: '内容低俗',
      reason: 1
    }, {
      name: '广告营销',
      reason: 2
    }, {
      name: '内容侵权',
      reason: 3
    }, {
      name: '其它',
      reason: 4
    }]
  },

  ready() {
    this.$toast = this.selectComponent("#toast")
  },

  methods: {
    chosenReport(e) {
      let reason = parseInt(e.currentTarget.dataset.reason)
      this.setData({
        reason: reason,
        confirmDisabled: false
      })
    },

    async onSubmit(e) {
      if(this.data.loading) return

      this.setData({
        loading: true
      })

      let id = this.data.id
      if (!id) {
        this.$toast.showToast('')
        return
      }

      let params = {
        type: this.data.type,
        reason: this.data.reason
      }
      let res = await report(id, {
        params
      })
      this.setData({
        loading: false
      })
      this.triggerEvent('onClose')

      this.$toast.showToast('感谢您的反馈')
    }
  }
})