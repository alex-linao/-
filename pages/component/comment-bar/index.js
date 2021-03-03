Component({
  properties: {
    placeholder: {
      type: String,
      value: '来点碎碎念...'
    },
    to: {
      type: String,
      value: ''
    }
  },

  data: {
    inputHeight: 40,
    wordCount: 0,
    positionBottom: 0,
    content: '',
    submiting: false,
    isMax: false,
    keyboardHeight: 0,
    windowHeight: 0,
    oldInputHeight: 0,
  },

  lifetimes: {
    ready() {
      this.getWindowHeight()
    }
  },

  methods: {

    onClick() {
      console.log(111)
    },

    getWindowHeight() {
      try {
        const res = wx.getSystemInfoSync()

        this.data.windowHeight = res.windowHeight

      } catch (e) {
        // Do something when catch error
      }
    },

    setCommentSize() {
      let inputHeight

      if(!this.data.isMax) {
        this.data.oldInputHeight = this.data.inputHeight
        inputHeight = this.data.windowHeight - this.data.keyboardHeight - 72 - 30
      } else {
        inputHeight = this.data.oldInputHeight
      }

      this.setData({
        isMax: !this.data.isMax,
        inputHeight
      })
    },

    lineChangeHandle({ detail }) {
      const { lineCount } = detail

      this.setData({
        inputHeight: (lineCount > 5 ? 6 : lineCount + 1) * 40
      })
    },

    inputChangeHandle({ detail }) {
      const { value } = detail

      this.data.content = value

      const wordCount = value.length

      this.setData({
        wordCount
      })
    },

    // 虚拟输入框点击事件
    virtualInputTap(e) {
      this.setData({
        dialogShadow: true,
        inputFocus: true
      })
    },


    keyboardHeightChangeHandle({ detail }) {
      const { height } = detail

      this.data.keyboardHeight = height

      this.setData({
        positionBottom: height
      })
    },

    submitHandle() {
      console.log(this.data.content)
    },
  }
})
