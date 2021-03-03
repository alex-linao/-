Component({
    externalClasses: ['btn-class'],

    properties: {
      // default, primary, ghost, info, success, warning, error
      type: {
          type: String,
          value: '',
      },
      inline: {
          type: Boolean,
          value: false
      },
      // default, large, small
      size: {
          type: String,
          value: 'small',
      },
      // circle, square
      shape: {
          type: String,
          value: 'square'
      },
      disabled: {
          type: Boolean,
          value: false,
      },
      loading: {
          type: Boolean,
          value: false,
      },
      long: {
          type: Boolean,
          value: false
      },
      hoverStopPropagation: Boolean,
      hoverStartTime: {
          type: Number,
          value: 20
      },
      hoverStayTime: {
          type: Number,
          value: 70
      }
    },

    methods: {
      handleClick () {
        if (this.data.disabled) return false
        this.triggerEvent('click')
      }
    }
})