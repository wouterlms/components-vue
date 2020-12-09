<template>
  <transition name="transition">
    <div class="el-tooltip" v-click-outside="() => $emit('click-outside')">
      <!-- content clone for shadow -->
      <div class="el-tooltip__cloned-content" :style="menuStyle">
        <slot />
      </div>

      <!-- arrow -->
      <div class="el-tooltip__arrow" :style="arrowStyle"></div>

      <!-- content -->
      <div class="el-tooltip__content" :style="menuStyle">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    position: {
      type: String,
      default: 'bottom',
      note: 'position of tooltip, top | bottom'
    },

    margin: {
      type: String,
      default: '0px',
      note: 'margin between tooltip & parent'
    },

    offset: {
      type: String,
      default: '0px',
      note: 'offset of content to left or right'
    },

    align: {
      type: String,
      default: 'center',
      note: 'alignment of tooltip, left | right | center'
    },

    arrowSize: {
      type: String,
      default: '10px'
    },

    arrowBorderRadius: {
      type: String,
      default: '3px'
    },

    arrowAlign: {
      type: String,
      default: 'center',
      note: 'arrow alignment, left | right | center'
    },

    arrowOffset: {
      type: String,
      default: '0px'
    },

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
        transform: `translate(${x}, calc(50% + ${this.margin})) rotate(45deg)`
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
    }
  }
}
</script>

<style scoped lang="scss">
.el-tooltip {
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

    background: $primary-light;
    overflow: hidden;
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
