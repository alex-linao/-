Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    },
    favorites: {
      type: Array,
      value: [],
      observer(newVal, oldVal){
        if(Array.isArray(oldVal) && Array.isArray(newVal)) {
          let checkIds = []
          for(let item of this.data.favorites) {
            if(item.check) checkIds.push(item.id)
          }

          this.setData({
            confirm: false,
            oldCheckIds: checkIds
          })
        }
      }
    },
    saveLoading: {
      type: Boolean,
      value: false
    }
  },

  data: {
    confirm: false,
    oldCheckIds: [],  // 编辑时之前选中ID
    checkIds: []      // 当前选中ID
  },

  methods: {
    _hideModal() {
      this.setData({
        checkIds: [],
        confirm: false,
        show: false
      })
    },

    _handleCheck(e) {
      let index = e.currentTarget.dataset.index
      let item = this.data.favorites[index]
      let check = 'favorites[' + index + '].check'

      this.setData({
        [check]: !item.check
      }, _=> {
        let checkIds = []
        for(let item of this.data.favorites) {
          if(item.check) checkIds.push(item.id)
        }

        // 1.创建时选中为空时 2、更新时选中未更改时  不可点确认
        let confirm = false
        if((this.data.oldCheckIds.length === 0 && checkIds.length > 0) || (this.data.oldCheckIds.length > 0 && checkIds.sort().toString() !== this.data.oldCheckIds.sort().toString())) {
          confirm = true
        }

        this.setData({
          checkIds,
          confirm
        })
      })
    },

    handleSave() {
      if(this.data.oldCheckIds.length === 0 && this.data.checkIds.length === 0) return

      this.triggerEvent('save', this.data.checkIds)
    },

    handleNavigateTo(e) {
      this.triggerEvent('handleNavigateTo', e)
    }
  }
})