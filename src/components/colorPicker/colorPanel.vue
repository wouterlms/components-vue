<template>
  <div
    class="panel"
    ref="panel"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    :style="{
      background: `hsl(${hue}, 100%, 50%)`
    }"
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
import { hsvToRgb } from './color'

export default {
  props: {
    hue: Number,
    color: Object
  },
  computed: {},
  data() {
    return {
      cursorTop: 0,
      cursorLeft: 0,
      saturation: 0,
      value: 0,
      panel: null,
      isMouseDown: false,
      rgb: null
    }
  },

  watch: {
    rgb: function(rgb) {
      this.$emit('color', rgb)
    },
    hue: {
      handler(hue) {
        this.$emit('color', hsvToRgb(this.hue, this.saturation, this.value))
      }
    },
    saturation: function() {
      this.rgb = hsvToRgb(this.hue, this.saturation, this.value)
    },
    color: {
      handler(rgb) {
        // this.setColor()
      }
    }
  },

  mounted() {
    this.panel = this.$refs.panel
    this.setColor() // can't use immediate watcher because panel is not initialised
    document.addEventListener('mouseup', this.handleMouseUp)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.handleMouseUp)
  },
  methods: {
    setColor() {
      const rect = this.panel.getBoundingClientRect()

      this.cursorLeft = (this.color.s * rect.width) / 100
      this.cursorTop = ((100 - this.color.v) * rect.height) / 100
      this.saturation = this.color.s
      this.value = this.color.v
    },
    handleMouseDown() {
      this.isMouseDown = true
    },

    handleMouseMove(e) {
      if (!this.isMouseDown) {
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

      this.toColor(top, left, rect)
    },

    handleMouseUp() {
      this.isMouseDown = false
    },

    toColor(top, left, rect) {
      this.saturation = (left / rect.width) * 100
      this.value = 100 - (top / rect.height) * 100
    }
  }
}
</script>

<style scoped lang="scss">
.panel {
  position: relative;

  &::before,
  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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

    border: 1px solid black;
    background: white;

    transform: translate(-50%, -50%);
    z-index: 1;
  }
}
</style>
