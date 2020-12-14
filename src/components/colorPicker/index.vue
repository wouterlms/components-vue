<template>
  <div class="color-picker">
    <div
      class="color-picker__selector"
      :style="{
        background: hex
      }"
      @click="showColorPicker = !showColorPicker"
      v-click-outside="() => (showColorPicker = false)"
    ></div>

    <transition name="transition">
      <tooltip-element
        v-if="showColorPicker"
        :position="position"
        :align="align"
        :align-arrow="align"
        arrow-offset=".6em"
        margin=".5em"
      >
        <div class="color-picker__dropdown">
          <div class="color-picker__dropdown__selection">
            <!-- color panel -->
            <color-panel class="color-picker__dropdown__panel" @sv="handleSv" :hsv="hsv"></color-panel>

            <!-- color slider -->
            <color-slider class="color-picker__dropdown__slider" @h="handleH" :hsv="hsv"></color-slider>
          </div>

          <div class="color-picker__dropdown__footer">
            <!-- hex / rgb select -->
            <select-element
              :options="colorOptions"
              v-model="selectedColorOption"
              label="name"
              class="color-picker__dropdown__footer__select"
              position="top"
            />

            <!-- rgb -->
            <input-element
              v-if="selectedColorOption.name === 'rgb'"
              :value="rgbString"
              class="color-picker__dropdown__footer__input"
              @keydown.enter="handleRgbEnter"
            />

            <!-- hex -->
            <input-element
              v-else-if="selectedColorOption.name === 'hex'"
              :value="hex"
              class="color-picker__dropdown__footer__input"
              @keydown.enter="handleHexEnter"
            />

            <!-- select -->
            <button-element secondary @click="showColorPicker = false">Select</button-element>
          </div>
        </div>
      </tooltip-element>
    </transition>
  </div>
</template>

<script>
import tooltipElement from '../tooltip'
import colorPanel from './colorPanel'
import colorSlider from './colorSlider'
import inputElement from '../input'
import selectElement from '../select'
import buttonElement from '../button'

import {
  hsvToRgb,
  rgbToHex,
  rgbToHsv,
  hexToRgb,
  rgbObjectToString,
  isValidRgb,
  isValidHex,
  rgbStringToObject
} from './color'

export default {
  components: {
    tooltipElement,
    colorPanel,
    colorSlider,
    inputElement,
    selectElement,
    buttonElement
  },
  props: {
    /** Color value */
    value: String,

    /** Tooltip position (see <tooltip>) */
    position: String,

    /** Tooltip alignment (see <tooltip>) */
    align: String
  },
  computed: {
    rgb() {
      return hsvToRgb(this.hsv.h, this.hsv.s, this.hsv.v)
    },
    rgbString() {
      return rgbObjectToString(this.rgb)
    },
    hex() {
      return rgbToHex(this.rgb.r, this.rgb.g, this.rgb.b)
    }
  },
  data() {
    return {
      hsv: { h: 0, s: 0, v: 0 },
      showColorPicker: false,
      colorOptions: [{ name: 'rgb' }, { name: 'hex' }],
      selectedColorOption: { name: 'rgb' }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(hex) {
        if (hex !== this.hex) {
          const rgb = hexToRgb(hex)
          this.hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
        }
      }
    },
    hsv: {
      deep: true,
      handler() {
        this.$emit('input', this.hex)
      }
    }
  },
  methods: {
    handleSv({ saturation, value }) {
      this.hsv.s = saturation
      this.hsv.v = value
    },
    handleH(hue) {
      this.hsv.h = hue
    },

    handleRgbEnter(e) {
      const rgb = e.target.value

      if (isValidRgb(rgb)) {
        const rgbObject = rgbStringToObject(rgb)
        this.hsv = rgbToHsv(rgbObject.r, rgbObject.g, rgbObject.b)
      }
    },

    handleHexEnter(e) {
      const hex = e.target.value

      if (isValidHex(hex)) {
        const rgbObject = hexToRgb(hex)
        this.hsv = rgbToHsv(rgbObject.r, rgbObject.g, rgbObject.b)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.color-picker {
  position: relative;
  width: 2em;
  height: 2em;

  padding: 0.2em;
  border-radius: $border-radius;
  box-shadow: $box-shadow;

  z-index: 1;

  &__selector {
    background: #000;
    border-radius: $border-radius-sm;
    width: 100%;
    height: 100%;

    cursor: pointer;
  }

  &__dropdown {
    width: 400px;
    padding: 0.5em;

    &__selection {
      display: flex;
      height: 300px;
    }

    &__panel,
    &__slider {
      height: 100%;
    }

    &__panel {
      flex: 0.97;
    }

    &__slider {
      flex: 0.03;
      margin-left: 0.5em;
    }

    &__footer {
      display: grid;
      grid-template-columns: 0.3fr 0.4fr 0.3fr;

      margin-top: 0.5em;

      &__input,
      &__select,
      button {
        font-size: 80%;
      }

      &__input {
        margin-left: 0.5em;
      }

      button {
        width: 80px;
        margin-left: auto;
      }
    }
  }
}

.transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.17, 0.67, 0.16, 0.99);
  }
  &-enter-active {
    opacity: 0;
  }
  &-leave-active {
    opacity: 1;
    pointer-events: none;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-to {
    opacity: 1;
  }
}
</style>
