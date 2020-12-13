<template>
  <div class="tooltip" v-click-outside="() => $emit('click-outside')">
    <div class="tooltip__arrow" :style="arrowStyle"></div>
    <div class="tooltip__shadow-layer" :style="shadowLayerStyle"></div>
    <div class="tooltip__content" :style="contentStyle" @resize="handleContentResize" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /** Position of tooltip - 'top' | 'bottom' */
    position: {
      type: String,
      default: 'bottom'
    },

    /** Margin between tooltip and relative parent */
    margin: {
      type: String,
      default: '0px'
    },

    /** Offset of content to either left or right */
    offset: {
      type: String,
      default: '0px'
    },

    /** Alignment of tooltip - 'left' | 'right' | 'center' */
    align: {
      type: String,
      default: 'center'
    },

    /** Arrow size */
    arrowSize: {
      type: String,
      default: '0.625em'
    },

    /** Arrow border radius */
    arrowBorderRadius: {
      type: String,
      default: '0.150em'
    },

    /** Alignment of arrow - 'left' | 'right' | 'center' */
    alignArrow: {
      type: String,
      default: 'center'
    },

    /** Offset of arrow to either left or right */
    arrowOffset: {
      type: String,
      default: '0px'
    },

    /** Tooltip width, 100% = fit to parent */
    width: {
      type: String,
      default: 'auto'
    }
  },

  data() {
    return {
      contentWidth: 0,
      contentHeight: 0
    }
  },
  computed: {
    shadowLayerStyle() {
      // cloned content is 1px off for some reason
      const style = {}
      let translateX, translateY

      if (this.position === 'top') {
        style.top = `calc(-${this.margin} - 1px)`
        translateY = '-100%'
      } else if (this.position === 'bottom') {
        style.bottom = `calc(-${this.margin} - 1px)`
        translateY = '100%'
      }

      if (this.align === 'center') {
        style.left = `calc(50% + ${this.offset})`
        translateX = '-50%'
      } else if (this.align === 'left') {
        style.left = this.offset
        translateX = 0
      } else if (this.align === 'right') {
        style.right = this.offset
        translateX = 0
      }

      style.transform = `translate(${translateX}, ${translateY})`

      return {
        ...style,
        width: `${this.contentWidth - 1}px`,
        height: `${this.contentHeight - 2}px`
      }
    },
    contentStyle() {
      const style = {}
      let translateX, translateY

      if (this.position === 'top') {
        style.top = `calc(-${this.margin})`
        translateY = '-100%'
      } else if (this.position === 'bottom') {
        style.bottom = `calc(-${this.margin})`
        translateY = '100%'
      }

      if (this.align === 'center') {
        style.left = `calc(50% + ${this.offset})`
        translateX = '-50%'
      } else if (this.align === 'left') {
        style.left = this.offset
        translateX = 0
      } else if (this.align === 'right') {
        style.right = this.offset
        translateX = 0
      }

      style.transform = `translate(${translateX}, ${translateY})`

      return {
        ...style,
        width: this.width
      }
    },
    arrowStyle() {
      const style = {}
      let translateX, translateY

      if (this.position === 'top') {
        style.top = `calc(-${this.margin})`
        translateY = '-50%'
      } else if (this.position === 'bottom') {
        style.bottom = `calc(-${this.margin})`
        translateY = '50%'
      }

      if (this.alignArrow === 'center') {
        style.left = '50%'
        translateX = '-50%'
      } else if (this.alignArrow === 'left') {
        style.left = `calc(${this.arrowSize} / 2 + ${this.arrowOffset})`
        translateX = 0
      } else if (this.alignArrow === 'right') {
        style.right = `calc(${this.arrowSize} / 2 + ${this.arrowOffset})`
        translateX = 0
      }

      style.transform = `translate(${translateX}, ${translateY}) rotate(45deg)`

      return {
        ...style,
        ...this.calculateArrowBorderRadius,
        width: this.arrowSize,
        height: this.arrowSize
      }
    },
    calculateArrowBorderRadius() {
      return this.position === 'top'
        ? { borderBottomRightRadius: this.arrowBorderRadius }
        : { borderTopLeftRadius: this.arrowBorderRadius }
    }
  },
  mounted() {
    this.handleContentResize()
  },
  methods: {
    handleContentResize() {
      this.contentWidth = this.$refs.content.clientWidth
      this.contentHeight = this.$refs.content.clientHeight
    }
  }
}
</script>

<style scoped lang="scss">
.tooltip {
  &__arrow,
  &__content,
  &__shadow-layer {
    position: absolute;
  }

  &__arrow {
    background: $primary-light;
    box-shadow: $box-shadow;

    z-index: 2;
  }

  &__content {
    background: $primary-light;
    border-radius: $border-radius;
    color: $primary-dark;

    overflow: hidden;

    z-index: 3;
  }

  &__shadow-layer {
    background: $primary-light;
    border-radius: $border-radius;
    color: $primary-dark;

    box-shadow: $box-shadow;
    z-index: 1;
  }
}
</style>
