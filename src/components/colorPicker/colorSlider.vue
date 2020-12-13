<template>
  <div class="slider" ref="slider" @click="handleMouseMove">
    <div
      class="slider__cursor"
      :style="{
        top: `${cursorTop}px`
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    color: Object
  },
  computed: {},
  data() {
    return {
      cursorTop: 0,
      slider: null,
      isMouseDown: false,
      hue: 0
    }
  },
  watch: {
    hue: function(hue) {
      this.$emit('hue', hue)
    },
    color: function() {
      // this.setColor()
    }
  },
  mounted() {
    this.slider = this.$refs.slider
    this.setColor()

    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mousedown', this.handleMouseDown)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mousedown', this.handleMouseDown)
  },
  methods: {
    setColor() {
      this.cursorTop = (this.slider.getBoundingClientRect().height / 360) * this.color.h
      this.hue = this.color.h
    },
    handleMouseDown() {
      this.isMouseDown = true
    },

    handleMouseMove(e) {
      if (!this.isMouseDown && e.type !== 'click') {
        return
      }

      const rect = this.slider.getBoundingClientRect()
      let top = e.clientY - rect.top

      top = Math.max(0, top)
      top = Math.min(top, rect.height)

      this.cursorTop = top
      this.hue = Math.round((top / rect.height) * 360)
    },

    handleMouseUp() {
      this.isMouseDown = false
    }
  }
}
</script>

<style scoped lang="scss">
.slider {
  position: relative;
  background: linear-gradient(180deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);

  &__cursor {
    position: absolute;
    width: 100%;
    height: 3px;

    background: white;
    border-radius: $border-radius;
    border: 1px solid black;

    transform: translate(-1px, -50%);
  }
}
</style>
