<template>
  <div
    class="panel"
    ref="panel"
    :style="{
      background: `hsl(${hsv.h}, 100%, 50%)`
    }"
    @click="handleMouseMove"
    @mousedown="handleMouseDown"
  >
    <div
      class="panel__cursor"
      :style="{
        top: `${cursorTop}px`,
        left: `${cursorLeft}px`
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    hsv: Object
  },
  data() {
    return {
      cursorTop: 0,
      cursorLeft: 0,
      saturation: 0,
      value: 0,
      panel: null,
      isMouseDown: false
    }
  },
  watch: {
    value: function(value) {
      this.$emit('sv', { saturation: this.saturation, value })
    },
    hsv: function(hsv) {
      this.setCursorPosition(hsv.s, hsv.v)
    }
  },
  mounted() {
    this.panel = this.$refs.panel

    this.setCursorPosition(this.hsv.s, this.hsv.v)

    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('mousemove', this.handleMouseMove)
  },
  methods: {
    setCursorPosition(saturation, value) {
      const rect = this.panel.getBoundingClientRect()

      this.cursorLeft = (saturation * rect.width) / 100
      this.cursorTop = ((100 - value) * rect.height) / 100
    },
    handleMouseDown() {
      this.isMouseDown = true
    },

    handleMouseMove(e) {
      if (!this.isMouseDown && e.type !== 'click') {
        return
      }

      const rect = this.panel.getBoundingClientRect()

      let left = e.clientX - rect.left
      let top = e.clientY - rect.top

      left = Math.max(0, left)
      left = Math.min(left, rect.width)

      top = Math.max(0, top)
      top = Math.min(top, rect.height)

      this.cursorTop = top
      this.cursorLeft = left

      this.positionToHsv(top, left, rect)
    },

    handleMouseUp() {
      this.isMouseDown = false
    },

    positionToHsv(top, left, rect) {
      this.saturation = (left / rect.width) * 100
      this.value = 100 - (top / rect.height) * 100
    }
  }
}
</script>

<style scoped lang="scss">
.panel {
  position: relative;
  border-radius: $border-radius-sm;

  &::before,
  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: $border-radius-sm;
  }

  &::before {
    background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
  }

  &::after {
    background: linear-gradient(0deg, #000, transparent);
  }

  &__cursor {
    position: absolute;

    width: 5px;
    height: 5px;

    border: 1px solid white;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: $box-shadow;
    border-radius: 50%;

    transform: translate(-50%, -50%);
    z-index: 1;

    &::before {
      content: '';
    }
  }
}
</style>
