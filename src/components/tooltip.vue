<template>
  <transition name="transition">
    <div class="tooltip" v-click-outside="() => $emit('click-outside')">
      <!-- content style clone for shadow -->
      <div class="tooltip__cloned-content" :style="clonedContentStyle"></div>

      <!-- arrow -->
      <div class="tooltip__arrow" :style="arrowStyle"></div>

      <!-- content -->
      <div class="tooltip__content" :style="menuStyle" @resize="handleTooltipResize" ref="tooltipContent">
        <slot />
      </div>
    </div>
  </transition>
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
    arrowAlign: {
      type: String,
      default: 'center',
      note: 'arrow alignment, left | right | center'
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
  computed: {
    transformedOffset() {
      if (this.align === 'right') {
        return `-${this.offset}`
      }
      return this.offset
    },

    transformedArrowOffset() {
      if (this.arrowAlign === 'left') {
        return this.arrowOffset
      }
      return `-${this.arrowOffset}`
    },

    calculateContentPosition() {
      const position = {}

      this.position === 'top' ? (position.top = 0) : (position.bottom = 0)

      if (this.align === 'left') {
        position.right = `calc(50% - ${this.arrowSize})`
      } else if (this.align === 'right') {
        position.left = `calc(50% - ${this.arrowSize})`
      } else {
        position.left = '50%'
      }

      return position
    },

    calculateContentTranslate() {
      if (this.position === 'top') {
        return {
          transform: `translate(${
            this.align === 'center' ? `calc(-50% + ${this.transformedOffset})` : this.transformedOffset
          }, calc(-100% - ${this.margin}))`
        }
      }
      return {
        transform: `translate(${
          this.align === 'center' ? `calc(-50% + ${this.transformedOffset})` : this.transformedOffset
        }, calc(100% + ${this.margin}))`
      }
    },

    calculateArrowBorderRadius() {
      return this.position === 'top'
        ? { borderBottomRightRadius: this.arrowBorderRadius }
        : { borderTopLeftRadius: this.arrowBorderRadius }
    },

    calculateArrowPosition() {
      const position = {}

      if (this.arrowAlign === 'left') {
        position.left = 0
      } else if (this.arrowAlign === 'center') {
        position.left = '50%'
      } else {
        position.right = 0
      }

      if (this.position === 'top') {
        position.top = 0
      } else {
        position.bottom = 0
      }

      return position
    },

    calculateArrowTransform() {
      const transform = {}

      const x = this.arrowAlign === 'left' || this.arrowAlign === 'right' ? this.transformedArrowOffset : '-50%'

      if (this.position === 'top') {
        return {
          transform: `translate(${x}, calc(-50% - ${this.margin})) rotate(45deg)`
        }
      }
      return {
        transform: `translate(${x}, calc(50% + ${this.margin} + 1px)) rotate(45deg)`
      }
    },

    menuStyle() {
      return {
        ...this.calculateContentPosition,
        ...this.calculateContentTranslate,
        width: this.width
      }
    },

    arrowStyle() {
      return {
        width: this.arrowSize,
        height: this.arrowSize,
        ...this.calculateArrowTransform,
        ...this.calculateArrowBorderRadius,
        ...this.calculateArrowPosition
      }
    },

    clonedContentStyle() {
      // cloned content is 1px off for some reason

      // clone object
      const position = JSON.parse(JSON.stringify(this.calculateContentPosition))

      // adjust position
      position.bottom !== null ? (position.bottom = '-1px') : (position.top = '1px')

      return {
        ...position,
        ...this.calculateContentTranslate,
        width: this.width,
        height: `${this.contentHeight}px`
      }
    }
  },
  data() {
    return {
      contentHeight: 0
    }
  },
  mounted() {
    this.handleTooltipResize()
  },
  methods: {
    handleTooltipResize() {
      // cloned content is 1px off
      this.contentHeight = this.$refs.tooltipContent.clientHeight - 1
    }
  }
}
</script>

<style scoped lang="scss">
.tooltip {
  &__arrow {
    position: absolute;
    box-shadow: $box-shadow;
    background: $primary-light;
    z-index: 2;
  }

  &__content,
  &__cloned-content {
    position: absolute;
    border-radius: $border-radius;
    overflow: hidden;
  }

  &__content {
    background: $primary-light;
  }

  &__cloned-content {
    @include no-scrollbar;

    box-shadow: $box-shadow;
    z-index: 1;
  }

  &__content {
    z-index: 3;
  }
}
</style>
