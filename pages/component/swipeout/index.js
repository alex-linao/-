function swipeDirection(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) >=
    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
}

Component({
  externalClasses: ['i-class'],
  properties: {
    actions: {
      value: [],
      type: Array,
      observer: '_updateButtonSize'
    },

    // 点击菜单时，是否收起
    unclosable: {
      value: false,
      type: Boolean
    },

    // 当此值由 false 转为 true 时，收起菜单
    toggle: {
      value: false,
      type: Boolean,
      observer: 'closeButtonGroup'
    },

    // 菜单项的总宽度
    operateWidth: {
      type: Number,
      value: 80
    }
  },

  options: {
    multipleSlots: true   // 在组件定义时的选项中启用多slot支持
  },

  data: {
    //touch start position
    touchStartP: {
      pageX: 0,
      pageY: 0
    },
    //限制滑动距离
    limitMove: 0,
    //element move position
    position: {
      pageX: 0,
      pageY: 0
    }
  },

  methods: {
    //阻止事件冒泡
    _prevent() {

    },

    // 更新按钮尺寸
    _updateButtonSize() {
      const actions = this.data.actions
      if (actions.length > 0) {
        const query = wx.createSelectorQuery().in(this)
        let limitMovePosition = 0
        actions.forEach(item => {
          limitMovePosition += item.width || 0
        })
        this.data.limitMove = limitMovePosition

      } else {
        this.data.limitMove = this.data.operateWidth
      }
    },

    handleTouchstart(event) {
      const touches = event.touches ? event.touches[0] : {}
      const touchStartP = this.data.touchStartP
      if (touches) {
        for (let i in touchStartP) {
          if (touches[i]) {
            touchStartP[i] = touches[i]
          }
        }
      }
    },

    swipper(touches) {
      const data = this.data
      const start = data.touchStartP
      const spacing = {
        pageX: touches.pageX - start.pageX,
        pageY: touches.pageY - start.pageY
      }
      if (data.limitMove < Math.abs(spacing.pageX)) {
        spacing.pageX = -data.limitMove

      }
      this.setData({
        'position': spacing
      })
    },


    handleTouchmove(event) {
      const start = this.data.touchStartP
      const touches = event.touches ? event.touches[0] : {}
      if (touches) {
        const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY)
        if (direction === 'Left') {
          this.swipper(touches)
        }
      }
    },

    handleTouchend(event) {
      const start = this.data.touchStartP
      const touches = event.changedTouches ? event.changedTouches[0] : {}
      if (touches) {
        const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY)
        const spacing = {
          pageX: touches.pageX - start.pageX,
          pageY: touches.pageY - start.pageY
        }
        if (Math.abs(spacing.pageX) >= 40 && direction === "Left") {
          spacing.pageX = spacing.pageX < 0 ? -this.data.limitMove : this.data.limitMove
        } else {
          spacing.pageX = 0
        }
        this.setData({
          'position': spacing
        })
      }
    },

    handleButton(event) {
      if (!this.data.unclosable) {
        this.closeButtonGroup()
      }
      const dataset = event.currentTarget.dataset

      this.triggerEvent('change', {
        index: dataset.index
      })
    },

    closeButtonGroup() {
      this.setData({
        'position': {
          pageX: 0,
          pageY: 0
        }
      })
    },

    //控制自定义组件
    handleParentButton(event) {
      if (!this.data.unclosable) {
        this.closeButtonGroup()
      }
    }
  },
  
  ready() {
    this._updateButtonSize()
  }
})